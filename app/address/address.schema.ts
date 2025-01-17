import mongoose from "mongoose";
import { type IAddress } from "./address.dto";

const Schema = mongoose.Schema;

// Define the Address schema
const AddressSchema = new Schema<IAddress>({
  postalCode: {
    type: String,
    required: true,
    unique:true,
    match: /^[A-Z]{1,2}[0-9]{1,2}$/, 
  },

}, { timestamps: true });

export default mongoose.model<IAddress>("Address", AddressSchema);
