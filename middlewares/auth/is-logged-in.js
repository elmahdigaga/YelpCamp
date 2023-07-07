function isLoggedIn(req, res, next) {
    if (!req.isAuthenticated()) {
        req.session.returnTo =
            req.originalUrl !== "/auth/logout" ? req.originalUrl : "";
        req.flash("error", "You must login");
        return res.status(401).redirect("/auth/login");
    }
    next();
}

module.exports = { isLoggedIn };
