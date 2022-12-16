import { Notification } from "@application/entities/notification";
import { NotificationRepository } from "@application/repositories/notification.repository";
import { Injectable } from "@nestjs/common";

interface GetNotificationRequest {
    recipientId: string
}

interface GetNotificationResponse {
    notifications: Notification[]
}

@Injectable()
export class GetRecipientNotifications {
    constructor(
        private notificationRepository: NotificationRepository
    ){}

    async execute(request: GetNotificationRequest): Promise<GetNotificationResponse> {
        const { recipientId } = request;

        const notifications = await this.notificationRepository.findManyByRecipientId(recipientId);

        return {
            notifications
        }
    }
}