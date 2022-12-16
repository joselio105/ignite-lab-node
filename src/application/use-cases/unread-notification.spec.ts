import { makeNotification } from "@test/factories/notification-factory";
import { InMemoryNotificationRepository } from "@test/repositories/in-memory-notification-repository";
import { NotificationNotFoundError } from "./errors/notification-not-found-error";
import { UnreadNotification } from "./unread-notification";

describe('Unread Notification', () => {
    it('should be able to unread a notification', async () => {
        const notificationRepository = new InMemoryNotificationRepository();
        const unreadNotification = new UnreadNotification(notificationRepository);

        const newNotification = makeNotification({
            readAt: new Date()
        });

        await notificationRepository.create(newNotification);

        await unreadNotification.execute({
            notificationId: newNotification.id
        });

        expect(notificationRepository.notifications[0].readAt).toBeNull();
    });

    it('should not be able to read a non existing notification', async () => {const notificationRepository = new InMemoryNotificationRepository();
        const readlNotification = new UnreadNotification(notificationRepository);

        expect( () => {
            return readlNotification.execute({
                notificationId: 'fake-notification-id'
            });
        }).rejects.toThrow(NotificationNotFoundError)
    });
})