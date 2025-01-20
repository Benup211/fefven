import { body } from "express-validator";

export class NewsValidator{

    static create(){
        return [
            body('title').notEmpty().withMessage('Title is required'),
            body('description').notEmpty().withMessage('Description is required'),
            body('author').notEmpty().withMessage('Author is required'),
            body('content').notEmpty().withMessage('Content is required'),
        ];
    }
}