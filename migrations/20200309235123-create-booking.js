'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Bookings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      appartment_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Appartments',
          key: 'id'
        }
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      device_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Devices',
          key: 'id'
        }
      },
      fromplateform: {
        allowNull: true,
        type: Sequelize.STRING
      },
      bookid: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      starttime: {
        allowNull: false,
        type: Sequelize.DATE
      },
      endtime: {
        allowNull: false,
        type: Sequelize.DATE
      },
      firstname: {
        allowNull: true,
        type: Sequelize.STRING
      },
      lastname: {
        allowNull: false,
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
      mobilephone: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Bookings');
  }
};