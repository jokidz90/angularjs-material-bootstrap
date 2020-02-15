angular
.module('apps.webstorage', [])
.service('WebStorage', function($window){

    this.setLocalStorage = function (key, value) {
        $window.localStorage.setItem(APP_TYPE + '_' + key, value);
    };
    this.getLocalStorage = function(key) {
        return $window.localStorage.getItem(APP_TYPE + '_' + key);
    };
    this.removeLocalStorage = function(key) {
        return $window.localStorage.removeItem(APP_TYPE + '_' + key);
    };

    this.setSessionStorage = function(key, value) {
        $window.sessionStorage.setItem(APP_TYPE + '_' + key, value);
    };
    this.getSessionStorage = function(key) {
        return $window.sessionStorage.getItem(APP_TYPE + '_' + key);
    };
    this.removeSessionStorage = function(key) {
        return $window.sessionStorage.removeItem(APP_TYPE + '_' + key);
    };

    // function removeEmptyValues(obj) {
    //     for (var propName in obj) {
    //         if (typeof obj[propName] === "boolean")
    //             continue;

    //         if (!obj[propName] || obj[propName].length === 0)
    //             delete obj[propName];
    //         else if (typeof obj[propName] === 'object')
    //             removeEmptyValues(obj[propName]);
    //     }
    //     return obj;
    // };

});