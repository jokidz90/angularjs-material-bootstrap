'use strict';
var app = angular.module('apps.core');
app.constant('API_URL', {
        'CompanyDomain': 'https://qiji-dev.proseller.io/',

        'GeneralInfo': '../masterdata/api/info/company',
        'UserLogin': '../masterdata/api/user/login',
        'GenerateNewAccessToken': '../masterdata/api/user/generatenewaccesstoken',
        'LanguageTranslation': '../masterdata/api/appmodule/I18N/',
        'AppSetting': '../masterdata/api/fetchappsetting',
        'Outlet': '../masterdata/api/outlets',
        'Product': '../product/api/productpreset/load',
        'ProductCheck': '../product/api/productpreset/checkversion',

        // 'AppModule': '../masterdata/api/appmodule/fetchapp',
        // 'AppFilter': '../masterdata/api/appmodule/fetchdtfilter',
        // 'AppColumn': '../masterdata/api/appmodule/fetchdtcolumn',
        // 'SideBar': '../masterdata/api/appmodule/fetchsidebarmenu',
        // 'Notification': '../masterdata/api/notification/all/userAccount',
        // 'NotificationUnread': '../masterdata/api/notification/unread/userAccount',
        // 'User': '../masterdata/api/user',
        // 'UserLogout': '../masterdata/api/user/logout',
    });