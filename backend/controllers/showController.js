import { Movie } from "../models/movie.js";
import Theater from "../models/theater.js";
import { Show } from "../models/show.js";

// ✅ Create Show
export const createShow = async (req, res) => {
  try {
    const { movieId, theaterId, dateTime, showPrice, totalSeates } = req.body;

    if (!movieId || !theaterId || !dateTime || !showPrice) {
      return res.status(400).json({
        message: "All fields are required!",
        success: false,
      });
    }

    const movie = await Movie.findById(movieId);
    const theater = await Theater.findById(theaterId);

    if (!movie)
      return res.status(404).json({ success: false, message: "Movie not found" });
    if (!theater)
      return res
        .status(404)
        .json({ success: false, message: "Theater not found" });

    // ✅ Convert dateTime string to Date
    const parsedDate = new Date(dateTime);

    // Check duplicate
    const existingShow = await Show.findOne({
      movie: movieId,
      theater: theaterId,
      dateTime: parsedDate,
    });

    if (existingShow) {
      return res.status(400).json({
        message: "This show already exists!",
        success: false,
      });
    }

    // ✅ Create show
    const newShow = await Show.create({
      movie: movieId,
      theater: theaterId,
      dateTime: parsedDate,
      showPrice,
      totalSeates,
    });

    // Push show into theater
    await Theater.findByIdAndUpdate(
      theaterId,
      { $push: { shows: newShow._id } },
      { new: true }
    );

    return res.status(201).json({
      message: "Show created successfully!",
      show: newShow,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error!",
      success: false,
    });
  }
};

// ✅ Get all shows
export const getShow = async (req, res) => {
  try {
    const shows = await Show.find();
    if (!shows || shows.length === 0) {
      return res.status(404).json({
        message: "No shows found!",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Shows found successfully!",
      shows,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error!",
      success: false,
    });
  }
};

// ✅ Get show by ID
export const getShowById = async (req, res) => {
  try {
    const showId = req.params.id;
    const show = await Show.findById(showId);

    if (!show) {
      return res.status(404).json({
        message: "Show not found!",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Show found successfully!",
      show,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error!",
      success: false,
    });
  }
};

// controllers/showController.js
export const getShowsByMovieAndDate = async (req, res) => {
  try {
    const { movieId, date } = req.params; // date in YYYY-MM-DD format

    if (!movieId || !date) {
      return res.status(400).json({ success: false, message: "MovieId & date required" });
    }

    // Start & end of day to match all shows on that date
    const start = new Date(date + "T00:00:00.000Z");
    const end = new Date(date + "T23:59:59.999Z");

    const shows = await Show.find({
      movie: movieId,
      dateTime: { $gte: start, $lte: end }
    }).populate("theater");

    if (!shows || shows.length === 0) {
      return res.status(404).json({ success: false, message: "No shows found" });
    }

    return res.status(200).json({ success: true, shows });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};


// ✅ Update show
export const updateShow = async (req, res) => {
  try {
    const { dateTime, showPrice } = req.body;
    const showId = req.params.id;

    const show = await Show.findById(showId);
    if (!show) {
      return res.status(404).json({
        message: "Show not found!",
        success: false,
      });
    }

    if (dateTime) show.dateTime = new Date(dateTime);
    if (showPrice) show.showPrice = showPrice;

    await show.save();

    return res.status(200).json({
      message: "Show updated successfully!",
      show,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error!",
      success: false,
    });
  }
};
