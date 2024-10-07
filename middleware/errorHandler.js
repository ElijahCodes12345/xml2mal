// errorHandler.js

const errorHandler = (err, req, res, next) => {
    console.error('Error:', err.message);  // Log the error message
    console.error('Stack:', err.stack);    // Log the stack trace for debugging

    if (err.status === 404) {
        res.render('404', { title: 'Page Not Found' });
    }

    const statusCode = err.status || 500;  // Default to 500 if no status code is set
    res.status(500).render('error', { errorMessage: err.message || 'Internal Server Error', statusCode });
};

module.exports = errorHandler;
