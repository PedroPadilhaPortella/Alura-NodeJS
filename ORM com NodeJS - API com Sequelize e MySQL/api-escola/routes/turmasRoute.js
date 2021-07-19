const { Router } = require("express")
const router = Router()

const TurmaController = require('../controllers/TurmaController')

router.get('/turmas', TurmaController.getAll)

router.get('/turmas/:id', TurmaController.getById)

/* { "data_inicio": "07-07-2021", "docente_id": 6, "nivel_id": 2 } */
router.post('/turmas', TurmaController.save)

router.put('/turmas/:id', TurmaController.update)

router.delete('/turmas/:id', TurmaController.remove)

router.put('/turmas/:id/restore', TurmaController.restore)

module.exports = router;