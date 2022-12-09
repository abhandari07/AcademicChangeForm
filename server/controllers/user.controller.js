import bcrypt from 'bcrypt';
import HttpStatus from 'http-status-codes';
import User from '../models/user.model';
/**
 * Find all the users
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function findAll(req, res) {
    User.forge()
        .fetchAll()
        .then(user => res.json({
                error: false,
                data: user.toJSON()
            })
        )
        .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: err
            })
        );
}

/**
 * Find all the users
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function getAdvisor(req, res) {
    User.forge().where({user_type: 'advisor'})
        .fetchPage()
        .then(user => res.json({
                error: false,
                data: user.toJSON()
            })
        )
        .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: err
            })
        );
}

/**
 * Find all the users
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
 export function getDean(req, res) {
    User.forge().where({user_type: 'dean'})
        .fetchPage()
        .then(user => res.json({
                error: false,
                data: user.toJSON()
            })
        )
        .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: err
            })
        );
}

export function getStudent(req, res) {
    User.forge().where({user_type: 'student'})
        .fetchPage()
        .then(user => res.json({
                error: false,
                data: user.toJSON()
            })
        )
        .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: err
            })
        );
}

/**
 *  Find user by id
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function findById(req, res) {
    User.forge({id: req.params.id})
        .fetch()
        .then(user => {
            if (!user) {
                res.status(HttpStatus.NOT_FOUND).json({
                    error: true, data: {}
                });
            }
            else {
                res.json({
                    error: false,
                    data: user.toJSON()
                });
            }
        })
        .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: err
            })
        );
}

/**
 * Store forge user
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export async function store(req, res) {
    console.log("I am here")
    const {first_name, last_name, email,user_type} = req.body;
    const password = bcrypt.hashSync(req.body.password, 10);
    const signature = req.body.first_name + " " + req.body.last_name 
    console.log("I am here")
    
    User.where({email: email}).fetch({require: false}).then(user => {
        if (user) {
            res.status(HttpStatus.CONFLICT).json({
                success: false,
                message: 'Email already exists!'
            });
        }else{
            User.forge({
                first_name, last_name, email, password,user_type,signature}).save()
                .then(user => res.json({
                        success: true,
                        data: user.toJSON()
                    })
                )
                .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                        error: err
                    })
                );
        }

    });
}

/**
 * Update user by id
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function update(req, res) {
    User.forge({id: req.params.id})
        .fetch({require: true})
        .then(user => user.save({
                first_name: req.body.first_name || user.get('first_name'),
                last_name: req.body.last_name || user.get('last_name'),
                email: req.body.email || user.get('email'),
                user_type: req.body.user_type || user.get('user_type'),
                signature: req.body.signature || user.get('signature'),
                status: req.body.status || user.get('status'),
                created_at: req.body.created_at || user.get('created_at'),
                updated_at: req.body.updated_at || user.get('updated_at')

            })
                .then(() => res.json({
                        error: false,
                        data: user.toJSON()
                    })
                )
                .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                        error: true,
                        data: {message: err.message}
                    })
                )
        )
        .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: err
            })
        );
}

export function approveUser(req, res) {
    // check if user is super admin

    //if super admin
        User.forge({id: req.body.id})
            .fetch({require: true})
            .then(user => user.save({
                    status: req.body.status || user.get('status'),
                    updated_at: req.body.updated_at || user.get('updated_at')

                })
                    .then(() => res.json({
                            error: false,
                            data: user.toJSON()
                        })
                    )
                    .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                            error: true,
                            data: {message: err.message}
                        })
                    )
            )
            .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                    error: err
                })
            );
}

/**
 * Destroy user by id
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function destroy(req, res) {
    User.forge({id: req.params.id})
        .fetch({require: true})
        .then(user => user.destroy()
            .then(() => res.json({
                    error: false,
                    data: {message: 'User deleted successfully.'}
                })
            )
            .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                    error: true,
                    data: {message: err.message}
                })
            )
        )
        .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: err
            })
        );
}