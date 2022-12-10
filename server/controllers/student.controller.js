import bcrypt from 'bcrypt';
import HttpStatus from 'http-status-codes';
import Student from '../models/student.model';

/**
 * Find all the students
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function findAll(req, res) {
    Student.forge()
        .fetchAll()
        .then(student => res.json({
                error: false,
                data: student.toJSON()
            })
        )
        .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: err
            })
        );
}

export function getStudentList(req, res) {
    console.log("$$$$$$$$$$$$$$$$")
    let query_builder = Student.forge();
    query_builder.query(function (qb) {
            qb.select('students.BID','students.catalogYear','users.first_name','users.last_name','users.email','users.id')
            .leftJoin('users', 'users.id', 'students.student_id');
        }).fetchAll().then(student => res.json({
            error: false,
            data: student.toJSON()
        })
        )
        .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: err
            })
        );
}

/**
 *  Find student by id
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function findById(req, res) {
    Student.forge().where({student_id: req.params.id})
        .fetch()
        .then(student => {
            if (!student) {
                res.status(HttpStatus.NOT_FOUND).json({
                    error: true, data: {}
                });
            }
            else {
                res.json({
                    error: false,
                    data: student.toJSON()
                });
            }
        })
        .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: err
            })
        );
}


/**
 * Store forge student
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function store(req, res) {
    const { BID, catalogYear, addOnly} = req.body;
    const student_id = req.currentUser.id

    Student.forge({
        student_id,  BID, catalogYear, addOnly
    }).save()
        .then(student => res.json({
                success: true,
                data: student.toJSON()
            })
        )
        .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: err
            })
        );
}

/**
 * Update student by id
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function update(req, res) {
    Student.forge({id: req.params.id})
        .fetch({require: true})
        .then(student => student.save({
                BID: req.body.BID || student.get('BID'), 
                catalogYear: req.body.catalogYear || student.get('catalogYear'),
                addOnly: req.body.addOnly || student.get('addOnly'), 
                date: req.body.date || student.get('date')
            }) 
                .then(() => res.json({
                        error: false,
                        data: student.toJSON()
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
 * Destroy student by id
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function destroy(req, res) {
    Student.forge({id: req.params.id})
        .fetch({require: true})
        .then(student => student.destroy()
            .then(() => res.json({
                    error: false,
                    data: {message: 'student deleted successfully.'}
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