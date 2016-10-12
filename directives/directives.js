/**
 * Created by Slavik on 10/15/2015.
 */
angular.module('min.directives',['min.services']).directive('setFunc',function(minimal){
    return {
        restrict: 'A',
        replace: true,
        scope:{
            func:"=",
            n:"=",
        },
        controller: function($scope){
            $scope.args=[];
            $scope.n=2;
            $scope.$watch('n',function(n){
                $scope.func=[];
                var nn=parseInt(n);
                if(nn>=2 && nn<=6)
                    $scope.args=minimal.getArgs(nn);
                else $scope.args=[];
            });
            $scope.func=[];
            $scope.click=function(arg,i){
                var p=$scope.func.indexOf(arg);
                if(i==1) {
                    if (p == -1)
                        $scope.func.push(arg);
                }else
                if(p!=-1)
                    $scope.func.splice(p,1);
            }
            $scope.clear=function(){
                $scope.func=[];
            }
        },
        template:'<div class="col-md-4 col-md-offset-1" >\
        Փոփոխականների քանակը։ <input type="number" min="2" max="6" ng-model="n">\
            <div style="margin: 5px;margin-left: 50px;max-width:400px;border-radius: 5px; border:1px solid #245580; padding:5px; " ng-repeat="argument in args" ng-if="n">\
            <div style="float: left; font-size:15px; color:lightslategray;padding-top: 5px;margin-right: 5px;">f(<span ng-repeat="a in argument track by $index">{{a}}<span ng-if="!$last")>,</span></span>) =   </div>\
<button class="btn btn-default" ng-class="{active: func.indexOf(argument)!=-1}" ng-click="click(argument,1)">1</button>\
    <button class="btn btn-default" ng-class="{active: func.indexOf(argument)==-1}" ng-click="click(argument,0)">0</button>\
    </div>\
    <button style="margin-left: 60px;" class="btn btn-warning" ng-click="clear()">Մաքրել</button>\
    </div>'
    }
})
    .directive('visFunction',function(){
    return {
        restrict: 'A',
        replace: true,
        scope:{
            func:'=',
            n:'=',
            one:'='
        },
        controller: function($scope){
            $scope.one=false;
            $scope.$watch('func.length',function(){
                if($scope.func.length==parseInt(Math.pow(2,$scope.n)))
                    $scope.one=true;
                else
                    $scope.one=false;
            })
        },
        template:'<div class="func">f(<span ng-repeat="i in (\'0\'.repeat(n)) track by $index">X<sub>{{$index+1}}</sub><span ng-if="!$last">,</span></span>)=<span ng-if="func.length==0">0</span><span ng-if="one">1</span><span ng-if="!one" class="implikat" ng-repeat="implikat in func"><span ng-repeat="x in implikat track by $index" ng-if="x==\'1\'||x==\'0\'" ><span ng-class="{overline: x==\'0\'}">X</span><sub class="index">{{$index+1}}</sub></span> <span ng-if="!$last">+</span> </span></div>'
    }
}).directive('visSystem',function(){
    return{
        restrict: 'A',
        scope:{
            system:'=',
            func:'=',
            args:'='
        },
        controller: function($scope){

        },
        template:'<div class="system"><div ng-init="val=!args || func.indexOf(args[$index])!=-1" class="equation" ng-repeat="eq in system"><span ng-if="func">f(<span ng-repeat="a in args[$index] track by $index">{{a}}<span ng-if="!$last")>,</span></span>) =</span><span class="K" ng-repeat="k in eq">K<sub>{{k.index}}</sub><sup class="{{\'arg-\'+k.arg.length}}">{{k.arg}}</sup><span ng-if="!$last">+</span> </span>=<span ng-if="!val">0</span><span ng-if="val">1</span></div></div>'
    }
}).directive('visKvayn',function(){
        return{
            restrict: 'A',
            scope:{
                groups:'=',
                n:'=',
                kvayns:'='
            },
            template:
                '<div class="kvayn"> \
                    <div class="group" ng-repeat="group in groups">\
                           Փուլ {{$index+1}}: <span ng-if="$first">Ելման ֆունկցիայի արգումենտների սոսնձման հնարավորությունների ստուգումը </span><span ng-if="!$first"> ԿԴՆՁ ստացման խնդրի վերջնական լուծման համար անհրաժեշտ է ստուգել ստացված ֆունկցիայի արգումենտների սոսնձման հնարավորությունները նույն ալգորիթմով։ </span> \
                          <div ng-if="!group.length">Չկան սոսնձվող արգումենտներ</div>\
                          <div ng-repeat="row in group">\
                              <p><span>{{row[0]+1}}<sup ng-if="row[2]">*</sup></span> - <span>{{row[1]+1}}<sup ng-if="row[2]">*</sup></span> <span ng-if="row[2]">սոսնձման արդյունքը - <span><span ng-repeat="x in row[2] track by $index"><sapn ng-if="x!=\'-\'"><span ng-class="{overline: x==\'0\'}">X</span><sub>{{$index+1}}</sub></sapn></span></span> </span><span ng-if="!row[2]"> չեն սոսնձվում </span></p>  \
                          </div>        \
                    <span ng-if="$last">Ստուգվող ֆունկցիայի կոնյուկցիաներից ոչ մեկը չի սոսնձվում, հետևաբար ԿԴՆՁ կունենա հետևյալ տեսքը՝ <span vis-function func="kvayns[$index-1]" n="n" style="color:blue;font-size:14px;"></span></span>      \
                    <span ng-if="!$last">Հետևաբար, <span vis-function func="kvayns[$index]" n="n" style="color:red;font-size:14px;"></span></span>                \
                    </div>                  \
                </div>             '
        }
    }).directive('visMatrix',function(){
        return{
            restrict: 'A',
            replace:true,
            scope:{
                matrix:'=',
                func:'=',
                kvayn:'=',
                xx:'=',
                minimal:'='
            },
            template:'<div class="matrix">\
                      <table class="table table-bordered" >\
                      <tr><th rowspan="2">ԿԴՆՁ</th><th colspan="{{func.length}}">ԴԿՆՁ</th></tr>\
                      <tr><th ng-repeat="f in func"><span ng-if="xx">{{f}}</span><span ng-if="!xx" ng-repeat="x in f track by $index"><sapn ng-if="x!=\'-\'"><span ng-class="{overline: x==\'0\'}">X</span><sub>{{$index+1}}</sub></sapn></span></th></tr>\
                      <tr ng-repeat="k in kvayn" ng-init="i=$index"><th><span ng-if="xx">{{k}}</span><span ng-if="!xx" ng-repeat="x in k track by $index"><sapn ng-if="x!=\'-\'"><span ng-class="{overline: x==\'0\'}">X</span><sub>{{$index+1}}</sub></sapn></th><td ng-repeat="m in matrix"><span ng-if="m[i]==\'+\'">v<sup ng-if="minimal.indexOf(k)!=-1">*</sup></span></td></tr>  \
                      </table>\
                      </div>'
        }
    }).directive('visCod',function(){
        return{
            restrict:'A',
            scope:{
                func:'=',
                n:'=',
                ff:'='
            },
            template:'<span class="cod">  \
               <span ng-if="ff">f(<span ng-repeat="i in (\'0\'.repeat(n)) track by $index">X<sub>{{$index+1}}</sub><span ng-if="!$last">,</span></span>)=<span ng-if="func.length==0">0</span></span> \
               <span ng-repeat="imp in func">{{imp}}<span ng-if="!$last"> v </span></span>\
            </span>'
        }
    }).directive('visGroups',function(){
        return{
            restrict: 'A',
            scope:{
                groups:'=',
                n:'=',
                stars:'='
            },
            controller: function($scope){
                $scope.inc=function(){
                    ++$scope.s;
                }
                $scope.reset=function(){
                    $scope.s=-1;
                }
            },
            template:'<div class="groups">\
                      <div class="group" ng-repeat="group in groups" ng-init="g=$index">\
                      {{reset()}}\
                      <p ng-if="!$first">Նախորդ փուլից հետո կարելի է գոյացնել հետևյալ խմբերը՝ </p>\
                      <p ng-repeat="row in group"><span>{{$index}} խումբ: </span><span style="color: red;"><span ng-if="!row.length">չկա</span><span ng-repeat="imp in row" ><span >{{imp+inc()}}</span><sup ng-if="stars[g][s]==\'*\'">*</sup><span ng-if="!$last">, </span> </span> </span></p> \
                      </div> \
                      </div>'
        }
    })