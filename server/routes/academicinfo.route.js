import express from 'express';
import * as academicInfo from '../controllers/academicinfo.controller';
import isAuthenticated from '../middlewares/authenticate';
import isDean from '../middlewares/isDean';
import isAdvisor from '../middlewares/isAdvisor';

const router = express.Router();


router.route('/')

    .post(isAuthenticated, (req, res) => {
        academicInfo.store(req, res);
    })
   
    .get(isAuthenticated, (req, res) => {
        academicInfo.findAll(req, res);
    });


router.route('/:id')

    .get(isAuthenticated, (req, res) => {
        academicInfo.findById(req, res);
    })


    .put(isAuthenticated, (req, res) => {
        academicInfo.update(req, res);
    })


    .delete(isAuthenticated, (req, res) => {
        academicInfo.destroy(req, res);
    });

router.route('/advisorApproval')
    .post(isAdvisor, (req, res) => {
        academicInfo.advisorApproval(req, res);
    });

router.route('/deanApproval')
    .post(isDean, (req, res) => {
        academicInfo.deanApproval(req, res);
    });

router.route('/detailsByStudent/:id')
    .post(isAuthenticated, (req, res) => {
        academicInfo.getAcademicDetailsByStudent(req, res);
    });

    

export default router;