const cspDirectives = {
    defaultSrc: ["'self'", "api.mapbox.com", "events.mapbox.com"],
    imgSrc: [
        "'self'",
        "data:",
        "picsum.photos",
        "fastly.picsum.photos",
        "loremflickr.com",
        "res.cloudinary.com/drgo3xjcu",
    ],
    scriptSrc: ["'self'", "'unsafe-inline'", "blob:"],
    styleSrc: ["'self'", "'unsafe-inline'", "mapbox:"],
};

module.exports = cspDirectives;
