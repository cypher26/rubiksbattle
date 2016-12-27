var letCount=0;
var statement;
var tempCont;
notationInit();

function notationInit(){
	$('#btnR').empty();
	$('#btnr').empty();
	
	$('#btnL').empty();
	$('#btnl').empty();
	
	$('#btnF').empty();
	$('#btnf').empty();
	
	$('#btnB').empty();
	$('#btnb').empty();

	$('#btnU').empty();
	$('#btnu').empty();
	
	$('#btnD').empty();
	$('#btnd').empty();
	
	
	$('#btnM').empty();
	$('#btnE').empty();
	$('#btnS').empty();
	
	$('#btnX').empty();
	$('#btnY').empty();
	$('#btnZ').empty();
	
	
	
	
//   alert('It is now set to ' + $('#txtDimen').val() + "x"+ $('#txtDimen').val()+"x"+$('#txtDimen').val() + 
//   " dimension.");
   
   for (x=0;x<=Number($('#txtDimen').val());x++){
	   
	   //(\'-\',3,3)
	   if (x ==0){
			$('#btnR').append('<li><a onClick="appendDimen(\'R\')">R</a></li>');
			$('#btnR').append('<li><a onClick="appendDimen(\'Rp\')">R\'</a></li>');
			$('#btnR').append('<li><a onClick="appendDimen(\'R2\')">R2</a></li>');
			$('#btnR').append('<li><a onClick="appendDimen(\'R2p\')">R2\'</a></li>');
			
			$('#btnr').append('<li><a onClick="appendDimen(\'r\')">r</a></li>');
			$('#btnr').append('<li><a onClick="appendDimen(\'rp\')">r\'</a></li>');
			$('#btnr').append('<li><a onClick="appendDimen(\'r2\')">r2</a></li>');
			$('#btnr').append('<li><a onClick="appendDimen(\'r2p\')">r2\'</a></li>');
			
			$('#btnL').append('<li><a onClick="appendDimen(\'L\')">L</a></li>');
			$('#btnL').append('<li><a onClick="appendDimen(\'Lp\')">L\'</a></li>');
			$('#btnL').append('<li><a onClick="appendDimen(\'L2\')">L2</a></li>');
			$('#btnL').append('<li><a onClick="appendDimen(\'L2p\')">L2\'</a></li>');

			$('#btnl').append('<li><a onClick="appendDimen(\'l\')">l</a></li>');
			$('#btnl').append('<li><a onClick="appendDimen(\'lp\')">l\'</a></li>');
			$('#btnl').append('<li><a onClick="appendDimen(\'l2\')">l2</a></li>');
			$('#btnl').append('<li><a onClick="appendDimen(\'l2p\')">l2\'</a></li>');

			$('#btnU').append('<li><a onClick="appendDimen(\'U\')">U</a></li>');
			$('#btnU').append('<li><a onClick="appendDimen(\'Up\')">U\'</a></li>');
			$('#btnU').append('<li><a onClick="appendDimen(\'U2\')">U2</a></li>');
			$('#btnU').append('<li><a onClick="appendDimen(\'U2p\')">U2\'</a></li>');
						
			$('#btnu').append('<li><a onClick="appendDimen(\'u\')">u</a></li>');
			$('#btnu').append('<li><a onClick="appendDimen(\'up\')">u\'</a></li>');
			$('#btnu').append('<li><a onClick="appendDimen(\'u2\')">u2</a></li>');
			$('#btnu').append('<li><a onClick="appendDimen(\'u2p\')">u2\'</a></li>');
						
			$('#btnD').append('<li><a onClick="appendDimen(\'D\')">D</a></li>');
			$('#btnD').append('<li><a onClick="appendDimen(\'Dp\')">D\'</a></li>');
			$('#btnD').append('<li><a onClick="appendDimen(\'D2\')">D2</a></li>');
			$('#btnD').append('<li><a onClick="appendDimen(\'D2p\')">D2\'</a></li>');
						
			$('#btnd').append('<li><a onClick="appendDimen(\'d\')">d</a></li>');
			$('#btnd').append('<li><a onClick="appendDimen(\'dp\')">d\'</a></li>');
			$('#btnd').append('<li><a onClick="appendDimen(\'d2\')">d2</a></li>');
			$('#btnd').append('<li><a onClick="appendDimen(\'d2p\')">d2\'</a></li>');
						
			$('#btnF').append('<li><a onClick="appendDimen(\'F\')">F</a></li>');
			$('#btnF').append('<li><a onClick="appendDimen(\'Fp\')">F\'</a></li>');
			$('#btnF').append('<li><a onClick="appendDimen(\'F2\')">F2</a></li>');
			$('#btnF').append('<li><a onClick="appendDimen(\'F2p\')">F2\'</a></li>');
						
			$('#btnf').append('<li><a onClick="appendDimen(\'f\')">f</a></li>');
			$('#btnf').append('<li><a onClick="appendDimen(\'fp\')">f\'</a></li>');
			$('#btnf').append('<li><a onClick="appendDimen(\'f2\')">f2</a></li>');
			$('#btnf').append('<li><a onClick="appendDimen(\'f2p\')">f2\'</a></li>');
						
			$('#btnB').append('<li><a onClick="appendDimen(\'B\')">B</a></li>');
			$('#btnB').append('<li><a onClick="appendDimen(\'Bp\')">B\'</a></li>');
			$('#btnB').append('<li><a onClick="appendDimen(\'B2\')">B2</a></li>');
			$('#btnB').append('<li><a onClick="appendDimen(\'B2p\')">B2\'</a></li>');
						
			$('#btnb').append('<li><a onClick="appendDimen(\'b\')">b</a></li>');
			$('#btnb').append('<li><a onClick="appendDimen(\'bp\')">b\'</a></li>');
			$('#btnR').append('<li><a onClick="appendDimen(\'b2\')">b2</a></li>');
			$('#btnR').append('<li><a onClick="appendDimen(\'b2p\')">b2\'</a></li>');
			

		  }else{
	   
	   $('#btnR').append('<li><a onClick="appendDimen(\''+x+'R\')">'+ x+'R</a></li>');
	   $('#btnR').append('<li><a onClick="appendDimen(\''+x+'Rp\')">'+ x+'R\'</a></li>');
	   $('#btnR').append('<li><a onClick="appendDimen(\''+x+'R2\')">'+ x+'R2</a></li>');
	   $('#btnR').append('<li><a onClick="appendDimen(\''+x+'R2p\')">'+ x+'R2\'</a></li>');
	   
	   $('#btnr').append('<li><a onClick="appendDimen(\''+x+'r\')">'+ x+'r</a></li>');
	   $('#btnr').append('<li><a onClick="appendDimen(\''+x+'rp\')">'+ x+'r\'</a></li>');
	   $('#btnr').append('<li><a onClick="appendDimen(\''+x+'r2\')">'+ x+'r2</a></li>');
	   $('#btnr').append('<li><a onClick="appendDimen(\''+x+'r2p\')">'+ x+'r2\'</a></li>');
	   
	   $('#btnL').append('<li><a onClick="appendDimen(\''+x+'L\')">'+ x+'L</a></li>');
	   $('#btnL').append('<li><a onClick="appendDimen(\''+x+'Lp\')">'+ x+'L\'</a></li>');
	   $('#btnL').append('<li><a onClick="appendDimen(\''+x+'L2\')">'+ x+'L2</a></li>');
	   $('#btnL').append('<li><a onClick="appendDimen(\''+x+'L2p\')">'+ x+'L2\'</a></li>');
	   
	   $('#btnl').append('<li><a onClick="appendDimen(\''+x+'l\')">'+ x+'l</a></li>'); //INVERSE
	   $('#btnl').append('<li><a onClick="appendDimen(\''+x+'lp\')">'+ x+'l\'</a></li>');
	   $('#btnl').append('<li><a onClick="appendDimen(\''+x+'l2\')">'+ x+'l2</a></li>');
	   $('#btnl').append('<li><a onClick="appendDimen(\''+x+'l2p\')">'+ x+'l2\'</a></li>');
	   
	   $('#btnU').append('<li><a onClick="appendDimen(\''+x+'U\')">'+ x+'U</a></li>');
	   $('#btnU').append('<li><a onClick="appendDimen(\''+x+'Up\')">'+ x+'U\'</a></li>');
	   $('#btnU').append('<li><a onClick="appendDimen(\''+x+'U2\')">'+ x+'U2</a></li>');
	   $('#btnU').append('<li><a onClick="appendDimen(\''+x+'U2p\')">'+ x+'U2\'</a></li>');
	   
	    $('#btnu').append('<li><a onClick="appendDimen(\''+x+'u\')">'+ x+'u</a></li>');
	   $('#btnu').append('<li><a onClick="appendDimen(\''+x+'up\')">'+ x+'u\'</a></li>');
	   $('#btnu').append('<li><a onClick="appendDimen(\''+x+'u2\')">'+ x+'u2</a></li>');
	   $('#btnu').append('<li><a onClick="appendDimen(\''+x+'u2p\')">'+ x+'u2\'</a></li>');
	   
	    $('#btnD').append('<li><a onClick="appendDimen(\''+x+'D\')">'+ x+'D</a></li>'); //INVERSE
	   $('#btnD').append('<li><a onClick="appendDimen(\''+x+'Dp\')">'+ x+'D\'</a></li>');
	   $('#btnD').append('<li><a onClick="appendDimen(\''+x+'D2\')">'+ x+'D2</a></li>');
	   $('#btnD').append('<li><a onClick="appendDimen(\''+x+'D2p\')">'+ x+'D2\'</a></li>');
	   
	    $('#btnd').append('<li><a onClick="appendDimen(\''+x+'d\')">'+ x+'d</a></li>');
	   $('#btnd').append('<li><a onClick="appendDimen(\''+x+'dp\')">'+ x+'d\'</a></li>');
	   $('#btnd').append('<li><a onClick="appendDimen(\''+x+'d2\')">'+ x+'d2</a></li>');
	   $('#btnd').append('<li><a onClick="appendDimen(\''+x+'d2p\')">'+ x+'d2\'</a></li>');
	  
	   
	   
	   $('#btnF').append('<li><a onClick="appendDimen(\''+x+'F\')">'+ x+'F</a></li>');
	   $('#btnF').append('<li><a onClick="appendDimen(\''+x+'Fp\')">'+ x+'F\'</a></li>');
	   $('#btnF').append('<li><a onClick="appendDimen(\''+x+'F2\')">'+ x+'F2</a></li>');
	   
	   $('#btnf').append('<li><a onClick="appendDimen(\''+x+'f\')">'+ x+'f</a></li>');
	   $('#btnf').append('<li><a onClick="appendDimen(\''+x+'fp\')">'+ x+'f\'</a></li>');
	   $('#btnf').append('<li><a onClick="appendDimen(\''+x+'f2\')">'+ x+'f2</a></li>');
	   
	   $('#btnB').append('<li><a onClick="appendDimen(\''+x+'Bp\')">'+ x+'B</a></li>'); //INVERSE
	   $('#btnB').append('<li><a onClick="appendDimen(\''+x+'B\')">'+ x+'B\'</a></li>');
	   $('#btnB').append('<li><a onClick="appendDimen(\''+x+'B2p\')">'+ x+'B2</a></li>');
	   
	   $('#btnb').append('<li><a onClick="appendDimen(\''+x+'bp\')">'+ x+'b</a></li>');
	   $('#btnb').append('<li><a onClick="appendDimen(\''+x+'b\')">'+ x+'b\'</a></li>');
	   $('#btnb').append('<li><a onClick="appendDimen(\''+x+'b2p\')">'+ x+'b2</a></li>');
	   }
	}
	

		 $('#btnX').append('<li><a onClick="appendDimen(\'x\')">x</a></li>');
		 $('#btnY').append('<li><a onClick="appendDimen(\'y\')">y</a></li>');
		 $('#btnZ').append('<li><a onClick="appendDimen(\'z\')">z</a></li>');
		
		 $('#btnX').append('<li><a onClick="appendDimen(\'xp\')">x\'</a></li>');
		 $('#btnY').append('<li><a onClick="appendDimen(\'yp\')">y\'</a></li>');
		 $('#btnZ').append('<li><a onClick="appendDimen(\'zp\')">z\'</a></li>');
			
		 $('#btnX').append('<li><a onClick="appendDimen(\'x2\')">x2</a></li>');
		 $('#btnY').append('<li><a onClick="appendDimen(\'y2\')">y2</a></li>');
		 $('#btnZ').append('<li><a onClick="appendDimen(\'z2\')">z2</a></li>');
		 
		  $('#btnM').append('<li><a onClick="appendDimen(\'M\')">M</a></li>');// INVERSE
		  $('#btnM').append('<li><a onClick="appendDimen(\'Mp\')">M\'</a></li>');
		  
		  $('#btnM').append('<li><a onClick="appendDimen(\'M2\')">M2</a></li>');
		  $('#btnM').append('<li><a onClick="appendDimen(\'M2p\')">M2\'</a></li>');
		
		  $('#btnM').append('<li><a onClick="appendDimen(\'m\')">m</a></li>');
		  $('#btnM').append('<li><a onClick="appendDimen(\'mp\')">m\'</a></li>');
		  
		  $('#btnM').append('<li><a onClick="appendDimen(\'m2\')">m2</a></li>');
		  $('#btnM').append('<li><a onClick="appendDimen(\'m2p\')">m2\'</a></li>');
		  
		   $('#btnE').append('<li><a onClick="appendDimen(\'E\')">E</a></li>');//INVERSE
		  $('#btnE').append('<li><a onClick="appendDimen(\'Ep\')">E\'</a></li>');
		  
		  $('#btnE').append('<li><a onClick="appendDimen(\'E2\')">E2</a></li>');
		  $('#btnE').append('<li><a onClick="appendDimen(\'E2p\')">E2\'</a></li>');
		
		  $('#btnE').append('<li><a onClick="appendDimen(\'e\')">e</a></li>');
		  $('#btnE').append('<li><a onClick="appendDimen(\'ep\')">e\'</a></li>');
		  
		  $('#btnE').append('<li><a onClick="appendDimen(\'e2\')">e2</a></li>');
		  $('#btnE').append('<li><a onClick="appendDimen(\'e2p\')">e2\'</a></li>');
		  
		  $('#btnS').append('<li><a onClick="appendDimen(\'S\')">S</a></li>');  
		  $('#btnS').append('<li><a onClick="appendDimen(\'Sp\')">S\'</a></li>');
		  
		  $('#btnS').append('<li><a onClick="appendDimen(\'s2\')">s2</a></li>');
		  $('#btnS').append('<li><a onClick="appendDimen(\'s2p\')">s2\'</a></li>');
		
		  $('#btnS').append('<li><a onClick="appendDimen(\'s\')">s</a></li>');
		  $('#btnS').append('<li><a onClick="appendDimen(\'sp\')">s\'</a></li>');
		  
		  $('#btnS').append('<li><a onClick="appendDimen(\'s2\')">s2</a></li>');
		  $('#btnS').append('<li><a onClick="appendDimen(\'s2p\')">s2\'</a></li>');
	
}
function appendDimen(letAlg){
var prev,prev1;
	contDimen = document.getElementById('txtAreaDimen').value;
	if (contDimen.toString() ==''){
		 prev1 = '';
	}else prev1= contDimen.toString();
	prev =prev1 + ' ' + letAlg;
	prev = prev.replace(/p/g,'\'');
	document.getElementById('txtAreaDimen').value = prev
	

}
var sI;
function checkNotation(str){

	var rot,turn,width,xtemp,widthCol,axis;
	//ROTATION
	str = str.replace(/p/g,'\'');
	
	for(x=0;x<str.length;x++){
		switch(str.charAt(x)){
		// case 'r':
			
			
		// 	width = str.slice(0,x); widthCol=width;
		// 	if (x==0) {	width=2; widthCol=width; }
		// 	break;
		// case 'l':
		// 	widthCol=dimension; width = str.slice(0,x);
		// 	if (x==0) { widthCol=dimension; width= 2; }
		// 	break;
		// case 'u':
		// 	width = str.slice(0,x); widthCol=width;
		// 	if (x==0) { widthCol=2; width=2;}
		// 	break;
		// case 'd':
		// 	widthCol=dimension;
		// 	width = str.slice(0,x);
		// 	if (x==0) { widthCol=dimension; width =2;}
		// 	break;
		// case 'b':
		// 	widthCol=dimension;
		// 	width = str.slice(0,x);
		// 	if (x==0) { widthCol=dimension; width=2; }
		// 	break;
		// case 'f':
		// 	width = str.slice(0,x); widthCol=width;
		// 	if (x==0) { width = 2; widthCol=2;}
		// 	break;
		// case 'm':
		// 	widthCol=dimension-1;
		// 	width = widthCol-1;
		// 	break;
		// case 'e':
		// 	widthCol=dimension-1;
		// 	width = widthCol-1;
		// 	break;
		// case 's':
		// 	widthCol=dimension-1;
		// 	width = widthCol-1;
		// 	break;
			
			/////////////////////////////////////
	    case 'R':
			width=1; widthCol = str.slice(0,x);
			if (x==0) {	width=1; widthCol=width; }
			break;
		case 'L':
			for(z = 1,y=dimension;z<=dimension;z++,y--){
				if (Number(str.slice(0,x))==z){
					widthCol = y;	
				}
			}
			width=1;
			if (x==0) {	width=1; widthCol=dimension; }
			break;
		case 'M':
			if (dimension%2==0){
			widthCol = 0;
			width = 0;
			}else{
			widthCol = parseInt(dimension/2)+1	;
			width  =1;
			}
			break;
		case 'E':
			if (dimension%2==0){
			widthCol = 0;
			width = 0;
			}else{
			widthCol = parseInt(dimension/2)+1	;
			width  =1;
			}
			break;
		case 'S':
			if (dimension%2==0){
			widthCol = 0;
			width = 0;
			}else{
			widthCol = parseInt(dimension/2)+1	;
			width  =1;
			}
			break;
		case 'U':
			width=1; widthCol = str.slice(0,x);
			if (x==0) { width=1; widthCol = 1; }
			break;
		case 'D':
			for(z = 1,y=dimension;z<=dimension;z++,y--){
					if (Number(str.slice(0,x))==z){
						widthCol = y;	
					}
				}
				width=1;
			if (x==0) { width =1; widthCol = dimension;}
				break;
		case 'B':
			for(z = 1,y=dimension;z<=dimension;z++,y--){
				if (Number(str.slice(0,x))==z){
					widthCol = y;	
				}
			}
			width=1;
			if (x==0) { width =1; widthCol=dimension; }
			break;
		case 'F':
			width=1; widthCol = str.slice(0,x);
			
			if (x==0){  width=1; widthCol=1;  }
		 break;
		 
	  }
	}
	//////////////////////////////////////////////////////////
	//if(str.indexOf("p")==-1){ rot="-"; } else{ rot=""; }
	//double rotation


	if(str.charAt(str.length-1)==2 || str.slice(str.length-2) == "2p" || str.slice(str.length-2)=="2'"){
		turn=1;
	}
	else{
		turn=2;
	}
		//////////////////////////////////////////////////////////
	
		for(x=0;x<str.length;x++){
		switch(str.charAt(x)){
			
			case 'L':
			case 'l':
			case 'M':
			case 'm':
			case 'B':
			case 'b':
			case 'E':
			case 'e':
			case 'D':
			case 'd':
	
			
				if(str.indexOf("'")==-1 && str.indexOf("p") == -1){ rot=""; } else{ rot="-"; }
				break;
			
			case 'F':
			case 'f':
			case 'U':
			case 'u':
			case 'R':
			case 'r':
			case 'S':
			case 's':
			case 'z':
			case 'y':
			case 'x':
				if(str.indexOf("'")==-1 && str.indexOf("p") == -1){ rot="-"; } else{ rot=""; }
				break;
		}
	}
	
	////////////////////////////////////////special case
	var mAlg = ["M","M'","m","m'","M2","M2'","m2","m2'",];
	var eAlg = ["E","E'","e","e'","E2","E2'","e2","e2'",];
	var sAlg = ["S","S'","s","s'","S2","S2'","s2","s2'",];
	var xAlg = ["x","x'","x2","x2'"];
	var yAlg = ["y","y'","y2","y2'"];
	var zAlg = ["z","z'","z2","z2'"];
	
	//|||||||||||||||||||||||||||||||||||||||||11111111111
	for (x=0;x<mAlg.length;x++){
	 if (str == mAlg[x]){
		 right(rot,widthCol,width,turn,str);
	 }
	}
	for (x=0;x<sAlg.length;x++){
	 if (str == sAlg[x]){
		 face(rot,widthCol,width,turn,str);
	 }
	}
	for (x=0;x<eAlg.length;x++){
	 if (str == eAlg[x]){
		 up(rot,widthCol,width,turn,str);
	 }
	}
	for (x=0;x<xAlg.length;x++){
	 if (str == xAlg[x]){
		rotateX(rot,turn,str);
	 }
	}
	for (x=0;x<yAlg.length;x++){
	 if (str == yAlg[x]){
		rotateY(rot,turn,str);
	 }
	}
	for (x=0;x<zAlg.length;x++){
	 if (str == zAlg[x]){
		rotateZ(rot,turn,str);
	 }
	}
	
	
	
	for(x=0;x<str.length;x++){
		switch(str.charAt(x)){
			case 'r':
			case 'R':
			case 'L':
			case 'l':
				// console.log(str.charAt(x) + " " + rot + " " + widthCol + " " + width + " " + turn);
				right(rot,widthCol,width,turn,str);
			break;
			case 'F':
			case 'f':
			case 'B':
			case 'b':
			
				face(rot,widthCol,width,turn,str);
			break;
			case 'U':
			case 'u':
			case 'D':
			case 'd':
				up(rot,widthCol,width,turn,str);
			break;
		
			
		}
	
	}
	
//	
			
		// sI = setInterval(function(){ right(rot,widthCol,width,turn); }, 1000);
	//	console.log(rot,"",widthCol,"",width,"",turn);
		//right(rot,widthCol,width,turn);
	//	face(rot,widthCol,width,turn);
	//	up(rot,widthCol,width,turn);
	//	right(rot,widthCol,width,turn);
		
}
String.prototype.splice = function( idx, rem, s ) {
    return (this.slice(0,idx) + s + this.slice(idx + Math.abs(rem)));
};
function reduceString(statement){

		statement = statement + "" + " ";
	    statement = statement.replace(/\s\s+/g, ' ');
		statement = statement.replace(/\n+/g, ' ');
		return statement;
}
var performAlg;



