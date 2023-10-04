module.exports = (sequelize, dataTypes) => {
    let Menu = sequelize.define(
        'Menu',
        {id: {
            type: dataTypes.INTEGER(11),
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
            },
            titulo: {
                type: dataTypes.STRING(30),
            },
            detalle: {
                type: dataTypes.TEXT(70),
            },
            precio: {
                type: dataTypes.DECIMAL(10),

            },
            img:{
                type: dataTypes.TEXT(60),
            }
        },
        {
            tableName: 'menues',
            timestamps: false,
        });
        return Menu
    };