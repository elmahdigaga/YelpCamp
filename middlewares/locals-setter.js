function localsSetter(req, res, next) {
    try {
        res.locals.currentUser = req.user;
        res.locals.flashSuccess = req.flash("success");
        res.locals.flashError = req.flash("error");
        next();
    } catch (error) {
        next(error);
    }
}

module.exports = { localsSetter };
