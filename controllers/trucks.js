const mongoose = require("mongoose");
const Truck = mongoose.model("Truck");

class TruckController {
    getAll(req, res) {
        Truck.find().sort('cuisine').exec()
            .then(trucks => res.json(trucks))
            .catch(err => res.json(err));
    }
    create(req, res) {
        let truck = new Truck(req.body);
        truck.save()
            .then(() => res.json({status: "ok"}))
            .catch(err => res.json(err));
    }
    getOne(req, res) {
        Truck.findOne({_id: req.params._id})
            .then(truck => res.json(truck))
            .catch(err => res.json(err));
    }
    review(req, res) {
        Truck.findByIdAndUpdate(
            {_id: req.params._id}, 
            {$push: {reviews: req.body}}, 
            {runValidators: true}
        )
            .then(() => res.json({status: "ok"}))
            .catch(err => res.json(err));
    }
}

module.exports = new TruckController();