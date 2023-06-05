import Express from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import route from '@/routes';
import db from '@/models';
import process from "process";

const env = process.env.NODE_ENV || "development";
const app = Express();
const PORT = 8000;

env === "development" &&
  (async () => {
    // if db exists, drop it and create new one.
    let schemas = await db.sequelize.showAllSchemas({});
    console.log("schemas", schemas);
    ["comment", "todo", "diary", "user", "emotion"].forEach(async (table) => {
      await db.sequelize.dropSchema(table, {});
    });
    console.log("drop schema");
    schemas = await db.sequelize.showAllSchemas({});
    console.log("schemas", schemas);
    await db.sequelize.sync();
    schemas = await db.sequelize.showAllSchemas({});
    console.log("schemas", schemas);
  })();

app.use(cookieParser());
app.use(
    session({
        secret: 'secret',
        resave: false,
        saveUninitialized: true,
    })
);
app.set('view engine', 'ejs');
app.use(Express.static('views'));

app.use(Express.urlencoded({ extended: true }));
app.use(Express.json());

app.use('/', route);

app.get('*', (req, res) => {
    res.status(404).render('404');
});

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});
