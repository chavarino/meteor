import angular from 'angular';
import angularMeteor from 'angular-meteor';
import userLogin from '../imports/components/userLogin/userLogin';
import conciertos from '../imports/components/conciertos/conciertos';

angular.module('easyChords', [
  angularMeteor,
  userLogin.name,
  conciertos.name
]);