import { Notification as NotificationRaw } from "@prisma/client"
import { Notification } from "@application/entities/notification";
import { Content } from "@application/entities/content";

export class PrismaNotificationMapper {
    static toPrisma(notification: Notification) {
        return {
            id: notification.id,
            recipientId: notification.recipientId,
            content: notification.content.value,
            category: notification.category,
            createdAt: notification.createdAt,
            readAt: notification.readAt,
        }
    }

    static toDomain( raw: NotificationRaw): Notification {
        const {
            id,
            recipientId,
            content,
            category,
            createdAt,
            readAt,
        } = raw;

        return new Notification({
                recipientId,
                content: new Content(content),
                category,
                createdAt,
                readAt,
            }, id)
    }
}