function timedAlert(x, y){

						 setTimeout(function(){
						//console.log(statement.slice(y,x));

						checkNotation(statement.slice(y,x));
						
						//console.log(letPosition);
					//	console.log(y + " "+x);
					//	document.getElementById('letAlg'+letPosition-1).style= 'background-color:red;';
						
				   	//	document.getElementById('letAlg'+letPosition).style= 'background-color:yellow;';
				  	
				  // 	console.log(document.getElementById('letAlg0').innerText.length);	
				//console.log(statement.length);
						selectAndHighlightRange('letAlg0', 0,  y+letCount+1,'white');
				   		
				   		selectAndHighlightRange('letAlg0', y+letCount, x+(letCount),'yellow');
				   		selectAndHighlightRange('letAlg0', x+(letCount)+1,  tempCont,'white');
				   		
						}, (speed+(speed*1))*x);//set delay time
					}
function experiment(){


	
	
	statement = simplifyAlg();
	strLink = uQP(strLink,'alg',document.getElementById('txtAreaDimen').value);
	
	letCount = document.getElementById('letAlg0').textContent.length;
	if (letCount != 0) letCount=letCount-1; 
	//console.log(document.getElementById('letAlg0').innerText.length + " " + letCount);
	//selectAndHighlightRange('letAlg0', 0,letCount,'white');
	if (letCount!=0) letCount++;
	//console.log(letCount);

	document.getElementById('letAlg0').innerHTML += statement;
		tempCont = document.getElementById('letAlg0').textContent;
		tempCont = tempCont.length-1;

		
		//console.log(tempCont + " " + document.getElementById('letAlg0').innerText.length);

	//console.log(letCount);
	for (x = 0,y=0;x<statement.length;x++){
		
			if (statement.charAt(x)==' '){
				
				performAlg =timedAlert(x,y);
				//console.log(x,y);
					y=x+1;
			}

	}

}
function simplifyAlg(){
	var txtDimen = document.getElementById("txtAreaDimen");
	statement = reduceString(txtDimen.value);
		
var paramStart,paramEnd,paramNum,paramNew;
var paramFinal = '';
var stateStart,stateEnd;

	//console.log((statement.split('(').length - 1));

//var result = "foo baz".splice( 4, 0, "bar " );
//console.log(statement);

var count = (statement.split('(').length - 1);
	for (i = 1;i<=count;i++){	
		for (a = 0;a<statement.length;a++){

			if (statement.charAt(a) == ')'){

				if(statement.charAt(a+1) == '('){
					
					statement = statement.splice(a+1,0,'1 ');
					break;
				}
				if (statement.charAt(a+1) == ' '){

					statement = statement.splice(a+1,0,'1');
					break;
				}
			}
		}
	//	console.log(statement);
	}
var z;
var digNum;
	for (a = 0;a<count;a++){
					paramFinal = '';
			for (x=0;x<statement.length;x++){
					if (statement.charAt(x)=='('){
							paramStart = x;
					}
					if (statement.charAt(x)==')'){
							paramEnd=x;
							z = (x+1);
							while(statement.charAt(z)!=' '){
								z++;
							}
									//console.log(statement.substring(x+1,18) + 'end ' + z);
							paramNum = Number(statement.substring(x+1,z));
							digNum = statement.substring(x+1,z).length;

					}

				}
		//console.log('paramStart = ' + paramStart + ' paramEnd = '+ paramEnd);
				stateStart = statement.substring(0,paramStart-1);
				stateEnd = statement.substring(paramEnd+(digNum+1),statement.length);
				paramNew = statement.substring(paramStart+1,paramEnd);
				for (y=0;y<paramNum;y++){
					paramFinal= paramFinal + ' ' +paramNew;

				}
				paramFinal = stateStart + '' + paramFinal + '' + stateEnd;
				statement =paramFinal;
			
	}

	if (statement.charAt(0)==' '){
		statement  = statement.substring(1,statement.length);

	}
	
	
	var algHigh = ['L','R','U','D','B','F'];
	var algLow = ['l','r','u','d','b','f'];
	var numNot;
	//console.log(letterNot[0]);
	for (x = 0;x<algHigh.length;x++){
		//console.log('hi');
		find =  algHigh[x]+ 'w';
		re = new RegExp(find, 'g');

		statement = statement.replace(re, algLow[x]);

		//statement = statement.replace(algHigh[x]+ 'w',algLow[x]);
			
	}
	return statement;
}
var stopDelay = true;






















