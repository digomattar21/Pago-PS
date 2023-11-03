import express from 'express';
import { UserController } from '../controller/UserController';
import { container } from 'tsyringe';

const userController = container.resolve(UserController);

const router = express.Router();

router.get('/:id', (request,response) => userController.read(request,response));
router.post('/create', (request,response) => userController.create(request,response));
router.put('/update/:id', (request,response) => userController.update(request,response));
router.delete('/delete/:id', (request,response) => userController.delete(request,response));

export default router;