import React, { useState, useRef, useEffect } from "react";
import eraser from "../assets/eraser.svg";
import Result from "./Result";
import { sendRequest } from "./sendRequest";
import { defaultPrompt } from "../assets/defaultPrompt";
import "../calculator.css";

const Calculator = () => {
  const colors = ["white", "red", "blue", "green", "yellow", "brown"];

  const [activeColor, setActiveColor] = useState("white");

  const [eraserSize, setEraserSize] = useState(20);

  const [isDrawing, setIsDrawing] = useState(false);

  const [isErasing, setIsErasing] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [mathResponse, setMathResponse] = useState("");

  const [feedback, setFeedback] = useState("");

  const canvasRef = useRef(null);

  const ctxRef = useRef(null);

  const targetRef = useRef(null);

  //====== Updating the size of the canvas ======//
  useEffect(() => {
    const resizeCanvas = () => {
      const canvas = canvasRef.current;
      const parent = canvas.parentElement;
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
    };

    window.addEventListener("resize", resizeCanvas); // resize canvas on resize of screen
    resizeCanvas(); // to set initial dimensions

    const context = canvasRef.current.getContext("2d");
    ctxRef.current = context;

    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

  //====== Functionality of Canvas ======//
  const startDrawing = (e) => {
    setIsDrawing(true);
    ctxRef.current.beginPath(); // start the path for drawing
    draw(e);
  };

  const draw = (e) => {
    if (!isDrawing || !ctxRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctxRef.current.lineWidth = isErasing ? eraserSize : 3;
    ctxRef.current.lineCap = "round";
    ctxRef.current.strokeStyle = isErasing ? "black" : activeColor;
    ctxRef.current.lineTo(x, y);
    ctxRef.current.stroke();
    ctxRef.current.moveTo(x, y);
  };

  const stopDrawing = (e) => {
    setIsDrawing(false);
    ctxRef.current.beginPath(); // reset the path for new stroke
  };

  const resetCanvas = () => {
    ctxRef.current.clearRect(
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );
    setIsLoading(false);
    setIsDrawing(false);
    setIsErasing(false);
    setMathResponse("");
    setActiveColor("white");
    setFeedback("");
  };

  const updateCursorPosition = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
  };

  const handleUpload = (e) => {
    const uploader = document.querySelector(".uploader");
    const file = uploader.files[0];
    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => {
      console.log("Uploaded");
      ctxRef.current.drawImage(img, 20, 20);
    };
    uploader.value = "";
  };

  //======== Sending API Request =========//
  const handleRunClick = () => {
    scrollToAnswer();
    setIsLoading(true);
    sendRequest(
      canvasRef.current,
      defaultPrompt,
      feedback,
      setMathResponse,
      setIsLoading
    );
    console.log(mathResponse);
  };

  const getFeedback = (feedback) => {
    setMathResponse("");
    setFeedback(`Feedback: ${feedback}`);
    handleRunClick(); //taking feedback and again sending a request
  };

  function scrollToAnswer() {
    if (targetRef.current) {
      targetRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  return (
    <main className="calculator">
      {/* Control panel to change colours, to clear and to run */}
      <div className="controlPanel">
        <button className="reset" onClick={resetCanvas}>
          Reset
        </button>
        <div className="colorSelector">
          {colors.map((color) => (
            <div
              key={colors.indexOf(color)}
              className={`${
                activeColor === color ? "active color " : "color "
              }`}
              style={{ background: `${color}` }}
              onClick={() => {
                setActiveColor(color);
              }}
            ></div>
          ))}

          {/*===== Eraser =====*/}
          <div
            className={`${
              activeColor === "eraser" ? " eraser active" : "eraser"
            }`}
            onClick={() => {
              setActiveColor("eraser");
              setIsErasing(true);
            }}
          >
            <img src={eraser} alt="eraser" />
            <label htmlFor="eraserSize"> Eraser Size: </label>
            <input
              type="range"
              min={3}
              max={10}
              id="eraserSize"
              value={eraserSize}
              onChange={(e) => setEraserSize(e.target.value)}
            />
          </div>
        </div>

        <div className="fileUploader">
          <input
            type="file"
            className="uploader"
            onChange={(e) => handleUpload(e)}
          />
        </div>

        <button className="run" onClick={handleRunClick}>
          Run
        </button>
      </div>

      {/* ====== Main Canvas to Draw ======*/}
      <div className="canvas-container">
        <canvas
          ref={canvasRef}
          onMouseDown={(e) => {
            startDrawing(e);
          }}
          onMouseUp={(e) => {
            stopDrawing();
          }}
          onMouseMove={(e) => {
            draw(e);
            updateCursorPosition(e);
          }}
          onMouseOut={(e) => {
            stopDrawing(e);
          }}
          style={{
            border: "5px solid white",
            borderRadius: "5px",
          }}
        ></canvas>
      </div>

      {/*=========== Result Display Section =========== */}
      <span ref={targetRef} style={{ scrollMargin: "70px" }}></span>
      <Result
        latexString={mathResponse}
        isLoading={isLoading}
        getFeedback={getFeedback}
      />
    </main>
  );
};

export default Calculator;
