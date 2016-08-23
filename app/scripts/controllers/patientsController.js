'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:PatientsCtrl
 * @description
 * # PatientsCtrl
 * Controller of the sbAdminApp
 */

angular.module('sbAdminApp', ['ngAnimate'])
  .controller('PatientsCtrl', ['$scope', '$timeout', '$http', function ($scope, $timeout, $http) {

    $http.get('scripts/controllers/patients.json').then(function (patientsResponse) {
      $scope.patients = patientsResponse.data;
    });
  }]);
