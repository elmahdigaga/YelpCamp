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
    const author = req.user._id;
    const images = req.files.map((file) => ({
        url: file.path,
        filename: file.filename,
    }));

    const campground = await Campground.create({
        name,
        images,
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
    const { name, price, description, location, deleteImages } = req.body;

    const campground = await Campground.findOneAndUpdate(
        { _id: id },
        {
            name,
            price,
            description,
            location,
            date_modified: Date.now(),
        }
    );

    if (req.files.length > 0) {
        const imgs = req.files.map((file) => ({
            url: file.path,
            filename: file.filename,
        }));
        campground.images.push(...imgs);
    }

    if (deleteImages) {
        await campground.updateOne({
            $pull: { images: { filename: { $in: deleteImages } } },
        });
    }

    await campground.save();
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
