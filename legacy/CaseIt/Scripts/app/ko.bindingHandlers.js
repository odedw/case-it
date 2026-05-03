define('ko.bindingHandlers',
[],
function () {
    var unwrap = ko.utils.unwrapObservable;

    //removeSpace
    //---------------------------
    ko.bindingHandlers.removeSpace = {
        update: function (element, valueAccessor) {
            var value = unwrap(valueAccessor());
            var elem = $(element);
            if (!elem.data('original-text'))
                elem.data('original-text',elem.text());
            
            elem.text(value ? elem.data('original-text').replace(' ', '') : elem.data('original-text'));
        }
    };
    
});