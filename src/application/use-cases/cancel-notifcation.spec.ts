import { makeNotification } from "@test/factories/notification-factory";
import { InMemoryNotificationRepository } from "@test/repositories/in-memory-notification-repository";
import { CancelNotification } from "./cancel-notification";
import { NotificationNotFoundError } from "./errors/notification-not-found-error";

describe('Count Notification By RecipientId', () => {
    it('should be able to count notifications with', async () => {
        const notificationRepository = new InMemoryNotificationRepository();
        const cancelNotification = new CancelNotification(notificationRepository);

        const newNotification = makeNotification();

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