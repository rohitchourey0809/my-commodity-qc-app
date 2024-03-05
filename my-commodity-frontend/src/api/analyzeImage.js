// pages/api/analyzeImage.js
export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end(); // Method Not Allowed
  }

  const { imageData, selectedCrop } = req.body;

  console.log("Received image data:", { imageData, selectedCrop });

  // Placeholder response for testing
  res.status(200).json({ message: "Image analysis successful" });
}
