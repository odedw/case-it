define('shortcutManager',
    ['vm'], function (vm) {
        var init = function() {
            var clipboardHelper = $("#clipboard-helper");

            $(document).on('keydown', function (evt) {
                var ref, ref1;
                if (!evt || !(evt.ctrlKey || evt.metaKey)) {
                    if (isAltDown && evt.keyCode >= 49 && evt.keyCode < 53) {
                        var btnClass = '.btn-' + (evt.keyCode - 48).toString();
                        $(btnClass).click();
                    } else if (evt.altKey) {
                        isAltDown = true;
                    }
                    return true;
                }
                if ($(evt.target).is("input:visible,textarea:visible")) {
                    return true;
                }
                if (typeof window.getSelection === "function" ? (ref = window.getSelection()) != null ? ref.toString() : void 0 : void 0) {
                    return true;
                }
                if ((ref1 = document.selection) != null ? ref1.createRange().text : void 0) {
                    return true;
                }

                setTimeout(function() {
                    clipboardHelper.show().focus().select();
                }, 1);

                return true;
            });

            $(document).on('keyup', function(evt) {
                if (evt.altKey) {
                    isAltDown = false;
                }
                return true;
            });
            clipboardHelper.on('input propertychange keyup', function (evt) {
                setTimeout(function() {
                    clipboardHelper.blur().hide();
                }, 1);
            });

            clipboardHelper.on('copy', function (evt) {
                firstCopy = !firstCopy;
                if (firstCopy)
                    $('#copy-notification').fadeIn('fast',function() {
                        setTimeout(function() {
                            $('#copy-notification').fadeOut();
                        },1000);
                    });
            });

        },
            isAltDown = false,
            firstCopy = false;
        

        init();
        return {
            init: init
        };
    });