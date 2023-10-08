import mongoose from "mongoose";

const petSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        owner: {
            type: String,
            required: true,
        },
        catagory: {
            type: String,
            required: true,
        },
        location: {
            type: String,
            required: true,
        },
        age: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        sold: {
            type: String,
            require: true,
        }
    },
    {
        timestamps: true,
    },
);

export const pets = mongoose.model("pets", petSchema);