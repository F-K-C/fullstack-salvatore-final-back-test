const personagem = require('./personagem.entity')
const service = require('./personagem.service')

async function readAll(req, res) {
    const items = await service.readAll()

    res.send(items)
}

async function readById(req, res) {
    const id = req.params.id

    const item = await service.readById(id)

    if (!item) {
        return res.status(404).send('Item não encontrado.')
    }

    res.send(item)
}

async function create(req, res) {
    const {error, value: newItem } = personagem.validate(req.body)

    if (error) {
        return res.status(400).send({error: error.details[0].message})
    }
    await service.create(newItem)
    res.status(201).send(newItem)
}

async function updateById(req, res) {
    const id = req.params.id

    const {error, value: newItem } = personagem.validate(req.body)

    if (error) {
        return res.status(400).send({error: error.details[0].message})
    }

    await service.updateById(id, newItem)

    res.send(newItem)
}

async function deleteById(req, res) {

    const id = req.params.id
    await service.deleteById(id)
    res.send('Item removido com sucesso: ' + id)
    res.status(204).send()

}

module.exports = {
    readAll,
    readById,
    create,
    updateById,
    deleteById
}
