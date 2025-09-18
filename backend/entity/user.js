import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    username: { type: String, required: true },
    BookIssue:{type: mongoose.Schema.Types.ObjectId, ref: "Book"}
    
}, {timestamps: true});

const User = mongoose.model("User",userSchema);

export default User;