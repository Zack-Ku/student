var app = angular.module('myApp', []);
app.controller('HotspotCtrl', function ($scope, $http) {
    $http.get("/course/getHotCourses").success(function (response) {
        var data = response.result;
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
app.controller('GetCtrl', function ($scope) {
    $scope.name = "哪里跑";
});
app.controller("titleCtrl", function($scope, $location) {
    var data = $location.search().course;
    $scope.title = data;
});
app.controller("teacherInfoCtrl", function($scope, $http, $window) {
  var user = JSON.parse($window.sessionStorage.getItem('user'));
  var data = {"tch_id":user.id};
    $http.post('teacher/getTeacherInfo',data).success( function(response) {
        $scope.teacher = response.result.teacher;
        $scope.courses = response.result.courses;
    })
    .error(function(data,status) {
        alert("error network"+status);
    });
});

app.controller("studentInfoCtrl", function($scope, $http, $window) {
  var user = JSON.parse($window.sessionStorage.getItem('user'));
  var data = {"stu_id":user.id};
  $http.post('student/studentInfo',data).success( function(response) {
    $scope.student = response.result.student;
    $scope.courses = response.result.course;
    $scope.qa      = response.result.qa;
    $scope.article = response.result.article;
    $scope.courseTotalTime = response.result.courseTotalTime;
  })
    .error(function(data,status) {
      alert("error network"+data+status);
    });
  $scope.upload = function(){
    $http({
      method: 'POST',
      url: '/student/getStudentPicture',
      data: data,
      headers: {
      'Content-Type': undefined
     },
    transformRequest: function(data) {
      var formData = new FormData();
      formData.append('stu_id', data.stu_id);
      formData.append('avatar', data.avatar);
      return formData;
    },
    data: {
      "stu_id":$scope.student.id,
      "avatar": $scope.studentPicture
    }
  }).success(function(response) {
    //请求成功
    $scope.student.avatarFd = response.result.avatarFd
  }).error(function(err, status) {
    console.log(err);
    alert(err);
  });
  }
});

app.controller('courseCtrl', function($scope, $http, $location) {
  var data = {course_id: $location.search().course_id};
  $http.post('course/getCourseInfo',data).success(function(response) {
    $scope.course = response.result.course;
    $scope.chapters = response.result.chapters;
    $scope.averageScore = response.result.averageScore;
    $scope.commentCount = response.result.commentCount;
    $scope.teacher = response.result.teacher;
    $scope.comments = response.result.comments;
  })
    .error(function(data,status) {
      alert("network error"+status);
    });
});

app.controller("navbarCtrl", function ($scope, $http, $window) {
    $scope.isLogin = $window.sessionStorage.getItem('isLogin');
    $scope.user = JSON.parse($window.sessionStorage.getItem('user'));
    $scope.logout = function() {
        $window.sessionStorage.setItem('isLogin','false');
        $window.sessionStorage.removeItem('user');
        $scope.isLogin = !$scope.isLogin;
        $window.location.reload();
    };
    $scope.login = function() {
      var data = {"account":$scope.account,"password":$scope.password};
      $http.post("/student/login",data).success(function(response) {
            //alert(response.account+" "+response.password);
        if(response.result.type=='teacher'){
          var user = {"num": response.result.user.tch_num, "name": response.result.user.tch_name, "id": response.result.user.id, "type": 'teacher'};
        }
         else {
          var user = {"num": response.result.user.stu_num, "name": response.result.user.stu_name, "id": response.result.user.id, "type": 'student'}
        }
          $window.sessionStorage.setItem('user', JSON.stringify(user));
          $window.sessionStorage.setItem('isLogin', 'true');
          $window.location.reload();
        })
        .error(function(data,header,config,status) {
            if(data == null){alert("null");}
            else(alert("error network "+data));
        });
    };
  $scope.register = function(){
    var flag = $scope.sel;
    if(flag == "student") {
      var data = {
        "stu_num": $scope.stu_num,
        "stu_name": $scope.stu_name,
        "stu_gender": $scope.stu_gender,
        "stu_school":$scope.stu_school,
        "stu_grade": $scope.stu_grade,
        "stu_birthday": $scope.stu_birthday,
        "stu_teleno": $scope.stu_teleno,
        "stu_address": $scope.stu_address,
        "stu_password":$scope.stu_password
        };
      $http.post("/student/register",data).success(function(response){
        var user = {"num": response.result.stu_num, "name": response.result.stu_name, "id": response.result.id, "type": 'student'}
        $window.sessionStorage.setItem('user', JSON.stringify(user));
        $window.sessionStorage.setItem('isLogin', 'true');
        $window.location.reload();
      })
        .error(function(data,header,config,status) {
          if (data == null) {
            alert("null");
          }
          else(alert("error network " + data));
        })
    } else{
      var data = {
        "tch_num": $scope.tch_num,
        "tch_name": $scope.tch_name,
        "tch_gender": $scope.tch_gender,
        "tch_school": $scope.tch_school,
        "tch_zc":$scope.tch_zc,
        "tch_birthday": $scope.tch_birthday,
        "tch_teleno": $scope.tch_teleno,
        "tch_address": $scope.tch_adress,
        "tch_desc": $scope.tch_desc,
        "tch_focus": $scope.tch_focus,
        "tch_password": $scope.tch_password
      };
      $http.post("/teacher/register",data).success(function(response){
        var user = {"num": response.result.tch_num, "name": response.result.tch_name, "id": response.result.id, "type": 'student'}
        $window.sessionStorage.setItem('user', JSON.stringify(user));
        $window.sessionStorage.setItem('isLogin', 'true');
        $window.location.reload();
      })
        .error(function(data,header,config,status) {
          if (data == null) {
            alert("null");
          }
          else(alert("error network " + data));
        })
    }
  };
});
