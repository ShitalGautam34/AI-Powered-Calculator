//setting up the server to receive the image data from the frontend
import express from "express";
import cors from "cors";
const PORT = 8000;

const app = express();
app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
  console.log(`App listening on ${PORT}`);
});

import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

//receiveing the image data from frontend with /gemini endpoint
app.post("/gemini", async (req, res) => {
  console.log(req.body);
  const prompt = req.body;
  const result = await model.generateContent(prompt); //sending the image to the Gemini API
  const response = await result.response;
  res.send(response.text()); //sending the Gemini response back to the front end
  console.log(response);
});
