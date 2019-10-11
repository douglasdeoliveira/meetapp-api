import { Model } from 'sequelize';

class Subscription extends Model {
  static init(sequelize) {
    super.init(
      {},
      {
        sequelize,
      }
    );
  }

  static associate({ User, Meetup }) {
    this.belongsTo(Meetup, { as: 'meetup', foreignKey: 'meetup_id' });
    this.belongsTo(User, { as: 'user', foreignKey: 'user_id' });
  }
}

export default Subscription;
