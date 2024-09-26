module.exports = (sequelize, Sequelize) => {
  const Resultado = sequelize.define("resultado", {
    type: {
      type: Sequelize.STRING
    },
    text: {
      type: Sequelize.STRING
    }
  });

  return Resultado;
};