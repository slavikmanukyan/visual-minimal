/**
 * Created by Slavik on 10/13/2015.
 */
angular.module('min.services',[]).factory("minimal",function(){
    function K(arg,index){
        this.value=undefined;
        this.arg=arg;
        this.index=index;
    }
    function binary(num,n){
        var s=num.toString(2);
        while(s.length<n){
            s="0"+s;
        }
        return s;
    }
    function kSorter(a,b){
        if(a.index.length<=b.index.length){
            return parseInt(a.index)-parseInt(b.index);
        }
        return 1;
    }
    function indexOf(array,arg,index){
        for(var i in array){
            if (array[i].index==index && array[i].arg==arg){
                return i;
            }
        }
        return -1;
    }
    function glue(i1,i2){
        var c=0,ind;
        for(var i in i1)
            if(i1[i]!=i2[i]){
                c++; ind=i;
            }
        if(c!=1) return false;
        else return i1.slice(0,parseInt(ind))+"-"+i2.slice(parseInt(ind)+1,i2.length);
    }
    function are(f,k){
        for(var i in f){
            if((k[i]!="-" && f[i]!=k[i])) return false;
        }
        return true;
    }
    function cluskeyCycle(arr,k,log){
        var groups=[],i,j,l;
        for(i=0;i<=k;i++) groups[i]=[];
        for(i in arr){
            var c=0;

            for(j in arr[i]){
                if(arr[i][j]=="1") c++;
            }
            groups[c].push(arr[i]);
        }
        log.groups.push(groups);
        var stars=[],b=false;
        for(i=0;i<arr.length;i++) stars.push('0');
        var kvayn=[],s;
        for(i=0;i<groups.length-1;i++){

            for(j in groups[i]){

                for(l in groups[i+1])
                    if(s=glue(groups[i][j],groups[i+1][l]))
                    {
                        b=true;
                        if(kvayn.indexOf(s)==-1)  kvayn.push(s);
                        stars[arr.indexOf(groups[i][j])]='*';
                        stars[arr.indexOf(groups[i+1][l])]='*';
                    }
            }

        }
        log.stars.push(stars);
        if(b==false) return arr;
        kvayn=cluskeyCycle(kvayn,k-1,log);
        for(i in stars) if(stars[i]=="0") kvayn.push(arr[i]);
        return kvayn;
    }
    function kvyneCycle(arr,n,log){
        var star=Array(arr.length),kvayn=[],i,j,n=arr.length;
        var groups=[];
        for(i=0;i<n-1;i++)
            for(j=i+1;j<n;j++)
                if(s=glue(arr[i],arr[j])){
                    if(kvayn.indexOf(s)==-1)
                        kvayn.push(s);
                    star[i]='*';
                    star[j]='*';
                    groups.push([i,j,s]);
                }else groups.push([i,j]);


              log.groups.push(groups);
        for(i=0;i<star.length;i++)
            if(star[i]!='*')
                kvayn.push(arr[i]);
        log.kvayns.push(kvayn);
        n=kvayn.length;
        for(i=0;i<n-1;i++)
            for(j=i+1;j<n;j++)
                if(glue(kvayn[i],kvayn[j]))
                    return kvyneCycle(kvayn,n,log);
        return kvayn;
    }
    function forceMinimal(matrix,minimal,kvayn){
        var i,j,helper=[];

        for(i=0;i<matrix.length;i++) helper.push(0);
        var max=0,ind;
        for(i in kvayn){
            var c=0;
            for(j in matrix){
                if (matrix[j][i]=='+') c++;
            }
            if(c>max) {max=c;ind=i;}
        }
        minimal.push(kvayn[ind]);

        for(i in kvayn){
            if(minimal.indexOf(kvayn[i])!=-1)
                for(j in matrix){
                    if(matrix[j][i]==='+') helper[j]=1;
                }
        }
        var new_matrix=[],b=false;
        for(i in helper)
            if(helper[i]==0){b=true;
                new_matrix.push(matrix[i]);}
        return b?forceMinimal(new_matrix,minimal,kvayn):minimal;

    }

    return    {
       getArgs: function(n){
          var args=[];
         for(var i=0;i<Math.pow(2,n);i++)
            args.push(binary(i,n));
            return args;
        },
        indeterminate:{
         system:null,
         new_system0:null,
         minK:null,
         new_system:null,
         getMinimal: function(func,n){
             var args=[];
             var i,j;

             for(i=1;i<=n;i++)
                 args.push(i.toString());
             var c=Math.pow(2,n);
             var binaries=[];
             for(i=0;i<c;i++)
                 binaries.push(binary(i,n));
             var system=[];
             var values=[];
             var kvalue=[];
             var kcache=[];
             var ks=[];
             for (j=1;j<c;j++){
                 var s="";
                 for(var l in binaries[j])
                     if(binaries[j][l]=="1")
                         s+=args[l];
                 ks.push(s);
             }
             for(i in binaries){
                 var eq=[];
                 for (j in ks){
                     var a=ks[j];
                     var b="";
                     for (var l=0;l<a.length;l++)
                         b+=binaries[i][parseInt(a[l])-1];

                     var ind=indexOf(kcache,b,ks[j]);

                     if (ind==-1){
                         var o=new K(b,ks[j]);
                         kcache.push(o);
                         eq.push(o);
                     }else{
                         eq.push(kcache[ind]);
                     }
                 }
                 system.push(eq);
                 values.push((func.indexOf(binaries[i])==-1)?0:1);
             }
             for(i in values)
                 if(values[i]==0)
                     for(j in system[i])
                         system[i][j].value=0;
             var new_system=[];
             for(i in values){
                 if (values[i]==1){
                     var eq=[];
                     for(j in system[i])
                         if (system[i][j].value!=0) eq.push(system[i][j]);
                     new_system.push(eq);
                 }
             }
             this.new_system0=[];
             for(i in new_system){
                 new_system[i].sort(kSorter);
                 this.new_system0.push([]);
                 for(j in new_system[i])
                    this.new_system0[i].push(new_system[i][j]);
                 if(new_system[i].length>1) { new_system[i][new_system[i].length-1].value=0; new_system[i].pop();}
                 if(new_system[i].length==1) new_system[i][0].value=1;

             }

             for (i in  new_system){

                 if(new_system[i].length>1){
                     var are=false;
                     for(j in new_system[i])
                         if(new_system[i][j].value==1){

                             are=true;
                             break;

                         }
                     if(!are){

                         new_system[i][0].value=1;

                     }
                 }
             }
             for (i in  new_system){
                 if(new_system[i].length>1){
                     for(j=0;j<new_system[i].length;j++){
                         if(new_system[i][j].value!==1) { new_system[i][j].value=0; new_system[i].splice(j,1);j--;}
                     }
                 }
             }
             var minK=[];
             for(i in new_system)
                 for(j in new_system[i])
                     if(minK.indexOf(new_system[i][j])==-1)
                         minK.push(new_system[i][j]);

             var minimal=[];

             for (i in minK){
                 var m="",p=0;;
                 for(j=1;j<=n;j++)
                     if(minK[i].index.includes(j.toString()))
                         m+=minK[i].arg[j-1-p];
                     else{
                         m+='-';
                         p++;
                     }

                 minimal.push(m);
             }
             this.minK=minK;
             for(i in system)
                system[i].sort(kSorter);
             this.system=system;
             this.new_system=new_system;
         return minimal;
          }
        },
        matrixlike:{
            getMinimal:function(func,n,alg){
                var cycle,log;
                if(alg=='cluskey') { cycle=cluskeyCycle; log=this.cluskey; log.groups=[]; log.stars=[];}
                else if(alg=='kvayn'){ cycle=kvyneCycle; log=this.matrix;log.groups=[];log.kvayns=[];}
                else throw "Error";

                var kvayn=cycle(func,n,log);
                var matrix=Array(func.length);
                for(i=0;i<matrix.length;i++){
                    matrix[i]=[];
                    for(j in kvayn){
                        if(are(func[i],kvayn[j])){
                            matrix[i].push('+');
                        }else{
                            matrix[i].push('0');
                        }
                    }
                }
                log.kvayn=kvayn;
                log.matrix=matrix;
                //for(i in kvayn){
                //    var s=kvayn[i]+"  |";
                //    for(j in func){
                //        if(matrix[j][i]==='+') s+="  +  |";
                //        else s+="  0  |"
                //    }
                //    console.log(s);
                //}

                //?????? ???????????? ????????????
                var minimal=[];
                var helper=[];
                for(i in matrix){
                    var c=0,ind;
                    for(j in matrix[i])
                        if(matrix[i][j]=='+'){
                            c++;
                            ind=j;
                        }
                    if(c==1)
                        if(minimal.indexOf(kvayn[ind])==-1)
                            minimal.push(kvayn[ind]);

                }
                for(i=0;i<matrix.length;i++) helper.push(0);

                for(i in kvayn){
                    if(minimal.indexOf(kvayn[i])!=-1)
                        for(j in matrix){
                            if(matrix[j][i]==='+') helper[j]=1;
                        }
                }
                var new_matrix=[],b=false;
                for(i in helper)
                    if(helper[i]==0) {b=true;
                        new_matrix.push(matrix[i]);}
                if(b) minimal=forceMinimal(new_matrix,minimal,kvayn);
                return minimal;

            },
            cluskey:
            {
                groups:[],
                stars:[],
                matrix:null,
                kvayn:null

            },
            matrix:{
                groups:[],
                kvayns:[],
                matrix:null,
                kvayn: null
            }
        }
};
});