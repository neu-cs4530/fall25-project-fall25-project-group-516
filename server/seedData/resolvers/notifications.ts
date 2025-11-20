import { DatabaseNotification } from '@fake-stack-overflow/shared/types/notification';
import { ReferenceResolver } from '../../types/populate'; // Adjust path if needed
import { Notification } from '@fake-stack-overflow/shared/types/notification';
import { resolveSingleRef } from './helpers';

/**
 * Resolver for notification documents.
 * Resolves contextId references from their string IDs to ObjectId references.
 */
const notificationResolver: ReferenceResolver<Notification, Omit<DatabaseNotification, '_id'>> = (
  doc,
  insertedDocs,
) => ({
  ...doc,
  // This looks up "question1" in the map of created questions to get the real ObjectId
  contextId: resolveSingleRef(
    doc.contextId as unknown as string,
    insertedDocs.question,
    'Question',
  ),
});

export default notificationResolver;
