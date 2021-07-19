const { Router } = require("express")
const router = Router()

const NivelController = require('../controllers/NivelController')

router.get('/niveis', NivelController.getAll)

router.get('/niveis/:id', NivelController.getById)

router.post('/niveis', NivelController.save)

router.put('/niveis/:id', NivelController.update)

router.delete('/niveis/:id', NivelController.remove)

router.put('/niveis/:id/restore', NivelController.restore)

module.exports = router;