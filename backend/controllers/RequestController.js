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
        <h2>Hi ${user.fullName},</h2>
        <p>Your theater request has been submitted successfully!</p>
        <p><strong>Theater:</strong> ${theaterName}</p>
        <p><strong>Location:</strong> ${location}</p>
        <p><strong>Seats:</strong> ${seats}</p>
        <p><strong>Priority:</strong> ${priority}</p>
        <p>We will review your request shortly.</p>
      `,
    });

    // ✅ 2. Send Detailed Email to SuperAdmin
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.SUPERADMIN_EMAIL,
      subject: "📝 New Theater Request Submitted",
      html: `
        <h2>New Theater Request</h2>
        <p><strong>Name:</strong> ${theaterName}</p>
        <p><strong>Location:</strong> ${location}</p>
        <p><strong>Seats:</strong> ${seats}</p>
        <p><strong>Priority:</strong> ${priority}</p>
        <p><strong>Facilities:</strong> ${facilities}</p>
        <p><strong>User:</strong> ${user.fullName} (${user.email})</p>
        <p><strong>Logo:</strong> <img src="${theaterLogoUrl}" width="150"/></p>
      `,
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
    const requests = await AdminRequest.find()
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

// Get request by ID
export const getRequestById = async (req, res) => {
  try {
    const requestId = req.params.id;
    const request = await AdminRequest.findById(requestId)
      .populate("user", "fullName email");

    if (!request) {
      return res.status(400).json({
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

// Update request (approve/reject)
export const updateRequest = async (req, res) => {
  try {
    const { status, rejectionReason } = req.body;
    const requestId = req.params.id;

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
    if (request.status === 'rejected') request.rejectionReason = rejectionReason || 'Not specified';
    request.reviewedAt = new Date();
    request.approvedBy = req.adminId || null; // Assuming adminId from auth middleware
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
    requestInfo: request._id,   // ✅ Link to AdminRequest
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
