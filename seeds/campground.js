const { Campground } = require("../models/campground");
const { Review } = require("../models/review");
const { connectDatabase } = require("../config/database");
const { faker } = require("@faker-js/faker");

// Function to seed a single campground
async function seedCampground() {
    try {
        // Creating a new campground object with random data generated using Faker.js
        const campground = new Campground({
            name: faker.location.street(),
            image: faker.image.url(),
            price: faker.number.int({ max: 10000 }),
            description: faker.lorem.sentence(),
            location: faker.location.city() + ", " + faker.location.country(),
        });

        // Generating a random number of reviews for the campground
        const reviewCount = faker.number.int({ min: 5, max: 10 });

        // Generating and saving reviews for the campground
        for (let i = 0; i < reviewCount; ++i) {
            const review = new Review({
                rating: faker.number.int({ min: 1, max: 5 }),
                body: faker.lorem.sentence(),
            });
            campground.reviews.push(review);
            await review.save();
        }

        // Saving the campground
        await campground.save();
        console.log("Campground seeded successfully");
    } catch (error) {
        console.error("Seeding error:", error);
    }
}

// Function to seed multiple campgrounds
async function seedCampgrounds(amount) {
    try {
        // Connecting to the database
        await connectDatabase();

        // Deleting all existing campgrounds
        await Campground.deleteMany();

        // Generating and saving specified number of campgrounds
        for (let i = 0; i < amount; ++i) {
            await seedCampground();
        }
    } catch (error) {
        console.error("Bulk Seeding error:", error);
    } finally {
        // Exiting the process
        process.exit();
    }
}

// Extracting the number of campgrounds to be seeded from the command line arguments, defaulting to 10 if not provided
const amount = process.argv[2] ? process.argv[2] : 10;

seedCampgrounds(amount);
