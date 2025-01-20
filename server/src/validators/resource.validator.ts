import {body} from 'express-validator';

export class ResourceValidator {

    static create() {
        return [
            body('title').notEmpty().withMessage('Title is required'),
            body('description').notEmpty().withMessage('Description is required'),
        ];
    }
}