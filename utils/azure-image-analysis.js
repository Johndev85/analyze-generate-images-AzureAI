const analyzeImage = async (image) => {
  const params = ["objects", "caption", "tags", "denseCaptions", "read"]

  try {
    const response = await fetch(
      `${
        import.meta.env.VITE_VISION_ENDPOINT
      }/computervision/imageanalysis:analyze?api-version=2023-04-01-preview&features=${params}&language=en`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Ocp-Apim-Subscription-Key": `${import.meta.env.VITE_VISION_KEY}`,
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
