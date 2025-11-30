import { ObjectId } from 'mongodb';
import NotificationModel from '../../models/notifications.model';
import mongoose from 'mongoose';
import { saveNotification } from '../../services/notification.service';
import { Notification } from '@fake-stack-overflow/shared/types/notification';

describe('Notification Model', () => {
  const communityNotification: Notification = {
    title: 'You are notified!',
    msg: 'This is a notification! You are being notified!',
    dateTime: new Date('2024-12-03'),
    sender: 'user-admin',
    contextId: new ObjectId('65e9b716ff0e892116b2de09'),
    type: 'community',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('saveNotification', () => {
    it('should return ', async () => {
      jest.spyOn(NotificationModel, 'create').mockResolvedValueOnce({
        ...communityNotification,
        _id: new mongoose.Types.ObjectId(),
      } as unknown as ReturnType<typeof NotificationModel.create<Notification>>);
      await saveNotification(communityNotification);
    });
  });
});
