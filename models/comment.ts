import { DataTypes, Sequelize } from 'sequelize';

export default function comment(sequelize: Sequelize, dataTypes: typeof DataTypes) {
  return sequelize.define(
    'comment',
    {
      id: {
        type: dataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      content: {
        type: dataTypes.STRING(255),
        allowNull: false,
      },
      emotion_id: {
        type: dataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'emotion',
          key: 'id',
        }
      },
    },
    {
      tableName: 'comment',
      freezeTableName: true,
      timestamps: false,
    }
  );
}