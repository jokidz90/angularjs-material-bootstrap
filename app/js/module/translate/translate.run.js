angular
    .module('apps.translate')
    .run(function ($rootScope, $translate, WebStorage) {

        $rootScope.language = {

            listIsOpen: false,
            available: {
                'EN': 'English',
                'ID': 'Indonesian'
            },

            init: function () {

                var localeID = WebStorage.getLocalStorage('LocaleID');
                var availableLang = JSON.parse(WebStorage.getLocalStorage('AvailableLocalization'));
                if (availableLang)
                    $rootScope.language.available = availableLang;

                if (!localeID || localeID == '')
                    localeID = 'EN';

                $rootScope.language.selected = $rootScope.language.available[localeID];
            },
            set: function (localeId) {
                $translate.use(localeId);
                $rootScope.language.selected = $rootScope.language.available[localeId];
                $rootScope.language.listIsOpen = !$rootScope.language.listIsOpen;
            },

            getCurrentLanguage: function () {
                var currentLang = $translate.proposedLanguage() || $translate.use();
                return currentLang;
            }
        };

        $rootScope.language.init();

    });