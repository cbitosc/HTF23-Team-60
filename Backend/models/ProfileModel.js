import mongoose from "mongoose";

const profileSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            index: { unique: true },
        },
        password: {
            type: String,
            select: false,
            required: true,
        },
        phone: {
            type: Number,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    },
);

export const profiles = mongoose.model("profiles", profileSchema);