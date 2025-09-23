import express from 'express';
import AdminRequest from '../models/adminRequest.js';
import { User } from '../models/user.js';
import Theater from '../models/theater.js';
import { uploadToCloudinary } from '../config/cloudinary.js';
import { transporter } from '../config/nodemailer.js';


export const sendRequest = async (req, res) => {
  try {
    const userId = req.id;
    const { theaterName,theaterEmail,theaterPhone, location, seats, facilities, priority } = req.body;

    if (!userId || !theaterName || !location) {
      return res.status(400).json({
        message: "user, theaterName, location are missing!",
        success: false,
      });
    }
    if (!theaterPhone || !theaterEmail) {
      return res.status(400).json({
        message: "Theater phone number, Email are missing!",
        success: false,
      });
    }

    // 🔍 Check if request already exists
    const existingRequest = await AdminRequest.findOne({ user: userId });

    if (existingRequest) {
      if (existingRequest.status === "pending") {
        return res.status(400).json({
          message: "Your request is still pending! Please wait for admin approval.",
          success: false,
        });
      }
      if (existingRequest.status === "rejected") {
        return res.status(400).json({
          message: "Your request was rejected. Please contact support for details.",
          success: false,
        });
      }
      if (existingRequest.status === "approved") {
        return res.status(400).json({
          message: "Your request is already approved and theater is active!",
          success: false,
        });
      }
    }

    // ✅ Upload Theater Logo
    let theaterLogoUrl = "";
    if (req.files?.theaterLogo && req.files.theaterLogo[0]) {
      theaterLogoUrl = await uploadToCloudinary(
        req.files.theaterLogo[0].buffer,
        `requests/logos`,
        req.files.theaterLogo[0].originalname
      );
    } else {
      return res.status(400).json({
        message: "Theater Logo is required!",
        success: false,
      });
    }

    // ✅ Create request object but don't save yet
    const request = new AdminRequest({
      user: userId,
      theaterName,
      theaterEmail,
      theaterPhone,
      location,
      seats,
      theaterLogo: theaterLogoUrl,
      facilities: facilities ? JSON.parse(facilities) : [],
      priority: priority || "medium",
      documents: [],
      theaterImages: [],
    });

    const folder = `requests/${request._id}`;

    // Upload documents
    if (req.files?.documents) {
      for (const file of req.files.documents) {
        const url = await uploadToCloudinary(
          file.buffer,
          `${folder}/documents`,
          file.originalname
        );
        request.documents.push(url);
      }
    }

    // Upload theater images
    if (req.files?.theaterImages) {
      for (const file of req.files.theaterImages) {
        const url = await uploadToCloudinary(
          file.buffer,
          `${folder}/theaterImages`,
          file.originalname
        );
        request.theaterImages.push(url);
      }
    }

    // ✅ Save AdminRequest
    await request.save();

    // ✅ Create Theater immediately
    // const theater = new Theater({
    //   owner: userId,
    //   name: theaterName,
    //   requestInfo:request._id,
    //   theaterEmail,
    //   theaterPhone,
    //   theaterLogo: theaterLogoUrl,
    //   location,
    //   seats,
    //   facilities: facilities ? JSON.parse(facilities) : [],
    //   theaterImages: request.theaterImages,
    //   priority: priority || "medium",
    // });

    // await theater.save();

    // Link request to user
    await User.findByIdAndUpdate(userId, {
      $push: { theaterRequestDetails: request._id },
    });

    const user = await User.findById(userId);
    await transporter.sendMail({
  from: process.env.EMAIL_USER,
  to: user.email,
  subject: "✅ Theater Request Submitted",
  html: `
    <div style="font-family: Arial, sans-serif; padding:20px; background:#f9f9f9; color:#333;">
      <div style="max-width:600px; margin:auto; background:#fff; border-radius:10px; padding:20px; box-shadow:0 0 10px rgba(0,0,0,0.1)">
        <h2 style="color:#007bff; text-align:center;">✅ Theater Request Submitted</h2>
        <p>Hi <strong>${user.fullName}</strong>,</p>
        <p>Your theater request has been <strong style="color:#007bff;">submitted successfully</strong> 🎉</p>
        <p>Here are the details:</p>
        <ul>
          <li><strong>Theater:</strong> ${theaterName}</li>
          <li><strong>Location:</strong> ${location}</li>
          <li><strong>Seats:</strong> ${seats}</li>
          <li><strong>Priority:</strong> ${priority}</li>
        </ul>
        <p>We will review your request shortly. Thank you for your submission 🙌</p>
        <hr style="margin:20px 0;">
        <p style="font-size:14px; color:#666;">This is an automated email. Please do not reply.</p>
      </div>
    </div>
  `
});


    // ✅ 2. Send Detailed Email to SuperAdmin
    await transporter.sendMail({
  from: process.env.EMAIL_USER,
  to: process.env.SUPERADMIN_EMAIL,
  subject: "📝 New Theater Request Submitted",
  html: `
    <div style="font-family: Arial, sans-serif; padding:20px; background:#f9f9f9; color:#333;">
      <div style="max-width:600px; margin:auto; background:#fff; border-radius:10px; padding:20px; box-shadow:0 0 10px rgba(0,0,0,0.1)">
        <h2 style="color:#6f42c1; text-align:center;">📝 New Theater Request</h2>
        <p>A new theater request has been submitted. Here are the details:</p>
        <ul>
          <li><strong>Name:</strong> ${theaterName}</li>
          <li><strong>Location:</strong> ${location}</li>
          <li><strong>Seats:</strong> ${seats}</li>
          <li><strong>Priority:</strong> ${priority}</li>
          <li><strong>Facilities:</strong> ${facilities}</li>
          <li><strong>User:</strong> ${user.fullName} (${user.email})</li>
        </ul>
        ${theaterLogoUrl ? `<p><strong>Logo:</strong><br><img src="${theaterLogoUrl}" width="150" style="margin-top:10px; border-radius:6px;"/></p>` : ""}
        <hr style="margin:20px 0;">
        <p style="font-size:14px; color:#666;">This is an automated email for SuperAdmin.</p>
      </div>
    </div>
  `
});


    return res.status(200).json({
      message: "Request and Theater created successfully & emails sent!",
      request,
      success: true,
    });

  } catch (error) {
    console.error("❌ sendRequest Error:", error);
    return res.status(500).json({
      message: "Internal server error!",
      success: false,
    });
  }
};



