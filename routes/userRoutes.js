const express = require('express');
const userContoller = require('../controllers/userController');
const authController = require('../controllers/authController');

const router = express.Router();

router.route('/signup').post(authController.signup);
router.route('/login').post(authController.login);
router.route('/forgotPassword').post(authController.forgotPassword);
router.route('/resetPassword/:token').post(authController.resetPassword);

router.use(authController.protect);

router.get('/me', userContoller.getMe, userContoller.getUser);

router.route('/updateMyPassword').patch(authController.updatePassword);

router.route('/updateMe').patch(userContoller.updateMe);
router.route('/deleteMe').delete(userContoller.deleteMe);

router.use(authController.restrictTo('admin'));

router.route('/').get(userContoller.getAllUsers).post(userContoller.createUser);
router
  .route('/:id')
  .get(userContoller.getUser)
  .patch(userContoller.updateUser)
  .delete(userContoller.deleteUser);

module.exports = router;
