import { Content } from "@application/entities/content"
import { Notification, NotificationProps } from "@application/entities/notification"

type Override = Partial<NotificationProps>;

export const makeNotification = ( override: Override= {} ) => {
    return new Notification({
        category: 'test',
        content: new Content('Uma notificação teste'),
        recipientId: '',
        ...override,
    })
}