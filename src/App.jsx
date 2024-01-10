import React, { useState } from "react"
import computerVisionLogo from "./assets/computer-vision-icon.jpeg"
import "./App.css"

import ImageApp from "./components/ImageApp/ImageApp"

function App() {
  return (
    <main>
      <>
        <div>
          <img
            src={computerVisionLogo}
            className="logo react"
            alt="React logo"
          />
        </div>
        <ImageApp />
      </>
    </main>
  )
}

export default App
