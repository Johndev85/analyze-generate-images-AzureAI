import styles from "./imageApp.module.css"

import React, { useState, useRef } from "react"
import analyzeImage from "../../utils/azure-image-analysis.js"
import generateImage from "../../utils/azure-image-generation.js"
import Loader from "../Loader/Loader.jsx"

function ImageApp() {
  const [imageUrl, setImageUrl] = useState("")
  const [imageFile, setImageFile] = useState(null)
  const [analysisData, setAnalysisData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [Imagegenerated, setImageGenerated] = useState(null)
  const [imageUrlPreview, setImageUrlPreview] = useState("")
  const [imageFilePreview, setImageFilePreview] = useState("")
  const fileInputRef = useRef()

  const handleImageUpload = (e) => {
    e.preventDefault()
    const file = e.target.files[0]
    const fileType = file["type"]
    const validImageTypes = ["image/gif", "image/jpeg", "image/png"]
    if (validImageTypes.includes(fileType)) {
      setImageFile(file)
      sessionStorage.setItem("imageFile", URL.createObjectURL(file))
      setImageFilePreview(sessionStorage.getItem("imageFile"))
    } else {
      setError("Invalid file type. Please upload an image file.")
    }
  }

  const handleImageAnalysis = async (e) => {
    e.preventDefault()
    if (imageUrl === "" && imageFile === null) {
      setError("Debe ingresar una URL o subir una imagen")
      return
    }

    try {
      let imageToAnalyze
      if (imageUrl !== "") {
        setError(null)
        setIsLoading(true)
        imageToAnalyze = { image: imageUrl, type: "url" }
        sessionStorage.setItem("imageUrl", imageUrl)
        setImageUrlPreview(sessionStorage.getItem("imageUrl"))
        setImageFilePreview(null)
      }

      if (imageFile !== null) {
        setError(null)
        setIsLoading(true)
        imageToAnalyze = { image: imageFile, type: "file" }
        setImageUrlPreview(null)
      }

      const data = await analyzeImage(imageToAnalyze)
      setAnalysisData(data)
      setError(null)
      setImageFile(null)
      setImageUrl("")
      fileInputRef.current.value = ""
    } catch (error) {
      console.error("Error", error)
      setError(error.message)
      setAnalysisData(null)
      setImageFile(null)
      setImageUrl("")
      fileInputRef.current.value = ""
    }
    setIsLoading(false)
  }

  const handleImageGeneration = async (e) => {
    e.preventDefault()
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
            {imageUrlPreview && (
              <img src={imageUrlPreview} alt="Analyzed image" />
            )}
            {imageFilePreview && (
              <img src={imageFilePreview} alt="Analyzed image" />
            )}
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
        Computer Vision <span>by Microsoft Azure</span>
      </h1>
      <form className={styles.subContainer}>
        <input
          type="text"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="Enter an image URL"
        />
        <span>or</span>
        <div>
          <span>Upload an image:</span>
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            onChange={handleImageUpload}
            className={styles.fileInput}
          />
        </div>
        <div className={styles.buttons}>
          <button onClick={handleImageAnalysis}>Analyze Image</button>
          {/* <button onClick={handleImageGeneration}>Generar Imagen</button> */}
        </div>
      </form>
      {error && <div className={styles.errorMessage}>{error}</div>}
      {isLoading ? <Loader /> : <DisplayResults />}
    </section>
  )
}

export default ImageApp
