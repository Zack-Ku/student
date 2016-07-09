app.directive("hello", function() {
    return {
        restrict:'EA',
        scope: true,
        template : "<div ng-model='name'><h1>自定义指令!{{name}}</h1></div>"
    };
});
app.directive("paper", function() {
   return {
       restrict: 'EA',
       scope: true,
       template :"<div ng-model=''></div>"
   }
});