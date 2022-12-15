import { Content } from "./content";
import { Notification } from "./notification";

describe('Notification', () => {
    it('shoud be able to create a notification', () => {
        const notification = new Notification({
            recipientId: 'um-id-qualquer',
            content: new Content('Você recebeu uma notificação de amizade'),
            category: 'social',
        });
    
        expect(notification).toBeTruthy()
    })
})
