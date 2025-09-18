import { uploadToCloudinary } from "../config/cloudinary.js";
import {Movie} from "../models/movie.js";

// export const addMovie = async (req, res) => {
//   try {
//   const {
//   moviName,
//   language,
//   trailer,
//   posterUrl,
//   releaseDate,
//   runtime,
//   genres,
//   description
// } = req.body;

// const casts = req.body.cast ? JSON.parse(req.body.cast) : [];
// const poster = req.files?.poster?.[0]; // multer se
// const castImages = req.files?.castImages || [];
//     const file = req.file;
//     const superAdminId = req.id;

//     if (!moviName || !description || !poster) {
//   return res.status(400).json({
//     message: "Title, Description, Poster is required!",
//     success: false,
//   });
// }


//     const chackedMovie = await Movie.findOne({moviName})
//     if(chackedMovie){
//         return res.status(400).json({
//             message:"Movie existed!",
//             success:false
//         });
//     };

//     let genresArray;
//     if(genres){
//         genresArray = genres.split(",");
//     }
//     let castArray = [];
//     if (casts) {
//       castArray = Array.isArray(casts) ? casts : JSON.parse(casts);
//     }
//     // Movie create
//     const movie = await Movie.create({
//   title: moviName,
//   description,
//   originalLanguage: language,
//   trailer,
//   releaseDate,
//   runtime,
//   genres: genres?.split(","),
//   casts: casts.map((c, i) => ({
//     name: c.name,
//     imageUrl: castImages[i] ? castImages[i].path : null, // 👈 schema me imageUrl hai
//   })),
//   poster: poster ? poster.path : null, // 👈 schema field poster hai, posterUrl nahi
//   createdBy: superAdminId,
// });


//     return res.status(201).json({
//       message: "Movie created successfully!",
//       movie,
//       success: true,
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       message: "Internal server error!",
//       success: false,
//     });
//   }
// };

export const addMovie = async (req, res) => {
  if (!req.body) {
      return res.status(400).json({ message: "Request body missing!" });
    }
  try {
    const {
      moviName,
      language,
      trailer,
      releaseDate,
      runtime,
      vote_average,
      genres,
      description,
    } = req.body;

    const casts = req.body.cast ? JSON.parse(req.body.cast) : [];
    const posterFile = req.files?.poster?.[0];
    const castImages = req.files?.castImages || [];
    const superAdminId = req.id;

    if (!moviName || !description || !posterFile) {
      return res.status(400).json({
        message: "Movie Name, Description, and Poster are required!",
        success: false,
      });
    }

    const checkedMovie = await Movie.findOne({ title: moviName });
    if (checkedMovie) {
      return res.status(400).json({
        message: "Movie already exists!",
        success: false,
      });
    }
    
    let trailerId = null;
    if (trailer) {
      const shortUrlMatch = trailer.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
      const fullUrlMatch = trailer.match(/v=([a-zA-Z0-9_-]{11})/);
      const embedUrlMatch = trailer.match(/embed\/([a-zA-Z0-9_-]{11})/);

      trailerId =
        (shortUrlMatch && shortUrlMatch[1]) ||
        (fullUrlMatch && fullUrlMatch[1]) ||
        (embedUrlMatch && embedUrlMatch[1]) ||
        null;
    }
    // 👇 Upload poster to Cloudinary
    const posterUrl = await uploadToCloudinary(posterFile.buffer, "movies");

    // 👇 Upload cast images one by one
    const castArray = await Promise.all(
      casts.map(async (c, i) => {
        let imageUrl = null;
        if (castImages[i]) {
          imageUrl = await uploadToCloudinary(
            castImages[i].buffer,
            "movies/cast"
          );
        }
        return { name: c.name, imageUrl };
      })
    );

    // Save movie
    const movie = await Movie.create({
      title: moviName,
      description,
      originalLanguage: language,
      trailer,
      trailerId,
      releaseDate,
      runtime,
      vote_average,
      genres: genres?.split(","),
      casts: castArray,
      poster: posterUrl, // 👈 Cloudinary URL
      createdBy: superAdminId,
    });
    if(!movie){
       return res.status(201).json({
      message: "Movie not created!!",
      success: true,
    });
    }
    return res.status(201).json({
      message: "Movie created successfully!",
      movie,
      success: true,
    });
  } catch (error) {
    console.error("❌ Movie Add Error:", error);
    return res.status(500).json({
      message: "Internal server error!",
      success: false,
    });
  }
};

