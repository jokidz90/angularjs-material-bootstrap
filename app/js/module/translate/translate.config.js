angular
.module('apps.translate')
.config(function ($translateProvider, API_URL) {
    $translateProvider.useStaticFilesLoader({
        prefix: API_URL.CompanyDomain + API_URL.LanguageTranslation,
        suffix: ''
    });
     
      $translateProvider.preferredLanguage('EN');
      $translateProvider.useLocalStorage();
      $translateProvider.usePostCompiling(true);
      $translateProvider.useSanitizeValueStrategy('sanitizeParameters');      

  });