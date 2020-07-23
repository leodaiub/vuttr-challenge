/* eslint-disable no-console */
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as helmet from 'helmet';
import * as cors from 'cors';
import routes from './routes';

createConnection()
  .then(async () => {
    const app = express();
    app.use(cors());
    app.use(helmet());
    app.use(bodyParser.json());

    app.use('/', routes);
    app.listen(process.env.PORT || 3000);

    console.log('Express server has started');
  })
  .catch((error) => console.log(error));
