import { Injectable } from "@nestjs/common"
import { NotificationRepository } from "@application/repositories/notification.repository"
import { NotificationNotFoundError } from "./errors/notification-not-found-error";

interface CancelNotificationRequest {
    notificationId: string
}

type CancelNotificationResponse = void

@Injectable()
export class CancelNotification {
    constructor(
        private notificationRepository: NotificationRepository
    ){}

    async execute (request: CancelNotificationRequest): Promise<CancelNotificationResponse>{
        const notification = await this.notificationRepository.findeById(request.notificationId);

        if(!notification){
            throw new NotificationNotFoundError();
        }

        notification.cancel();
        await this.notificationRepository.save(notification);
    }
}