import React, { useState } from "react";
import { Camera } from "./Camera";
import "./style.css";

const Main = ({ images, setImages }) => {
  const [startCamera, setStartCamera] = useState(false);

  const handleCapture = (imageData) => {
    setImages((prevImages) => [...prevImages, imageData]);
  };
  return (
    <div className="main-container">
      {startCamera ? (
        <Camera
          images={images}
          onCapture={handleCapture}
          setStartCamera={setStartCamera}
        />
      ) : (
        <div className="initial-page">
          <h1>Image Capture & Display Application </h1>
          <button className="button" onClick={() => setStartCamera(true)}>
            Start Webcam
          </button>
        </div>
      )}
    </div>
  );
};

export default Main;
