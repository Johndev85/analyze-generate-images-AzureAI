const analyzeImage = async (image) => {
  const params = ["objects", "caption", "tags", "denseCaptions", "read"]
  const isProduction = process.env.NODE_ENV === "Production"
  const visionEndpoint = isProduction
    ? process.env.VISION_ENDPOINT
    : import.meta.env.VITE_VISION_ENDPOINT
  const visionKey = isProduction
    ? process.env.VISION_KEY
    : import.meta.env.VITE_VISION_KEY

  try {
    const response = await fetch(
      `${visionEndpoint}/computervision/imageanalysis:analyze?api-version=2023-04-01-preview&features=${params}&language=en`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Ocp-Apim-Subscription-Key": `${visionKey}`,
        },
        body: JSON.stringify({
          url: image,
        }),
      }
    )
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const responseJson = await response.json()
    return responseJson
  } catch (error) {
    console.error("Network error:", error)
    throw error
  }
}

export default analyzeImage
