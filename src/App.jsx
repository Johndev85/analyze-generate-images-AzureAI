import React, { useState } from "react"
import computerVisionLogo from "./assets/computer-vision-icon.jpeg"
import "./App.css"

import { isConfigured as isImageGenerationConfigured } from "./utils/azure-image-generation"
import { isConfigured as isImageAnalysisConfigured } from "./utils/azure-image-analysis"
import ImageApp from "./components/ImageApp/ImageApp"

function App() {
  const isConfigured =
    isImageGenerationConfigured() && isImageAnalysisConfigured()

  return (
    <main>
      {!isConfigured && (
        <div>
          La aplicación no está configurada correctamente. Por favor, verifica
          las variables de entorno.
        </div>
      )}
      {isConfigured && (
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
      )}
    </main>
  )
}

export default App
