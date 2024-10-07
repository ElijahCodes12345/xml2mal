const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const xmlRoutes = require('./routes/xmlRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Using EJS for rendering
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Middleware for handling file uploads
app.use(fileUpload());

app.use(express.static('public'));

// Define routes
app.use('/', xmlRoutes);

// Homepage route 
app.get('/', (req, res) => {
    const outputXML = '';
    
    res.render('index', { outputXML });
});

app.get('/convert', (req, res) => {
    res.redirect('/');
})

// Route that triggers an error (for testing purposes)
app.get('/test-error', (req, res, next) => {
    const error = new Error('Forced error for testing');
    error.status = 400;
    error.name = 'TestError';
    next(error);
});

// Catch 404 errors (route not found)
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// Use the custom error handler middleware
app.use(errorHandler);

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});
