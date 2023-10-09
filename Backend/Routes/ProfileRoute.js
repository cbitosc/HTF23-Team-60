import express from 'express';
import { profiles } from '../models/ProfileModel.js';

const router = express.Router();

router.post("/", async (request, response) => {
    try {
        const { username, password, phone, email, image } = request.body;

        if (!username || !password || !phone || !email || !image) {
            return response.status(400).send({
                message: 'All fields are required',
            });
        }

        const existingProfile = await profiles.findOne({ username });

        if (existingProfile) {
            return response.status(400).send({
                message: 'Username is already taken. Please choose a different username.',
            });
        }

        const newProfile = {
            username,
            password,
            phone,
            email,
            image,
        };

        const profile = await profiles.create(newProfile);

        return response.status(201).send(profile);
    } catch (error) {
        console.error(error.message);
        response.status(500).send({ message: error.message });
    }
});


router.put("/:id ", async (request, response) => {
    try {
        if (
            !request.body.username ||
            !request.body.password ||
            !request.body.phone ||
            !request.body.email ||
            !request.body.image
        ) {
            return response.status(400).send({
                message: 'All fields are required',
            })
        }

        const { id } = request.params;

        const result = await profiles.findByIdAndUpdate(id, request.body);
        if (!result) {
            return response.status(404).json({ message: 'Profile not found' });
        }
        return response.status(200).send({ message: "Profile updated successfully" });

    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
});


router.get("/:id", async (request, response) => {
    try {
        const { id } = request.params;
        const data = await profiles.findById(id);
        return response.status(200).json(data);
    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
});


router.delete("/:id", async (request, response) => {
    try {
        const { id } = request.params;
        const result = await profiles.findByIdAndDelete(id);
        if (!result) {
            return response.status(404).json({ message: 'Profile not found' });
        }
        return response.status(200).send({ message: "Profile deleted successfully" });
    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
});


router.post("/login", async (request, response) => {
    try {
        const { e_or_u, password } = request.body;
        if (!e_or_u || !password) {
            return response.status(400).send({
                message: 'Email or username and password are required fields.',
            });
        }
        const email = e_or_u;
        const username = e_or_u;
        const student_e = await profiles.findOne({ email, password });
        const student_u = await profiles.findOne({ username, password });

        if (!student_u && !student_e) {
            return response.status(401).send({
                message: 'Invalid username or email or password.',
            });
        }
        if (!student_e) {
            return response.status(200).json(student_u);
        } else {
            return response.status(200).json(student_e);
        }
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});


// router.post("/logout", (request, response) => {
//     try {
//         request.session.destroy((error) => {
//             if (error) {
//                 console.error("Error destroying session:", error);
//                 return response.status(500).send({ message: "Logout failed" });
//             }
//             return response.status(200).send({ message: "Logout successful" });
//         });

//     } catch (error) {
//         console.error(error.message);
//         response.status(500).send({ message: error.message });
//     }
// });

export default router;