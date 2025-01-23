import {body} from "express-validator";

export class OrganizationValidator{

    static create(){
        return[
            body('name').notEmpty().withMessage('Name is required'),
            body('establishedAt').notEmpty().withMessage('EstablishedAt is required'),
        ];
    }
}