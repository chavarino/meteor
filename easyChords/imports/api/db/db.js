import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';



/*Lists.schema = new SimpleSchema({
  ciudad: {type: String},
  sala: {type: String},
  fecha: {type: Date}
  info://verlo
});*/

//export const Tasks = new Mongo.Collection('tasks');
export const Conciertos  = new Mongo.Collection('conciertos');

export const Privilegios  = new Mongo.Collection('privilegios');
//

export const UsuarioPrivilegios  = new Mongo.Collection('usuarioPrivilegios');


Meteor.users.deny({
  update() { return true; }
});

if(Meteor.isServer)
{

	//publicaciones de listas
	Meteor.publish('conciertos', function(){

		return Conciertos.find();
	});


}

Meteor.methods(
	{
		'usuarioAutorizado' () 
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
		,
		'insertarConcierto' (conc) {

			//comprobamos la sala
			check(conc.sala, String);
			//comprobamos la cieudad
			check(conc.ciudad, String);
			//comrpobamos la fecha
			check(conc.fecha, Date);

			//TODO Nuevos campos.

			if(Meteor.call('usuarioAutorizado'))
			{
				var schema = new SimpleSchema({ ciudad : {type: String},
												sala: {type:String},		
												fecha: {type: Date}
				}); 
				schema.validate(this.conciertoModel); 
				Conciertos.insert(this.conciertoModel);

			}
			else {
				throw new Meteor.Error(400, '');
			}


		},

		'borrarConcierto' (conc)
		{

			if(Meteor.call('usuarioAutorizado'))
			{
				/*var schema = new SimpleSchema({ ciudad : {type: String},
												sala: {type:String},		
												fecha: {type: Date}
				}); 
				schema.validate(this.conciertoModel); */
				Conciertos.remove(conc._id);

			}
			else {
				throw new Meteor.Error(400, '');
			}
		}




	});





