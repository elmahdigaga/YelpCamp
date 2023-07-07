const Campground = require("../models/campground");
const Review = require("../models/review");
const User = require("../models/user");
const { faker } = require("@faker-js/faker");
const { connectDatabase } = require("../config/database");

async function seedReviews() {
    try {
        await connectDatabase();

        const users = await User.find();
        const campgrounds = await Campground.find();

        for (let campground of campgrounds) {
            const reviewCount = faker.number.int({ min: 5, max: 7 });

            for (let i = 0; i < reviewCount; ++i) {
                const author =
                    users[faker.number.int({ min: 0, max: users.length - 1 })]
                        ._id;
                const review = new Review({
                    rating: faker.number.int({ min: 1, max: 5 }),
                    body: faker.lorem.sentence(),
                    author,
                });

                campground.reviews.push(review);
                await review.save();

                console.log("Review seeded successfully");
            }
            await campground.save();
        }
    } catch (error) {
        console.error("Seeding error:", error);
    } finally {
        // Exiting the process
        process.exit();
    }
}

seedReviews();
