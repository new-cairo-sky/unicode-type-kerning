# Experimental Unicode Type Kerning

See it live at https://new-cairo-sky.github.io/unicode-type-kerning/

## How to Use

Set the cursor between the letters you want to kern. Use the keys
`ctrl-.` to increase kerning. Use `ctrl-,` to decrease it.

The text may then be copy/pasted directly into your html source without loosing the type-setting.

## How it works

Kerning is achieved through the unique typographic characteristics of
the U+180E "Mongolian Vowel Separator" (MVS) character. Unlike other
white-space glyphs, U+180E has no intrinsic width and unlike other
Zero-Space Non/Joiner characters, it does adopt typographic css
properties. The result is a variable-width space that is equal to the
value of the letter-spacing css property. Additionally, it is a
non-breaking character and will not result in line-wrapping.

It probably has the added benefit of destroying SEO since some string
parsers do not correctly interpret word-breaks bounded by U+180E. For
instance, Chrome's Find tool correctly ignores the character for in-page
searches, while Firefox does not match words that contain the hidden
glyph.

## Why?

Text set using this technique can / may / has a chance of working across
different environments. ie. The same text should, in theory, retain its
kerning in Html, rich text, or page-layout software and doesn't require
any markup language. In the past, most web kerning solutions have used a
combination of JS, CSS, and lots of `span` elements. On the
other hand, this approach just uses a bunch of Unicode characters that
are usually retained between copy/paste cycles in various contexts.

## Limitations
