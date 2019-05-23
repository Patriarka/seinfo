const db = require('../config/db.config.js');
const ReceitaInscricaoEvento = db.receitaInscricaoEvento;
 
// Post do Evento
exports.create = (req, res) => {

  ReceitaInscricaoEvento.create({  
    //idEvento: req.body.idEvento,
    idEvento: req.body.idEvento,
    idPessoa: req.body.idPessoa,
    dataPagamento: req.body.dataPagamento

  }).then(receitaInscricaoEvento => {    
    // Cria um Evento
    console.log("Criado a receita do evento!")
    res.send(receitaInscricaoEvento);
  }).catch(err => {
    res.status(500).send("Error -> " + err);
  })
};
 
/* não tem como pesquisar por id pois não tem ID específico de Receita */


// exports.findById = (req, res) => { 


//   ReceitaInscricaoEvento.findByPk(req[0].params.loteId).then(receitaEvento => {
//     console.log("Achou o lote pelo ID "+req.params.loteId);
//     res.send(receitaEvento); //Retorna um Json para a Pagina da API
//   }).catch(err => {
//     res.status(500).send("Error -> " + err);
//   })



// };

// exports.findAll = (req, res) => {  
//   Lotes.findAll({ raw: true}).then(lote => {
//     console.log("Listou Todos os Lotes!");
//     res.send(lote); //Retorna um Json para a Pagina da API
//   }).catch(err => {
//     res.status(500).send("Error -> " + err);
//   })
// };

// exports.atualiza = (req,res)=>{

//   Lotes.update(
//     {
//       valor: req.body.valor,
//       dataAbertura: req.body.dataAbertura,
//       dataFechamento: req.body.dataFechamento,
//       idEvento: req.body.idEvento
//   },
//     {where: {idLote: req.params.loteId}}).then(lote=>{
//       console.log("Atualizando Lote");
//       res.send(lote);
//     }).catch(err=>{
//       res.status(500).send("Error "+err);
//     })
    
//   },
  

// exports.delete = (req, res) => {  
//   Lotes.destroy({ where: { idLote: req.params.loteId } }).then(lote => {
//     console.log("Deletando o lote com o ID: "+req.params.loteId);
//     res.send(lote); //Retorna um Json para a Pagina da API
//   }).catch(err => {
//     res.status(500).send("Error -> " + err);
//   })
// };

// exports.amoeba = (req, res) => {
//   console.log("Função de Teste");
// };