const Campground = require("../models/campground");
const { faker } = require("@faker-js/faker");

// Function to seed a single campground
async function seedCampground(author) {
    try {
        await Campground.create({
            name: faker.location.street(),
            image: faker.image.url(),
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
