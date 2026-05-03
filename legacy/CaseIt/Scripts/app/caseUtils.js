define('caseUtils',
    [], function() {
        var
            caseIt = function (text, targetCase, keepSpaces) {
                if (targetCase == 'upper') {
                    return toUpper(text, keepSpaces);
                } else if (targetCase == 'lower') {
                    return toLower(text, keepSpaces);
                } else if (targetCase == 'pascal') {
                    return toPascal(text, keepSpaces);
                } else if (targetCase == 'camel') {
                    return toCamel(text, keepSpaces);
                }
                return text;
            },
            toUpper = function (text, keepSpaces) {
                var convertedText = text.toUpperCase();
                return keepSpaces ? convertedText : convertedText.replace(/ /g, '');
            },
            toLower = function (text, keepSpaces) {
                var convertedText = text.toLowerCase();
                return keepSpaces ? convertedText : convertedText.replace(/ /g, '');
            },
            toPascal = function (text, keepSpaces) {
                var tokens = text.split(' ');
                for (var i = 0; i < tokens.length; i++) {
                    tokens[i] = tokens[i].substr(0, 1).toUpperCase() + tokens[i].substr(1, tokens[i].length - 1).toLowerCase();
                }
                return keepSpaces ? tokens.join(' ') : tokens.join('');
            },
            toCamel = function (text, keepSpaces) {
                var tokens = text.split(' ');
                for (var i = 0; i < tokens.length; i++) {
                    if (i == 0) {
                        tokens[i] = tokens[i].substr(0, 1).toLowerCase() + tokens[i].substr(1, tokens[i].length - 1).toLowerCase();
                    }
                    else {
                        tokens[i] = tokens[i].substr(0, 1).toUpperCase() + tokens[i].substr(1, tokens[i].length - 1).toLowerCase();
                    }
                }
                return keepSpaces ? tokens.join(' ') : tokens.join('');
            };
            

        return {
            toUpper: toUpper,
            toLower: toLower,
            toPascal: toPascal,
            toCamel: toCamel,
            caseIt: caseIt
        };
    });