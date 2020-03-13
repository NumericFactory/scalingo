'use strict';
module.exports = (sequelize, DataTypes) => {
  const Story = sequelize.define('Story', {
    booking_id: DataTypes.INTEGER,
    code: DataTypes.STRING,
    sms: DataTypes.STRING
  }, {});
  Story.associate = function (models) {
    // associations can be defined here
    models.Story.belongsTo(models.Booking, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Story;
};