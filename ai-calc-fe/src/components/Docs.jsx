import React from "react";
import "../documentation.css";
import htmlLogo from "../assets/html.svg";
import cssLogo from "../assets/css.svg";
import jsLogo from "../assets/js.svg";
import reactjsLogo from "../assets/reactjs.svg";
import nodejsLogo from "../assets/nodejs.svg";
import canvasLogo from "../assets/canvas.svg";
import geminiLogo from "../assets/gemini.svg";

const Docs = () => {
  return (
    <main className="docs-container">
      <section className="intro">
        <h1>Documentation</h1>
        <p>
          Welcome to the documentation! This page will give you an introduction
          to how this AI Powered Calculator was developed.
        </p>
        <div>
          <h2>You will learn</h2>
          <ul>
            <li>Introduction </li>
            <li>Tech Stack</li>
            <li>How It Works (Step-by-Step)</li>
            <li>Features</li>
            <li>Challenges & Limitations</li>
          </ul>
        </div>
      </section>

      <section className="introduction">
        <h1>1. Introduction</h1>
        <p>
          <span>Overview: </span>
          The AI Calculator is an web-based tool that allows users to solve
          mathematical problems by drawing equations on a canvas. Instead of
          manually typing equations, users can write them naturally or upload
          images from their devices, and the AI interprets and solves them
          instantly.
        </p>
        <p>
          <span>Purpose: </span> This project was created to make solving
          mathematical problems more intuitive. By allowing users to draw
          equations instead of typing them, it provides a seamless and natural
          way to interact with AI for quick and accurate calculations.
        </p>
      </section>

      <section className="tech-stack">
        <h1>2. Tech Stack</h1>
        <div>
          <h2>Front End Technology</h2>
          <div>
            <img src={htmlLogo} alt="html" />
            <div className="description">
              <h3>HTML</h3>
              <p>Basic structure of a website</p>
            </div>
          </div>

          <div>
            <img src={cssLogo} alt="css" />
            <div className="description">
              <h3>CSS</h3>
              <p>For styling and UI/UX</p>
            </div>
          </div>

          <div>
            <img src={reactjsLogo} alt="react" />
            <div className="description">
              <h3>React.js</h3>
              <p>For frontend logic building</p>
            </div>
          </div>

          <div>
            <img src={canvasLogo} alt="canvas" />
            <div className="description">
              <h3>HTML5 Canvas</h3>
              <p>To draw the problems & equations</p>
            </div>
          </div>
        </div>

        <div>
          <h2>Server Side Technology</h2>
          <div>
            <img src={nodejsLogo} alt="node" />
            <div className="description">
              <h3>Node.js</h3>
              <p>Bridge between Frontend and Gemini API</p>
            </div>
          </div>

          <div>
            <img src={jsLogo} alt="js" />
            <div className="description">
              <h3>JS</h3>
              <p>The core language of React and Node</p>
            </div>
          </div>

          <div>
            <img src={geminiLogo} alt="gemini" />
            <div className="description">
              <h3>Gemini API</h3>
              <p>AI engine to solve the problems</p>
            </div>
          </div>
        </div>
      </section>

      <section className="working">
        <h1>3. How It Works</h1>
        <div>
          <div>
            <h2>🔹 User Input</h2>
            <ul>
              <li>Users draw mathematical equations on an HTML Canvas.</li>
              <li>The drawing is converted into a base64 image.</li>
            </ul>
          </div>
          <div>
            <h2>🔹 Server Side Processing</h2>
            <ul>
              <li>The base64 image is sent to the Node.js server.</li>
              <li>
                The server formats the request and sends the image along with a
                prompt to Gemini.
              </li>
            </ul>
          </div>
          <div>
            <h2>🔹 AI Calculation</h2>
            <ul>
              <li>Gemini API analyzes the image and solves the equation.</li>
              <li>It returns the solution as a LaTeX-formatted string.</li>
            </ul>
          </div>
          <div>
            <h2>🔹 Displaying the result</h2>
            <ul>
              <li>The frontend renders the LaTeX string using KaTeX.</li>
              <li>
                The result is displayed in a standard, clear and readable
                format.
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="features">
        <h1>4. Features</h1>
        <ul>
          <li>
            <span>Hand Written Input: </span>Users can draw equations instead of
            typing.
          </li>
          <li>
            <span>Image Input: </span>Users can add images to the canvas.
          </li>
          <li>
            <span>Real Time Processing: </span>Answers appear almost instantly
            after drawing.
          </li>
          <li>
            <span>LaTeX Support: </span>Displays answers in clean, formatted
            math notation.
          </li>
          <li>
            <span>Editing & Eraser Tool:</span>Users can edit their input before
            submitting.
          </li>
        </ul>
      </section>

      <section className="improvements">
        <h1>5. Improvements</h1>
        <ul>
          <li>
            <span>Handwriting Recognition: </span>Instead of relying on images,
            the AI will recognize handwritten text in real-time, converting it
            directly into editable equations.{" "}
          </li>
          <li>
            <span>Step-by-Step Solution: </span>Currently, the AI provides only
            the final answer. It would be better include a detailed step-by-step
            breakdown along with explanation of the solution.
          </li>
          <li>
            <span>Voice Input: </span>Users will be able to speak their
            equations, and the AI will convert them into written form and solve
            them.
          </li>
          <li>
            <span>Enhanced UI: </span> Users will have a more advanced math
            editor with tools like shapes, fractions, exponents and matrices,
            making it easier to modify or refine their equations before
            submitting them.
          </li>
        </ul>
      </section>
    </main>
  );
};

export default Docs;
