import HttpStatus from 'http-status-codes';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/user.model';
import logger from '../config/winston';

/**
 * Returns jwt token if valid email and password is provided
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function login(req, res) {
    const {email, password} = req.body;
    User.query({
        where: {email: email},
    }).fetch().then(user => {
        if (user) {
            if (bcrypt.compareSync(password, user.get('password'))) {
                const token = jwt.sign({
                    id: user.get('id'),
                    email: user.get('email')
                }, process.env.TOKEN_SECRET_KEY);
                res.json({
                    success: true,
                    token,
                    email:  user.get('email'),
                    name: user.get('first_name') + " " + user.get('last_name'),
                    id: user.get('id'),
                    user_type: user.get('user_type')
                });
            } else {
                logger.log('error', 'Authentication failed. Invalid Email/Password.');

                res.status(HttpStatus.UNAUTHORIZED).json({
                    success: false,
                    message: 'Authentication failed. Invalid Email/Password.'
                });
            }
        } else {
            logger.log('error', 'Invalid username or password.');

            res.status(HttpStatus.UNAUTHORIZED).json({
                success: false, message: 'Invalid username or password.'
            });
        }
    }) .catch(err => res.status(HttpStatus.UNAUTHORIZED).json({
        error: 'Invalid Email or password.'
    }));
}
