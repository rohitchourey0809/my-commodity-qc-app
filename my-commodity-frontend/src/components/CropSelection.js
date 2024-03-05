// // components/CropSelection.js
// import React from "react";

// const CropSelection = () => {
//   return (
//     <div>
//       <h2>Crop Selection</h2>
//       <div>
//         <label>Select Crop:</label>
//         {/* Implement a dropdown or radio buttons for crop selection */}
//         <select onChange={(e) => handleCropSelection(e.target.value)}>
//           <option value="crop1">Crop 1</option>
//           <option value="crop2">Crop 2</option>
//           {/* Add more crop options as needed */}
//         </select>
//       </div>
//       {/* Add your crop selection UI here */}
//     </div>
//   );
// };

// export default CropSelection;

"use client";

import React, { useState, useRef } from 'react';

const CropSelection = () => {
  const [selectedCrop, setSelectedCrop] = useState("");
  const [imageData, setImageData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [reportData, setReportData] = useState(null);

  const fileInputRef = useRef(null);

  const handleCropSelection = (crop) => {
    setSelectedCrop(crop);
  };

  const handleImageCapture = () => {
    const fileInput = fileInputRef.current;
    console.log("fileinput", fileInput);

    if (fileInput && fileInput.files.length > 0) {
      const imageFile = fileInput.files[0];
      const reader = new FileReader();

      reader.onload = (event) => {
        const dataURL = event.target.result;
        console.log("dataURL------->", dataURL);
        setImageData(dataURL);

        // Perform the API call to send image data to the backend for analysis
        sendImageToBackend(dataURL);
      };

      reader.readAsDataURL(imageFile);
    }
  };

  const sendImageToBackend = async (imageData) => {
    try {
      setLoading(true);

      // Make an API call to send the image data to the backend for analysis
      const response = await fetch("/api/analyzeImage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ imageData, selectedCrop }),
      });

      const report = await response.json();
      console.log("report-------->", report);

      setReportData(report);
    } catch (error) {
      console.error("Error sending image to backend:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Commodity Digital QC</h1>
      <div>
        <label>Select Crop:</label>
        {/* Implement a dropdown or radio buttons for crop selection */}
        <select onChange={(e) => handleCropSelection(e.target.value)}>
          <option value="crop1">Crop 1</option>
          <option value="crop2">Crop 2</option>
          {/* Add more crop options as needed */}
        </select>
      </div>
      <div>
        <label>Capture Image:</label>
        <input type="file" accept="image/*" ref={fileInputRef} />
        <button onClick={handleImageCapture}>Capture</button>
      </div>
      {loading && <div>Loading...</div>}
      {imageData && <img src={imageData} alt="Captured Image" />}
      {reportData && (
        <div>
          <h2>Generated Report:</h2>
          {/* Display report data, including the original image embedded in a PDF */}
          <pre>{JSON.stringify(reportData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default CropSelection;

