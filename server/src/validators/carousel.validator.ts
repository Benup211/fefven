import {body} from 'express-validator';

export class CarouselValidator {

    static create() {
        return [
            body('title').notEmpty().withMessage('Title is required'),
            body('description').notEmpty().withMessage('Description is required'),
        ];
    }
}