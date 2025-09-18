import { model } from "mongoose";
import Theater from "../models/theater.js";


export const getTheaters = async(req, res) => {
    try {
        const theaters = await Theater.find().populate("owner").populate("shows");
        if(!theaters){
            return res.status(400).json({
                message:"Theaters not found!",
                success:false
            });
        };
        return res.status(200).json({
            message:"Theaters found successfully!",
            theaters,
            success:true
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
      message: "Internal server error!",
      success: false,
    });
    }
}

export const getTheaterById = async(req, res) => {
  try {
    const theaterId = req.params.id;

    const theater = await Theater.findById(theaterId).populate({path:'shows', populate:{path:'movie', model:'Movie'}});

    if(!theater){
      return res.status(400).json({
        message:"Theater not found!",
        success:false
      });
    };
    return res.status(200).json({
      message:"Theater found successfully!",
      theater,
      success:true
    })
  } catch (error) {
       console.log("Backend error in getTheaterById:", error);
       return res.status(500).json({
         message: "Internal server error!",
         success: false,
       });
  }
}


export const updateTheater = async(req, res)=> {
    try {
        const {name, location, seats, facilities} = req.body;
        const theaterId = req.params.id;

        const theater = await Theater.findById(theaterId);
        if(!theater){
            return res.status(400).json({
                message:"Theater not found!",
                success:false
            });
        };

        let facilitiesArray;
        if(facilities){
            facilitiesArray = facilities.split(", ");
        }

        if(name) theater.name = name;
        if(location) theater.location = location;
        if(seats) theater.seats = seats;
        if(facilities) theater.facilities = facilitiesArray;
        await theater.save();

        return res.status(200).json({
            message:"Theater updated successfully!",
            theater,
            success:true
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
      message: "Internal server error!",
      success: false,
    });
    }
}

// export const deleteTheater = async(req, res) =>{
//     try {
        
//     } catch (error) {
        
//     }
// }