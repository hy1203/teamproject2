import { DataTypes, Sequelize } from 'sequelize';
/*
-- IMAGE 테이블 생성
CREATE TABLE IMAGE (
    path VARCHAR(255) NOT NULL,
	comment_id INT NOT NULL,
	FOREIGN KEY (comment_id) REFERENCES COMMENT(id)
);
*/

export default function (sequelize: Sequelize, dataTypes: typeof DataTypes) {
  return sequelize.define('IMAGE', {
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
    freezeTableName: true,
    timestamps: false,
  });

}