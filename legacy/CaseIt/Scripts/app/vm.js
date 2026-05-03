define('vm',
    ['caseUtils', 'externalAnalytics'], function (caseUtils, externalAnalytics) {
        var text = ko.observable(),
            keepSpaces = ko.observable(true),
            ctrlKeyName = ko.computed(function() {
                if (navigator.appVersion.indexOf("Mac") != -1) {
                    return 'Cmd';
                }
                return 'Ctrl';
            }),
            firstConvert = true,
            initialText = '',
            caseIt = function (vm, evt) {
                var targetCase = $(evt.currentTarget).data('case');                
                caseItFromShortcut(targetCase);
                externalAnalytics.track('Text Transform', { Transform: targetCase });
            },
            caseItFromShortcut = function(targetCase) {
                if (firstConvert) {
                    initialText = text();
                    firstConvert = false;
                }
                var convertedText = caseUtils.caseIt(text(), targetCase, keepSpaces());
                text(convertedText);
            },
            showAbout = function () {
                externalAnalytics.track('About Click');
                $('#overlay').fadeIn('fast', function () {
                    $(this).on('click',hideAbout);
                });
                var dlg = $('#about-dialog');
                dlg.animate({ top: (window.innerHeight / 2 - dlg.outerHeight() / 2) }, 400, function () {
                    //callback
                });
            },
            hideAbout = function () {
                $('#overlay').off('click', hideAbout).fadeOut('slow');
                var dlg = $('#about-dialog');

                dlg.animate({ top: -dlg.outerHeight() }, 400, function () {
                    //callback
                });
            };
        

        return {
            text: text,
            caseIt: caseIt,
            ctrlKeyName:ctrlKeyName,
            keepSpaces: keepSpaces,
            caseItFromShortcut: caseItFromShortcut,
            showAbout: showAbout
            
        };
    });