import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    role: {type: String, required: true},
    experience: {type: String, required: true},
    description: {type: String},
    topicToFocus: {type: String, required: true},
    questions: [{type: mongoose.Schema.Types.ObjectId, ref: "Question"}]
},
{timestamps: true}
)

export default mongoose.model("Session", sessionSchema)