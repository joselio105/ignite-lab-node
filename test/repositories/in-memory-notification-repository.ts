import { Notification } from "src/application/entities/notification";
import { NotificationRepository } from "src/application/repositories/notification.repository";



export class InMemoryNotificationRepository implements NotificationRepository{
    public notifications = [];

    async findeById(notificationId: string): Promise<Notification> {
        const notification = this.notifications.find(notification => (notification.id === notificationId));

        if(!notification){
            return null;
        }

        return notification;
    }

    async findManyByRecipientId(recipientId: string): Promise<Notification[]> {
        return this.notifications.filter( 
            notification => notification.recipientId === recipientId
        );
    }

    async countManyByRecipientId(recipientId: string): Promise<number> {
        return this.notifications.filter( 
            notification => notification.recipientId === recipientId
        ).length;
    }

    async create(notification: Notification): Promise<void> {
        this.notifications.push(notification);
    }

    async save(notification: Notification): Promise<void> {
        const notificationIndex = this.notifications.findIndex(notification => (
            notification.id === notification.id
        ))    
        
        if(notificationIndex >= 0){
            this.notifications[notificationIndex] = notification;
        }
    }

    
}