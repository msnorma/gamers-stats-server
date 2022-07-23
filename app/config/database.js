import mongoose from 'mongoose'
import logger from '../helpers/logger.js'
import { API } from '../globals.js'

export default function connect() {
  // Connecting to the database
  mongoose
    .connect(API.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      //useCreateIndex: true,
      //useFindAndModify: false,
    })
    .then(() => {
        logger.log('db-connection -> Successfully connected to database')
    })
    .catch((error) => {
        logger.log('db-connection -> Connection failed. exiting now..')
        console.error(error);
        process.exit(1);
    });
};