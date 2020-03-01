import React, { useRef, useState, useEffect } from "react"
import "./kerning-editor.css"

const FullKerningEditor = () => {
  const textareaRef = useRef()
  const [text, setText] = useState(
    `T᠎h᠎᠎e ᠎᠎᠎᠎Q᠎᠎u᠎᠎i᠎᠎c᠎k᠎ ᠎᠎᠎B᠎᠎r᠎᠎o᠎᠎᠎w᠎n᠎᠎᠎ ᠎᠎᠎F᠎᠎᠎o᠎᠎᠎x ᠎J᠎᠎᠎᠎u᠎᠎᠎m᠎᠎p᠎᠎e᠎᠎d ᠎᠎᠎᠎᠎O᠎v᠎᠎e᠎᠎r ᠎᠎t᠎h᠎᠎e᠎ ᠎᠎᠎᠎L᠎᠎a᠎zy᠎ ᠎D᠎᠎o᠎g᠎᠎᠎.`
  )
  const [selectionStart, setSelectionStart] = useState(undefined)
  const [selectionEnd, setSelectionEnd] = useState(undefined)

  // Establish the width of the kern character
  // units are in EMs
  // note that the rounding function is necesarry to prevent JS rounding errors in the floor operations
  const positiveKern = Math.round((1 / 8) * 1000) / 1000 // width of the positive kern character: 1/6em
  const negativeKern = Math.round((1 / 40) * 1000) / 1000 // width of the negative kern character (variable based on value of letter-spacing)
  const kernUnit = negativeKern
  const letterSpacing = -1 * kernUnit

  const positiveChar = `\u202F` /* Narrow Non-breaking Space (NNB SP) */
  const negativeChar = `\u180e` /* mongolian seperator */
  const ZWD = `\u200D`

  const regExP = RegExp(`[${positiveChar}?${negativeChar}?]+`, "gu")

  /**
   * Look at the position in the text and get the kerning value
   */
  const getKerning = pos => {
    //const matchAll = text.matchAll(/[\u2006?\u180e?]+/gu)
    const matchAll = text.matchAll(regExP)
    let kerning = 0

    if (matchAll) {
      const matches = Array.from(matchAll)
      console.log("matches", pos, matches)
      matches.forEach(match => {
        console.log("match", match, match[0].length)
        if (match.index <= pos && pos <= match.index + match[0].length) {
          kerning = charsToKerning(match[0])
        }
      })
    }
    return kerning
  }

  const adjustKerning = (pos, amount) => {
    //const matchAll = text.matchAll(/[\u2006?\u180e?]+/gu)
    const matchAll = text.matchAll(regExP)
    let kerning = 0
    let startPos = pos
    let endPos = startPos

    // look for any existing kerning surounding the cursor postion
    if (matchAll) {
      const matches = Array.from(matchAll)
      console.log("matches", pos, matches)
      matches.forEach(match => {
        console.log("match", match, match[0].length)
        if (match.index <= pos && pos <= match.index + match[0].length) {
          kerning = charsToKerning(match[0])
          startPos = match.index
          endPos = startPos + match[0].length
        }
      })
    }

    kerning += amount
    console.log("increaseKerning to", kerning)
    const kerningChars = kerningToChars(kerning)
    const newText = `${text.substring(
      0,
      startPos
    )}${kerningChars}${text.substring(endPos)}`
    setText(newText)
  }

  const kerningToChars = kerning => {
    let kerningString = ""
    if (kerning > 0) {
      const quotient = Math.floor(kerning / positiveKern)
      const remainder = kerning % positiveKern
      let positiveChars = quotient
      let negativeChars = 0
      if (remainder > 0) {
        positiveChars = quotient + 1
        const negativeCharPerPositiveChar = positiveKern / negativeKern

        // a roundin error in this code is resultin in the math.floor === 1 in some cases
        negativeChars =
          negativeCharPerPositiveChar - Math.floor(remainder / negativeKern)
      }

      kerningString = `${positiveChar.repeat(
        positiveChars
      )}${negativeChar.repeat(negativeChars)}`

      console.log("kerningString", positiveChars, negativeChars)
    } else if (kerning < 0) {
      const negativeChars = Math.floor((kerning * -1) / negativeKern)
      kerningString = `${negativeChar.repeat(negativeChars)}`
    }

    return kerningString
  }

  const charsToKerning = kerningString => {
    let kerning = 0
    for (let i = 0; i < kerningString.length; i++) {
      const char = kerningString.substr(i, 1)
      if (char === positiveChar) {
        kerning += positiveKern
      } else if (char === negativeChar) {
        kerning -= negativeKern
      }
    }
    console.log("charsToKerning kerning", kerning)
    return kerning
  }

  const handleKeyPress = e => {
    console.log("keyUp")
    const cursorPosition = textareaRef.current.selectionStart
    const currVal = textareaRef.current.value

    if (e.key === "." && e.getModifierState("Control")) {
      // increase spacing
      const kerning = getKerning(cursorPosition)
      console.log("kerningToChars", kerningToChars(kerning))
      adjustKerning(cursorPosition, kernUnit)
      setSelectionStart(cursorPosition)
      setSelectionEnd(cursorPosition)
    } else if (e.key === "," && e.getModifierState("Control")) {
      // reduce spacing
      adjustKerning(cursorPosition, kernUnit * -1)
      setSelectionStart(cursorPosition)
      setSelectionEnd(cursorPosition)
    } else {
      setSelectionStart(undefined)
      setSelectionEnd(undefined)
    }
  }

  const handleChange = e => {
    // this fires before keyUp event
    console.log("change")
    setText(e.target.value)
  }

  useEffect(() => {
    if (selectionStart) {
      textareaRef.current.selectionStart = selectionStart
    }
    if (selectionEnd) {
      textareaRef.current.selectionEnd = selectionEnd
    }
  })

  return (
    <div className="kerning-editor">
      <textarea
        style={{ letterSpacing: `${letterSpacing}em` }}
        ref={textareaRef}
        className="kerning-editor__textarea"
        onKeyUp={e => handleKeyPress(e)}
        onChange={e => handleChange(e)}
        value={text}
      ></textarea>
    </div>
  )
}

export default FullKerningEditor
