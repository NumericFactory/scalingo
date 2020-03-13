'use strict';
module.exports = (sequelize, DataTypes) => {
  const Device = sequelize.define('Device', {
    appartment_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    devicenumber: DataTypes.STRING
  }, {});
  Device.associate = function (models) {
    // associations can be defined here
    models.Device.belongsTo(models.Appartment, {
      foreignKey: {
        allowNull: false
      }
    });
    models.Device.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    })
  };
  return Device;
};