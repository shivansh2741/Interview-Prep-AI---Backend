import { GoogleGenAI } from "@google/genai";
import { questionAnswerPrompt, conceptExplainingPrompt } from "../utils/prompts.js";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY})

export const generateInterviewQuestions = async(req, res) => {
    try{
        const {role, experience, topicsToFocus, numberOfQuestions} = req.body;

        if(!role || !experience || !topicsToFocus || !numberOfQuestions){
            return res.status(400).json({message: "Missing required fields"});
        }

        const prompt = questionAnswerPrompt(role, experience, topicsToFocus, numberOfQuestions);

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt
        });

        let rawText = response.text;
        const cleanedText = rawText.replace(/^```json\s*/, "").replace(/```$/, "").trim();

        const data = JSON.parse(cleanedText)

        res.status(200).json({success: true, data})
    }
    catch (error){
        res.status(500).json({ message: 'Internal Server Error'})
    }
}

export const generateConceptExplanations = async(req, res) => {
    try{
        const {question} = req.body;

        if(!question){
            return res.status(400).json({message: "Missing required field"});
        }

        const prompt = conceptExplainingPrompt(question);

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt
        });

        let rawText = response.text;
        const cleanedText = rawText.replace(/^```json\s*/, "").replace(/```$/, "").trim();

        const data = JSON.parse(cleanedText)

        res.status(200).json({success: true, data})
    }
    catch (error){
        res.status(500).json({ message: 'Internal Server Error'})
    }
}