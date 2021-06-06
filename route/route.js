const Course = require('../model/model')

function route(app) {
    app.get('/api/courses', (req, res, err) => {
        Course.find()
            .then((courses) => {
                res.json({
                    courses,
                    status: "disabled"
                })
            })
            .catch(err)
    })
    app.get('/api/courses/:_id', (req, res, err) => {
        Promise.all([Course.find(), Course.findById(req.params._id)])
            .then(([courses, course]) => {
                res.json({
                    courses: courses,
                    course,
                    status: "disabled"
                })
            })
            .catch(err)
    })
    app.post('/api/courses', (req, res, err) => {
        const data = req.body;
        const course = new Course(data)
        course
            .save()
            .then((course) => {
                res.json({
                    message: "success",
                    course
                })
            })
            .catch(err => {
                res.json({
                    message: "fair"
                })
            })

    })
    app.put('/api/courses/:id', (req, res, err) => {
        const id = req.body.id
        const name = req.body.name
        const price = req.body.price
        console.log("update")
        Course.findOneAndUpdate(id, { name: name, price: price })
            .exec()
            .then((course) => {
                res.json({
                    message: "update success for course ID : id",
                    course: course
                })
            })
            .catch(err => {
                message: "update fair!!!"
            })

    })
    app.delete('/api/courses/:id', (req, res, err) => {
        Course.findByIdAndDelete(req.body.id)
            .exec()
            .then((course) => {
                res.json({ message: "delete success !!" })
            })
    })
}
module.exports = route;