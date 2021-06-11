const db = require("../model");
const Nhanvien = db.nhanvien;
const Op = db.Sequelize.Op;
const Joi = require('joi');
const schema = Joi.object(
  {
    firstName : Joi.string().min(2).max(10).required(),
    lastName : Joi.string().min(2).max(10).required(),
    age : Joi.number().integer().min(18).max(60).required(),
    address: Joi.string().required(),
    job: Joi.string()
  }
)

exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
          message: "Empty content"
        });
        return;
      }
    const result = schema.validate(req.body);
    const { error } = result;
    if(!(error == null)){
      res.status(400).send("Bad request");
    } else {
      // Create a Nhanvien
      const nhanvien = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        age: req.body.age,
        address: req.body.address,
        job: req.body.job
      };
    
      // Save Nhanvien in the database
      Nhanvien.create(nhanvien)
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Error"
          });
        });
      }
};

// Retrieve all Nhanvien from the database.
exports.findAll = (req, res) => {
  Nhanvien.findAll({ where: {} })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Error cannot find data"
      });
    });
};

// Find a single Nhanvien with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Nhanvien.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Nhanvien with id=" + id
        });
      });
};

// Update a Nhanvien by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Nhanvien.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Nhanvien was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Nhanvien with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Nhanvien with id=" + id
        });
      });
};

// Delete a Nhanvien with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Nhanvien.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Nhanvien was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Nhanvien with id=${id}. Maybe Nhanvien was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Tutorial with id=" + id
        });
      });
};

// Delete all Nhanvien from the database.
exports.deleteAll = (req, res) => {
    Nhanvien.destroy({
        where: {},
        truncate: false
      })
        .then(nums => {
          res.send({ message: `${nums} Nhanvien were deleted successfully!` });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all nhanvien."
          });
        });
};

// Find all published Nhanvien
exports.findAllIdGreaterThanOne = (req, res) => {
    Nhanvien.findAll({ where: { id : { [Op.gt] : 1}  }})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving nhanvien."
      });
    });
};