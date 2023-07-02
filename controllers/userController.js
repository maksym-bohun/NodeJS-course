const fs = require('fs');

const users = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/users.json`)
);

exports.getAllUsers = (req, res) => {
  console.log('USERS: ', users);
  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users,
    },
  });
};

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
