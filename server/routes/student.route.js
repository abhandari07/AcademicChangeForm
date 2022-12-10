import express from 'express';
import * as studentCtrl from '../controllers/student.controller';
import isAuthenticated from '../middlewares/authenticate';

const router = express.Router();


router.route('/')

    .post(isAuthenticated, (req, res) => {
        studentCtrl.store(req, res);
    })
   
    .get(isAuthenticated, (req, res) => {
        studentCtrl.findAll(req, res);
    });

router.route('/:id')

    .get(isAuthenticated, (req, res) => {
        studentCtrl.findById(req, res);
    })


    .put(isAuthenticated, (req, res) => {
        studentCtrl.update(req, res);
    })


    .delete(isAuthenticated, (req, res) => {
        studentCtrl.destroy(req, res);
    });

router.route('/getStudentList')
    .post(isAuthenticated, (req, res) => {
        studentCtrl.getStudentList(req, res);
    })
    
export default router;