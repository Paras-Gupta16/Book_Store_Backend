import Book from '../entity/book.js';
import User from '../entity/user.js';

export const registerBook = async(req,res)=>{
    try{
        const { id, bookName, authorName, available} = req.body;
        const book = new Book({id, bookName, authorName, available});
        await book.save();
        res.status(201).send("Book Registered!");
    }catch(err){
        res.status(500).send("Error registering book" + err.message);
    }
}

export const getBooks = async(req,res)=>{
    try{
        const getBooks = await Book.find();
        res.status(200).json(getBooks);
    }catch(err){
        res.status(500).send("Error fetching books" + err.message);
    }
}

export const issueBook = async(req,res)=>{
    try{
        const {userId, bookId} = req.body;
        const findBook = await Book.findOne({id:bookId});
        if(findBook && findBook.available){
            findBook.available = false;
            await findBook.save();
            const user = await User.findOne({id:userId});
            if(user){
                user.BookIssue = findBook._id;
                await user.save();
                res.status(200).send("Book issued successfully");
            }
            else{
                res.status(404).send("User not found");
            }
        }
        else{
                res.status(200).send("Book issued already to someone else");
            }
        
    }catch(err){
        res.status(500).send("Error issuing book" + err.message);
    }
}

export const returnBook = async(req,res)=>{
    try{
        const {userId, bookId} = req.body;
        const user = await User.findOne({id:userId}).populate('BookIssue');
        if(user&&user.BookIssue&&user.BookIssue.id===bookId){
            const book = await Book.findOne({id:bookId});
            book.available = true;
            await book.save();
            user.BookIssue = null;
            await user.save();
            res.status(200).send("Book returned succesfully");
        }
    }catch(err){
        res.status(500).send("Error returning book" + err.message);
    }
}

export const searchBook = async(req,res)=>{
    try{
        const {id} = req.params;
        if(id!=null){
            const book = await Book.findOne({id:id});
            if(book){
                res.status(200).json(book);
            }else{
                res.send("Book not found");
            }
        }else{
            res.send("Please provide book id");
        }
    }catch(err){
        res.status(500).send("Error searching book" + err.message);
    }
}