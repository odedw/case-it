define('bootstrapper',
    ['shortcutManager', 'vm', 'externalAnalytics'], function (shortcutManager, vm, externalAnalyics) {
        var run = function () {
            externalAnalyics.track('PageView', { Url: window.location.href });
            requirejs(['ko.bindingHandlers'], function () {
               
                shortcutManager.init();
                ko.applyBindings(vm, $('#page').get(0));
            });
        };

        return {
            run: run
        };
    });