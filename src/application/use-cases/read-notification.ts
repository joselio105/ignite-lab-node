import { Injectable } from "@nestjs/common"
import { NotificationRepository } from "@application/repositories/notification.repository"
import { NotificationNotFoundError } from "./errors/notification-not-found-error";

interface ReadNotificationRequest {
    notificationId: string
}

type ReadNotificationResponse = void

@Injectable()
export class ReadNotification {
    constructor(
        private notificationRepository: NotificationRepository
    ){}

    async execute (request: ReadNotificationRequest): Promise<ReadNotificationResponse>{
        const notification = await this.notificationRepository.findeById(request.notificationId);

        if(!notification){
            throw new NotificationNotFoundError();
        }

        notification.read();
        await this.notificationRepository.save(notification);
    }
}