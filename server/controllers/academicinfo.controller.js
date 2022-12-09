import HttpStatus from 'http-status-codes';
import AcademicInfo from '../models/academicinfo.model';
import Student from '../models/student.model';
import User from '../models/user.model';
import * as Service from '../controllers/service'
/**
 * Find all the users
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */

export function findAll(req, res) {
    AcademicInfo.forge()
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

export async function getAcademicDetailsByStudent(req,res){
    var data = await Service.getAcademicDetailsByStudent(req.params.id)
    res.json({
        error: false,
        data: data
    });
    return res
}

/**
 *  Find user by id
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function findById(req, res) {
    AcademicInfo.forge().where({student_id: req.params.id})
        .fetchPage()
        .then(user => {
            if (!user) {
                res.status(HttpStatus.NOT_FOUND).json({
                    error: true, data: {}
                });
            }
            else {
                const jsonUser = user.toJSON();
                const advisorId = jsonUser[0]["advisor_id"];

                User.forge({id: advisorId})
                .fetch()
                .then(user => {
                    if (user) {
                        var mydata =  user.toJSON();
                    }
                })
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
    console.log("###################store0######################################")
    const {BID, catalogYear, addOnly} = req.body;
    const student_id = req.currentUser.id;
    console.log("###################store1######################################")
    // Save details to Student Table
    await Student.forge({
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

    console.log("###################store2######################################")

    // Save details to academic info table
    for (let i = 0; i <= 1; i++) {
        const old_new_flag = "old" 
        if(i == 1){
            old_new_flag = "new";
        }

        var academicData = {
            school_name : req.body.school_name[i],
            degree : req.body.degree[i],
            major : req.body.major[i],
            minor : req.body.minor[i],
            advisor_id : req.body.advisor_id[i],
            dean_id : req.body.dean_id[i],
            old_new_flag : old_new_flag,
            student_id : student_id
        }

        await Service.saveAcademicInfo(academicData)
    }
}

/**
 * Update user by id
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function update(req, res) {
    AcademicInfo.forge({id: req.params.id})
        .fetch({require: true})
        .then(user => user.save({
                school_name: req.body.school_name || user.get('school_name'),
                degree: req.body.degree || user.get('degree'),
                major: req.body.major || user.get('major'),
                minor: req.body.minor || user.get('minor'),
                advisor_id: req.body.advisor_id || user.get('advisor_id'),
                dean_id: req.body.dean_id || user.get('dean_id'),
                old_new_flag: req.body.old_new_flag || user.get('old_new_flag'),
                is_advisor_approved: 0,
                is_dean_approved: 0
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


export function advisorApproval(req, res) {
    AcademicInfo.forge({'advisor_id': req.currentUser.id,'student_id': req.body.student_id})
            .fetch({require: true})
            .then(academicInfo => academicInfo.save({
                    is_advisor_approved: req.body.is_advisor_approved || academicInfo.get('is_advisor_approved'),
                    updated_at: req.body.updated_at || academicInfo.get('updated_at')

                })
                    .then(() => res.json({
                            error: false,
                            data: academicInfo.toJSON()
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

export function deanApproval(req, res) {
    AcademicInfo.forge({'dean_id': req.currentUser.id,'student_id': req.body.student_id})
            .fetch({require: true})
            .then(academicInfo => academicInfo.save({
                    is_dean_approved: req.body.is_dean_approved || academicInfo.get('is_dean_approved'),
                    updated_at: req.body.updated_at || academicInfo.get('updated_at')

                })
                    .then(() => res.json({
                            error: false,
                            data: academicInfo.toJSON()
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
    AcademicInfo.forge({id: req.params.id})
        .fetch({require: true})
        .then(user => user.destroy()
            .then(() => res.json({
                    error: false,
                    data: {message: 'Academic Info deleted successfully.'}
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