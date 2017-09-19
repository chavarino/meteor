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
	Meteor.publish('users', function(){

		return Meteor.users.find({_id : Meteor.userId()}, { fields : {isAdmin : 1}});
	});


}

Meteor.methods(
	{
		'usuarioAutorizado' () 
		{
			
				if(Meteor.userId()){
				/*var privilegioUsuario = UsuarioPrivilegios.findOne({usuario : Meteor.userId()});

				var privilegioAdmin = Privilegios.findOne({privilegio : privilegioMax});*/

				

					if (angular.isUndefined(Meteor.user()))
					 return false;


					var isAdmin = Meteor.user().isAdmin;

					if (angular.isUndefined(isAdmin))
					 return false;


					return isAdmin;

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
			var isAdmin = Meteor.user().isAdmin;
			if(isAdmin)
			{
				var schema = new SimpleSchema({ ciudad : {type: String},
												sala: {type:String},		
												fecha: {type: Date}
				}); 
				schema.validate(conc); 
				Conciertos.insert(conc);

			}
			else {
				throw new Meteor.Error(400, '');
			}


		},

		'borrarConcierto' (conc)
		{

			var isAdmin = Meteor.user().isAdmin;
			if(isAdmin)
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





