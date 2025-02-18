import User from "../model/userModel.js";

// create user data

export const create = async (req, res) => {
    try {
        const { fname, lname, email, password } = req.body;

        // Basic validation
        if (!fname || !lname || !email || !password) {
            return res.status(400).json({ msg: "All fields are required." });
        }

        const userData = new User({ fname, lname, email, password });
        const savedData = await userData.save();

        res.status(201).json(savedData); // 201 for created
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// read user data

export const getAll = async (req,res) => {
    try{
        const userData =await User.find();

        if(userData.length === 0){
            return res.status(404).json({msg: " no user data found"});
        }
res.status(200).json(userData);
    }catch(error){
        res.status(500).json({error:error.message});

    }
};

// particular data


export const getOne = async(req,res)=>{
    try{
        const id = req.params.id;

        const userExists = await User.findById(id);

        if(!userExists){
            return res.status(404).json({msg: " no user data found"});
        }
        res.status(200).json(userExists);

    }catch(error){
        res.status(404).json({error:error.message});
    }
};

// update data 

export const update = async (req, res) => {
    try {
        const id = req.params.id;

        // Check if user exists
        const userExists = await User.findById(id);

        if (!userExists) {
            return res.status(404).json({ msg: "No user data found." });
        }

        // Update the user data
        const updatedData = await User.findByIdAndUpdate(id, req.body, { new: true });

        res.status(200).json(updatedData);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

//delete data

export const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;

        // Check if the user exists
        const userExists = await User.findById(id);

        if (!userExists) {
            return res.status(404).json({ msg: "No user data found." });
        }

        // Delete the user data
        await User.findByIdAndDelete(id);

        res.status(200).json({ msg: "User deleted successfully" });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

