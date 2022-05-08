"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubmitFeedbackUseCase = void 0;
class SubmitFeedbackUseCase {
    constructor(feedbacksRepository, mailAdapter) {
        this.feedbacksRepository = feedbacksRepository;
        this.mailAdapter = mailAdapter;
    }
    async execute(request) {
        const { type, comment, screenshot } = request;
        if (!type) {
            throw new Error("Type is required.");
        }
        if (!comment && !screenshot) {
            throw new Error("Is necessary send comment or screenshot");
        }
        if (screenshot && !screenshot.startsWith("data:image/png;base64")) {
            throw new Error("Invalid screenshot format.");
        }
        await this.feedbacksRepository.create({
            type,
            comment,
            screenshot
        });
        await this.mailAdapter.sendMail({
            subject: "Novo Feedback",
            body: [
                `<div style="font-family: sans-serif; font-size:16px; color: #111">`,
                `<p>Tipo do Feedback: ${type} </p>`,
                `<p>Comentário: ${comment}`,
                screenshot ? `<img src=${screenshot} />` : "",
                `</div>`
            ].join("\n")
        });
    }
}
exports.SubmitFeedbackUseCase = SubmitFeedbackUseCase;
