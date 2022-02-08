export {};

const nodemailer = require("nodemailer");

class MailService {
  private transporter: any;
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMPT_HOST,
      port: process.env.SMPT_PORT,
      secure: false,
      auth: {
        user: process.env.SMPT_USER,
        pass: process.env.SMPT_PASSWORD,
      },
    });
  }

  async sendActivationMail(to: string, link: string) {
    await this.transporter.sendMail({
      from: process.env.SMPT_USER,
      to,
      subject: "Подтверждение регистрации аккаунта",
      text: "",
      html: `
            <div>
                <h1>Для подтверждения регистрации на сайте micro-blogging перейдите по ссылке</h1>
                <a href="${link}">Нажмите сюда</a>
            </div>
            `,
    });
  }
}

module.exports = new MailService();
