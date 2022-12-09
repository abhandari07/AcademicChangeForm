import express from 'express';
import authRoutes from './auth.route';
import userRoutes from './user.route';
import studentRoutes from './student.route';
import AcademicInfo from './academicinfo.route';

const router = express.Router();

// mount auth routes at /auth
router.use('/auth', authRoutes);

// mount user routes at /users
router.use('/users', userRoutes);

// mount user routes at /student
router.use('/students', studentRoutes );

// mount user routes at /academicinfo
router.use('/academicinfo', AcademicInfo );

export default router;