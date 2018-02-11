'use strict';
module.exports = (sequelize, DataTypes) => {
  var Likes = sequelize.define('Likes', {
    bookId: DataTypes.INTEGER,
    likeState: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Likes;
};