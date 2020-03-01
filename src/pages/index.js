import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import KerningEditor from "../components/kerning-editor"
import FullKerningEditor from "../components/full-kerning-editor"

const IndexPage = () => (
  <Layout>
    <SEO title="Unicode Type Kerning" />
    <FullKerningEditor />
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
        Zero-Space Non/Joiner characters, it <em>does</em> adopt typographic css
        properties. The result is a variable-width space that is equal to the
        value of the letter-spacing css property. Additionally, it is a
        non-breaking character and will not result in line-wrapping.
      </p>
      <p>
        By setting the letter-spacing to a negative value, the MVS character can
        reduce the spacing between letters. But to allow for positive kerning,
        the MVS must be used in conjunction with a white space glyph - here the
        U+202F Narrow Non-breaking Space (NNB SP) unicode glyph is used. The
        estimated width of the NNBSP is ~ 1/8th EM. In the demo above, a
        negative kerning unit of 1/40th (.025) EM is employed. In this way a
        single 1/40 positive kerning increment is possible by setting the
        unicode sequence <code> NNBSP MVS MVS MVS MVS</code> or{" "}
        <code>1/8 - 1/40 - 1/40 - 1/40 - 1/40</code> → <code>5/40 - 4/40</code>{" "}
        = <code>1/40EM</code>
      </p>

      <h3 className="about__title">Why?</h3>
      <p>
        Text set using this technique can / may / has a chance of working across
        different environments. ie. The same text should, in theory, retain its
        kerning in Html, rich text, or page-layout software and doesn't require
        any markup language. In the past, most web kerning solutions have used a
        combination of JS, CSS, and lots of <code>span</code> elements. On the
        other hand, this approach just uses a bunch of Unicode characters that
        are usually retained between copy/paste cycles in various contexts.
      </p>
      <h3>Limitations</h3>
      <p>
        This proof-of-concept relies on the text element having a negative
        letter-spacing css value that is equal to the kerning unit you wish to
        use. In other words, it is not possible to increase the overall
        letter-tracking to a value larger than zero.
      </p>
    </div>
  </Layout>
)

export default IndexPage
