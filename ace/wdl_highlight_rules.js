define(function(require, exports, module) {
"use strict";

var oop = require("../lib/oop");
var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;

var WDLHighlightRules = function() {
    // regexp must not have capturing parentheses. Use (?:) instead.
    // regexps are ordered -> the first match is used

    this.$rules = {
        start: [{
            token: "keyword.operator.assignment.wdl",
            regex: /\=/
        }, {
            token: "keyword.operator.comparison.wdl",
            regex: /<\=|>\=|\=\=|<|>|\!\=/
        }, {
            token: "keyword.operator.assignment.augmented.wdl",
            regex: /\+\=|-\=|\*\=|\/\=|\/\/\=|%\=|&\=|\|\=|\^\=|>>\=|<<\=|\*\*\=/
        }, {
            token: "keyword.operator.arithmetic.wdl",
            regex: /\+|\-|\*|\*\*|\/|\/\/|%|<<|>>|&|\||\^|~/
        }, {
            token: "constant.language.wdl",
            regex: /\b(?:true|false)\b/
        }, {
            include: "#builtin_types"
        }, {
            include: "#comments"
        }, {
            include: "#input_output"
        }, {
            include: "#keywords"
        }, {
            include: "#string_quoted_single"
        }, {
            include: "#string_quoted_double"
        }, {
            include: "#command_block"
        }],
        "#builtin_types": [{
            token: "support.type.wdl",
            regex: "(?:[^A-Za-z0-9_\.])(?:Array|Boolean|File|Float|Int|Map|Object|String|Pair)\\b",
        }],
        "#command_block": [{
            token: [
                "keyword.other.wdl",
                "command.block.wdl",
                "command.block.wdl"
            ],
            regex: /(command)(\s*\{)((?:$|\s)*)/,
            push: [{
                token: "command.block.wdl",
                regex: /(?:^|\s+)\}/,
                next: "pop"
            }, {
                defaultToken: "command.block.wdl"
            }],
            comment: "command {}"
        }, {
            token: [
                "keyword.other.wdl",
                "command.block.wdl",
                "command.block.wdl"
            ],
            regex: /(command)(\s*<{3})((?:$|\s)*)/,
            push: [{
                token: "command.block.wdl",
                regex: /(?:^|\s+)>{3}/,
                next: "pop"
            }, {
                defaultToken: "command.block.wdl"
            }],
            comment: "command <<< >>>"
        }],
        "#comments": [{
            token: [
                "punctuation.definition.comment.wdl",
                "comment.line.number-sign.wdl"
            ],
            regex: /(#)(.*$)/
        }],
        "#constant_placeholder": [{
            token: "constant.other.placeholder.wdl",
            regex: /%(?:\([a-z_]+\))?#?0?\-?[ ]?\+?(?:[0-9]*|\*)(?:\.(?:[0-9]*|\*))?[hL]?[a-z%]/,
            caseInsensitive: true
        }],
        "#escaped_char": [{
            token: [
                "constant.character.escape.hex.wdl",
                "constant.character.escape.octal.wdl",
                "constant.character.escape.newline.wdl",
                "constant.character.escape.backlash.wdl",
                "constant.character.escape.double-quote.wdl",
                "constant.character.escape.single-quote.wdl",
                "constant.character.escape.bell.wdl",
                "constant.character.escape.backspace.wdl",
                "constant.character.escape.formfeed.wdl",
                "constant.character.escape.linefeed.wdl",
                "constant.character.escape.return.wdl",
                "constant.character.escape.tab.wdl",
                "constant.character.escape.vertical-tab.wdl"
            ],
            regex: /(\\x[0-9a-fA-F]{2})|(\\[0-7]{3})|(\\$)|(\\\\)|(\\\")|(\\')|(\\a)|(\\b)|(\\f)|(\\n)|(\\r)|(\\t)|(\\v)/
        }],
        "#escaped_unicode_char": [{
            token: [
                "constant.character.escape.unicode.16-bit-hex.wdl",
                "constant.character.escape.unicode.32-bit-hex.wdl",
                "constant.character.escape.unicode.name.wdl"
            ],
            regex: /(\\U[0-9A-Fa-f]{8})|(\\u[0-9A-Fa-f]{4})|(\\N\{[a-zA-Z0-9\, ]+\})/
        }],
        "#keywords": [{
            token: "keyword.other.wdl",
            regex: /(?:^|\s)(?:call|runtime|task|workflow|if|then|else|import|as|input|output|meta|parameter_meta|scatter)[^A-Za-z_]/
        }],
        "#string_quoted_double": [{
            token: "punctuation.definition.string.begin.wdl",
            regex: /"/,
            push: [{
                token: "punctuation.definition.string.end.wdl",
                regex: /"/,
                next: "pop"
            }, {
                include: "#constant_placeholder"
            }, {
                include: "#escaped_char"
            }, {
                defaultToken: "string.quoted.double.single-line.wdl"
            }],
            comment: "double quoted string"
        }],
        "#string_quoted_single": [{
            token: "punctuation.definition.string.begin.wdl",
            regex: /'/,
            push: [{
                token: "punctuation.definition.string.end.wdl",
                regex: /'/,
                next: "pop"
            }, {
                include: "#constant_placeholder"
            }, {
                include: "#escaped_char"
            }, {
                defaultToken: "string.quoted.single.single-line.wdl"
            }],
            comment: "single quoted string"
        }]
    }
    
    this.normalizeRules();
};

WDLHighlightRules.metaData = {
    author: "Andrew Teixeira <teixeira@broadinstitute.org>",
    fileTypes: ["wdl"],
    name: "WDL",
    scopeName: "source.wdl"
}


oop.inherits(WDLHighlightRules, TextHighlightRules);

exports.WDLHighlightRules = WDLHighlightRules;
});
