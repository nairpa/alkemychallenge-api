module.exports = (sequelize, Sequelize) => {
    const Posts = sequelize.define('posts', {
        titulo: {
            type: Sequelize.STRING,
            required: true,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "El post debe contener un título"
                }
            }
        },
        contenido: {
            type: Sequelize.STRING,
            required: true,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "El post debe tener un contenido"
                }
            }
        },
        imagen: {
            type: Sequelize.STRING,
            validate: {
                isUrl: true,
                is: {
                    args: /[\/.](gif|jpg|jpeg|svg|png)$/i,
                    msg: "La url debe contener una imagen",
                },
                notNull: {
                    msg: "El campo imagen no puede estar vacío"
                }
            },
            required: true,
            allowNull: false,
        },
        categoria: {
            type: Sequelize.STRING,
            required: true,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "El post debe tener una categoría"
                }
            }
        },
    });

    return Posts;
}