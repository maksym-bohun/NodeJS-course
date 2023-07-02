const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.checkID = (req, res, next, val) => {
  console.log('tour id: ', val);
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  next();
};

exports.checkBody = (req, res, next) => {
  console.log(req.body);
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'fail',
      message: 'Missing name or price',
    });
  }
  next();
};

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: tours.length,
    data: { tours },
  });
};

exports.getTour = (req, res) => {
  const currentId = +req.params.id;
  const currentTour = tours.filter((tour) => tour.id === currentId)[0];

  res.status(200).json({
    status: 'success',
    data: { tour: currentTour },
  });
};

exports.createTour = (req, res) => {
  //   console.log(req.body);
  const newId = tours[tours.length - 1].id + 1;
  const newTour = { id: newId, ...req.body };

  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/../dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      if (err) {
        console.log('err: ', err);
        res.status(404).send('Error!');
      }
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
};

exports.updateTour = (req, res) => {
  const currentId = +req.params.id;
  const currentTour = tours.filter((tour) => tour.id === currentId)[0];

  for (let changes in req.body) {
    currentTour[changes] = req.body[changes];
  }

  const currentTourIndex = tours.indexOf(
    tours.filter((tour) => tour.id === currentId)[0]
  );
  tours[currentTourIndex] = currentTour;
  console.log('TOURS', tours);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      if (err) {
        res.status(404).send('Error!');
      }
      res.status(200).json({ status: 'success', data: { tour: currentTour } });
    }
  );
};

exports.deleteTour = (req, res) => {
  const currentId = +req.params.id;
  const currentTourIndex = tours.indexOf(
    tours.filter((tour) => tour.id === currentId)[0]
  );

  tours.splice(currentTourIndex, 1);
  fs.writeFile(
    './dev-data/data/tours-simple.json',
    JSON.stringify(tours),
    (err) => {
      res.status(204).json({ status: 'success', data: null });
    }
  );
};
