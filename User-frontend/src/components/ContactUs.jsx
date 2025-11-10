import React, { useState } from "react";

const ContactUs = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for contacting CineFlixX! We'll get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white px-6 py-16">
      <div className="max-w-2xl mt-8 w-full border rounded-2xl shadow-lg p-8">
        <h1 className="text-4xl font-extrabold text-center mb-6 text-red-500">
          Contact Us
        </h1>
        <p className="text-center text-gray-300 mb-8">
          CineFlixX se related kisi bhi query ke liye niche form fill karein.  
          Hamari team aapko jaldi contact karegi. 🎬
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-300 mb-2">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-red-500 outline-none"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-red-500 outline-none"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full p-3 h-32 rounded-lg  border border-gray-700 focus:border-red-500 outline-none"
              placeholder="Write your message..."
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 transition-all text-white font-semibold py-3 rounded-lg"
          >
            Send Message
          </button>
        </form>

        <div className="mt-10 text-center text-gray-400 text-sm">
          <p>📧 Email: support@cineflixx.com</p>
          <p>📞 Phone: +91 98765 43210</p>
          <p>🏫 College: Chameli Devi Institute of Professional Studies, Indore</p>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
