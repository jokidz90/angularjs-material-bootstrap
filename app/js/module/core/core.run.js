'use strict';

var app = angular.module('apps.core');

app.$inject = ['$rootScope', '$state', '$stateParams', '$location', '$window', '$http', '$templateCache', 'API_URL', 'WebStorage', 'Account'];

app.run(function ($rootScope, $state, $stateParams, $location, $window, $http, $templateCache, API_URL, WebStorage, Account) {

    var path = $location.path();
    if (!Account.isAuthenticated() && path != '/login') {
        $location.path('/login');
    } else if (Account.isAuthenticated() && !Account.outletInfo()) {
        $location.path('/outlets');
    }
    

    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
        if (typeof (toState) !== 'undefined')
            $templateCache.remove(toState.templateUrl);

        console.log('$stateChangeStart : ' + toState);
    });
    $rootScope.$on('$stateNotFound', function (event, unfoundState) {
            console.log('unfoundState.to ' + unfoundState.to);
            console.log('unfoundState.toParams ' + unfoundState.toParams); // {a:1, b:2}
        });
    $rootScope.$on('$stateChangeError',
        function (event, toState, toParams, fromState, fromParams, error) {
            console.log('toState ' + error);
        });
    $rootScope.$on('$stateChangeSuccess', function (/*event, toState, toParams, fromState, fromParams*/) {
            console.log('$stateChangeSuccess');
            $window.scrollTo(0, 0);
            $rootScope.pageTitle = $state.current.title;
        });

    $rootScope.initApp = function () {
        $http.get(API_URL.CompanyDomain + API_URL.GeneralInfo)
            .then(function (response) {
                if(!response.data)
                    return;
                if (response.data.status != 'SUCCESS')
                    return;

                var companyInfo = response.data.data;
                if (!companyInfo)
                    return;

                var appInfo;
                if (companyInfo.applications) {
                    appInfo = companyInfo.applications.find(app => {
                        return app.appType === APP_TYPE
                    });
                }

                if (!appInfo)
                    appInfo = {};
                if (!appInfo.localeID)
                    appInfo.localeID = 'EN';
                Account.setCompanyInfo(companyInfo);
                Account.setAppInfo(appInfo);                
                if (companyInfo.applications)
                    companyInfo.applications.forEach(app => WebStorage.setLocalStorage(app.appType, JSON.stringify(app)));
            });
    };
    $rootScope.initApp();

    $rootScope.registeredTo = function () {
        var result = '-';

        var company = Account.companyInfo();
        if (company)
            result = company.companyName;

        var outlet = Account.outletInfo();
        if (outlet)
            result = result + ' - '+outlet.name;

        return result;
    };    

    $rootScope.authorURL = function () {
        var result = '-';

        var company = Account.appInfo();
        if (company)
            result = company.authorURL;

        return result;
    };     
    
    $rootScope.author = function () {
        var result = '-';

        var company = Account.appInfo();
        if (company)
            result = company.author;

        return result;
    };

    $rootScope.isAuthenticated = function () {
        var isAuthenticated = false;

        var user = Account.userInfo();
        if (user)
            isAuthenticated = true;

        return isAuthenticated;
    };

    $rootScope.isMaterialUIInitialized = false;
    $rootScope.pageLoaded = function(){
      $('body').bootstrapMaterialDesign();      
      $('[name="page-content"]').bootstrapMaterialDesign();            
    };
});