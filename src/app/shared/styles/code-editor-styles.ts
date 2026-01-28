import { tags as t } from '@lezer/highlight';

export const THEME_CODE_EDITOR_DEFAULT = {
    theme: 'dark' as const,
    settings: {
        background: '#280057',
        foreground: '#0cf49b',
        caret: '#0cf49b',
        selection: '#5000b3',
        lineHighlight: '#33006e80',
        gutterBackground: '#33006e',
        gutterForeground: '#5201af',
    },
    styles: [
        {
            tag: t.comment,
            color: '#787b8099',
        },
        {
            tag: t.variableName,
            color: '#ffffff',
        },
        {
            tag: [t.string, t.special(t.brace)],
            color: '#c494ff',
        },
        {
            tag: t.number,
            color: '#ddc2ff',
        },
        {
            tag: t.bool,
            color: '#ca9eff',
        },
        {
            tag: t.null,
            color: '#d8b8ff',
        },
        {
            tag: t.keyword,
            color: '#0cf49b',
        },
        {
            tag: t.operator,
            color: '#0cf49b',
        },
        {
            tag: t.className,
            color: '#0080ff',
        },
        {
            tag: t.definition(t.typeName),
            color: '#ffffff',
        },
        {
            tag: t.typeName,
            color: '#ffffff',
        },
        {
            tag: t.angleBracket,
            color: '#0cf49b',
        },
        {
            tag: t.tagName,
            color: '#0cf49b',
        },
        {
            tag: t.attributeName,
            color: '#0cf49b',
        },
        {
            tag: t.contentSeparator,
            backgroundColor: '#5000b3',
        },
    ],
};