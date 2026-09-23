import express from 'express';
import { indexRouter } from './routes/indexRouter.js';

const app = express();

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.use('/', indexRouter);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode || 500).send(err.message);
});

const PORT = process.env.PORT;

app.listen(PORT, (error) => {
  error && console.log(error);
  console.log(`Listening on port ${PORT}`);
});
