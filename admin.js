
const User = require('../models/user');

//admin controller
const ctrl = {
    //To get data on page
    getData: async (req, res, err) => {
        const employee = await User.find();
        const self = await User.findOne({ email: req.user.email });
        const toReview = self.toReview;
        const myReviews = self.myReviews;
        res.render('admin', { 'employee': employee, 'toReview': toReview, 'myReviews': myReviews, 'name': req.user.name, 'email': req.user.email });
    },

    //To assign Employee to review each other
    assignReview: async (req, res, err) => {
        try {
            const { from, to } = req.body;
            if (from == to) return res.redirect('/admin');
            const user = await User.findOne({ email: from });
            const duplicate = await User.find({ email: from }, {
                toReview: { $elemMatch: { to: to } }
            })

            review = user.toReview;
            review.push({ to: to });
            user.toReview = review;
            user.save();
            res.redirect('/admin');
        } catch (err) {
            console.log(err);
        }
    },

    //To make an Employee Admin
    makeAdmin: async (req, res) => {
        try {
            const email = req.body.email;
            const user = await User.findOne({ email: email });
            user.role = true;
            await user.save();
            res.redirect('/admin');

        } catch (err) {
            console.log(err);
        }
    },

    //To delete Employee from database
    deleteEmployee: async (req, res) => {
        try {
            const id = req.params.id;
            await User.findByIdAndRemove({ _id: id });
            res.redirect('/admin');
        } catch (err) {
            console.log(err);
        }
    },

    //To get Employee Details
    getEmployeeDetails: async (req, res) => {
        try {
            const id = req.params.id;
            const user = await User.findOne({ _id: id });
            res.render('employee-details', { 'reviews': user.myReviews, 'name': user.name, 'email': user.email });
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = ctrl;