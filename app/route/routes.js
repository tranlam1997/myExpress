module.exports = app => {
    const nhanvien = require("../controller/controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", nhanvien.create);
  
    // Retrieve all nhanvien
    router.get("/", nhanvien.findAll);
  
    // Retrieve all published nhanvien
    router.get("/greaterthanone", nhanvien.findAllIdGreaterThanOne);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", nhanvien.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", nhanvien.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", nhanvien.delete);
  
    // Delete all nhanvien
    router.delete("/", nhanvien.deleteAll);
  
    app.use('/api/nhanvien', router);
  };