import React, { useEffect, useRef, useState } from "react";
import {
  CameraOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import AspectRatioSelector from "./AspectRatioSelector";
import "./style.css";

export const Camera = ({ images, onCapture }) => {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [cameraType, setCameraType] = useState("user");
  const [aspectRatio, setAspectRatio] = useState(16 / 9);
  const videoRef = useRef(null); //Store Video refrence
  const containerRef = useRef(null); //Store Camera Container Reference
  const streamRef = useRef(null); // Store stream reference
  const navigate = useNavigate();

  // Initialize camera
  useEffect(() => {
    const constraints = {
      video: {
        facingMode: cameraType, // 'user' for front camera, 'environment' for back camera
        width: { ideal: 680 },
        height: { ideal: 680 / aspectRatio },
      },
    };

    const initCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Error accessing camera: ", err);
      }
    };

    initCamera();

    // Cleanup when component is unmounted or camera type changes
    return () => {
      if (streamRef.current) {
        const tracks = streamRef.current.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, [cameraType, aspectRatio]);

  // Apply zoom level
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.style.transform = `scale(${zoomLevel})`;
    }
  }, [zoomLevel]);

  // Adjust video aspect ratio when it changes
  useEffect(() => {
    const video = videoRef.current;
    if (video && containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      const height = containerWidth / aspectRatio;
      video.style.width = `${containerWidth}px`;
      video.style.height = `${height}px`;
    }
  }, [aspectRatio]);

  // Capture image function
  const captureImage = () => {
    if (videoRef.current) {
      const video = videoRef.current;
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      const containerWidth = containerRef.current.offsetWidth;
      const width = containerWidth;
      const height = width / aspectRatio;

      canvas.width = width;
      canvas.height = height;

      context.drawImage(video, 0, 0, width, height);
      const dataUrl = canvas.toDataURL("image/jpeg");
      onCapture(dataUrl); // Pass captured image data to parent
    }
  };


  const handleImageClick = () => {
    // Stop the camera immediately before navigating to the gallery
    if (streamRef.current) {
      const tracks = streamRef.current.getTracks();
      tracks.forEach((track) => track.stop()); // Stop all media tracks
    }
    navigate("/gallery"); // Navigate to the gallery page
  };

  return (
    <div
      className="camera-container"
      ref={containerRef}
      style={{ position: "relative" }}
    >
      <video
        ref={videoRef}
        autoPlay
        width="100%"
        height="100%"
        style={{ objectFit: "cover" }}
      />
      <div className="controls-buttons" style={{bottom: `${aspectRatio == 1? '7rem': '0rem'}`}}>
        <div>
          <button
            onClick={() => setZoomLevel((prev) => Math.min(3, prev + 0.5))}
            className="circle-button"
          >
            <ZoomInOutlined className="icon" />
          </button>
          <button
            style={{ padding: "1rem" }}
            onClick={captureImage}
            className="circle-button"
          >
            <CameraOutlined />
          </button>
          <button
            onClick={() => setZoomLevel((prev) => Math.max(1, prev - 0.5))}
            className="circle-button"
          >
            <ZoomOutOutlined />
          </button>
          <button
            className="button"
            style={{ right: "6rem" }}
            onClick={() =>
              setCameraType(
                cameraType === "environment" ? "user" : "environment"
              )
            }
          >
            Toggle Camera
          </button>
        </div>
        <div>
          <AspectRatioSelector onAspectRatioChange={setAspectRatio} />
        </div>
      </div>

      {images.length > 0 && (
        <div className="img-folder">
          <img
            src={images[images.length - 1]}
            alt="captured-img"
            onClick={handleImageClick} //Stop camera and navigate to Gallery
          />
        </div>
      )}
    </div>
  );
};
