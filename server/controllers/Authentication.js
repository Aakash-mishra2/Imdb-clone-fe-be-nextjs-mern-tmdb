import UserModel from "../models/UserModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import validator from "validator";
const jwt_secret = process.env.JWT_SECRET;
import genResponseFromat from "../middleware/resFromat.js";

//API to register user
export const register = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ error: "All inputs are required" });
    }
    // Validating email using validator.js
    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: "Please give a valid email" });
    }

    //checking if a user with same email address is already there
    // we can also restrict duplicate entry by adding a compund index in mongodb
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ error: "User with this email already exists" });
    }

    // checking if a password is strong or not (altough it is a frontend task)
    //criteria pasword sould be 6 char long contains one lowercase, uppercase, number and special char
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d]).*$/;
    if (password.length >= 6 && regex.test(password)) {
      // hashing password
      const salt = await bcrypt.genSalt(10);
      const secPassword = await bcrypt.hash(password, salt);

      //creating user
      const user = new UserModel({ email, password: secPassword });
      await user.save();

      const id = user?._id;
      //creating jwt token

      jwt.sign(
        { id, email },
        process.env.JWT_SECRET,
        {},
        (err, token) => {
          if (err) {
            res.status(500).json({ error: "Error in creating token" });
          }
          const created_at = user.createdAt;
          //generating response format
          const response = genResponseFromat(
            id,
            email,
            created_at,
            token
          );
          res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "None", // Set SameSite attribute to 'None' for cross-site cookies
            maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
          });
          return res.status(201).json(response);
        }
      );
    } else {
      res.status(400).json({ error: "Use strong password" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ status:false, error: err, message: "Registration failed" });
  }
};

// API to login the user
//username: aakash123@gmail.com
//password: Shadow123@

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Validating email using validator.js
    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ status: false, error: "Please give a valid email" });
    }
    const user = await UserModel.findOne({ email });
    if (user) {
      //Comapring given password by user password by dcrypting it
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (passwordCompare) {
        //Creating jwt token with 1 day as expiry
        jwt.sign(
          { id: user.id, email: user.email },
          process.env.JWT_SECRET,
          { expiresIn: "1d" },
          (err, token) => {
            if (err) {
              res
                .status(500)
                .json({ status: false, error: "Error in creating token" });
            }
            const created_at = user.createdAt;

            //generating response format as required
            const response = genResponseFromat(
              user.id,
              user.email,
              created_at,
              token
            );
            //sending token in secure cookies with expiration time as 1 day
            res.cookie("token", token, {
              sameSite: "none",
              secure: true,
              maxAge: 24 * 60 * 60 * 1000,
            });
            return res.status(200).json(response);
          }
        );
      } else {
        return res.status(400).json({ error: "Invalid credentials" });
      }
    } else {
      return res.status(400).json({ status: false, error: "User not found" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ status: false, error: err, message: "Login failed" });
  }
};

// get single user
export const getProfile = async (req, res) => {
  try {
    // getting the user from req object embedded by middleware after verification of token
    const user = req.user;
    const response = {
      status: true,
      content: {
        data: {
          id: user.id,
          email: user.email,
          created_at: user.createdAt,
        },
      },
    };
    return res.status(200).json(response);
  } catch (err) {
    return res
      .status(500)
      .json({ status: false, error: err, message: "User verification failed" });
  }
};
