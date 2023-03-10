import { Injectable } from "@nestjs/common"
import { NotificationRepository } from "@application/repositories/notification.repository"
import { NotificationNotFoundError } from "./errors/notification-not-found-error";

interface UnreadNotificationRequest {
    notificationId: string
}

type UnreadNotificationResponse = void

@Injectable()
export class UnreadNotification {
    constructor(
        private notificationRepository: NotificationRepository
    ){}

    async execute (request: UnreadNotificationRequest): Promise<UnreadNotificationResponse>{
        const notification = await this.notificationRepository.findeById(request.notificationId);

        if(!notification){
            throw new NotificationNotFoundError();
        }

        notification.unread();
        await this.notificationRepository.save(notification);
    }
}