<template>
	<AuthConsumer>
    <div slot-scope="{ getUser }">
			<a-table :columns="columns" :data-source="res_atividades" :pagination="false" >
				<div slot="expandedRowRender" slot-scope="record" style="margin: 0" class="info">
					<tr>Valor:  R$ {{record.valor}}</tr>
					<tr>Vagas disponíveis: {{record.quantidadeVagas}}</tr>
					<tr>Horas de participação: {{record.horasParticipacao}}</tr>
					<tr>Categoria : {{record.categoriaAtv.nome}}</tr> 
				    <tr>Descrição: {{record.descricao}} </tr>
					<div class="botoes">
						<a-button type="button" class="ic" @click="inscricao(getUser.CPF, record)"> INSCREVER-SE </a-button>
				<!-- <a-button type="button" class="dl" @click="showDeleteConfirm(res.idEvento)"> CANCELAR INSCRIÇÃO </a-button> -->
					</div>
				</div>
			</a-table>
			<a-table :columns="columns2" :data-source="res_atividades2" :pagination="false" >
				<div slot="expandedRowRender" slot-scope="record" style="margin: 0" class="info">
					<tr>Valor:  R$ {{record.atividade.valor}}</tr>
					<tr>Vagas disponíveis: {{record.atividade.quantidadeVagas}}</tr>
					<tr>Horas de participação: {{record.atividade.horasParticipacao}}</tr>
					<tr>Descrição: {{record.atividade.descricao}} </tr>
					<div class="botoes">
						<a-button type="button" class="dl"  @click="exclusao(getUser.CPF, record)"> CANCELAR INSCRIÇÃO </a-button>
				<!-- <a-button type="button" class="dl" @click="showDeleteConfirm(res.idEvento)"> CANCELAR INSCRIÇÃO </a-button> -->
					</div>
				</div>
			</a-table>
		</div>
	</AuthConsumer>
</template>

<script>
import AuthConsumer from '../contexts/authConsumer';

import axios from 'axios';
import moment from "moment";
moment.locale("pt-br");

const columns = [{
  title: 'Atividades',
  dataIndex: 'titulo',
	width: 1200,
}];
const columns2 = [{
  title: 'Minhas atividades',
  dataIndex: 'atividade.titulo',
	width: 1200,
}];

export default {
	mounted() {
		console.log(this.$route.params);
		this.pegar_tabela_atividades(this.$route.params.idEvento, this.$route.params.CPF)
		this.pegar_tabela_atividades2(this.$route.params.idEvento, this.$route.params.CPF)
	},
	components: {
    AuthConsumer
  	},
	methods: {
	pegar_tabela_atividades(idEvento, CPF) {
		
		axios
			.get(`http://localhost:3000/api/inscAtvEventAll/${CPF}/${idEvento}`)
			.then(response => {
				// console.log(this.$route.params.idEvento);
				console.log(response.data);
				this.res_atividades = response.data;
			})
			.catch(function(error) {
				console.log(error);
			});

		},

	pegar_tabela_atividades2(idEvento, CPF) {
		axios
			.get(`http://localhost:3000/api/inscAtvEvent/${CPF}/${idEvento}`)
			.then(response => {
				// console.log(this.$route.params.idEvento);
				console.log(response.data);
				this.res_atividades2 = response.data;
			})
			.catch(function(error) {
				console.log(error);
			});
		},
	inscricao(CPF, record) {
      console.log(record);
      axios
        .post(`http://localhost:3000/api/inscAtv/${record.idEvento}/${CPF}` , {idAtividade: record.idAtividade, dataInscricao:'2020-08-09'})
        .then((response) => {
          console.log(response.data);
		  document.location.reload(true);
        })
        .catch(function (error) {
          alert("Não foi possível realizar a inscrição!");
          console.log(error);
        });
	},
	exclusao(CPF, record) {
      axios
        .delete(`http://localhost:3000/api/inscAtv/${record.idEvento}/${record.idAtividade}/${CPF}`)
        .then((response) => {
		  console.log(response.data);
		  document.location.reload(true);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
	},
	data () {
		return { 
			res_atividades: [],
			res_atividades2: [],
			idEvento: "",
			columns,
			columns2,
		};
	},
	
};
</script>

<style scoped>
.info {
	font-size: 16px;
	text-align: left;
	font-weight: 600;
	letter-spacing: 0.2px;
	/* width: 80%; */
	/* border: 1px solid red; */
}
.info tr {
	/* border: 1px solid red; */
	height: 36px;
}
.botoes {
	
	width: 112px;
	height: 34px;
	float: right;
}
.ic {
  font-weight: 600;
  letter-spacing: 0.8px;
  background-color: rgba(157, 211, 157, 0.5);
  border: 2px solid rgb(64, 212, 64);
  color: black;
  cursor: pointer;
	float: right;
	margin-left: -50px	;
}
.ic:hover {
  color: white;
  background-color: rgb(64, 212, 64);
}
.dl {
  font-weight: 600;
  letter-spacing: 0.8px;
  background-color: rgba(236, 69, 69, 0.5);
  border: 2px solid rgb(236, 69, 69);
  color: black;
  cursor: pointer;
	float: right;
	margin-left: -50px	;
}
.dl:hover {
  color: white;
  background-color: rgb(236, 69, 69);
}
</style>