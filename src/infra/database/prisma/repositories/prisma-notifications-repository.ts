import { Injectable } from "@nestjs/common";
import { Notification } from "@application/entities/notification";
import { NotificationRepository } from "@application/repositories/notification.repository";
import { PrismaService } from "../prisma.servive";
import { PrismaNotificationMapper } from "../mappers/prisma-notification-mapper";

@Injectable()
export class PrismaNotificationsRepository implements NotificationRepository{
    
    constructor(
        private prismaService: PrismaService
    ){}

    async findeById(notificationId: string): Promise<Notification> {
        throw new Error ('Method not implemented');
    }

    async create(notification: Notification): Promise<void> {
        await this.prismaService.notification.create({
            data: PrismaNotificationMapper.toPrisma(notification)
        })
    }

    async save(notification: Notification): Promise<void> {
        throw new Error ('Method not implemented');        
    }

}