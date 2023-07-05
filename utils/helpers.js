function handleErrors(func) {
    return function (req, res, next) {
        func(req, res, next).catch((error) => {
            console.log("I'm in !");
            next(error);
        });
    };
}

module.exports = { handleErrors };
