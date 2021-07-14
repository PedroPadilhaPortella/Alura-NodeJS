const { Router } = require("express")
const router = Router()

const PessoaController = require("../controllers/PessoaController")


router.get('/pessoas', PessoaController.getAll);

router.get('/pessoas/ativos', PessoaController.getAllActive);

router.get('/pessoas/:id', PessoaController.getById);

router.get('/pessoas/:id/matriculas/', PessoaController.getMatriculas);

/*  "nome": "Pedro H Portella",
"ativo": true,
"email": "pedro@gmail.com",
"role": "estudante"  */
router.post('/pessoas', PessoaController.save);

router.put('/pessoas/:id', PessoaController.update);

router.delete('/pessoas/:id', PessoaController.remove);

router.put('/pessoas/:id/restore', PessoaController.restore);


router.get('/pessoas/:estudanteId/matriculas/:matriculaId', PessoaController.getMatricula);

/*  {  "status": "confirmado", "turma_id": 3  }  */
router.post('/pessoas/:estudanteId/matriculas', PessoaController.registerMatricula);

router.put('/pessoas/:estudanteId/matriculas/:matriculaId', PessoaController.updateMatricula);

router.delete('/pessoas/:estudanteId/matriculas/:matriculaId', PessoaController.removeMatricula);

router.put('/pessoas/:estudanteId/matriculas/:matriculaId/restore', PessoaController.restoreMatricula);

router.get('/pessoas/matriculas/:turmaId/confirmadas', PessoaController.getMatriculasByTurma);

module.exports = router;