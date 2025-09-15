import SuperAdmin from '../models/SuperAdmin.js';
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'


export const addSuperAdmin = async (req, res) => {
    try {
        const { email, password, userName, name } = req.body;
        if (!name || !password || !userName || !email) {
            return res.status(400).json({
                message: "Something missing!!",
                success: false
            });
        }
        const chackedUser = await SuperAdmin.findOne({email:email})
        if(chackedUser){
            return res.status(400).json({
                message:"Email already exist!",
                success:false
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const superUser = await SuperAdmin.create({
            name,
            userName,
            email,
            password: hashedPassword
        });

        return res.status(201).json({
            message: "SuperAdmin created successfully!",
            superUser,
            success: true
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error!",
            success: false,
        });
    }
}

export const loginSuperAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
              message: "Incorrect email or password!",
              success: false,
            });
        }

        const superAdmin = await SuperAdmin.findOne({ email });
        if(!superAdmin) {
            return res.status(400).json({
                message: "Admin not exist!",
                success: false
            });
        }

        const isPasswordValid = await bcrypt.compare(password, superAdmin.password);
        if (!isPasswordValid) {
            return res.status(400).json({
                message: "Incorrect password! Please try again.",
                success: false
            });
        }

        const tokenData = { superAdminId: superAdmin._id };
        const token = jwt.sign(tokenData, process.env.SECRET_KEY_SUPER_ADMIN, { expiresIn: "1d" });

        const superAdminData = {
            name: superAdmin.name,
            email: superAdmin.email,
            userName: superAdmin.userName
        };

        return res
          .status(200)
          .cookie("token", token, {
            maxAge: 1 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            secure: true,
            sameSite: "none",
          })
          .json({
            message: `Welcome back ${superAdmin.name}`,
            success: true,
            user: superAdminData, 
            token, 
          });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error!",
            success: false,
        });
    }
};

export const logoutSuperAdmin = async(req, res)=> {
    try {
        return res.status(200).cookie("token", "", {maxAge:0, httpOnly:true, secure:true, sameSite:"none"}).json({
            message:"Log Out successfully!",
            success:true
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error!",
            success: false,
        });
    }
}