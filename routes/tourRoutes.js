const express = require('express');
const toursController = require('./../controllers/tourController');
const authController = require('./../controllers/authController');

const router = express.Router();

// router.param('id', toursController.checkID);

router
  .route('/top-5-cheap')
  .get(toursController.aliasTopTours, toursController.getAllTours);

router.route('/tour-stats').get(toursController.getTourStats);

router.route('/monthly-plan/:year').get(toursController.getMonthlyPlan);

router
  .route('/')
  .get(authController.protect, toursController.getAllTours)
  .post(toursController.createTour);
router
  .route('/:id')
  .get(toursController.getTour)
  .patch(toursController.updateTour)
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    toursController.deleteTour
  );

module.exports = router;
