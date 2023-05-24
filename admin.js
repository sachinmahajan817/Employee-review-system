const admin = (req, res, next) => {
    if (req.user.role) return next();
    res.status(401).json({ admin: false });
}

module.exports = admin;