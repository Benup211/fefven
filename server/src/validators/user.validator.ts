import {body} from 'express-validator';

export class UserValidator {

    static login() {
        return [
            body('username').notEmpty().withMessage('Username is required'),
            body('password').notEmpty().withMessage('Password is required'),
        ];
    }
}