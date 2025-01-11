const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const fileUpload = require('express-fileupload');
const xmlRoutes = require('./routes/xmlRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(express.json({limit: '10mb'}));
app.use(express.urlencoded({ 
    extended: true,
    limit: '10mb'
}));

// Using EJS for rendering
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json({limit: '10mb'}));
app.use(bodyParser.urlencoded({ 
    extended: true,
    limit: '10mb'
}));

// Middleware for handling file uploads
app.use(fileUpload({
    createParentPath: true,
    limits: { 
        fileSize: 10 * 1024 * 1024,    // 10MB max file size
        fields: 10,                    // Max number of non-file fields
        files: 1,                      // Max number of file fields
        parts: 11                      // Max number of parts (fields + files)
    },
    useTempFiles: true,
    tempFileDir: '/tmp',              // Use the writable temp directory provided by Vercel
    debug: false,
    abortOnLimit: true,               // Return 413 when limit is reached
    responseOnLimit: "File size limit has been reached"
}));
app.use(express.static(path.join(__dirname, 'public')))

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
