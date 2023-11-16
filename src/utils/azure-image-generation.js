// export const isConfigured = () => {
//   return !!import.meta.env.VITE_OPENAI_KEY
// }

const generateImage = async (text) => {
  const openIAKey = import.meta.env.VITE_OPENAI_KEY
  const response = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${openIAKey}`,
    },
    body: JSON.stringify({
      model: "dall-e-2",
      prompt: `${text}`,
      n: 1,
      size: "1024x1024",
      quality: "standard",
      response_format: "url",
    }),
  })

  if (!response.ok) {
    const data = await response.json()
    throw new Error(`HTTP Error ${response.status}: ${data.error.message}`)
  }

  const data = await response.json()
  const image = data.data[0].url

  return image
}

export default generateImage
