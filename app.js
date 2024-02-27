const express = require('express');
const app = express();
const sessionMiddleware = require('./middleware/sessionMiddleware');
const authMiddleware = require('./middleware/authMiddleware');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');

app.use(sessionMiddleware);
// app.use(authMiddleware);
app.use(express.json());  


app.use('/users', userRoutes);
app.use('/posts', postRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: err.message });
});


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
