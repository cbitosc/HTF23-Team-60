import mongoose from "mongoose";

const adoptSchema = mongoose.Schema(
    {
        pet_id: {
            type: String,
            required: true,
        },
        adopter_id: {
            type: String,
            required: true,
        },
        sold: {
            type: Boolean,
            require: true,
        }
    },
    {
        timestamps: true,
    },
);

export const adopts = mongoose.model("adopts", adoptSchema);