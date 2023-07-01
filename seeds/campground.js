const { Campground } = require("../models/campground");
const { connectDatabase } = require("../config/database");
const { faker } = require("@faker-js/faker");

async function seedCampground() {
    try {
        const campground = await Campground.create({
            name: faker.location.street(),
            price: faker.number.int({ max: 10000 }),
            description: faker.lorem.sentence(),
            location: faker.location.city() + ", " + faker.location.country(),
        });
        console.log("Campground seeded successfully");
    } catch (error) {
        console.error("Seeding error:", error);
    }
}

async function seedCampgrounds(amount) {
    try {
        await connectDatabase();
        await Campground.deleteMany();

        for (let i = 0; i < amount; ++i) {
            await seedCampground();
        }
    } catch (error) {
        console.error("Bulk Seeding error:", error);
    } finally {
        process.exit();
    }
}

const amount = process.argv[2] ? process.argv[2] : 10;
seedCampgrounds(amount);
