const Campground = require("../models/campground");

const index = async (req, res) => {
    const campgrounds = await Campground.find();

    if (campgrounds.length === 0) {
        req.flash("error", "No Campgrounds Found!");
        res.status(404).redirect("/");
    }

    res.status(200).render("campgrounds/all", { campgrounds });
};

const renderCreate = (req, res) => {
    res.status(200).render("campgrounds/create");
};

const renderEdit = async (req, res) => {
    const { id } = req.params;

    const campground = await Campground.findOne({ _id: id });

    res.status(200).render("campgrounds/edit", { campground });
};

const renderDetails = async (req, res) => {
    const { id } = req.params;

    const campground = await Campground.findOne({ _id: id })
        .populate({ path: "reviews", populate: { path: "author" } })
        .populate("author");
    if (!campground) {
        req.flash("error", "Campground Not Found!");
        res.status(404).redirect("/campgrounds");
    }

    res.status(200).render("campgrounds/details", { campground });
};

const create = async (req, res) => {
    const { name, price, description, location } = req.body;
    const image = req.file.path;
    const author = req.user._id;

    const campground = await Campground.create({
        name,
        image,
        price,
        description,
        location,
        author,
    });

    req.flash("success", "Campground created successfully!");
    res.status(200).redirect(`/campgrounds/${campground._id}`);
};

const update = async (req, res) => {
    const { id } = req.params;
    const { name, image, price, description, location } = req.body;

    await Campground.updateOne(
        { _id: id },
        {
            name,
            image,
            price,
            description,
            location,
            date_modified: Date.now(),
        }
    );

    req.flash("success", "Campground updated successfully!");
    res.status(200).redirect(`/campgrounds/${id}`);
};

const remove = async (req, res) => {
    const { id } = req.params;

    await Campground.deleteOne({ _id: id });

    req.flash("success", "Campground deleted successfully!");
    res.status(200).redirect("/campgrounds");
};

module.exports = {
    index,
    renderCreate,
    renderEdit,
    renderDetails,
    create,
    update,
    remove,
};
