'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    mobilephone: DataTypes.STRING,
    address: DataTypes.STRING,
    postalcode: DataTypes.STRING,
    city: DataTypes.STRING,
    country: DataTypes.STRING,
    isadmin: DataTypes.BOOLEAN,
    apikeybeds24: DataTypes.STRING,

  }, {});
  User.associate = function (models) {
    // associations can be defined here
    models.User.hasMany(models.Appartment);
    models.User.hasMany(models.Device);
    models.User.hasMany(models.Booking);

  };
  return User;
};