// Get all theater requests
export const getAllRequest = async (req, res) => {
  try {
    const requests = await AdminRequest.find().sort({ createdAt: -1 })
      .populate("user", "fullName email");

    if (!requests) {
      return res.status(400).json({
        message: "Requests not exist!",
        success: false
      });
    }

    return res.status(200).json({
      message: "Requests found successfully!",
      requests,
      success: true
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error!",
      success: false
    });
  }
};


export const getRequestById = async (req, res) => {
  try {
   
    const { id } = req.params;

    const request = await AdminRequest.findById(id)
      .populate("user", "fullName email");

    if (!request) {
      return res.status(404).json({
        message: 'Request not found!',
        success: false
      });
    }

    return res.status(200).json({
      message: 'Request found successfully!',
      request,
      success: true
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error!",
      success: false
    });
  }
};



export const updateRequest = async (req, res) => {
  try {
    const { status, rejectionReason } = req.body;
    const requestId = req.params.id;
    console.log(status, rejectionReason, requestId)
    if (!status || typeof status !== "string") {
      return res.status(400).json({
        message: "Invalid or missing status. Must be 'approved' or 'rejected'.",
        success: false
      });
    }

    const request = await AdminRequest.findById(requestId);
    if (!request) {
      return res.status(404).json({
        message: "Request not found!",
        success: false
      });
    }

    request.status = status.toLowerCase();
    if (request.status === 'rejected'){
      request.rejectionReason = rejectionReason || 'Not specified';
      const user = await User.findById(request.user)
      await transporter.sendMail({
  from: process.env.EMAIL_USER,
  to: user.email,
  subject: "❌ Theater Request Rejected",
  html: `
    <div style="font-family: Arial, sans-serif; padding:20px; background:#f9f9f9; color:#333;">
      <div style="max-width:600px; margin:auto; background:#fff; border-radius:10px; padding:20px; box-shadow:0 0 10px rgba(0,0,0,0.1)">
        <h2 style="color:#dc3545; text-align:center;">❌ Request Rejected</h2>
        <p>Hi <strong>${user.fullName}</strong>,</p>
        <p>We’re sorry 😔, but your theater request has been <strong style="color:red;">rejected</strong> after review.</p>
        <p>Request details:</p>
        <ul>
          <li><strong>Theater:</strong> ${request.theaterName}</li>
          <li><strong>Location:</strong> ${request.location}</li>
          <li><strong>Seats:</strong> ${request.seats}</li>
          <li><strong>Priority:</strong> ${request.priority}</li>
          <li><strong>Priority:</strong> ${request.rejectionReason}</li>
        </ul>
        <p>If you believe this was a mistake, you can reapply with updated details.</p>
        <hr style="margin:20px 0;">
        <p style="font-size:14px; color:#666;">This is an automated email. Please do not reply.</p>
      </div>
    </div>
  `
});
    } 
    request.reviewedAt = new Date();
    request.approvedBy = req.adminId || null; 
    await request.save();

    if (request.status === "approved") {
      const existingTheater = await Theater.findOne({ requestInfo: request._id });

  if (existingTheater) {
    return res.status(400).json({
      message: "This request is already approved & Theater already exists!",
      success: false,
      theater: existingTheater
    });
  }
      const theater = new Theater({
        owner: request.user,
    requestInfo: request._id, 
    name: request.theaterName,
    theaterEmail: request.theaterEmail,
    theaterPhone: request.theaterPhone,
    theaterLogo: request.theaterLogo,
    location: request.location,
    seats: request.seats,
    facilities: request.facilities,
    theaterImages: request.theaterImages,
    priority: request.priority,
    approved: true,  // ✅ Mark theater as approved
      });
      await theater.save();
      const updatedUser = await User.findByIdAndUpdate(
        request.user,
        { theater: theater._id, role: "admin" },
        { new: true }
      ).populate("theater");
      const user = await User.findById(request.user)

      await transporter.sendMail({
  from: process.env.EMAIL_USER,
  to: user.email,
  subject: "🎉 Congratulations! Your Theater Request is Approved",
  html: `
    <div style="font-family: Arial, sans-serif; padding:20px; background:#f9f9f9; color:#333;">
      <div style="max-width:600px; margin:auto; background:#fff; border-radius:10px; padding:20px; box-shadow:0 0 10px rgba(0,0,0,0.1)">
        <h2 style="color:#28a745; text-align:center;">✅ Request Approved</h2>
        <p>Hi <strong>${user.fullName}</strong>,</p>
        <p>Great news! 🎊 Your theater request has been <strong style="color:green;">approved</strong>.</p>
        <p>Here are the details:</p>
        <ul>
          <li><strong>Theater:</strong> ${request.theaterName}</li>
          <li><strong>Location:</strong> ${request.location}</li>
          <li><strong>Seats:</strong> ${request.seats}</li>
          <li><strong>Priority:</strong> ${request.priority}</li>
        </ul>
        <p>You can now manage your theater in the system. 🚀</p>
        <hr style="margin:20px 0;">
        <p style="font-size:14px; color:#666;">This is an automated email. Please do not reply.</p>
      </div>
    </div>
  `
});
      return res.status(200).json({
        message: "Request approved & Theater created successfully!",
        success: true,
        request,
        updatedUser,
        theater,
      });
    }

    return res.status(200).json({
      message: "Request updated successfully!",
      success: true,
      data: request
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error!",
      success: false
    });
  }
};
