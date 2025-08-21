const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const genAi = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_KEY);

const model = genAi.getGenerativeModel({
    model: 'gemini-1.5-flash',
    systemInstruction: `
        You are a helpful assistant that helps users write digital diary entries, analyze their mood, and provide summaries or motivational quotes. 
        Always be concise and supportive. If the user asks about their mood, analyze the text provided. If they ask for a summary, provide one. 
        If they want a quote, give a short, meaningful quote.
        If they want a thought about something, give them meaningful thought.
        if they want some suggestion, give them.
        If they want a spelling of some word, give them.
        If they want a meaning of some word,give them.
        if user write on digital diarly, give them sentence suggestions.
        if user upload a photos , give them captions and desriptions.
        analyze all digital daily and give them summaries
    `
})

async function digitaldailyinst(prompt){
    try{
        const result=await model.generateContent(prompt);
        const response=await result.response;
        const data=await response.text();
        return data;
    }catch(err){
        console.error('error in data',err);
        throw err;
    }
}

module.exports={digitaldailyinst}