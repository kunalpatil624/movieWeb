import { User } from "../models/user.js";
import jwt from 'jsonwebtoken'
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";

const otpStore = {};
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // Gmail
    pass: process.env.EMAIL_PASS, // App password
  },
});


export const sendSignupOTP = async (req, res) => {
  try {
    const { fullName, email, phoneNumber, password, role } = req.body;
    if (!fullName || !email || !phoneNumber || !password) {
      return res.status(400).json({ message: "All fields required", success: false });
    }

    // Already registered?
    const exist = await User.findOne({ email });
    if (exist) {
      return res.status(400).json({ message: "User already exists!", success: false });
    }

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000);
    const hashedPassword = await bcrypt.hash(password.trim(), 10);
    // Save in memory (use Redis/DB in production)
    otpStore[email] = {
      otp,
      fullName,
      phoneNumber,
      role,
      password: hashedPassword,
      expire: Date.now() + 5 * 60 * 1000, // 5 min
    };

    // Send OTP Email
    await transporter.sendMail({
      from: `"CineflixX" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Verify your Email",
      text: `Your OTP is ${otp}. It will expire in 5 minutes.`,
    });

    return res.status(200).json({
      message: "OTP sent to email",
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

export const verifySignupOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const record = otpStore[email];
    if (!record) {
      return res.status(400).json({ message: "OTP request not found", success: false });
    }

    if (record.expire < Date.now()) {
      return res.status(400).json({ message: "OTP expired", success: false });
    }

    if (record.otp != otp) {
      return res.status(400).json({ message: "Invalid OTP", success: false });
    }

    // Create user in DB
    const newUser = await User.create({
      fullName: record.fullName,
      email,
      phoneNumber: record.phoneNumber,
      password: record.password, // already hashed
      role: record.role || "user",
    });

    delete otpStore[email]; // cleanup

    res.status(201).json({
      message: "Registration successful!",
      success: true,
      user: newUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", success: false });
  }
};


export const login = async (req, res)=> {
  try {
    const {email, password} = req.body;
    
    if(!email || !password){
      return res.status(400).json({
        message:"Sumthing is missing!",
        success:false
      });
    };
    
    let user = await User.findOne({email});
    if(!user){
      return res.status(400).json({
        message:"Incorrect email or password!",
        success:false
      });
    };
    let isPasswordMatch = await bcrypt.compare(password.trim(), user.password);
    if(!isPasswordMatch){
      return res.status(400).json({
        message:"Incorrect password! please try again."
      });
    };
  
    //Agar user ya admin role chacked krna ho tb yh use ayga
  
    // if(role != user.role){
    //   return res.status(400).json({
    //     message:"Account doesn't exist with current role."
    //     message
    //   })
    // }
  
    const tokenData = {
      userId : user._id
    };
  
    const token = await jwt.sign(tokenData, process.env.SECRET_KEY_USER, {expiresIn:"1d"});
  
    user = {
      _id:user._id,
      fullName:user.fullName,
      email:user.email,
      imageUrl:user.imageUrl,
      phoneNumber:user.phoneNumber,
      role:user.role,
      isTheaterRequestPending:user.isTheaterRequestPending,
      theaterRequestDetails:user.theaterRequestDetails
    };
  
    return res.status(200).cookie("token", token, {maxAge:1*24*60*60*1000, httpOnly:true, secure:true, sameSite:'none'}).json({
      message:`WellCome back ${user.fullName}`,
      user,
      token,
      success:true
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error!",
      success: false,
    });
  }
};

export const logout = async (req, res) => {
  try {
    return res
      .status(200)
      .cookie("token", "", {
        maxAge: 0,
        httpOnly: true,
        secure: true, 
        sameSite: "none", 
      })
      .json({
        message: "Logged out successfully!",
        success: true
      });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Internal server error!",
      success: false,
    });
  }
};

export const getProfile = async(req, res)=> {
  try {
    const userId = req.id;
    const user = await User.findById(userId).populate("theater");
    if(!user){
      return res.status(400).json({
        message:"User not found!",
        success:false
      });
    }
    return res.status(200).json({
      message:"User found successfully!",
      user,
      success:true,
    })
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Internal server error!",
      success: false,
    });
  }
}

export const profileUpdate = async(req, res ) => {
  try {
      const { fullName, email, phoneNumber, password, imageUrl} = req.body;
      const file = req.file
      const userId = req.id;
      const user = await User.findById(userId);
      if(!user){
        return res.status(400).json({
          message:'User not exist!',
          success:false
        });
      };

      if(fullName) user.fullName = fullName;
      if(email) user.email = email;
      if(phoneNumber) user.phoneNumber = phoneNumber;
      if (password) {
        user.password = await bcrypt.hash(password, 10);
      }
      if(file){
        const uploadImage = await cloudinary.uploader.upload(file.path, {
          folder:"profile_images",
          crop:"scale"
        })
         user.imageUrl = uploadImage.secure_url;
      }

      await user.save();
      return res.status(200).json({
        message:"Profile updated!",
        user,
        success:true
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error!",
      success: false,
    });
  }
}


