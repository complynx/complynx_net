(function(){
	if(!window.Szondy)
		window.Szondy={};
	var sz=window.Szondy;
	if(!sz.db){
		alert("File \"szondy.db.js\" is not loaded. Fix your html tags or fix path to file.");
		return;
	}
	var db=sz.db;
	var e=0,hy=7,h=1,s=5,d=3,m=2,k=6,p=4;
	
	sz.pathToImages="./szimg";
	
	var currentTestNumber=0;
	
	sz.startTest=function(){
	  currentTestNumber=0;
	  sz.shift(0);
	};
	
	sz.getImgName=function(){
	  var name=db.img[currentTestNumber].name;
	  name+=".jpg";
	  return sz.pathToImages+"/"+name;
	};

	sz.getProgress=function(){
		return currentTestNumber/db.img.length;
	};
	
	sz.shift=function(vector){
	  currentTestNumber+=vector;
	  if(currentTestNumber>=db.img.length){
	  	currentTestNumber=db.img.length;
		sz.finishTest();
	  }else{
		if(currentTestNumber<0)
		  currentTestNumber=0;
		if(sz.GUI && sz.GUI.updateImg)
		  sz.GUI.updateImg();
	  }  
	};
	
	sz.answer=function(number){
		if(currentTestNumber<db.img.length && currentTestNumber>=0){
	    	db.img[currentTestNumber].answer=number;
	    	sz.shift(1);
	    }
	};
	
	sz.countSums=function(){
	  db.TypePowSum=[];
	  db.TotalTypePowSum=0;
	  db.AnswerTypeSum={};
	  for(var i=0;i<5;++i){
		db.AnswerTypeSum[i+1]=0;
	  }
	  for(var i=0;i<9;++i){
		db.TypePowSum[i]=0;
	  }
	  for(var i=0;i<db.img.length;++i){
		db.TotalTypePowSum+=5*db.img[i].power;
		db.TypePowSum[db.img[i].vector]+=5*db.img[i].power;
	  }
	};
	
	function descretify(v){
	  var sgn=v>0?1:-1;
	  var a=Math.floor(sgn*v);
	  return sgn*a;
	}
	
	sz.finishTest=function(){
	  sz.countSums();
	  db.PowSum=[];
	  db.TotalPowSum=0;
	  //--------------------------------------------------------------------------------------------
	  for(var i=0;i<9;++i){
		db.PowSum[i]=0;
	  }
	  for(var i=0;i<db.img.length;++i){
		db.PowSum[db.img[i].vector]+=db.img[i].answer*db.img[i].power;
		db.TotalPowSum+=db.img[i].answer*db.img[i].power;
		++db.AnswerTypeSum[db.img[i].answer];
	  }
	  db.FittedResult=[];
	  for(var i=0;i<9;++i){
		db.FittedResult[i]=db.PowSum[i]/db.TypePowSum[i]-db.Means[i];
	  }
	  //--------------------------------------------------------------------------------------------
	  db.SumMaxJK=[];
	  db.SumMinJKNeg=[];
	  db.MaxMulJK_I=[];
	  db.MinMulJK_I=[];
	  db.Kettel=[];
	  db.KettelDescrete=[];
	  for(var j=0;j<4;++j){
		db.SumMaxJK[j]=0;
		db.SumMinJKNeg[j]=0;
		db.MaxMulJK_I[j]=[];
		db.MinMulJK_I[j]=[];
		for(var k=0;k<3;++k){
		  db.MaxMulJK_I[j][k]=0;
		  db.MinMulJK_I[j][k]=0;
		  for(var i=0;i<9;++i){
			var res=db.jki[j][k][i]*db.FittedResult[i];
			if(db.MaxMulJK_I[j][k]<res)
			  db.MaxMulJK_I[j][k]=res;
			if(db.MinMulJK_I[j][k]>res)
			  db.MinMulJK_I[j][k]=res;
		  }
		  db.SumMaxJK[j]+=db.MaxMulJK_I[j][k];
		  db.SumMinJKNeg[j]=db.MinMulJK_I[j][k]-db.SumMinJKNeg[j];
		}
		db.Kettel[j]=2*(db.SumMaxJK[j]-db.SumMinJKNeg[j]);
		db.KettelDescrete[j]=descretify(db.Kettel[j]);
	  }
	  //--------------------------------------------------------------------------------------------
	};
})();

(function(){
	if(!window.Szondy)
		window.Szondy={};
	var sz=window.Szondy;
	if(!sz.GUI)
	  sz.GUI={};
	var G=sz.GUI;
	var ImgEl=0;
	
	G.setImgElement=function(el){
	  ImgEl=el;
	  G.updateImg();
	};
	
	G.updateImg=function(){
	  ImgEl.src=sz.getImgName();
	};
})();
