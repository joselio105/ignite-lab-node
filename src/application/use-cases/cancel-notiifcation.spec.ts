import { Content } from "@application/entities/content";
import { Notification } from "@application/entities/notification";
import { NotificationRepository } from "@application/repositories/notification.repository"
import { InMemoryNotificationRepository } from "@test/repositories/in-memory-notification-repository"
import { CancelNotification } from "./cancel-notification";
import { NotificationNotFoundError } from "./errors/notification-not-found-error";

describe('Cancel Notification', () => {
    it('should be able to cancel a notification', async () => {
        const notificationRepository = new InMemoryNotificationRepository();
        const cancelNotification = new CancelNotification(notificationRepository);

        const newNotification = new Notification({
            category: 'test',
            content: new Content('Notificação para ser cancelada'),
            recipientId: 'exemple-recipient-id'
        })

        await notificationRepository.create(newNotification);

        await cancelNotification.execute({
            notificationId: newNotification.id
        });

        expect(notificationRepository.notifications[0].cancelAt).toEqual(
            expect.any(Date)
        )
    });

    it('should not be able to cancel a non existing notification', async () => {const notificationRepository = new InMemoryNotificationRepository();
        const cancelNotification = new CancelNotification(notificationRepository);

        expect( () => {
            return cancelNotification.execute({
                notificationId: 'fake-notification-id'
            });
        }).rejects.toThrow(NotificationNotFoundError)
    });
})