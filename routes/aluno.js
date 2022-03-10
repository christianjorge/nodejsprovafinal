var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'escola',
    multipleStatements:true
});

connection.connect();

/* READ GET aluno listing. */
router.get('/view', function(req, res, next) {
  connection.query('SELECT id_aluno, id_turma, nome_aluno, data_matricula FROM aluno', (results, error) => {
    if(error) res.send(error);
        else res.send(results)
  });
});


/* CREATE */
router.post('/new', function(req,res){
    //Declara e recebe variáveis
    var id_turma = req.body.id_turma
    var nome_aluno = req.body.nome_aluno.substring(0,99)

    connection.query('INSERT INTO aluno (id_turma, nome_aluno, data_matricula) values (?,?,CURDATE())', [id_turma,nome_aluno], 
    (results, error) => {
        if(error) res.send(error);
            else res.send(results)
      });

});

/**UPDATE */
router.patch('/edit/:id', function(req,res){
    //Declara e recebe variáveis
    var id_aluno = parseInt(req.params.id)
    var id_turma = req.body.id_turma
    var nome_aluno = req.body.nome_aluno.substring(0,99)

    connection.query('UPDATE aluno SET id_turma=?, nome_aluno=? WHERE id_aluno=?', [id_turma,nome_aluno,id_aluno], 
    (results, error) => {
        if(error) res.send(error);
            else res.send(results)
      });

});


/**DELETE */
router.delete('/del/:id', function(req,res){
    //Declara e recebe variáveis
    var id_aluno = parseInt(req.params.id)

    connection.query('DELETE FROM aluno WHERE id_aluno=?', [id_aluno], 
    (results, error) => {
        if(error) res.send(error);
            else res.send(results)
      });

});


module.exports = router;

