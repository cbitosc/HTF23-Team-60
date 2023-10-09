import express from "express";
import { adopts } from "../models/AdoptModel.js"

const router = express.Router();

router.post("/", async (request, response) => {
    try {
        if (!request.body.pet_id ||
            !request.body.adopter_id ||
            !request.body.sold
        ) {
            response.status(400).send({ message: 'All fields required' });
        }
        const newadopt = {
            pet_id: request.body.pet_id,
            adopter_id: request.body.adopter_id,
            sold: request.body.sold
        }
        const adopt = await adopts.create(newadopt);
        return response.status(201).send(adopt);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});



router.get("/:id", async (request, response) => {
    try {
        const { id } = request.params;
        const data = await adopts.findById(id);
        return response.status(200).json(data);
    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
});


router.delete("/:id", async (request, response) => {
    try {
        const { id } = request.params;
        const result = await adopts.findByIdAndDelete(id);
        if (!result) {
            return response.status(404).json({ message: 'Pet not found' });
        }
        return response.status(200).send({ message: "Pet deleted successfully" });
    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
});


export default router;