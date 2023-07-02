const express = require('express');
const fs = require('fs');

const app = express();
app.use(express.json()); // express.json() - middleware

// app.get('/', (req, res) => {
//   res.status(200).json({ message: 'Hello from the server!🥳', app: 'Natours' });
// });

// app.post('/', (req, res) => {
//   res.send('Posted!😌');
// });

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// GET

app.get('/api/v1/tours', (req, res) => {
  res
    .status(200)
    .json({ status: 'success', results: tours.length, data: { tours } });
});

app.get('/api/v1/tours/:id', (req, res) => {
  const currentId = +req.params.id;
  const currentTour = tours.filter((tour) => tour.id === currentId)[0];

  //   if (tours.filter((tour) => tour.id === currentId).length === 0) {
  if (!currentTour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  res.status(200).json({
    status: 'success',
    data: { tour: currentTour },
  });
});

// POST

app.post('/api/v1/tours', (req, res) => {
  //   console.log(req.body);
  const newId = tours[tours.length - 1].id + 1;
  const newTour = { id: newId, ...req.body };

  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      if (err) {
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
});

// PATCH

app.patch('/api/v1/tours/:id', (req, res) => {
  const currentId = +req.params.id;
  const currentTour = tours.filter((tour) => tour.id === currentId)[0];

  if (!currentTour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

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
});

// DELETE

app.delete('/api/v1/tours/:id', (req, res) => {
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
});

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
