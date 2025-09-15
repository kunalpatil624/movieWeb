import express from 'express';
import AdminRequest from '../models/adminRequest.js';
import { User } from '../models/user.js';
import Theater from '../models/theater.js';
import { uploadToCloudinary } from '../config/cloudinary.js';


export const sendRequest = async (req, res) => {
  try {
    const userId = req.id;
    const { theaterName, location, seats, facilities, priority } = req.body;

    if (!userId || !theaterName || !location) {
      return res.status(400).json({
        message: "user, theaterName, location are missing!",
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
    const theater = new Theater({
      owner: userId,
      name: theaterName,
      theaterLogo: theaterLogoUrl,
      location,
      seats,
      facilities: facilities ? JSON.parse(facilities) : [],
      theaterImages: request.theaterImages,
      priority: priority || "medium",
    });

    await theater.save();

    // Link request to user
    await User.findByIdAndUpdate(userId, {
      $push: { theaterRequestDetails: request._id },
    });

    return res.status(200).json({
      message: "Request and Theater created successfully!",
      request,
      theater,
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
      const theater = new Theater({
        name: request.theaterName,
        location: request.location,
        seats: request.seats,
        owner: request.user,
        facilities: request.facilities,
        images: request.theaterImages
      });
      await theater.save();
      await User.findByIdAndUpdate(request.user, { theater: theater._id });

      return res.status(200).json({
        message: "Request approved & Theater created successfully!",
        success: true,
        request,
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
