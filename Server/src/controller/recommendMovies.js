import { aiResponse } from '../service/aiResponse.js';
import chatSchema from '../model/chatSchema.js';

const recommendMovies = async (req, res) => {
    const { userPrompt, userId } = req.body;

    console.log(userPrompt);

    if (!userPrompt) {
        return res.status(400).json({
            message: "Prompt is required"
        });
    }
    try {
        const aiRes = await aiResponse(userPrompt);
        console.log(aiRes);
        const chat = new chatSchema({
            userId,
            userPrompt,
            aiResponse: aiRes
        });
        await chat.save();
        return res.status(200).json({
            message: "Movies recommended successfully",
            data: aiRes
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Something went wrong",
            error: error.message
        });
    }
};

export default recommendMovies;
