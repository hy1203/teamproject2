import { Dialect } from 'sequelize';

interface Config {
    username: string;
    password: string;
    database: string68;
    host: string;
    dialect: Dialect;
    use_env_variable?: string;
}

interface Configs {
    [key: string]: Config;
}

const configs: Configs = {
    development: {
        username: 'u1',
        password: '1',
        database: 'exerdb',
        host: 'localhost',
        dialect: 'mysql',
    },
    // test: {},
    // production: {},
};

export default configs;
