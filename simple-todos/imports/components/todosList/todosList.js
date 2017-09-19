import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { Meteor } from 'meteor/meteor';
import template from './todosList.html';
import { Tasks } from '../../api/tasks.js';
 
class TodosListCtrl {
constructor($scope) {
  $scope.viewModel(this);
  this.hideCompleted = false;
  this.subscribe('tasks');

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

  newTask = '';

  addTask(newTask)
  {
    Meteor.call('tasks.insert', newTask);
    this.newTask = '';
  } 

  setChecked(task) {
    // Set the checked property to the opposite of its current value
    Meteor.call('tasks.setChecked', task._id, !task.checked);
  }
 
  removeTask(task) {
    Meteor.call('tasks.remove', task._id);
  }

    setPrivate(task) {
    Meteor.call('tasks.setPrivate', task._id, !task.private);
  }


}
 
export default angular.module('todosList', [
  angularMeteor
])
  .component('todosList', {
    templateUrl: 'imports/components/todosList/todosList.html',
    controller: ['$scope', TodosListCtrl]
  });