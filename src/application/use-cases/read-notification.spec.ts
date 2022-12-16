import { makeNotification } from "@test/factories/notification-factory";
import { InMemoryNotificationRepository } from "@test/repositories/in-memory-notification-repository";
import { NotificationNotFoundError } from "./errors/notification-not-found-error";
import { ReadNotification } from "./read-notification";

describe('Read Notification', () => {
    it('should be able to read a notification', async () => {
        const notificationRepository = new InMemoryNotificationRepository();
        const readNotification = new ReadNotification(notificationRepository);

        const newNotification = makeNotification();

        await notificationRepository.create(newNotification);

        await readNotification.execute({
            notificationId: newNotification.id
        });

        expect(notificationRepository.notifications[0].readAt).toEqual(
            expect.any(Date)
        )
    });

    it('should not be able to read a non existing notification', async () => {const notificationRepository = new InMemoryNotificationRepository();
        const readlNotification = new ReadNotification(notificationRepository);

        expect( () => {
            return readlNotification.execute({
                notificationId: 'fake-notification-id'
            });
        }).rejects.toThrow(NotificationNotFoundError)
    });
})