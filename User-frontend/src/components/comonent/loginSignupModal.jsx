// import { useState } from "react";
// import axios from "axios";
// import { useDispatch } from "react-redux";
// import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { setCredentials } from "./redux/authSlice"; 
// import { USER_API_AND_POINT } from "./utills/constand.js";
// import { useNavigate } from "react-router-dom";
// import { toast } from "sonner";
// import "react-phone-number-input/style.css";
// import PhoneInput from "react-phone-number-input";

// const LoginSignupModal = ({ open, onClose }) => {
//   const [isLogin, setIsLogin] = useState(true);
//   const [step, setStep] = useState("form"); // 👈 new state: form | otp
//   const [otp, setOtp] = useState("");
//   const [input, setInput] = useState({ name: "", email: "", password: "", phone: "" });
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setInput({ ...input, [e.target.name]: e.target.value });
//   };

//   // ✅ Handle Signup/Login Submit
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       if (isLogin) {
//         // ---------- LOGIN ----------
//         const res = await axios.post(
//           `${USER_API_AND_POINT}/login`,
//           { email: input.email, password: input.password },
//           { headers: { "Content-Type": "application/json" }, withCredentials: true }
//         );

//         if (res.data.success) {
//           dispatch(setCredentials({ user: res.data.user, token: res.data.token }));
//           navigate("/home");
//           toast.success(res.data.message);
//           onClose();
//         } else {
//           toast.error(res.data.message || "Invalid credentials");
//         }
//       } else {
//         // ---------- SIGNUP (STEP 1: send OTP) ----------
//         if (step === "form") {
//           const res = await axios.post(`${USER_API_AND_POINT}/send-otp`, {
//             fullName: input.name, // 👈 fullName
//             email: input.email,
//             phoneNumber: input.phone, // 👈 phoneNumber
//             password: input.password,
//           });

//           if (res.data.success) {
//             toast.success("OTP sent to your email/phone");
//             setStep("otp"); // 👉 move to OTP step
//           } else {
//             toast.error(res.data.message || "Failed to send OTP");
//           }
//         } 
//         // ---------- SIGNUP (STEP 2: verify OTP) ----------
//         else if (step === "otp") {
//           const res = await axios.post(`${USER_API_AND_POINT}/verify-otp`, {
//             email: input.email,
//             otp,
//           });

//           if (res.data.success) {
//             toast.success("Signup successful! Please login.");
//             setIsLogin(true);
//             setStep("form"); 
//           } else {
//             toast.error(res.data.message || "Invalid OTP");
//           }
//         }
//       }
//     } catch (error) {
//       console.error(error.response?.data);
//       toast.error(error.response?.data?.message || "Something went wrong");
//     }
//   };

//   if (!open) return null;

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
//       <Card className="w-[400px] relative mx-3">
//         {/* Close Button */}
//         <button
//           onClick={onClose}
//           className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
//         >
//           ✖
//         </button>

//         {/* Header */}
//         <CardHeader>
//           <CardTitle className="text-center">
//             {isLogin ? "Login" : step === "form" ? "Sign Up" : "Verify OTP"}
//           </CardTitle>
//         </CardHeader>

//         {/* Content */}
//         <CardContent>
//           <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
//             {isLogin ? (
//               <>
//                 <Input type="email" name="email" placeholder="Email" required value={input.email} onChange={handleChange} />
//                 <Input type="password" name="password" placeholder="Password" required value={input.password} onChange={handleChange} />
//               </>
//             ) : step === "form" ? (
//               <>
//                 <Input type="text" name="name" placeholder="Full Name" required value={input.name} onChange={handleChange} />
//                 <Input type="email" name="email" placeholder="Email" required value={input.email} onChange={handleChange} />
//                 <PhoneInput
//                   className="border p-1 rounded-md"
//                   defaultCountry="IN"
//                   placeholder="Enter phone number"
//                   value={input.phone}
//                   onChange={(value) => setInput({ ...input, phone: value })}
//                 />
//                 <Input type="password" name="password" placeholder="Password" required value={input.password} onChange={handleChange} />
//               </>
//             ) : (
//               <Input
//                 type="text"
//                 name="otp"
//                 placeholder="Enter OTP"
//                 required
//                 value={otp}
//                 onChange={(e) => setOtp(e.target.value)}
//               />
//             )}

//             <Button type="submit" className="w-full mt-2">
//               {isLogin ? "Login" : step === "form" ? "Send OTP" : "Verify OTP"}
//             </Button>
//           </form>
//         </CardContent>

//         {/* Footer */}
//         <CardFooter className="flex justify-center">
//           <p className="text-sm">
//             {isLogin ? "Don’t have an account?" : "Already have an account?"}{" "}
//             <span
//               onClick={() => {
//                 setIsLogin(!isLogin);
//                 setStep("form");
//               }}
//               className="text-blue-600 cursor-pointer hover:underline"
//             >
//               {isLogin ? "Sign Up" : "Login"}
//             </span>
//           </p>
//         </CardFooter>
//       </Card>
//     </div>
//   );
// };

// export default LoginSignupModal;


import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { setCredentials } from "./redux/authSlice";
import { USER_API_AND_POINT } from "./utills/constand.js";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

const LoginSignupModal = ({ open, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [step, setStep] = useState("form"); // form | otp
  const [otp, setOtp] = useState("");
  const [input, setInput] = useState({ name: "", email: "", password: "", phone: "" });
  const [loading, setLoading] = useState(false); // ✅ new loading state

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // ✅ Start loading

    try {
      if (isLogin) {
        // ---------- LOGIN ----------
        const res = await axios.post(
          `${USER_API_AND_POINT}/login`,
          { email: input.email, password: input.password },
          { headers: { "Content-Type": "application/json" }, withCredentials: true }
        );

        if (res.data.success) {
          dispatch(setCredentials({ user: res.data.user, token: res.data.token }));
          navigate("/home");
          toast.success(res.data.message);
          onClose();
        } else {
          toast.error(res.data.message || "Invalid credentials");
        }
      } else {
        // ---------- SIGNUP ----------
        if (step === "form") {
          const res = await axios.post(`${USER_API_AND_POINT}/send-otp`, {
            fullName: input.name,
            email: input.email,
            phoneNumber: input.phone,
            password: input.password,
          });

          if (res.data.success) {
            toast.success("OTP sent to your email/phone");
            setStep("otp");
          } else {
            toast.error(res.data.message || "Failed to send OTP");
          }
        } else if (step === "otp") {
          const res = await axios.post(`${USER_API_AND_POINT}/verify-otp`, {
            email: input.email,
            otp,
          });

          if (res.data.success) {
            toast.success("Signup successful! Please login.");
            setIsLogin(true);
            setStep("form");
          } else {
            toast.error(res.data.message || "Invalid OTP");
          }
        }
      }
    } catch (error) {
      console.error(error.response?.data);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false); // ✅ Stop loading
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <Card className="w-[400px] relative mx-3">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
        >
          ✖
        </button>

        <CardHeader>
          <CardTitle className="text-center">
            {isLogin ? "Login" : step === "form" ? "Sign Up" : "Verify OTP"}
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
            {isLogin ? (
              <>
                <Input
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  value={input.email}
                  onChange={handleChange}
                />
                <Input
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                  value={input.password}
                  onChange={handleChange}
                />
              </>
            ) : step === "form" ? (
              <>
                <Input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  required
                  value={input.name}
                  onChange={handleChange}
                />
                <Input
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  value={input.email}
                  onChange={handleChange}
                />
                <PhoneInput
                  className="border p-1 rounded-md"
                  defaultCountry="IN"
                  placeholder="Enter phone number"
                  value={input.phone}
                  onChange={(value) => setInput({ ...input, phone: value })}
                />
                <Input
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                  value={input.password}
                  onChange={handleChange}
                />
              </>
            ) : (
              <Input
                type="text"
                name="otp"
                placeholder="Enter OTP"
                required
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            )}

            {/* ✅ Button with spinner */}
            <Button type="submit" className="w-full mt-2" disabled={loading}>
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <span className="h-4 w-4 border-2 border-t-transparent border-white rounded-full animate-spin"></span>
                  {isLogin
                    ? "Logging in..."
                    : step === "form"
                    ? "Sending OTP..."
                    : "Verifying..."}
                </div>
              ) : (
                <>
                  {isLogin ? "Login" : step === "form" ? "Send OTP" : "Verify OTP"}
                </>
              )}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex justify-center">
          <p className="text-sm">
            {isLogin ? "Don’t have an account?" : "Already have an account?"}{" "}
            <span
              onClick={() => {
                setIsLogin(!isLogin);
                setStep("form");
              }}
              className="text-blue-600 cursor-pointer hover:underline"
            >
              {isLogin ? "Sign Up" : "Login"}
            </span>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginSignupModal;
