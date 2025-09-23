import React from "react";
import UseGetSingleRequest from "./hooks/UseGetSingleRequest";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Download, Eye } from "lucide-react";
import axios from "axios";
import { ADMIN_REQUEST_API_AND_POINT } from "./utills/constand";
import { toast } from "sonner";

const RequestDetail = () => {
  const { id } = useParams();
  UseGetSingleRequest(id);
  const request = useSelector((state) => state.request.singleRequest);

  if (!request)
    return <p className="text-center text-gray-400 mt-20">Loading...</p>;

  // Helper to extract filename from URL
  const getFileName = (url) => {
    try {
      return url.split("/").pop().split("?")[0];
    } catch {
      return "Document";
    }
  };

  const handleAcceptReject = async(status, rejectionReason)=> {
    try {
      const res = await axios.put(`${ADMIN_REQUEST_API_AND_POINT}/${id}/update`, {status, rejectionReason}, {withCredentials:true});
      if(res.data.success){
        toast.success(res.data.message)
        return;
      }
      toast.error(res?.data?.messsage);
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.log(error)
    }
  }
  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* User & Theater Info */}
      <div className="space-y-3">
        <h2 className="text-2xl font-bold border-b border-gray-700 pb-2">
          Request Details
        </h2>

        <div className="grid md:grid-cols-2 gap-4 text-gray-200">
          <p>
            <span className="font-medium">User:</span> <span className="text-sm text-gray-400">{request.user?.fullName}</span>
          </p>
          <p>
            <span className="font-medium">Theater Name:</span>{" "}
            <span className="text-sm text-gray-400">{request.theaterName}</span>
          </p>
          <p>
            <span className="font-medium">Location:</span> 
            <span className="text-sm text-gray-400">{request.location}</span>
          </p>
          <p>
            <span className="font-medium">Email:</span>  
            <span className="text-sm text-gray-400">{request.theaterEmail}</span>
          </p>
          <p>
            <span className="font-medium">Phone:</span> 
            <span className="text-sm text-gray-400">{request.theaterPhone}</span>
          </p>
        </div>

        {/* Logo */}
        {request.theaterLogo && (
          <div className="mt-4 ">
            <img
              src={request.theaterLogo}
              alt={request.theaterName}
              className="w-48 h-48 object-contain rounded-lg shadow-md"
            />
          </div>
        )}
      </div>

      {/* Facilities */}
      {request.facilities?.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-2 border-b border-gray-700 pb-1">
            Facilities
          </h2>
          <ul className="flex flex-wrap gap-2 mt-2 text-gray-300">
            {request.facilities.map((facility, idx) => (
              <li
                key={idx}
                className="px-3 py-1 bg-gray-700/30 rounded-full text-sm"
              >
                {facility}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Theater Images */}
      {request.theaterImages?.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-2 border-b border-gray-700 pb-1">
            Theater Images
          </h2>
          <div className="flex gap-4 overflow-x-auto py-2">
            {request.theaterImages.map((image, idx) => (
              <img
                key={idx}
                src={image}
                alt={`Theater ${idx}`}
                className="w-64 h-44 object-cover rounded-lg shadow-md flex-shrink-0"
              />
            ))}
          </div>
        </div>
      )}

      {/* Documents Section */}
      {request.documents?.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-2 border-b border-gray-700 pb-1">
            Documents
          </h2>
          <div className="flex flex-col gap-2 max-h-64">
            {request.documents.map((doc, idx) => (
              <div
                key={idx}
                className="flex justify-between items-center bg-gray-800/40 px-4 py-2 rounded-md"
              >
                <p className="truncate text-sm text-gray-200 w-2/3">
                  {getFileName(doc)}
                </p>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(doc, "_blank")}
                  >
                    <Eye className="w-4 h-4 mr-1" /> View
                  </Button>
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => {
                      const link = document.createElement("a");
                      link.href = doc;
                      link.download = getFileName(doc);
                      link.click();
                    }}
                  >
                    <Download className="w-4 h-4 mr-1" /> Download
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="flex gap-2 ">
        <Button
        className='bg-red-600 hover:bg-red-800'
          onClick={() => handleAcceptReject("rejected", "Reason not specified")}
        >
          Reject
        </Button>
        <Button
        className='bg-blue-600 hover:bg-blue-800'
         onClick={() => handleAcceptReject("approved", "N/A")}>
          Accept
        </Button>
      </div>
    </div>
  );
};

export default RequestDetail;
