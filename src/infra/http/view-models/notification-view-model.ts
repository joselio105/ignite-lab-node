import { Notification } from "@application/entities/notification";

export class NotificationViewModel {
    static toHttp(notification: Notification){
        return {
            id: notification.id,
            recipientId: notification.recipientId,
            content: notification.content.value,
            category: notification.category,
            createdAt: notification.createdAt,
            readAt: notification.readAt
        }
    }
}