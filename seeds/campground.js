const Campground = require("../models/campground");
const { faker } = require("@faker-js/faker");

// Function to seed a single campground
async function seedCampground(author) {
    try {
        const nbrImages = faker.number.int({ min: 1, max: 3 });
        let images = [];
        for (let i = 0; i < nbrImages; ++i) {
            images.push(faker.image.url());
        }
        await Campground.create({
            name: faker.location.street(),
            images,
            price: faker.number.int({ max: 1000 }),
            description: faker.lorem.sentence(),
            location: faker.location.city() + ", " + faker.location.country(),
            author,
        });

        console.log("Campground seeded successfully");
    } catch (error) {
        console.error("Seeding error:", error);
    }
}

module.exports = { seedCampground };
