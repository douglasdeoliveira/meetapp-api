import { Router } from 'express';
import multer from 'multer';

import FileController from './app/controllers/FileController';
import MeetupController from './app/controllers/MeetupController';
import OrganizingController from './app/controllers/OrganizingController';
import SessionController from './app/controllers/SessionController';
import SubscriptionController from './app/controllers/SubscriptionController';
import UserController from './app/controllers/UserController';
import authMiddleware from './app/middlewares/auth';
import multerConfig from './config/multer';

const routes = new Router();

const upload = multer(multerConfig);

routes.post('/users', UserController.save);
routes.post('/sessions', SessionController.save);

routes.use(authMiddleware);

routes.post('/files', upload.single('file'), FileController.save);

routes.put('/users', UserController.update);

routes.get('/meetups', MeetupController.index);
routes.get('/meetups/:id', MeetupController.findById);
routes.post('/meetups', MeetupController.save);
routes.put('/meetups/:id', MeetupController.update);
routes.delete('/meetups/:id', MeetupController.delete);

routes.get('/organizing', OrganizingController.index);
routes.get('/subscriptions', SubscriptionController.index);
routes.delete('/subscriptions/:id', SubscriptionController.delete);

routes.post('/meetups/:meetupId/subscriptions', SubscriptionController.save);

export default routes;
