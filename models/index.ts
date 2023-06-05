import { Sequelize, DataTypes, ModelStatic, Model } from 'sequelize';
import process from 'process';
import configs from '@/config';
import User from './user';
import Todo from './todo';
import Comment from './comment';
import Emotion from './emotion';
import Diary from './diary';

const env = process.env.NODE_ENV || 'development';
const { database, username, password, ...config } = configs[env];
const sequelize = new Sequelize(database, username, password, config);


const user = User(sequelize, DataTypes);
const todo = Todo(sequelize, DataTypes);
const comment = Comment(sequelize, DataTypes);
const emotion = Emotion(sequelize, DataTypes);
const diary = Diary(sequelize, DataTypes);

// association

// USER ||--o{ DIARY
user.hasMany(diary, {
    foreignKey: 'diaries',
    sourceKey: 'id',
    onDelete: 'cascade',
});
diary.belongsTo(user);

// USER ||--o{ TODO
user.hasMany(todo, {
    foreignKey: 'todos',
    sourceKey: 'id',
    onDelete: 'cascade',
});
todo.belongsTo(user);

// DIARY }o--|| EMOTION
emotion.hasMany(diary, {
    foreignKey: 'emotion_id',
    sourceKey: 'id',
    onDelete: 'cascade',
});
diary.belongsTo(emotion);

// TODO ||--|| COMMENT
todo.hasOne(comment, {
    foreignKey: 'todo_id',
    sourceKey: 'id',
    onDelete: 'cascade',
});
comment.belongsTo(todo);

// COMMENT }o--|| EMOTION
emotion.hasMany(comment, {
    foreignKey: 'emotion_id',
    sourceKey: 'id',
    onDelete: 'cascade',
});
comment.belongsTo(emotion);

interface DB {
    sequelize: Sequelize;
    Sequelize: typeof Sequelize;
    user: ModelStatic<Model>;
    todo: ModelStatic<Model>;
    comment: ModelStatic<Model>;
    emotion: ModelStatic<Model>;
    diary: ModelStatic<Model>;
}

export default <DB>{
    sequelize,
    Sequelize,
    user,
    todo,
    comment,
    emotion,
    diary,
};
