const authMiddleware = (req, res, next) => {
    const user = req.headers['x-user'];
    const pass = req.headers['x-pass'];

    const CORRECT_USER = 'admin';
    const CORRECT_PASS = '1234';

    if (user === CORRECT_USER && pass === CORRECT_PASS) {
        next();
    } else {
        res.status(401).json({
            error: 'No autorizado'
        });
    }
};

module.exports = authMiddleware;
