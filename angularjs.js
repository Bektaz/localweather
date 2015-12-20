//defining weatherApp which is main and injecting ngResource module
var weathApp = angular.module('weathApp',['ngResource']);   

//defining controller
weathApp.controller('maincontroller',['$scope','$resource',function($scope,$resource){
    //with resource service of ngResource module we get weather information from external API with get method
    $scope.weatherAPI = $resource("http://api.wunderground.com/api/4c575da45c929ba9/conditions/forecast/q/autoip.json",{callback: "JSON_CALLBACK"},{get:{method: "JSONP"}});
    $scope.weatherResult =  $scope.weatherAPI.get();
    //boolean variable for toggling between fahrenheit and celsius
    $scope.isButPres = true;
    
    $scope.toggleBut = function(){
        if($scope.isButPres){
            $scope.isButPres = false;
        }else{
            $scope.isButPres = true;
        }    
    }
    //getting key value from returned json object and if the value of key which shows weather condition contains some of the words in the statements below then weathstate variable will be equal to different strings
    $scope.weatherResult.$promise.then(function(data){
        var wc = data.current_observation.weather;
        if(/Overcast/.test(wc) || /Mist/.test(wc) || /Smoke/.test(wc) || /Haze/.test(wc) || /Fog/.test(wc)){
            $scope.weathstate = 'fog';
        }
        if(/Drizzle/.test(wc) || /Hail/.test(wc) || /Rain/.test(wc) || /Spray/.test(wc) || /Precipitation/.test(wc) || /Thunderstorm/.test(wc) || /Squalls/.test(wc)){
            $scope.weathstate = 'rain';
        }
        if(/Ice/.test(wc) || /Snow/.test(wc)){
            $scope.weathstate = 'snow';
        }
        if(/Cloud/.test(wc)){
            $scope.weathstate = 'cloud';
        }
        if(/Sand/.test(wc) || /Dust/.test(wc) || /Ash/.test(wc)){
            $scope.weathstate = 'dust';
        }
        if(/Clear/.test(wc) || wc==='' || wc===undefined || wc==='Unknown'){
            $scope.weathstate = 'clear';
        }
    });
}]);