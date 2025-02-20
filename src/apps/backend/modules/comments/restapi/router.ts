import express from 'express';
import CommentController from './controller';
import { CommentService } from '../commentservice';
import CommentRepository from '../internal/store/comment-repository'; // Import the Mongoose model

const router = express.Router();
const commentService = new CommentService(CommentRepository); // Pass the actual model
const commentController = new CommentController(commentService);

router.get('/comments/:taskId', commentController.getComments.bind(commentController));
router.post('/comments/:taskId', commentController.addComment.bind(commentController));
router.put('/comments/:commentId', commentController.updateComment.bind(commentController));
router.delete('/comments/:commentId', commentController.deleteComment.bind(commentController));

export default router;
