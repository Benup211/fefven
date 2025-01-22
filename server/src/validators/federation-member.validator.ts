import {body} from 'express-validator';

export class FederationMemberValidator {

    static create() {
        return [
            body('name').notEmpty().withMessage('name is required'),
            body('contactNo').notEmpty().withMessage('contactNo is required'),
            body('designation').notEmpty().withMessage('designation is required'),
            body('startDate').notEmpty().withMessage('startDate is required'),
            body('endDate').notEmpty().withMessage('endDate is required'),
            body('designationPriority').notEmpty().withMessage('designationPriority is required'),
            body('enrollmentStatus').notEmpty().withMessage('enrollmentStatus is required').isIn(['PAST', 'PRESENT']).withMessage('enrollmentStatus must be either PAST or PRESENT'),
        ];
    }
}