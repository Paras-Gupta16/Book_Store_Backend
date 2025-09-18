import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    id:{type:Number, required:true, unique:true},
    bookName:{type:String, required:true},
    authorName:{type:String, required:true},
    available:{type:Boolean, required:true, default:true}
});

const Book = mongoose.model("Book",bookSchema);

export default Book;