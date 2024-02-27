const fs = require("fs").promises;
const { get } = require("http");
const User = require("../model/User");

const bcrypt = require("bcrypt");

const path = require('path');
const userPath = path.join(__dirname, '../database/users.json');

const getAllUsers = async (req, res) => {
    try {
        const data  = await fs.readFile(userPath);
        // Check if data is empty and if so, return an empty array
        let users;
        if (data) {
            users = JSON.parse(data);
        } else {
            users = [];
        }
        return res.status(200).json(users);
    } catch (err) {
        console.error('Error reading users data:', err);
        return [];
    }
};
// console.log(getAllUsers());

// const login = async (req, res) => {
//   try {
//     const data = await fs.readFile(userPath);
//     const users = JSON.parse(data);
//     const user = users.find(
//       (user) =>
//         user.email === req.body.email && user.password === req.body.password
//     );
//     if (user) {
//       req.session.user = user;
//       res.status(200).json(user);
//     } else {
//       res.status(401).json({ message: "Invalid email or password" });
//     }
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };



const login = async (req, res) => {
    try {
        const data = await fs.readFile(userPath);
        const users = JSON.parse(data);
        const user = users.find(user => user.email === req.body.email);

        if (user) {
            // Compare the password from the request with the hashed password in the database
            const match = await bcrypt.compare(req.body.password, user.password);

            if (match) {
                // Passwords match
                req.session.user = user;
                // res.status(200).json(user);
                res.status(200).json({ message: "User logged in" });
            } else {
                // Passwords don't match
                res.status(401).json({ message: "Invalid email or password" });
            }
        } else {
            // User not found
            res.status(401).json({ message: "Invalid email or password" });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


const saltRounds = 10;

const register = async (req, res) => {
  try {
    const data = await fs.readFile(userPath);
    const users = JSON.parse(data);

    if (users.find((user) => user.email === req.body.email)) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

    const newUser = new User(
      req.body.firstName,
      req.body.lastName,
      req.body.email,
      hashedPassword
    );
    users.push(newUser);

    await fs.writeFile(userPath, JSON.stringify(users));

    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const logOut = async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Failed to log out" });
    }
    res.status(200).json({ message: "User logged out" });
  });
};
module.exports = {
  getAllUsers,
  login,
  register,
  logOut,
};
