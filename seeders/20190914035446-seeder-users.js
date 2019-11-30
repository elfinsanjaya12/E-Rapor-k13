"use strict";
const bcrypt = require("bcryptjs");

module.exports = {
  up: (queryInterface, Sequelize) => {
    const password = bcrypt.hashSync("rahasia", 10);
    return queryInterface.bulkInsert(
      "Users",
      [
        {
          username: "admin",
          password: password,
          role: "admin",
          status: "Active",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          username: "fidin",
          password: password,
          role: "guru",
          status: "Active",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          username: "itce",
          password: password,
          role: "guru",
          status: "Nonactive",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          username: "ega",
          password: password,
          role: "siswa",
          status: "Active",
          createdAt: new Date(),
          updatedAt: new Date()
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {});
  }
};
