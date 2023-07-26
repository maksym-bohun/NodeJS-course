const fs = require('fs');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');

const users = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/users.json`)
);

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: users.length,
    data: { users },
  });
});

exports.createUser = (req, res) => {
  console.log(req.body);
  const newUser = { ...req.body };
  users.push(newUser);
  fs.writeFile(
    `${__dirname}/dev-data/data/users.json`,
    JSON.stringify(users),
    (err) => {
      if (err) {
        res.status(404).json({ status: 'fail', message: 'Error' });
      }

      res.status(200).json({ status: 'success', data: { user: newUser } });
    }
  );
};

exports.getUser = (req, res) => {};

exports.updateUser = (req, res) => {};

exports.deleteUser = (req, res) => {};
