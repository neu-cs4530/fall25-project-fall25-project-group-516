import { DatabaseNotification } from '@fake-stack-overflow/shared/types/notification';
import { PopulatedUserNotificationStatus } from '@fake-stack-overflow/shared';
import { useEffect, useState } from 'react';
import useUserContext from './useUserContext';
import { useNavigate } from 'react-router-dom';
import { readAllNotifications, readNotification } from '../services/userService';

const useNotificationsPage = () => {
  const { user } = useUserContext();
  const navigate = useNavigate();

  const [notificationsList, setNotificationsList] = useState<PopulatedUserNotificationStatus[]>(
    user.notifications ?? [],
  );

  const [isTabOpen, setisTabOpen] = useState<boolean>(false);

  const handleNotificationRedirect = (notif: DatabaseNotification): void => {
    switch (notif.type) {
      case 'comment':
      case 'answer':
        navigate(`/question/${notif.contextId}`);
        break;
      case 'report':
      case 'unban':
        navigate(`/manage/${notif.contextId}`);
        break;
      case 'message':
        navigate(`/messaging/direct-message`);
        break;
    }
  };

  const handleReadNotification = async (notifId: string): Promise<void> => {
    await readNotification(user.username, notifId);
  };

  const handleReadAllNotifications = async (): Promise<void> => {
    const notificationIds = notificationsList.map(n => n.notification._id.toString());
    await readAllNotifications(user.username, notificationIds);
  };

  useEffect(() => {
    const sortNotifications = async () => {
      const sortedResult = [...notificationsList].sort((a, b) => {
        const dateA = new Date(a.notification.dateTime || 0).getTime();
        const dateB = new Date(b.notification.dateTime || 0).getTime();

        return dateB - dateA;
      });

      setNotificationsList(sortedResult);
    };

    sortNotifications();
  }, [notificationsList]);

  return {
    notificationsList,
    isTabOpen,
    setisTabOpen,
    handleNotificationRedirect,
    handleReadNotification,
    handleReadAllNotifications,
  };
};

export default useNotificationsPage;
