'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
  .controller('ChartCtrl', ['$scope', '$timeout', '$http', function ($scope, $timeout, $http) {

    // init chart
    $scope.line = [];

    // get data
    $http.get('scripts/controllers/patients.json').then(function (patientsResponse) {
      $scope.patients = patientsResponse.data;
      var no = _.countBy($scope.patients, 'hospital_drg_code');
    });

    $http.get('scripts/controllers/DRG_GER.json').then(function (drgResponse) {
      $scope.DRG = drgResponse.data;
      var arrDRG = $scope.DRG;

      // put data in chart
      $scope.line = {
        labels: ['0', '1', '2', '3', '4', '5', '6'],
        series: ['Income', 'Risk', 'Cost'],
        data: [
          getIncome('Z64B', arrDRG),
          ['80', '70', '70', '60', '50', '40', '40'],
          ['10', '200', '3000', '3400', '3700', '3900', '4000']
        ],
        options: {
          scales: {
            xAxes: [{
              display: false
            }]
          }
        },
        onClick: function (points, evt) {
          console.log(points, evt);
        }
      };

    });

    function getLabels() {
      for (var j = 0; j < max; j++) {
        labels.push(j);
      }
      return labels;
    }

    function getIncome(drgName, arrDRG) {

      for (var x = 0; x < arrDRG.length; x++) {
        if (arrDRG[x].DRG == drgName) {

          var BW = arrDRG[x].Bewertungsrelation_Hauptabteilung;
          var BR = 3257;
          var oGVD = arrDRG[x].oGVD;
          var uGVD = arrDRG[x].uGVD;
          var oBW = arrDRG[x].oGVD_Bewertungsrelation;
          var uBW = arrDRG[x].uGVD_Bewertungsrelation;
          var mVD = arrDRG[x].mVD;
          var max = oGVD + mVD;

          var income = [];
          var base = BR * BW;
        }
      }

      for (var i = 0; i < max; i++) {

        if (i < uGVD) {
          income.push(base - (BR * uBW * (uGVD - i)));
        }

        else if (i >= uGVD && i <= oGVD) {
          income.push(base);
        }
        else {
          income.push(base + (oBW * BR * (i - oGVD)));
        }

      }
      return income;
    }

    $scope.bar = {
      labels: ['2006', '2007', '2008', '2009', '2010', '2011', '2012'],
      series: ['Series A', 'Series B'],

      data: [
        [65, 59, 80, 81, 56, 55, 40],
        [28, 48, 40, 19, 86, 27, 90]
      ]

    };

    $scope.donut = {
      labels: ["Download Sales", "In-Store Sales", "Mail-Order Sales"],
      data: [300, 500, 100],
      options: {
        cutoutPercentage: 0.9
      }
    };

    $scope.radar = {
      labels: ["Eating", "Drinking", "Sleeping", "Designing", "Coding", "Cycling", "Running"],

      data: [
        [65, 59, 90, 81, 56, 55, 40],
        [28, 48, 40, 19, 96, 27, 100]
      ]
    };

    $scope.pie = {
      labels: ["Download Sales", "In-Store Sales", "Mail-Order Sales"],
      data: [300, 500, 100]
    };

    $scope.polar = {
      labels: ["Download Sales", "In-Store Sales", "Mail-Order Sales", "Tele Sales", "Corporate Sales"],
      data: [300, 500, 100, 40, 120]
    };

    $scope.dynamic = {
      labels: ["Download Sales", "In-Store Sales", "Mail-Order Sales", "Tele Sales", "Corporate Sales"],
      data: [300, 500, 100, 40, 120],
      type: 'PolarArea',

      toggle: function () {
        this.type = this.type === 'PolarArea' ?
          'Pie' : 'PolarArea';
      }
    };


  }])
;
