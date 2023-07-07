const Campground = require("../models/campground");
const Review = require("../models/review");
const User = require("../models/user");
const { faker } = require("@faker-js/faker");
const { connectDatabase } = require("../config/database");
const { seedCampground } = require("./campground");

// Function to seed a single user
async function seedUser() {
    try {
        let user = new User({
            email: faker.internet.email(),
            username: faker.internet.userName(),
        });
        const password = faker.internet.password();
        user = await User.register(user, password);

        const campgroundCount = faker.number.int({ min: 1, max: 5 });
        for (let i = 0; i < campgroundCount; ++i) {
            await seedCampground(user._id);
        }

        console.log("User seeded successfully");
    } catch (error) {
        console.error("Seeding error:", error);
    }
}

// Function to seed multiple users
async function seedUsers(amount) {
    try {
        // Connecting to the database
        await connectDatabase();

        // Deleting all existing data
        await Review.deleteMany();
        await Campground.deleteMany();
        await User.deleteMany();

        // Generating and saving specified number of users
        for (let i = 0; i < amount; ++i) {
            await seedUser();
        }
    } catch (error) {
        console.error("Bulk Seeding error:", error);
    } finally {
        // Exiting the process
        process.exit();
    }
}

// Extracting the number of users to be seeded from the command line arguments, defaulting to 10 if not provided
const amount = process.argv[2] ? process.argv[2] : 10;

seedUsers(amount);
