import { MailAdapter, SendMailData } from "../mail-adapter";

import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "768c6c075d37fd",
        pass: "b0ded0a6de53a0"
    }
});

export class NodemailerMailAdapter implements MailAdapter {

    async sendMail({ subject, body }: SendMailData) {
        await transport.sendMail({
            from: "Equipe Fidget <oi@feedget.com>",
            to: "Carlos Nunes <carlos.nunes@gmail.com",
            subject,
            html: body
        });
    }

}