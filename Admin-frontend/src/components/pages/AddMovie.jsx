import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { MOVIE_API_AND_POINT } from "../utills/constand";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {toast} from "sonner";
import {Loader2} from 'lucide-react'

export const AddMovie = () => {
  const [cast, setCast] = useState([{ name: "", image: null }]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [movieData, setMovieData] = useState({
    moviName: "",
    language: "",
    trailer: "",
    releaseDate: "",
    runtime: "",
    vote_average:"",
    genres: "",
    description: "",
    poster: null, 
  });

  const handleCastChange = (index, field, value) => {
    const updatedCast = [...cast];
    updatedCast[index][field] = value;
    setCast(updatedCast);
  };

  const addCastField = () => {
    setCast([...cast, { name: "", image: null }]);
  };

  const removeCastField = (index) => {
    const updatedCast = cast.filter((_, i) => i !== index);
    setCast(updatedCast);
  };

  const handleMovieChange = (e) => {
    const { id, value } = e.target;
    setMovieData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      // Movie Data
      formData.append("moviName", movieData.moviName);
      formData.append("language", movieData.language);
      formData.append("trailer", movieData.trailer);
      formData.append("poster", movieData.poster); // 👈 correct key
      formData.append("releaseDate", movieData.releaseDate);
      formData.append("runtime", movieData.runtime);
      formData.append("vote_average", movieData.vote_average);
      formData.append("genres", movieData.genres);
      formData.append("description", movieData.description);

      // Cast Data
      formData.append(
        "cast",
        JSON.stringify(cast.map((c) => ({ name: c.name })))
      );
      cast.forEach((c, i) => {
        if (c.image) formData.append("castImages", c.image);
      });

      const res = await axios.post(`${MOVIE_API_AND_POINT}/add`, formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/add-movie");
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error(error?.response?.data?.message || "Something went wrong!");
    }
  }
 
  return (
    <div>
      <h1 className="font-medium text-2xl">
        Add <span className="underline text-red-700">Movie</span>
      </h1>

      {/* Movie Name & Language */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-5 mt-5">
        <div className="relative w-full">
          <Label htmlFor="moviName">Movie name</Label>
          <Input
            type="text"
            id="moviName"
            placeholder="Enter movie name"
            className="mt-2"
            value={movieData.moviName}
            onChange={handleMovieChange}
          />
        </div>
        <div className="relative w-full">
          <Label htmlFor="language">Language</Label>
          <Input
            type="text"
            id="language"
            placeholder="Enter language"
            className="mt-2"
            value={movieData.language}
            onChange={handleMovieChange}
          />
        </div>
      </div>

      {/* Trailer & Poster */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-5 mt-5">
        <div className="relative w-full">
          <Label htmlFor="trailer">Trailer</Label>
          <Input
            type="text"
            id="trailer"
            placeholder="Enter trailer url"
            className="mt-2"
            value={movieData.trailer}
            onChange={handleMovieChange}
          />
        </div>
        <div className="flex items-center gap-2 w-full">
        <div className="relative w-full">
          <Label htmlFor="poster">Poster</Label>
          <Input
            type="file"
            id="poster"
            accept="image/*"
            onChange={(e) =>
              setMovieData((prev) => ({ ...prev, poster: e.target.files[0] }))
            }
            className="mt-2"
          />
        </div>
        <div className="relative w-full">
          <Label htmlFor="vote_average">vote_average</Label>
          <Input
            type="number"
            id="vote_average"
            value={movieData.vote_average}
            onChange={handleMovieChange}
            className="mt-2"
          />
        </div>
        </div>
      </div>

      {/* Release Date, Runtime, Genres */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-5 mt-5">
        <div className="flex items-center justify-center gap-5 w-full">
          <div className="relative w-full">
            <Label htmlFor="releaseDate">Release date</Label>
            <Input
              type="date"
              id="releaseDate"
              className="mt-2"
              value={movieData.releaseDate}
              onChange={handleMovieChange}
            />
          </div>
          <div className="relative w-full">
            <Label htmlFor="runtime">Runtime</Label>
            <Input
              type="number"
              id="runtime"
              className="mt-2"
              value={movieData.runtime}
              onChange={handleMovieChange}
            />
          </div>
        </div>
        <div className="relative w-full">
          <Label htmlFor="genres">
            Genres{" "}
            <span className="text-[11px] opacity-50 text-red-400">
              Note:- Separate genres with a comma ( , )
            </span>
          </Label>
          <Input
            type="text"
            id="genres"
            placeholder="Enter genres"
            className="mt-2"
            value={movieData.genres}
            onChange={handleMovieChange}
          />
        </div>
      </div>

      <div className="mt-5">
        <Label htmlFor="description">Your message</Label>
        <Textarea
          placeholder="Type your message here."
          id="description"
          className="mt-2"
          value={movieData.description}
          onChange={handleMovieChange}
        />
      </div>

      {/* Cast Section */}
      <div className="mt-5">
        <h2 className="font-semibold text-lg">Cast</h2>
        {cast.map((member, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row gap-5 mt-3 items-center"
          >
            <div className="relative w-full">
              <Label>Cast Name</Label>
              <Input
                type="text"
                placeholder="Enter cast name"
                value={member.name}
                onChange={(e) =>
                  handleCastChange(index, "name", e.target.value)
                }
                className="mt-2"
              />
            </div>
            <div className="relative w-full">
              <Label>Cast Image</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  handleCastChange(index, "image", e.target.files[0])
                }
                className="mt-2"
              />
            </div>
            <Button
              variant="destructive"
              onClick={() => removeCastField(index)}
              className="mt-6"
            >
              Remove
            </Button>
          </div>
        ))}

        <Button onClick={addCastField} className="mt-4">
          + Add Cast
        </Button>
      </div>
      <div className="text-center">
        {
            loading ? (
              <Button type="submit" className="w-[80%] my-4" ><Loader2 className=" mr-2 h-4 w-4 animate-spin"/> please wait</Button>
            ) : (
          <Button type="submit" onClick={()=> handleSubmit()} className=" my-4 bg-amber-800 w-[70%]">Add-Movie</Button>
            )
          }
      </div>
    </div>
  );
};
