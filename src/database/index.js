import mongoose from 'mongoose';
import Sequelize from 'sequelize';

import File from '../app/models/File';
import Meetup from '../app/models/Meetup';
import Subscription from '../app/models/Subscription';
import User from '../app/models/User';
import databaseConfig from '../config/database';
import mongoConfig from '../config/mongo';

const models = [User, File, Meetup, Subscription];

class Database {
  constructor() {
    this.connection = new Sequelize(databaseConfig);

    this.init();
    this.associate();
    // this.mongo();
  }

  init() {
    models.forEach(model => model.init(this.connection));
  }

  associate() {
    models.forEach(model => {
      if (model.associate) {
        model.associate(this.connection.models);
      }
    });
  }

  mongo() {
    const { host, port, database } = mongoConfig;
    const mongoURI = `mongodb://${host}:${port}/${database}`;

    this.mongoConnection = mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useFindAndModify: true,
    });
  }
}

export default new Database();
