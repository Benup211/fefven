import {body} from 'express-validator';

export class DistrictMemberValidator {

    static create() {
        return [
            body('name').notEmpty().withMessage('name is required'),
            body('contactNo').notEmpty().withMessage('contactNo is required'),
            body('designation').notEmpty().withMessage('designation is required'),
            body('designationPriority').notEmpty().withMessage('designationPriority is required'),
            body('district').notEmpty().withMessage("districtNo is required"),
        ];
    }
}