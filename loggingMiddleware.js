const loggingMiddleware = (req, res, next) => {
    console.log('ip:', req.ip);
    next();
};

module.exports = loggingMiddleware;
