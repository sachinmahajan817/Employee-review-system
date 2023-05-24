//check if it is authenticated or not
const isAuthenticated = (req, res, next) => {
    if (req.user) return next();
    res.status(401).json({ message: "unauthoriize" });
}

module.exports = isAuthenticated;