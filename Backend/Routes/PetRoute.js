import express from "express";
import { pets } from "../models/PetModel.js"

const router = express.Router();

router.post("/", async (request, response) => {
    try {

        const { name, owner, age, catagory, image, location, description, sold } = request.body;
        if (!name ||
            !owner ||
            !age ||
            !catagory ||
            !image ||
            !location ||
            !description ||
            !sold
        ) {
            response.status(400).send({ message: 'All fields required' });
        }
        const newpet = {
            name,
            owner,
            image,
            age,
            catagory,
            location,
            description,
            sold
        }
        const pet = await pets.create(newpet);
        return response.status(201).send(pet);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

router.get("/", async (request, response) => {
    try {
        const data = await pets.find({});
        return response.status(200).json({
            count: data.length,
            data: data
        });
    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message })
    }
});

router.get("/user/:owner", async (request, response) => {
    try {
        const { owner } = request.params;
        if (!owner) {
            return response.status(400).send({
                message: 'All required fields are missing.',
            });
        }
        const data = await pets.find({ owner });
        if (!data) {
            return response.status(401).send({
                message: 'Not Found',
            });
        }
        return response.status(200).json(data);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});


router.get("/:id", async (request, response) => {
    try {
        const { id } = request.params;
        const data = await pets.findById(id);
        return response.status(200).json(data);
    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
});


router.delete("/:id", async (request, response) => {
    try {
        const { id } = request.params;
        const result = await pets.findByIdAndDelete(id);
        if (!result) {
            return response.status(404).json({ message: 'Pet not found' });
        }
        return response.status(200).send({ message: "Pet deleted successfully" });
    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
});


router.put("/:id", async (request, response) => {
    try {
        if (
            !request.body.name ||
            !request.body.owner ||
            !request.body.age ||
            !request.body.catagory ||
            !request.body.image ||
            !request.body.location ||
            !request.body.description ||
            !request.body.sold
        ) {
            return response.status(400).send({
                message: 'Send all required fields',
            })
        }

        const { id } = request.params;

        const result = await pets.findByIdAndUpdate(id, request.body);
        if (!result) {
            return response.status(404).json({ message: 'Pet not found' });
        }
        return response.status(200).send({ message: "Pet updated successfully" });

    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
});

export default router;