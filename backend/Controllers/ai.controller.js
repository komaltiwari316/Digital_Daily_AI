const aiServices = require("../services/ai.services");

module.exports.getdata = async (req, res) => {
    console.log('Request body:', req.body);  // Add this for debugging

    const text = req.body.text;
    if (!text) {
        return res.status(400).json({ error: "Text is required" });
    }

    try {
        const newdata = await aiServices.digitaldailyinst(text);
        res.json({ newdata });  
    } catch (err) {
        console.error('Summarization error:', err);
        res.status(500).send("Internal Server Error");
    }
};
