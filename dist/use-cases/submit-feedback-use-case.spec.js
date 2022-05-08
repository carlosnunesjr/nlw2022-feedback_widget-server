"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const submit_feedback_use_case_1 = require("./submit-feedback-use-case");
describe("Submit feedback", () => {
    const createFeedbackSpy = jest.fn();
    const sendMailSpy = jest.fn();
    const submitFeedbackUseCase = new submit_feedback_use_case_1.SubmitFeedbackUseCase({ create: createFeedbackSpy }, { sendMail: sendMailSpy });
    it("Should be able to submit feedback", async () => {
        await expect(submitFeedbackUseCase.execute({
            type: "BUG",
            comment: "example comment"
        })).resolves.not.toThrow();
        expect(createFeedbackSpy).toHaveBeenCalled();
        expect(sendMailSpy).toHaveBeenCalled();
    });
    it("Should not be able to submit feedback without type", async () => {
        await expect(submitFeedbackUseCase.execute({
            type: "",
            comment: "example comment"
        })).rejects.toThrow();
    });
    it("Should not be able to submit feedback without comment and screenshot", async () => {
        await expect(submitFeedbackUseCase.execute({
            type: "BUG",
            comment: ""
        })).rejects.toThrow();
    });
    it("Should not be able to submit feedback with an ivalid screenshot", async () => {
        await expect(submitFeedbackUseCase.execute({
            type: "BUG",
            comment: "example comment",
            screenshot: "test.jpg"
        })).rejects.toThrow();
    });
});
