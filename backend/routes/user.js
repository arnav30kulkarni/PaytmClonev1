const express = require("express");
const zod = require("zod");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const { User } = require("../config/userschema");
const { Account } = require("../config/bankschema");
const { authMiddleware } = require("../middlware/authMiddleware");

const router = express.Router();

const secretkey = process.env.JWT_SECRET;

const signupSchema = zod.object({
  firstname: zod.string().min(1),
  lastname: zod.string().min(1),
  username: zod.string().email(),
  password: zod.string().min(6),
});

router.post("/signup", async (req, res) => {
  try {
    const body = req.body;

    const parsedSignup = signupSchema.safeParse(body);
    if (!parsedSignup.success) {
      return res.status(400).json({
        msg: "Invalid inputs",
      });
    }

    const existingUser = await User.findOne({
      username: body.username,
    });

    if (existingUser) {
      return res.status(400).json({
        msg: "User already exists",
      });
    }

    const dbUser = await User.create({
      firstname: body.firstname,
      lastname: body.lastname,
      username: body.username,
      password: body.password,
    });

    const userId = dbUser._id;

    await Account.create({
      userId,
      balance: Number((1 + Math.random() * 10000).toFixed(2)),
    });

    const token = jwt.sign(
      { userId: dbUser._id },
      secretkey,
      { expiresIn: "7d" }
    );

    res.json({
      msg: "User created successfully",
      token,
    });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

const loginSchema = zod.object({
  username: zod.string().email(),
  password: zod.string().min(6),
});

router.post("/signin", async (req, res) => {
  try {
    const body = req.body;

    const parsedSignin = loginSchema.safeParse(body);
    if (!parsedSignin.success) {
      return res.status(403).json({
        msg: "Invalid inputs",
      });
    }

    const user = await User.findOne({
      username: body.username,
      password: body.password,
    });

    if (!user) {
      return res.status(404).json({
        msg: "User not found",
      });
    }

    const token = jwt.sign(
      { userId: user._id },
      secretkey,
      { expiresIn: "7d" }
    );

    res.json({
      msg: "User signed in successfully",
      token,
    });
  } catch (err) {
    console.error("Signin error:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

const updateSchema = zod.object({
  firstname: zod.string().min(1).optional(),
  lastname: zod.string().min(1).optional(),
  password: zod.string().min(6).optional(),
});

router.put("/", authMiddleware, async (req, res) => {
  try {
    const body = req.body;

    if (!updateSchema.safeParse(body).success) {
      return res.status(403).json({
        msg: "Invalid inputs",
      });
    }

    await User.updateOne(
      { _id: req.userId },
      { $set: body }
    );

    res.json({
      msg: "User updated successfully",
    });
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

router.get("/bulk", authMiddleware, async (req, res) => {
  try {
    const filter = req.query.filter || "";

    const users = await User.find({
      _id: { $ne: new mongoose.Types.ObjectId(req.userId) },
      $or: [
        { firstname: { $regex: filter, $options: "i" } },
        { lastname: { $regex: filter, $options: "i" } },
      ],
    });

    res.json({
      users: users.map((user) => ({
        firstname: user.firstname,
        lastname: user.lastname,
        username: user.username,
        id: user._id,
      })),
    });
  } catch (err) {
    console.error("Error in /bulk:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

router.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        msg: "User not found",
      });
    }

    res.json({
      firstname: user.firstname,
      lastname: user.lastname,
      username: user.username,
      id: user._id,
    });
  } catch (err) {
    console.error("/me error:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
