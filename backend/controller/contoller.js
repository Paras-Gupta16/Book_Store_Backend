import User from "../entity/user.js";

export const getApi = async(req, res) => {
    try{
        const data = await User.find();
        res.status(200).json(data);
    }catch(err){
        res.status(500).send("Error fetching data" + err.message);
    }
};


export const dataCollection = async(req, res) => {
    try{
    const { id, username } = req.body;
    const user = new User({id,username});
    await user.save();
    res.status(201).send("User Saved!");}
    catch(err){
        res.status(500).send("Error saving user" + err.message);
    }
};

export const searchUser = async(req,res)=>{
    try{
        const {id} = req.params;
        const user = await User.findOne({id:id});
        if(user){
            res.status(200).json(user);
        }else{
            res.status(404).send("User not found");
        }
    }
    catch(err){
        res.status(500).send("Error searching user" + err.message);
    }
};

export const deleteUser = async(req,res)=>{
    try{
        const {id} = req.params;
        const user = await User.findOne({id:id});
        if(user){
            await user.deleteOne();
            res.status(200).send("User deleted");
        }else{
            res.status(400).send("User not exist");
        }
    }
    catch(err){
        res.send("Error"+err);
    }
};

export const updateUser = async(req,res)=>{
    try{
        const {id,username} = req.body;
        if(username!=null&&id!=null){
            const user = await User.findOne({
                id:id
            });
            if(user){
                user.username = username;
                res.status(200).send("User updated");
                await user.save();
            }
        }
    }catch(err){
        res.send("Error"+err).status(400);
    }
}   
