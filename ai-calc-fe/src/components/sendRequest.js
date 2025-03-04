export const sendRequest = async (
  canvas,
  defaultPrompt,
  feedback,
  setMathResponse,
  setIsLoading
) => {
  setIsLoading(true);
  const imageData = canvas.toDataURL("image/png").split(",")[1]; // getiing canvas drawing in base64 format

  //setting up the request body with the image data to sent to the server
  const requestBody = {
    contents: [
      {
        parts: [
          {
            inlineData: {
              mimeType: "image/png",
              data: imageData,
            },
          },
          {
            text: feedback === "" ? defaultPrompt : defaultPrompt + feedback,
          },
        ],
      },
    ],
  };
  try {
    const options = {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
      },
    };

    //sending the image data and prompt to the server with /gemini endpoint
    const response = await fetch("http://localhost:8000/gemini", options);
    const result = await response.text(); // recieving the reponse returned by the server
    setMathResponse(result);
    setIsLoading(false);
    console.log(result);
  } catch (error) {
    console.log(error);
    setIsLoading(false);
  }
};