export const getAllMovies = async(req, res)=> {
    try {
        const {search} = req.query
        let query = {};

        if (search) {
      query = {
        $or: [
          { title: { $regex: search, $options: "i" } }, 
          { tagline: { $regex: search, $options: "i" } }, 
          { "casts.name": { $regex: search, $options: "i" } }
        ]
      };
    }
    const movies = await Movie.find(query).sort({releaseDate:-1});
    if(!movies){
        res.status(200).json({
            message:"Movie not exist!",
            success:false
        })
    }
    res.status(200).json({
        message:"Movies found successfully",
        movies,
        success:true
    })
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            message:"Internal server error!",
            success:false
        })
    }
}

export const getMovieById = async(req, res)=>{
    try {
        const movieId = req.params.id;
        const movie = await Movie.findById(movieId);
        if(!movie){
            return res.status(400).json({
                message:"Movie not found!",
                success:false
            });
        };
        return res.status(200).json({
            message:"Movie found successfully!",
            movie,
            success:true
        })
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            message:"Internal server error",
            success:true
        });
    };
}

export const updateMovie = async (req, res) => {
  try {
    const movieId = req.params.id;
    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(404).json({
        message: "Movie not found!",
        success: false,
      });
    }

    // Text fields
    const {
      moviName,
      language,
      trailer,
      releaseDate,
      runtime,
      vote_average,
      genres,
      description,
    } = req.body;

    // Files
    const posterFile = req.files?.poster?.[0];
    const castImages = req.files?.castImages || [];
    const casts = req.body.cast ? JSON.parse(req.body.cast) : [];

    // Update poster if new file uploaded
    if (posterFile) {
      movie.poster = await uploadToCloudinary(posterFile.buffer, "movies");
    }

    // Update casts if given
    if (casts.length > 0) {
      const updatedCasts = await Promise.all(
        casts.map(async (c, i) => {
          let imageUrl = c.imageUrl || null;
          if (castImages[i]) {
            imageUrl = await uploadToCloudinary(
              castImages[i].buffer,
              "movies/cast"
            );
          }
          return { name: c.name, imageUrl };
        })
      );
      movie.casts = updatedCasts;
    }

    // Update other fields
    if (moviName) movie.title = moviName;
    if (language) movie.originalLanguage = language;
    if (trailer) movie.trailer = trailer;
    if (releaseDate) movie.releaseDate = releaseDate;
    if (runtime) movie.runtime = runtime;
    if (vote_average) movie.vote_average = vote_average;
    if (genres) movie.genres = genres.split(",");
    if (description) movie.description = description;

    await movie.save();

    return res.status(200).json({
      message: "Movie updated successfully!",
      movie,
      success: true,
    });
  } catch (error) {
    console.error("❌ Movie Update Error:", error);
    return res.status(500).json({
      message: "Internal server error!",
      success: false,
    });
  }
};


export const deleteMovie = async (req, res) => {
  try {
    const movieId = req.params.id;

    const deletedMovie = await Movie.findByIdAndDelete(movieId);

    if (deletedMovie) {
      return res.status(200).json({
        message: "Movie deleted successfully!",
        success: true,
        deletedMovie, // optional: return deleted movie info
      });
    }

    return res.status(404).json({
      message: "Movie not found!",
      success: false,
    });
  } catch (error) {
    console.error("Error deleting movie:", error);
    return res.status(500).json({
      message: "Internal server error!",
      success: false,
    });
  }
};
