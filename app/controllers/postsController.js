const db = require('../models');
const Post = db.posts;

const create = (req, res) => {

    const post = {
        titulo: req.body.titulo,
        contenido: req.body.contenido,
        imagen: req.body.imagen,
        categoria: req.body.categoria,
    }

    Post.create(post)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || 'Ocurrió un error al crear el post.'
            });
        });
};

const findAll = (req, res) => {
    Post.findAll({
        order: [['createdAt', 'DESC']], 
        attributes: [['id', 'id'], ['titulo', 'titulo'], ['contenido', 'contenido'], ['imagen', 'imagen'], ['categoria', 'categoria'], ['createdAt', 'createdAt']],
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || 'Ocurrió un error al intentar traer el post'
            });
        });
};

 const findOne = (req, res) => {
    const id = req.params.id;

    Post.findByPk(id)
        .then(data => {
            if(!data) {
                res.send({
                    message: 'No existe Post con id = ' + id
                })
            } else {
            res.send(data);
            }
        })
        .catch(err => {
            res.status(500).send({
                message: 'Error al intentar traer Post con id = ' + id
            });
        });
};

const update = (req, res) => {
    const id = req.params.id;

    Post.update(req.body, {
        where: { id : id }
    })
        .then(num => {
            if(num == 1) {
                res.send({
                    message: 'El Post fue actualizado correctamente.'
                });
            } else {
                res.send({
                    message: `No se pudo actualizar Post con id = ${id}`
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: 'Error al querer actualizar post con id = ' + id
            });
        });
};

const deleteById = (req, res) => {
    const id = req.params.id;

    Post.destroy({
        where: { id: id }
    })
        .then(num => {
            if(num == 1) {
                res.send({
                    message: 'El Post fue eliminado correctamente'
                });
            } else {
                res.send({
                    message: `No se pudo eliminar el Post con id = ${id}. Puede ser que el Post ya no exista!`
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: 'No se pudo eliminar el Post con el id = ' + id
            });
        });
}

module.exports = {create, findAll, findOne, update, deleteById}
