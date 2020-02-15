angular
    .module('apps.interceptor')
    .service('HttpInterceptor', HttpInterceptor);

HttpInterceptor.$inject = ['$rootScope', '$q', 'Account', '$location', '$injector', 'API_URL'];
function HttpInterceptor($rootScope, $q, Account, $location, $injector, API_URL) {
    function retryRequest(httpConfig) {
        var $timeout = $injector.get('$timeout');
        var thisTimeout = 1000;
        return $timeout(function () {
            var $http = $injector.get('$http');
            return $http(httpConfig);
        }, thisTimeout);
    };

    return {
        request: function (config) {
            
            var loader = '<div id="pnlSpinner" class="spinner-container"><div class="spinner" /></div>';
            var token = Account.accessToken();

            if (token)
                config.headers.Authorization = 'Bearer ' + token;

            if (angular.loaderElement && !$('#pnlSpinner').length) {
                angular.loaderElement.append(loader);
            }

            return config;
        },

        requestError: function (config) {
            //$('#loadingPanel').hide();
            //console.log('HttpInterceptor.requestError');
            if ($('#pnlSpinner').length)
                $('#pnlSpinner').remove();
            return config;
        },

        response: function (res) {
            //$('#loadingPanel').hide();
            // if (!res.data) {
            //     res.data = {};
            //     res.data.status = 'UNKNOWN ERROR';
            //     //console.log('HttpInterceptor.response:' + res.data.Status);
            // }

            // if (res.data.status == 'AUTHORIZATION FAILED') {
            //     if (res.data.message === 'TOKEN EXPIRED') {
            //         var deferred = $q.defer();

            //         var $http = $injector.get('$http');
            //         var strUser = WebStorage.getLocalStorage('UserInfo');
            //         var userInfo = JSON.parse(strUser);

            //         $http.post(API_URL.GenerateNewAccessToken, {
            //             headers: {
            //                 "RefreshToken": userInfo.RefreshToken
            //             }
            //         }).then(function (r) {
            //             if (r.data.Status !== "SUCCESS") {
            //                 console.log('USER IS NOT AUTHENTICATED');
            //                 WebStorage.removeLocalStorage("UserInfo");

            //                 Notify.alert(r.Data.Message, { status: 'danger' });

            //                 $location.path('page/login');
            //                 return;
            //             }

            //             userInfo.accessToken = r.data.Data.accessToken;
            //             WebStorage.setLocalStorage('UserInfo', JSON.stringify(userInfo));

            //             var $http = $injector.get('$http');
            //             return $http(res.config);
            //         }, function (err) { console.log(err); }).then(function (r) {
            //             res = r;
            //             deferred.resolve(res);
            //         });

            //         return deferred.promise;
            //     } else {
            //         $location.path('page/login');
            //         return;
            //     }
            // }

            if ($('#pnlSpinner').length)
                $('#pnlSpinner').remove();
            return res || $q.when(res);
        },

        responseError: function (res) {
            //$('#loadingPanel').hide();
            // if (!res.data) {
            //     res.data = {};
            //     res.data.Status = 'UNKNOWN ERROR';
            //     console.log('HttpInterceptor.responseError:' + res.data.Status);
            // }
            if ($('#pnlSpinner').length)
                $('#pnlSpinner').remove();
            return res;
        }
    }
}