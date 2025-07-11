(function (Prism) {
    let multilineComment = /\/\*(?:[^*/]|\*(?!\/)|\/(?!\*)|<self>)*\*\//.source;
    for (let i = 0; i < 4; i++) {
        multilineComment = multilineComment.replace(/<self>/g, multilineComment);
    }
    multilineComment = multilineComment.replace(/<self>/g, /[^\s\S]/.source);

    Prism.languages.osta = {
        'comment': [
            {
                pattern: RegExp(/(^|[^\\])/.source + multilineComment),
                lookbehind: true,
                greedy: true
            },
            {
                pattern: /(^|[^\\:])\/\/.*/,
                lookbehind: true,
                greedy: true
            }
        ],
        'string': {
            pattern: /b?"(?:\\[\s\S]|[^\\"])*"|b?r(#*)"(?:[^"]|"(?!\1))*"\1/,
            greedy: true
        },
        'char': {
            pattern: /b?'(?:\\(?:x[0-7][\da-fA-F]|u\{(?:[\da-fA-F]_*){1,6}\}|.)|[^\\\r\n\t'])'/,
            greedy: true
        },
        'type-def': {
            pattern: /(\b(?:struct|variant|enum|union)\s+)\w+/,
            lookbehind: true,
            alias: 'class-name'
        },
        'impl-block': {
            pattern: /(\bimpl\s+)\w+/,
            lookbehind: true,
            alias: 'class-name'
        },
        'func-def': {
            pattern: /(\bfn\s+)\w+/,
            lookbehind: true,
            alias: 'function'
        },
        'comptime-func-def': {
            pattern: /(\bfn\s+)#\w+/,
            lookbehind: true,
            alias: ['function', 'comptime']
        },
        'keyword': [
            /\b(?:struct|variant|enum|union|fn|impl)\b/,
            /\b(?:bool|f(?:32|64)|[ui](?:(\d*[1-9]\d*)|size)|type)\b/,
            /\b(?:pub|use|mod|const|static|let)\b/,
        ],
        'number': [
            /\b[+-]?(?:\d+|0b[01]+|0o[0-7]+|0x[0-9a-f]+)(?:[ui](?:(\d*[1-9]\d*)|size))?/i,
            /\b[+-]?\d+\.\d+(?:f32|f64)?/
        ],
    };

    Prism.languages.insertBefore("osta", "keyword", {
        'func-call': {
            pattern: /\b\w+(?=\()/,
            alias: 'function'
        },
        'comptime-identifier': {
            pattern: /#\w+/,
            alias: ['variable', 'comptime'],
        },
    });

    Prism.languages.insertBefore("osta", "func-call", {
        'comptime-func-call': {
            pattern: /#\w+(?=\()/,
            alias: ['function', 'comptime']
        }
    })
}(Prism));