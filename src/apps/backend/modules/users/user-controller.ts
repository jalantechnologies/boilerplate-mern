import express from 'express';
import { getAllUsers } from './user-service';

const router = express.Router();

router.get('/users', async (req, res) => {
    try {
        const users = await getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
