import express from 'express';
import * as userCtrl from '../controllers/user.controller';
import isAuthenticated from '../middlewares/authenticate';
import isSuperAdmin from '../middlewares/superAdminAuthenticate';

const router = express.Router();
router.route('/')
    .post((req, res) => {
        userCtrl.store(req, res);
    })

    .get(isAuthenticated, (req, res) => {
        userCtrl.findAll(req, res);
    });

router.route('/:id')

    .get(isAuthenticated, (req, res) => {
        userCtrl.findById(req, res);
    })

    .put(isAuthenticated, (req, res) => {
        userCtrl.update(req, res);
    })

    .delete(isAuthenticated, (req, res) => {
        userCtrl.destroy(req, res);
    });

router.route('/approveUser')
    .post(isSuperAdmin, (req, res) => {
        userCtrl.approveUser(req, res);
    })

router.route('/getAdvisor')
    .post(isAuthenticated, (req, res) => {
        userCtrl.getAdvisor(req, res);
    })

router.route('/getDean')
    .post(isAuthenticated, (req, res) => {
        userCtrl.getDean(req, res);
    })

router.route('/getStudent')
    .post(isAuthenticated, (req, res) => {
        userCtrl.getStudent(req, res);
    })

export default router;