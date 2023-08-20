import express from 'express';
import { connect } from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { Routes } from '../interface/routes.interface';
import IndexRoute from '../routes/index.routes';
import AuthRoute from '../routes/auth.routes';
import SpecialistRoute from '../routes/specialist.routes';
import BookingRoute from '../routes/bookings.routes';

dotenv.config();

const PORT = process.env.PORT;
const MONGO_DB_URI = process.env.MONGO_DB_URI;

class App {
  public app: express.Application;
  public env: string;
  public port: string | number;

  constructor(routes: Routes[]) {
    this.app = express();
    this.port = PORT || 3001;

    this.connectToDatabase();
    this.initializeMiddlewares();
    this.initializeRoutes(routes);
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`🚀 App listening on the port ${this.port}`);
    });
  }

  public getServer() {
    return this.app;
  }

  private connectToDatabase() {
    if (!MONGO_DB_URI) {
      throw new Error(
        'Please define the MONGO_DB_URI environment variable inside .env'
      );
    }

    connect(MONGO_DB_URI, { dbName: 'nfq_task' });
  }

  private initializeMiddlewares() {
    this.app.use(cors());

    this.app.use(express.json());
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach((route) => {
      this.app.use('/api', route.router);
    });
  }
}

const app = new App([
  new IndexRoute(),
  new AuthRoute(),
  new SpecialistRoute(),
  new BookingRoute(),
]);

app.listen();
