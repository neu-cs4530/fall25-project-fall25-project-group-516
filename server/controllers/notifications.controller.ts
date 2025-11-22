import express, { Router, Response } from 'express';
import { FakeSOSocket } from '../types/types';
import { addNotificationToUsers, saveNotification } from '../services/notification.service';
import { SendNotificationRequest } from '@fake-stack-overflow/shared/types/notification';

const notificationController = (socket: FakeSOSocket) => {
  const router: Router = express.Router();

  const sendNotification = async (req: SendNotificationRequest, res: Response): Promise<void> => {
    try {
      const { recipients, notification } = req.body;

      const savedNotif = await saveNotification(notification);

      if (savedNotif && 'error' in savedNotif) {
        throw new Error(savedNotif.error as string);
      }

      const status = await addNotificationToUsers(recipients, savedNotif);

      if (status && 'error' in status) {
        throw new Error(status.error as string);
      }

      socket.emit('notificationUpdate', {
        notification: savedNotif,
      });

      res.json(savedNotif);
    } catch (error) {
      res.status(500).send(`Error when sending notification: ${(error as Error).message}`);
    }
  };

  router.post('/sendNotification', sendNotification);

  return router;
};

export default notificationController;
