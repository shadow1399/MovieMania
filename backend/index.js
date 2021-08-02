const express = require("express");

const app = express();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("./config/mongoose");
const User = require("./models/users");
// app.get("/", function (req, res) {
//     res.send("Hello");
// })

app.use(express.urlencoded({ extended: true }));

app.post("api/v1/register", async function (req, res) {
    try {
        let { email, password, passwordCheck, name } = req.body;
        //validate
        if (!email || !password || !passwordCheck) {
            return res.status(400).json({ msg: "Not all fields have been entered." });
        }
        if (password != passwordCheck) {
            return res.status(400).json({ msg: "Both passwords should match." });
        }

        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res.status(400).json({ msg: "Email Already Exists." });
        }
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);
        var user = {
            name: name,
            email: email,
            password: passwordHash
        }
        const newUser = await User.create(user);

        return res.status(200).json({ msg: "User created Successfully" });

    }
    catch (err) {
        return res.status(400).json({ msg: "Error in creating User." });
    }
});

app.post("/api/v1/login", async function (req, res) {
    try {
        const { email, password } = req.body;
        // console.log("***", email, "*****", password);
        if (!email || !password) {
            return res.status(400).json({ msg: "All fields are required." });
        }
        const existUser = await User.findOne({ email: email });
        // console.log(existUser);
        if (!existUser) {
            return res.status(400).json({ msg: "Email does not exist." });
        }
        const isMatch = await bcrypt.compare(password, existUser.password);
        // console.log(isMatch);
        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid credentials." });
        }
        const token = jwt.sign({ id: existUser.id }, keys.JWT_SECRET);
        return res.json({ token, user: { id: existUser.id, name: existUser.name } });

    } catch (err) {
        return res.status(400).json({ msg: "Login failed." });
    }
});

app.listen(8000, function (err) {
    if (err) {
        console.log("Server Not Running");
        return;
    }
    console.log("Server Is Running");

})

// dHuffVX6158M0K6b