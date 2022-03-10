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

/* READ GET turmas listing. */
router.get('/view', function(req, res, next) {
    connection.query('SELECT id_turma , nome_turma, curso, data_inicio FROM turmas', (results, error) => {
        if(error) res.send(error);
            else res.send(results)
    });
});

/* CREATE */
router.post('/new', function(req,res){
    //Declara e recebe variáveis
    var nome_turma = req.body.nome_turma.substring(0,99)
    var curso = req.body.curso.substring(0,99)
    var data_inicio = req.body.data_inicio.substring(0,99)

    connection.query('INSERT INTO turmas (nome_turma, curso, data_inicio) values (?,?,?)', [nome_turma,curso,data_inicio], 
    (results, error) => {
        if(error) res.send(error);
            else res.send(results)
      });

});

/**UPDATE */
router.patch('/edit/:id', function(req,res){
    //Declara e recebe variáveis
    var id_turma = parseInt(req.params.id)
    var nome_turma = req.body.nome_turma.substring(0,99)
    var curso = req.body.curso.substring(0,99)

    connection.query('UPDATE turmas SET nome_turma=?, curso=? WHERE id_turma=?', [nome_turma, curso, id_turma], 
    (results, error) => {
        if(error) res.send(error);
            else res.send(results)
      });

});


/**DELETE */
router.delete('/del/:id', function(req,res){
    //Declara e recebe variáveis
    var id_turma = parseInt(req.params.id)

    connection.query('DELETE FROM turmas WHERE id_turma=?', [id_turma], 
    (results, error) => {
        if(error) res.send(error);
            else res.send(results.sqlMessage)
      });
});

module.exports = router;

