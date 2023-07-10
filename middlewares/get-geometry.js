const geocoding = require("@mapbox/mapbox-sdk/services/geocoding");

const geocoder = geocoding({ accessToken: process.env.MAPBOX_TOKEN });

async function getGeometry(req, res, next) {
    try {
        const { location } = req.body;

        const geoData = await geocoder
            .forwardGeocode({
                query: location,
                limit: 1,
            })
            .send();

        req.body.geometry = geoData.body.features[0].geometry;

        next();
    } catch (error) {
        next(error);
    }
}

module.exports = { getGeometry };
