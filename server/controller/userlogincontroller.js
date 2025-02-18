import User from "../model/userModel.js"

//login 

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ msg: "User not found!" });
        }

        // Validate password (without hashing)
        if (password !== user.password) {
            return res.status(400).json({ msg: "Invalid credentials!" });
        }

        res.status(200).json({ msg: "Login successful", user });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

