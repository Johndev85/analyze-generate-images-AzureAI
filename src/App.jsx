import React, { useState } from "react"
import reactLogo from "./assets/react.svg"
import "./App.css"

import ImageApp from "./components/ImageApp/ImageApp"

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <img src={reactLogo} className="logo react" alt="React logo" />
      </div>
      <ImageApp />
    </>
  )
}

export default App
