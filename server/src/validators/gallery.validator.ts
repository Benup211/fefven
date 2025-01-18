import {body} from 'express-validator';

export class GalleryValidator {

    static create() {
        return [
            body('title').notEmpty().withMessage('Title is required'),
        ];
    }
}