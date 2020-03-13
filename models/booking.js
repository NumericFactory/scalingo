'use strict';
module.exports = (sequelize, DataTypes) => {
  const Booking = sequelize.define('Booking', {
    appartment_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    device_id: DataTypes.INTEGER,
    fromplateform: DataTypes.STRING,
    bookid: DataTypes.INTEGER,
    starttime: DataTypes.DATE,
    endtime: DataTypes.DATE,
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    phone: DataTypes.STRING,
    mobilephone: DataTypes.STRING
  }, {});
  Booking.associate = function (models) {
    // associations can be defined here
    models.Booking.belongsTo(models.Appartment, {
      foreignKey: {
        allowNull: false
      }
    });
    models.Booking.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
    models.Booking.belongsTo(models.Device, {
      foreignKey: {
        allowNull: false
      }
    });
    // models.Booking.hasOne(models.Story);
  };
  return Booking;
};