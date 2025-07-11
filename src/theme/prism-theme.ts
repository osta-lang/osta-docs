import type {PrismTheme, PrismThemeEntry} from "prism-react-renderer";
import { themes } from "prism-react-renderer";

export const theme: PrismTheme = themes.github;

export const dark: PrismTheme = edit(
    themes.dracula,
    identity,
    styles => {
        let arr = [...styles];
        arr.push({
            types: ["number"],
            style: {
                color: get(themes.palenight, "number", "color")
            }
        }, {
            types: ["comptime"],
            style: {
                fontStyle: "italic"
            }
        });
        return arr;
    }
);

function edit(
    base: PrismTheme,
    plain: (entry: PrismThemeEntry) => PrismThemeEntry = identity,
    styles: (styles: PrismTheme['styles']) => PrismTheme['styles'] = identity
): PrismTheme {
    let theme = structuredClone(base);
    theme.plain = plain(theme.plain);
    theme.styles = styles(theme.styles);
    return theme;
}

function get<K extends keyof PrismThemeEntry>(
    theme: PrismTheme,
    type: string,
    key: K
) {
    const entry = theme.styles.find(style => style.types.includes(type));
    if (entry) {
        return entry.style[key];
    }
    return theme.plain[key];
}

function identity<T>(x: T): T {
    return x;
}
