import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import KerningEditor from "../components/kerning-editor"

const IndexPage = () => (
  <Layout>
    <SEO title="Unicode Type Kerning" />
    <KerningEditor />
    <div className="about">
      <h2>Experimental Unicode Type Kerning</h2>
      <h3 className="about__title">How to Use</h3>
      <p>
        Set the cursor between the letters you want to kern. Use the keys{" "}
        <code>ctrl</code>-<code>.</code> &nbsp;to increase kerning. Use{" "}
        <code>ctrl</code>-<code>,</code> &nbsp;to decrease it.
      </p>
      <h3 className="about__title">How it works</h3>
      <p>
        Kerning is achieved through the unique typographic characteristics of
        the U+180E "Mongolian Vowel Separator" (MVS) character. Unlike other
        white-space glyphs, U+180E has no intrinsic width and unlike other
        Zero-Space Non/Joiner characters, it does adopt typographic css
        properties. The result is a variable-width space that is equal to the
        value of the letter-spacing css property. Additionally, it is a
        non-breaking character and will not result in line-wrapping.
      </p>
      <p>
        It probably has the added benefit of destroying SEO since some string
        parsers do not correctly interpret word-breaks bounded by U+180E. For
        instance, Chrome's Find tool correctly ignores the character for in-page
        searches, while Firefox does not match words that contain the hidden
        glyph.
      </p>

      <h3 className="about__title">Why?</h3>
      <p>
        Text set using this technique can / may / has a chance of working across
        different environments. ie. The same text should, in theory, retain its
        kerning in Html, rich text, or page-layout software and doesn't require
        any markup language. In the past, most web kerning solutions have used a
        combination of JS, CSS, and many `span` elements. This approach just
        uses lots of Unicode characters and may be a lighter-weight and easier
        to parse approach for large bodies of text.
      </p>
      <h3>Limitations</h3>
      <p>
        This proof-of-concept currently only supports positive kerning. However,
        by using a negative letter-spacing value, negative kerning is possible.
        Future updates may implement a combination of U+180E in combination with
        a positive white-space glyph such as U+202F to enable both positive and
        negative type kerning.
      </p>
    </div>
  </Layout>
)

export default IndexPage
