import { DatabaseBadge, BadgeWithProgress } from '../types/types';
import api from './config';

const BADGE_API_URL = `/api/badge`;

/**
 * Gets all badges in the system.
 * @returns A promise that resolves to an array of all badges
 * @throws Error if the request fails
 */
const getAllBadges = async (): Promise<DatabaseBadge[]> => {
  const res = await api.get(`${BADGE_API_URL}/all`);
  if (res.status !== 200) {
    throw new Error('Error when fetching badges');
  }
  return res.data;
};

/**
 * Gets a specific badge by ID.
 * @param badgeId The ID of the badge to fetch
 * @returns A promise that resolves to the badge
 * @throws Error if the request fails
 */
const getBadgeById = async (badgeId: string): Promise<DatabaseBadge> => {
  const res = await api.get(`${BADGE_API_URL}/${badgeId}`);
  if (res.status !== 200) {
    throw new Error('Error when fetching badge');
  }
  return res.data;
};

/**
 * Gets all badges for a user with their progress information.
 * @param username The username of the user
 * @returns A promise that resolves to an array of badges with progress
 * @throws Error if the request fails
 */
const getUserBadges = async (username: string): Promise<BadgeWithProgress[]> => {
  const res = await api.get(`${BADGE_API_URL}/user/${username}`);
  if (res.status !== 200) {
    throw new Error('Error when fetching user badges');
  }
  return res.data;
};

/**
 * Checks and awards any new badges to a user based on their activity.
 * @param username The username of the user
 * @returns A promise that resolves to an array of newly earned badges
 * @throws Error if the request fails
 */
const awardBadges = async (username: string): Promise<DatabaseBadge[]> => {
  const res = await api.post(`${BADGE_API_URL}/award/${username}`);
  if (res.status !== 200) {
    throw new Error('Error when awarding badges');
  }
  return res.data.newBadges;
};

/**
 * Updates which badges a user wants to display on their profile.
 * @param username The username of the user
 * @param badgeIds Array of badge IDs to display
 * @returns A promise that resolves to true if successful
 * @throws Error if the request fails
 */
const updateDisplayedBadges = async (username: string, badgeIds: string[]): Promise<boolean> => {
  const res = await api.patch(`${BADGE_API_URL}/updateDisplayed`, {
    username,
    badgeIds,
  });
  if (res.status !== 200) {
    throw new Error('Error when updating displayed badges');
  }
  return res.data.success;
};

export { getAllBadges, getBadgeById, getUserBadges, awardBadges, updateDisplayedBadges };
