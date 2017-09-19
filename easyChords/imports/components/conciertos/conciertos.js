import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { Meteor } from 'meteor/meteor';
import  template from "./conciertos.html";
import css from "./conciertos.css";
import { Conciertos, Privilegios, UsuarioPrivilegios } from '../../api/db/db.js';

const privilegioMax = "admin";



class ConciertosCtrl {

	constructor($scope)
	{

		$scope.viewModel(this);

		this.subscribe('conciertos');

		this.helpers({
			conciertosProximos()
			{
				var conciertosAux = Conciertos.find({ fecha : {$gte: new Date()}},
				 {sort : { fecha : new Date()}});
				return conciertosAux;
			},
			conciertosPasados()
			{
				return Conciertos.find({ fecha : {$lt : new Date()}},
					 {sort : { fecha : -1}});
			}


		})




	}

	conciertoModel = { ciudad : undefined, sala : undefined, fecha: undefined};

	insertarConcierto(){

		try {
				///TO DO
				Meteor.call('insertarConcierto',this.conciertoModel);


		}
		catch (e)
		{

				alert("Error al insertar concierto");

		}


	}
	
	borrarConcierto(conc)
	{

		try {
			Meteor.call('borrarConcierto', conc);

		}
		catch (e)
		{

				alert("Error al insertar concierto");

		}
	}

	usuarioAutorizado()
	{

					const privilegioMax = "admin";

				if(Meteor.userId()){
				var privilegioUsuario = UsuarioPrivilegios.findOne({usuario : Meteor.userId()});

				var privilegioAdmin = Privilegios.findOne({privilegio : privilegioMax});

				if (angular.isUndefined(privilegioUsuario)  || angular.isUndefined(privilegioAdmin))
				 return false;


				return ((privilegioUsuario.privilegio.equals(privilegioAdmin._id)) ? true : false);

			}
			
			return false;


	}

			//
	formateaMes(fecha)
		{
			var meses = ["Ene", "Feb", "Mar", "Abr"
		, "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
			var mes = meses[fecha.getUTCMonth()];
			
			return mes;
		}
	formateaDia(fecha)
	{
		var dia = fecha.getDate();
		if(dia<10)
		{
			return "0"+dia;
		}

		return dia;
	}


}




export default angular.module('conciertos', 
	[ angularMeteor])
	.component('conciertos',{
		templateUrl : template,
		controller : ['$scope', ConciertosCtrl]
	});


