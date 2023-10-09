const { validationResult } = require('express-validator');
import { NextFunction, Request ,Response} from 'express';

// Check Validation For Requests
export const checkValidation = (req: Request,next : NextFunction ) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		const validationError = {
			status: 400,
			message: errors.array()[0].msg, // Use errors.array() to get all errors
		};
		throw  validationError;
		// return res.status(400).json({ errors: errors.array() });
	}
	next()
};
