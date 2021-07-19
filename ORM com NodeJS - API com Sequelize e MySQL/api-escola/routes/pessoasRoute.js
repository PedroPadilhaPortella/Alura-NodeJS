const { Router } = require("express")
const router = Router()

const PessoaController = require("../controllers/PessoaController")


router.get('/pessoas', PessoaController.getAll);

router.get('/pessoas/ativos', PessoaController.getAllActive);

router.get('/pessoas/:id', PessoaController.getById);

router.get('/pessoas/:id/matriculas/', PessoaController.getMatriculas);

router.get('/pessoas/matriculas/:turmaId/confirmadas', PessoaController.getMatriculasByTurma);

router.get('/pessoas/turmas/lotadas', PessoaController.getTurmasLotadas);

router.get('/pessoas/:estudanteId/matriculas/:matriculaId', PessoaController.getMatricula);

/*  "nome": "Pedro H Portella",
    "ativo": true,
    "email": "pedro@gmail.com",
    "role": "estudante"  */
router.post('/pessoas', PessoaController.save);

router.put('/pessoas/:id', PessoaController.update);

router.delete('/pessoas/:id', PessoaController.remove);

router.put('/pessoas/:id/restore', PessoaController.restore);


/*  {  "status": "confirmado", "turma_id": 3  }  */
router.post('/pessoas/:estudanteId/matriculas', PessoaController.saveMatricula);

router.put('/pessoas/:estudanteId/matriculas/:matriculaId', PessoaController.updateMatricula);

router.delete('/pessoas/:estudante/matriculas/:matricula', PessoaController.removeMatricula);

router.put('/pessoas/:estudante/matriculas/:matricula/restore', PessoaController.restoreMatricula);

router.post('/pessoas/:estudanteId/cancelar', PessoaController.cancelPessoa);

module.exports = router;