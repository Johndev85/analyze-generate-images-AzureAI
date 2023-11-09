import React, { useState } from "react"
import reactLogo from "./assets/react.svg"
import "./App.css"

import { isConfigured as isImageGenerationConfigured } from "./utils/azure-image-generation"
import { isConfigured as isImageAnalysisConfigured } from "./utils/azure-image-analysis"
import ImageApp from "./components/ImageApp/ImageApp"

function App() {
  const isConfigured =
    isImageGenerationConfigured() && isImageAnalysisConfigured()

  return (
    <>
      {!isConfigured && (
        <div>
          La aplicación no está configurada correctamente. Por favor, verifica
          las variables de entorno.
        </div>
      )}
      {isConfigured && (
        <>
          <div>
            <img src={reactLogo} className="logo react" alt="React logo" />
          </div>
          <ImageApp />
        </>
      )}
    </>
  )
}

export default App
