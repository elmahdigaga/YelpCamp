const { Campground } = require("../models/campground");
const { Review } = require("../models/review");
const { connectDatabase } = require("../config/database");
const { faker } = require("@faker-js/faker");

async function seedCampground() {
    try {
        const campground = new Campground({
            name: faker.location.street(),
            image: faker.image.url(),
            price: faker.number.int({ max: 10000 }),
            description: faker.lorem.sentence(),
            location: faker.location.city() + ", " + faker.location.country(),
        });
        const reviewCount = faker.number.int({ min: 5, max: 10 });
        for (let i = 0; i < reviewCount; ++i) {
            const review = new Review({
                rating: faker.number.int({ min: 1, max: 5 }),
                body: faker.lorem.sentence(),
            });
            campground.reviews.push(review);
            await review.save();
        }
        await campground.save();
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
