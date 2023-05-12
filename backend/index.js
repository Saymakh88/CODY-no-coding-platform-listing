const express = require('express');
const app = express();
const userRouter = require('./routers/userRouter');
const adminRouter = require('./routers/adminRouter');
const categoryRouter = require('./routers/categoryRouter');
const platformRouter = require('./routers/platformRouter');
const reviewRouter = require('./routers/reviewRouter');
const compareRouter = require('./routers/compareRouter');
const utilRouter = require('./routers/utils');
const port = process.env.PORT || 5000;
const cors = require('cors');
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.static('./static/uploads'));

app.use('/user', userRouter);
app.use('/admin', adminRouter);
app.use('/review', reviewRouter);
app.use('/util', utilRouter);
app.use('/platform', platformRouter);
app.use('/category', categoryRouter);
app.use('/compare', compareRouter);



app.get('/main/home', (req, res) => {
    console.log('client request on server');
    res.send('Request on home');
})

app.listen(port, () => {
    console.log(`Server started on port on localhost : ${port}`)
})