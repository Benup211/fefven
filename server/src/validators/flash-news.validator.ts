import {body} from "express-validator";

export class FlashNewsValidator{

    static create(){
        return[
            body('title').notEmpty().withMessage('title is required'),
        ];
    }
}