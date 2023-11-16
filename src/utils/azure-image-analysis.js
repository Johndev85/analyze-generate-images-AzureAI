// export const isConfigured = () => {
//   return (
//     !!import.meta.env.VITE_VISION_ENDPOINT && !!import.meta.env.VITE_VISION_KEY
//   )
// }

const analyzeImage = async (dataImage) => {
  const params = ["objects", "caption", "tags", "denseCaptions", "read"]

  const visionEndpoint = import.meta.env.VITE_VISION_ENDPOINT
  const visionKey = import.meta.env.VISION_KEY

  try {
    const response = await fetch(
      `${visionEndpoint}/computervision/imageanalysis:analyze?api-version=2023-04-01-preview&features=${params}&language=en`,
      {
        method: "POST",
        headers: {
          "Content-Type":
            dataImage.type === "file"
              ? "application/octet-stream"
              : "application/json",
          "Ocp-Apim-Subscription-Key": `${visionKey}`,
        },
        body:
          dataImage.type === "file"
            ? dataImage.image
            : JSON.stringify({
                url: dataImage.image,
              }),
      }
    )
    if (!response.ok) {
      const data = await response.json()
      throw new Error(`HTTP Error ${response.status}: ${data.error.message}`)
    }
    const responseJson = await response.json()
    return responseJson
  } catch (error) {
    console.error("Network error:", error)
    throw error
  }
}

export default analyzeImage
