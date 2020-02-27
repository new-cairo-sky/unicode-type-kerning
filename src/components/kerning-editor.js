import React, { useRef, useState, useEffect } from "react"
import "./kerning-editor.css"

const KerningEditor = () => {
  const textareaRef = useRef()
  const [text, setText] = useState(
    `The Quick Brown Fox Jumped Over the Lazy dog.`
  )
  const [selectionStart, setSelectionStart] = useState(undefined)
  const [selectionEnd, setSelectionEnd] = useState(undefined)

  const spaceChar = `\u180e` // mongolian seperator
  //const spaceChar = `\u200A\u200D`

  const handleKeyPress = e => {
    console.log("keyUp")
    const cursorPosition = textareaRef.current.selectionStart
    const currVal = textareaRef.current.value

    if (e.key === "." && e.getModifierState("Control")) {
      // increase spacing
      const newVal = `${currVal.substring(
        0,
        cursorPosition
      )}${spaceChar}${currVal.substring(cursorPosition)}`

      setText(newVal)
      setSelectionStart(cursorPosition)
      setSelectionEnd(cursorPosition)
    } else if (e.key === "," && e.getModifierState("Control")) {
      // reduce spacing
      if (currVal.substr(cursorPosition, spaceChar.length) === spaceChar) {
        // remove kerning spaces right of cursor
        const newVal = `${currVal.substring(
          0,
          cursorPosition
        )}${currVal.substring(cursorPosition + spaceChar.length)}`

        setText(newVal)
        setSelectionStart(cursorPosition)
        setSelectionEnd(cursorPosition)
      } else if (
        currVal.substr(cursorPosition - spaceChar.length, spaceChar.length) ===
        spaceChar
      ) {
        // remove kerning spaces left of cursor
        const newVal = `${currVal.substring(
          0,
          cursorPosition - spaceChar.length
        )}${currVal.substring(cursorPosition)}`
        setText(newVal)
        setSelectionStart(cursorPosition)
        setSelectionEnd(cursorPosition)
      }
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
        ref={textareaRef}
        className="kerning-editor__textarea"
        onKeyUp={e => handleKeyPress(e)}
        onChange={e => handleChange(e)}
        value={text}
      ></textarea>
    </div>
  )
}

export default KerningEditor
