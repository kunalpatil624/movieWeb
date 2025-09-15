import mongoose from "mongoose";

const superAdminSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email:{type:String, required:true},
    userName: {type:String, required:true, unique: true},
    password: { type: String, required: true }
});

const SuperAdmin = mongoose.model("SuperAdmin", superAdminSchema);
export default SuperAdmin;
