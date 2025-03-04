import React, { useEffect, useState } from "react";
import Latex from "react-latex-next";
import "katex/dist/katex.min.css";
import "../calculator.css";

const Result = ({ latexString, getFeedback }) => {
  latexString
    .replace(/([0-9]+)([A-Za-z])/g, "$1 \\quad \\text{$2}") // Adds space between numbers & text
    .replace(/([a-z])([A-Z])/g, "$1 \\quad $2") // Adds space between words
    .replace(/:/g, " \\quad : \\quad "); // Adds space around colons

  const [feedbackPrompt, setFeedbackPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (latexString === "") {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [latexString]);

  return (
    <div
      style={{
        color: "white",
        border: "5px solid white",
        padding: "10px 15px",
        height: "70rem",
        width: "85vw",
        marginTop: "2rem",
        background: "#ffffff33",
        backdropFilter: "blur(5px)",
      }}
    >
      <p style={{ color: "yellow" }}>
        Note: This AI Calculator is currently under development and may make
        mistakes.
      </p>
      <h1>Answer:</h1>
      <span style={{ fontSize: "2rem" }}>
        {isLoading ? (
          <p>Fetching Data, Please Wait...</p>
        ) : (
          <div>
            <Latex>{`${latexString}`}</Latex>
            <div className="feedback">
              <p>Didn't like the answer?</p>
              <input
                type="text"
                placeholder="Feeback Prompt..."
                value={feedbackPrompt}
                onChange={(e) => {
                  setFeedbackPrompt(e.target.value);
                }}
                className="input_feedback"
              />
              <button
                onClick={() => {
                  setFeedbackPrompt("");
                  getFeedback(feedbackPrompt);
                }}
              >
                Send Feedback
              </button>
            </div>
          </div>
        )}
      </span>
    </div>
  );
};

export default Result;
