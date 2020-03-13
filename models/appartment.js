'use strict';
module.exports = (sequelize, DataTypes) => {
  const Appartment = sequelize.define('Appartment', {
    user_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    postalcode: DataTypes.STRING,
    city: DataTypes.STRING,
    country: DataTypes.STRING,
    description: DataTypes.STRING
  }, {});
  Appartment.associate = function (models) {
    // associations can be defined here
    models.Appartment.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
    models.Appartment.hasMany(models.Device);
  };
  return Appartment;
};