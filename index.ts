import Express from 'express';
import route from '@/routes';

const app = Express();
const PORT = 8000;

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
