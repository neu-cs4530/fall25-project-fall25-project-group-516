import express, { Request, Response, Router } from 'express';
import {
  createBadge,
  getAllBadges,
  getBadgeById,
  getUserBadgesWithProgress,
  checkAndAwardBadges,
  updateDisplayedBadges,
} from '../services/badge.service';
import { CreateBadgeRequest, GetUserBadgesRequest, FakeSOSocket } from '../types/types';

const badgeController = (socket: FakeSOSocket) => {
  const router: Router = express.Router();

  /**
   * Creates a new badge in the system.
   *
   * @param req The HTTP request object containing badge data
   * @param res The HTTP response object
   */
  const createNewBadge = async (req: CreateBadgeRequest, res: Response): Promise<void> => {
    try {
      const badge = await createBadge(req.body);

      if (!badge) {
        res.status(400).send('Failed to create badge');
        return;
      }

      socket.emit('badgeUpdate', { badge, type: 'created' });
      res.json(badge);
    } catch (err) {
      res.status(500).send(`Error creating badge: ${(err as Error).message}`);
    }
  };

  /**
   * Gets all badges in the system.
   *
   * @param _ The HTTP request object
   * @param res The HTTP response object
   */
  const getBadges = async (_: Request, res: Response): Promise<void> => {
    try {
      const badges = await getAllBadges();
      res.json(badges);
    } catch (err) {
      res.status(500).send(`Error fetching badges: ${(err as Error).message}`);
    }
  };

  /**
   * Gets a specific badge by ID.
   *
   * @param req The HTTP request object with badge ID in params
   * @param res The HTTP response object
   */
  const getBadge = async (req: Request, res: Response): Promise<void> => {
    try {
      const { badgeId } = req.params;
      const badge = await getBadgeById(badgeId);

      if (!badge) {
        res.status(404).send('Badge not found');
        return;
      }

      res.json(badge);
    } catch (err) {
      res.status(500).send(`Error fetching badge: ${(err as Error).message}`);
    }
  };

  /**
   * Gets all badges for a user with progress information.
   *
   * @param req The HTTP request object with username in params
   * @param res The HTTP response object
   */
  const getUserBadges = async (req: GetUserBadgesRequest, res: Response): Promise<void> => {
    try {
      const { username } = req.params;
      const badges = await getUserBadgesWithProgress(username);
      res.json(badges);
    } catch (err) {
      res.status(500).send(`Error fetching user badges: ${(err as Error).message}`);
    }
  };

  /**
   * Checks and awards any new badges to a user.
   *
   * @param req The HTTP request object with username in params
   * @param res The HTTP response object
   */
  const awardBadges = async (req: Request, res: Response): Promise<void> => {
    try {
      const { username } = req.params;
      const newBadges = await checkAndAwardBadges(username);

      socket.emit('badgeAwarded', { username, badges: newBadges });
      res.json({ newBadges });
    } catch (err) {
      res.status(500).send(`Error awarding badges: ${(err as Error).message}`);
    }
  };

  /**
   * Updates which badges a user wants to display.
   *
   * @param req The HTTP request object with username and badgeIds
   * @param res The HTTP response object
   */
  const updateUserDisplayedBadges = async (req: Request, res: Response): Promise<void> => {
    try {
      const { username, badgeIds } = req.body;

      if (!username || !Array.isArray(badgeIds)) {
        res.status(400).send('Invalid request: username and badgeIds array required');
        return;
      }

      const success = await updateDisplayedBadges(username, badgeIds);

      if (!success) {
        res.status(400).send('Failed to update displayed badges');
        return;
      }

      res.json({ success: true });
    } catch (err) {
      res.status(500).send(`Error updating displayed badges: ${(err as Error).message}`);
    }
  };

  // Routes
  router.post('/create', createNewBadge);
  router.get('/all', getBadges);
  router.get('/:badgeId', getBadge);
  router.get('/user/:username', getUserBadges);
  router.post('/award/:username', awardBadges);
  router.patch('/updateDisplayed', updateUserDisplayedBadges);

  return router;
};

export default badgeController;
