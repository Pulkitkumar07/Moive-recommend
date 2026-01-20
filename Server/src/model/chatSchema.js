import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  userId: { type: String, required: true },       
  userPrompt: { type: String, required: true },
  aiResponse: { type: Object, required: true },   
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Chat", chatSchema);
