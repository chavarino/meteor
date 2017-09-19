import template from './userLogin.html';
import temcss from './userLogin.css';
import angularMeteor from 'angular-meteor';
import { Accounts } from 'meteor/accounts-base';
var nameComponent = 'userLogin';


//configuraicon de la acount

Accounts.ui.config({

  requestPermissions: {
    facebook: ['email']
  },
  requestOfflineToken: {
    google: true
  },
  passwordSignupFields: 'USERNAME_AND_EMAIL'
});

/*class  UserLogin (){
constructor($scope) {
  $scope.viewModel(this);
  

  this.helpers({
      tasks() {
        const selector = {};
 
        // If hide completed is checked, filter tasks
        if (this.getReactively('hideCompleted')) {
          selector.checked = {
            $ne: true
          };
        }
 
        // Show newest tasks at the top
        return Tasks.find(selector, {
          sort: {
            createdAt: new Date
          }
        });
      },
        incompleteCount() {
    return Tasks.find({
       checked: {
           $ne: true
        }
       }).count();
    },
      currentUser() {
        return Meteor.user();
      }
    })
  }




  }
}

*/

export default angular.module(nameComponent, [angularMeteor, 'accounts.ui'])
.component(nameComponent, {
    templateUrl: template


});
