import { DataTypes, Sequelize } from 'sequelize';

export default function image(sequelize: Sequelize, dataTypes: typeof DataTypes) {
  return sequelize.define('image', {
    path: {
      type: dataTypes.STRING(255),
      allowNull: false,
    },
    comment_id: {
      type: dataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'comment',
        key: 'id',
      }
    },
  }, {
    tableName: 'image',
    freezeTableName: true,
    timestamps: false,
  });
}
