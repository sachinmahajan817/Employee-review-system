const notAdmin = (req, res, next) => {
    if (req.user.role == false) return next();
    res.status(400).json({ message: "notAdmin" });
}

module.exports = notAdmin;