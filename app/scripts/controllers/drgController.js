/**
 * Created by ei on 18.08.2016.
 */
'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:PatientsCtrl
 * @description
 * # PatientsCtrl
 * Controller of the sbAdminApp
 */

angular.module('sbAdminApp')
  .controller('DRGCtrl', ['$scope', '$timeout', '$http', function ($scope, $timeout, $http) {

    $http.get('scripts/controllers/DRG_GER.json').then(function (drgResponse) {

    });

  }]);
