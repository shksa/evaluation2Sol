'use strict';
module.exports = (sequelize, DataTypes) => {
  var Books = sequelize.define('Books', {
    author: DataTypes.STRING,
    name: DataTypes.STRING,
    bookId: DataTypes.INTEGER,
    rating: DataTypes.FLOAT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Books;
};