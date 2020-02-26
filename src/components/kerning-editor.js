import React, { useRef } from "react"
import "./kerning-editor.css"

const KerningEditor = () => {
  const textareaRef = useRef()
  const spaceChar = `\u180e\u180e\u180e\u180e`; // mongolian seperator
  //const spaceChar = `\u200A\u200D`
  console.log('spaceChar', spaceChar, spaceChar.length)
  const handleKeyPress = e => {
    console.log(e.key);

    const cursorPosition = textareaRef.current.selectionStart
    const currVal = textareaRef.current.value

    console.log("cursor", cursorPosition)
    if (e.key === "." && e.getModifierState("Control")) {
      // increase spacing
      console.log("Control-right")
      const newVal = `${currVal.substring(
        0,
        cursorPosition
      )}${spaceChar}${currVal.substring(cursorPosition)}`
      textareaRef.current.value = newVal
      textareaRef.current.selectionStart = cursorPosition
      textareaRef.current.selectionEnd = cursorPosition
    } else if (e.key === "," && e.getModifierState("Control")) {
      // reduce spacing
      console.log("Control-left", currVal.substr(cursorPosition-spaceChar.length, spaceChar.length))
      if (currVal.substr(cursorPosition, spaceChar.length) === spaceChar) {
        // remove kerning spaces right of cursor
        const newVal = `${currVal.substring(
          0,
          cursorPosition
        )}${currVal.substring(cursorPosition + spaceChar.length)}`
        textareaRef.current.value = newVal
        textareaRef.current.selectionStart = cursorPosition
        textareaRef.current.selectionEnd = cursorPosition
      } else if (currVal.substr(cursorPosition - spaceChar.length, spaceChar.length) === spaceChar) {
        // remove kerning spaces left of cursor
        const newVal = `${currVal.substring(
          0,
          cursorPosition - spaceChar.length
        )}${currVal.substring(cursorPosition)}`
        textareaRef.current.value = newVal
        textareaRef.current.selectionStart = cursorPosition - spaceChar.length
        textareaRef.current.selectionEnd = cursorPosition - spaceChar.length
      }
    } else if(e.key ===  'ArrowLeft' ) {
      // navigate left, skipping over space chars
      // while (currVal.substr()) {}
    }
  }

  return (
    <div className="kerning-editor">
      <textarea
        ref={textareaRef}
        className="kerning-editor__textarea"
        onKeyUp={e => handleKeyPress(e)}
        value="T᠎᠎᠎᠎᠎᠎᠎᠎᠎᠎᠎᠎᠎᠎᠎᠎᠎᠎᠎᠎᠎᠎᠎᠎h᠎᠎᠎᠎e qu᠎᠎᠎᠎i᠎᠎᠎᠎c᠎᠎᠎᠎᠎᠎᠎᠎᠎᠎᠎᠎᠎᠎᠎᠎k br᠎᠎᠎᠎ow᠎᠎᠎᠎n f᠎᠎᠎᠎᠎᠎᠎᠎ox jump᠎᠎᠎᠎s o᠎᠎᠎᠎v᠎᠎᠎᠎e᠎᠎᠎᠎᠎᠎᠎᠎r t᠎᠎᠎᠎᠎᠎᠎᠎᠎᠎᠎᠎᠎᠎᠎᠎᠎᠎᠎᠎᠎᠎᠎᠎he la᠎᠎᠎᠎z᠎᠎᠎᠎᠎᠎᠎᠎᠎᠎᠎᠎y d᠎᠎᠎᠎og."
      >
        
      </textarea>
    </div>
  )
}

export default KerningEditor
