import { Sequelize, DataTypes } from 'sequelize';
import process from 'process';
import configs from '@/config';
import User from './user';
import Todo from './todo';
import Image from './image';
import Comment from './comment';
import Emotion from './emotion';
import Diary from './diary';

const env = process.env.NODE_ENV || 'development';
const { database, username, password, ...config } = configs[env];
const sequelize = new Sequelize(database, username, password, config);

const user = User(sequelize, DataTypes);
const todo = Todo(sequelize, DataTypes);
const image = Image(sequelize, DataTypes);
const comment = Comment(sequelize, DataTypes);
const emotion = Emotion(sequelize, DataTypes);
const diary = Diary(sequelize, DataTypes);

interface DB {
    sequelize: Sequelize;
    Sequelize: typeof Sequelize;
    user: typeof user;
    todo: typeof todo;
    image: typeof image;
    comment: typeof comment;
    emotion: typeof emotion;
    diary: typeof diary;
}

export default <DB>{
    sequelize,
    Sequelize,
    user,
    todo,
    image,
    comment,
    emotion,
    diary,
};
