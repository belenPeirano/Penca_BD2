import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const validateJWT = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {

	const token = req.header('x-token');

	try {
		jwt.verify(token, process.env.SECRETKEY || 'ESTODEBERIAESTARENUNDOTENVPEROESTAMOSHACIENDOTODOMAL');
		next();
	} catch (error) {
		console.error(error);
		return res.status(401).json({
			errors: {
				user: {
				},
			},
		});
	}
};