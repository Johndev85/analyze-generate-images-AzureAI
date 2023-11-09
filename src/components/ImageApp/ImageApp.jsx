import styles from "./imageApp.module.css"

import React, { useState } from "react"
import analyzeImage from "../../utils/azure-image-analysis.js"
import generateImage from "../../utils/azure-image-generation.js"

function ImageApp() {
  const [imageUrl, setImageUrl] = useState("")
  const [image, setImage] = useState(null)
  const [analysisData, setAnalysisData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [Imagegenerated, setImageGenerated] = useState(null)

  const handleImageAnalysis = async () => {
    if (imageUrl === "") {
      setError("Debe ingresar una URL")
      return
    }
    setError(null)
    setIsLoading(true)
    setImage(imageUrl)
    try {
      const data = await analyzeImage(imageUrl)
      setAnalysisData(data)
      setError(null) // clear any previous error
    } catch (error) {
      console.error("Error", error)
      setError(error.message)
      setAnalysisData(null)
    }
    setIsLoading(false)
  }

  const handleImageGeneration = async () => {
    if (imageUrl === "") {
      setError("Debe ingresar un promt")
      return
    }
    setError(null)
    setIsLoading(true)
    try {
      const image = await generateImage(imageUrl)
      setImageGenerated(image)
    } catch (err) {
      console.error("Error", error)
      setError(err.message)
      setAnalysisData(null)
    }
    setIsLoading(false)
  }

  const DisplayResults = () => {
    return (
      <>
        {analysisData && (
          <section className={styles.results}>
            <h2>Results:</h2>
            <img src={image} alt="Analyzed image" />
            <h2>{analysisData.captionResult.text}</h2>
            <div className={styles.tags}>
              <h3>tags:</h3>
              <ul>
                {analysisData.tagsResult.values.map((tag, index, array) => (
                  <li key={tag.name}>
                    {tag.name}
                    {index < array.length - 1 ? "," : ""}
                  </li>
                ))}
              </ul>
            </div>
            <pre>
              <code>{JSON.stringify(analysisData, null, 2)}</code>
            </pre>
          </section>
        )}
        {Imagegenerated && (
          <section className={styles.results}>
            <h2>Results:</h2>
            <img src={Imagegenerated} alt="Generated image" />
          </section>
        )}
      </>
    )
  }

  return (
    <section className={styles.container}>
      <h1>
        Computer Vision <span>by Microsoft Azure</span>{" "}
      </h1>
      <div className={styles.subContainer}>
        <input
          type="text"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="Ingrese una URL o promt text"
        />
        <div className={styles.buttons}>
          <button onClick={handleImageAnalysis}>Analizar Imagen</button>
          <button onClick={handleImageGeneration}>Generar Imagen</button>
        </div>
      </div>
      {error && <div className={styles.errorMessage}>{error}</div>}
      {isLoading ? <div>Cargando...</div> : <DisplayResults />}
    </section>
  )
}

export default ImageApp
