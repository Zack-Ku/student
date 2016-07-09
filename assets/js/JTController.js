/**
 * Created by JTian on 2016/4/6.
 */
var app = angular.module('myApp', []);
app.controller('teacherInfoCtrl', function ($scope, $http, $window, $location) {
  $scope.user = JSON.parse($window.sessionStorage.getItem('user'));
  var baseUrl = $location.protocol() + ':' + $location.port() +$location.host();
  $http({
    method: 'post',
    url: baseUrl + '/teacher/getTeacherInfo',
    data: 'tch_num=' + user.id
  }).success(function (response) {
    var data = response.data;
    var types = [];
    for (var x=0;x<data.length;++x)
    {
      var ob = new Object();
      ob.key = data[x].type;
      ob.value = data[x].course.type;
      types.push(ob);
    }
    $scope.types = types;
    data[0].course.active = "active";
    $scope.data = data;
  });
});
