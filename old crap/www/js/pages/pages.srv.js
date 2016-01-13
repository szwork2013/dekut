angular.module('PageSrv', ['ngResource', 'PagesCtrl'])

//Factory for Pages
.factory('Pages', function ($resource) {
    return $resource(Config.backendUrl+ '/api/pages/:pageId');
})
