import { Router } from 'express';
import multer from 'multer';

import FileController from './app/controllers/FileController';
import MeetupController from './app/controllers/MeetupController';
import OrganizingController from './app/controllers/OrganizingController';
import SessionController from './app/controllers/SessionController';
import SubscriptionController from './app/controllers/SubscriptionController';
import UserController from './app/controllers/UserController';
import authMiddleware from './app/middlewares/Auth';
import MeetupLoader from './app/middlewares/MeetupLoader';
import MeetupPastDate from './app/middlewares/MeetupPastDate';
import MeetupPermission from './app/middlewares/MeetupPermission';
import validateMeetupSave from './app/validators/MeetupSave';
import validateMeetupUpdate from './app/validators/MeetupUpdate';
import validateSessionSave from './app/validators/SessionSave';
import validateUserSave from './app/validators/UserSave';
import validateUserUpdate from './app/validators/UserUpdate';
import multerConfig from './config/multer';

const routes = new Router();

const upload = multer(multerConfig);

/* Auth */
routes.post('/sessions', validateSessionSave, SessionController.save);
routes.post('/sessions/refresh', SessionController.update);

/* Users */
routes.post('/users', validateUserSave, UserController.save);
routes.use(authMiddleware);
routes.put('/users', validateUserUpdate, UserController.update);

/* Files */
routes.post('/files', upload.single('file'), FileController.save);

/* Meetups */
routes.get('/meetups', MeetupController.index);
routes.post('/meetups', validateMeetupSave, MeetupController.save);
routes.use('/meetups/:id', MeetupLoader);
routes.get('/meetups/:id', MeetupController.findById);
routes.put(
  '/meetups/:id',
  validateMeetupUpdate,
  MeetupPermission,
  MeetupPastDate,
  MeetupController.update
);
routes.delete(
  '/meetups/:id',
  MeetupPermission,
  MeetupPastDate,
  MeetupController.delete
);

/* Organizing */
routes.get('/organizing', OrganizingController.index);

/* Subscriptions */
routes.get('/subscriptions', SubscriptionController.index);
routes.delete('/subscriptions/:id', SubscriptionController.delete);
routes.post('/meetups/:meetupId/subscriptions', SubscriptionController.save);

export default routes;
