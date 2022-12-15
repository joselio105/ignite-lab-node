import { InMemoryNotificationRepository } from "@test/repositories/in-memory-notification-repository";
import { SendNotification } from "./send-notification"

describe('Send Notification', () => {
    it('should be able to  sen a notification', async ()=> {
        const notificationRepository = new InMemoryNotificationRepository();
        const sendNotification = new SendNotification(notificationRepository);

        const { notification } = await sendNotification.execute({
            recipientId: 'um-id-qualquer',
            content: 'Você recebeu uma notificação de amizade',
            category: 'social'
        });

        expect(notificationRepository.notifications).toHaveLength(1);
        expect(notificationRepository.notifications[0]).toEqual(notification);
    })
})