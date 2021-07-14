const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Pessoas extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Pessoas.hasMany(models.Turmas, { foreignKey: 'docente_id' })
            Pessoas.hasMany(models.Matriculas, { 
                foreignKey: 'estudante_id',
                //mixin de query
                scope: { status: 'confirmado' }, 
                as: 'aulasMatriculadas' 
            })

        }
    };
    Pessoas.init({
        nome: { 
            type: DataTypes.STRING,
            validate: {
                validateNome: (nome) => {
                    if(nome.length < 3) throw new Error('O Nome deve ter mais de 3 caracteres')
                }
            }
        },
        ativo: DataTypes.BOOLEAN,
        email: {
            type: DataTypes.STRING, 
            validate: {
                isEmail: { args: true, msg: 'Email Inválido' }
            }
        },
        role: DataTypes.STRING
    }, {
        sequelize,
        paranoid: true,
        defaultScope: {
            where: { ativo: true }
        },
        scopes: {
            all: { where: {} }
        },
        modelName: 'Pessoas',
    });
    return Pessoas;
};