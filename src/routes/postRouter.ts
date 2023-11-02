import express from 'express';
import { PostController } from '../controller/PostController';
import { container } from 'tsyringe';

const postController = container.resolve(PostController);

const router = express.Router();

router.get('/:id',(request,response) => postController.read(request,response));
router.post('/create',(request,response) =>  postController.create(request,response));
router.put('/update/:id',(request,response) =>  postController.update(request,response));
router.delete('/delete/:id',(request,response) =>  postController.delete(request,response));

export default router;