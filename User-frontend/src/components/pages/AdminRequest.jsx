import React, { useState } from 'react';
import axios from 'axios';
import { REQUEST_API_AND_POINT } from '../comonent/utills/constand';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const AdminRequest = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    theaterName: '',
    location: '',
    seats: '',
    facilities: [],
    priority: 'medium',
    agreeTerms: false,
  });

  const [documents, setDocuments] = useState([]);
  const [theaterImages, setTheaterImages] = useState([]);
  const [theaterLogo, setTheaterLogo] = useState(null); // ✅ FIXED

  const facilitiesOptions = [
    'AC',
    'Non-AC',
    '3D Screens',
    'Snack Bar',
    'Wheelchair Accessible',
  ];

  // Handle text, checkbox, select changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox' && name === 'facilities') {
      let newFacilities = [...formData.facilities];
      if (checked) newFacilities.push(value);
      else newFacilities = newFacilities.filter((f) => f !== value);
      setFormData({ ...formData, facilities: newFacilities });
    } else if (type === 'checkbox' && name === 'agreeTerms') {
      setFormData({ ...formData, agreeTerms: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Handle file uploads
  const handleFileChange = (e, type) => {
    const files = Array.from(e.target.files);
    if (type === 'documents') setDocuments(files);
    else if (type === 'theaterImages') setTheaterImages(files);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.agreeTerms) {
      toast.error("Please agree to the terms and conditions.");
      return;
    }

    try {
      const data = new FormData();
      data.append('theaterName', formData.theaterName);
      data.append('location', formData.location);
      data.append('seats', formData.seats);
      data.append('priority', formData.priority);
      data.append('facilities', JSON.stringify(formData.facilities));

      documents.forEach((file) => data.append('documents', file));
      theaterImages.forEach((file) => data.append('theaterImages', file));
      if (theaterLogo) data.append('theaterLogo', theaterLogo);

      const res = await axios.post(`${REQUEST_API_AND_POINT}/send`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        navigate('/');
      }

      // Reset form
      setFormData({
        theaterName: '',
        location: '',
        seats: '',
        facilities: [],
        priority: 'medium',
        agreeTerms: false,
      });
      setDocuments([]);
      setTheaterImages([]);
      setTheaterLogo(null);

    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="px-6 md:px-16 lg:px-36 mt-20 w-full text-gray-300">
      <h1 className="text-3xl font-semibold mb-6">Theater Request Form</h1>
      <p className="mb-6 text-gray-400">
        Fill in your theater details. License/ownership proof is mandatory.
        Optional images help admin verify your theater visually.
      </p>

      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-8 rounded-lg space-y-6"
      >
        {/* Theater Name */}
        <div>
          <label className="block mb-2">Theater Name</label>
          <input
            type="text"
            name="theaterName"
            value={formData.theaterName}
            onChange={handleChange}
            required
            className="w-full p-3 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Location */}
        <div>
          <label className="block mb-2">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            className="w-full p-3 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Seats */}
        <div>
          <label className="block mb-2">Number of Seats</label>
          <input
            type="number"
            name="seats"
            value={formData.seats}
            onChange={handleChange}
            required
            min={1}
            className="w-full p-3 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Facilities */}
        <div>
          <label className="block mb-2">Facilities</label>
          <div className="flex flex-wrap gap-4">
            {facilitiesOptions.map((facility) => (
              <label key={facility} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="facilities"
                  value={facility}
                  checked={formData.facilities.includes(facility)}
                  onChange={handleChange}
                  className="accent-blue-500"
                />
                {facility}
              </label>
            ))}
          </div>
        </div>

        {/* Priority */}
        <div>
          <label className="block mb-2">Priority</label>
          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="w-full p-3 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        {/* Documents */}
        <div>
          <label className="block mb-2">
            License / Ownership Document <span className="text-red-500">*</span>
          </label>
          <input
            type="file"
            multiple
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={(e) => handleFileChange(e, "documents")}
            required
            className="w-full p-2 rounded bg-gray-700 focus:outline-none"
          />
        </div>

        {/* Theater Logo */}
        <div>
          <label className="block mb-2">
            Theater Logo <span className="text-red-500">*</span>
          </label>
          <input
            type="file"
            accept=".jpg,.jpeg,.png"
            onChange={(e) => setTheaterLogo(e.target.files[0])}
            required
            className="w-full p-2 rounded bg-gray-700 focus:outline-none"
          />
        </div>

        {/* Theater Images */}
        <div>
          <label className="block mb-2">Theater Images (Optional)</label>
          <input
            type="file"
            multiple
            accept=".jpg,.jpeg,.png"
            onChange={(e) => handleFileChange(e, "theaterImages")}
            className="w-full p-2 rounded bg-gray-700 focus:outline-none"
          />

          {/* Preview */}
          <div className="flex gap-4 mt-2 flex-wrap">
            {theaterImages.map((file, index) => (
              <img
                key={index}
                src={URL.createObjectURL(file)}
                alt={`theater-${index}`}
                className="w-24 h-24 object-cover rounded"
              />
            ))}
          </div>
        </div>

        {/* Terms & Conditions */}
        <div className="flex items-start gap-2">
          <input
            type="checkbox"
            name="agreeTerms"
            checked={formData.agreeTerms}
            onChange={handleChange}
            className="accent-blue-500 mt-1"
          />
          <p className="text-gray-400 text-sm">
            I agree to the{" "}
            <a href="/terms" className="text-blue-500 underline">
              Terms & Conditions
            </a>
          </p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 transition px-6 py-3 rounded font-semibold"
        >
          Submit Request
        </button>
      </form>
    </div>
  );
};

export default AdminRequest;
