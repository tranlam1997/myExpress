module.exports = (sequelize, Sequelize) => {
    const nhanvien = sequelize.define("nhanvien", {
      id : { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
      firstName: Sequelize.STRING,
      lastName: Sequelize.STRING,
      age: Sequelize.INTEGER,
      address: Sequelize.STRING,
      job: Sequelize.STRING
    }, { initialAutoIncrement: 1});
    return nhanvien;
  };