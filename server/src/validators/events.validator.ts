import {body} from 'express-validator';

export class EventValidator {

    static create() {
        return [
            body('title').notEmpty().withMessage('Title is required'),
            body('description').notEmpty().withMessage('Description is required'),
            body('category').notEmpty().withMessage('Category is required'),
            body('tags').notEmpty().withMessage('Tags is required'),
            body('startDate').notEmpty().withMessage('Start Date is required'),
            body('startTime').notEmpty().withMessage('Start Time is required'),
            body('endDate').notEmpty().withMessage('End Date is required'),
            body('endTime').notEmpty().withMessage('End Time is required'),
            body('venueName').notEmpty().withMessage('Venue Name is required'),
            body('venueAddress').notEmpty().withMessage('Venue Address is required'),
            body('city').notEmpty().withMessage('City is required'),
            body('organizerName').notEmpty().withMessage('Organizer Name is required'),
            body('organizerContact').notEmpty().withMessage('Organizer Contact is required'),
            body('organizerWebsite').optional().notEmpty().withMessage('Organizer Website is required'),
        ];
    }
}