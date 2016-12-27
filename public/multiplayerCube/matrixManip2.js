
	// var tpad = document.getElementById('tpad');
	var dimen1;
	var arrayCube1 =[];
	var allMovesP2 ='';
	var dimenLet1 = ['U','F','D','B','L','R'];

	var rD1 = [0,1,2,3]; //Direction
var rCDp1 = [3,2,1,0];
var uD1 = [4,1,5,3];
var uCDp1 = [3,5,1,4];
var fCDp1 = [0,5,2,4];
var fD1 = [4,2,5,0];
	


function initMatrixManip1 (){
dimen1 = dimension;
		for (var z = 0;z<dimenLet1.length;z++){
			arrayCube1[z]=[];
			
			for (x = 1;x<=dimen1;x++){
				arrayCube1[z][x]=[];
				for (y=1;y<=dimen1;y++){
					arrayCube1[z][x][y] = [];
					arrayCube1[z][x][y][0]=dimenLet1[z];
					arrayCube1[z][x][y][1]=x;
					arrayCube1[z][x][y][2]=y;
					arrayCube1[z][x][y][3]=dimenLet1[z];
					arrayCube1[z][x][y][4]=x;
					arrayCube1[z][x][y][5]=y;
					
				}
				
			}
			
		}
}
 // tpad.innerHTML+='<br>';




//yAxisMatrix1(3,rD1);
function yAxisMatrix1(sW,aD){ //y axis width
	tempWing1=[];
		for (x = 1;x<=dimen1;x++){
				tempWing1[x] = [];
					tempWing1[x][1] = arrayCube1[aD[0]][x][sW][3];
					tempWing1[x][2] = arrayCube1[aD[0]][x][sW][4];
					tempWing1[x][3] = arrayCube1[aD[0]][x][sW][5];
			}
		for (z = 0;z<rD1.length-1;z++){
			for (x = 1;x<=dimen1;x++){
					arrayCube1[aD[z]][x][sW][3]=arrayCube1[aD[z+1]][x][sW][3];
					arrayCube1[aD[z]][x][sW][4]=arrayCube1[aD[z+1]][x][sW][4];
					arrayCube1[aD[z]][x][sW][5]=arrayCube1[aD[z+1]][x][sW][5];
			}
		}
		for (x = 1;x<=dimen1;x++){
					arrayCube1[aD[3]][x][sW][3]=tempWing1[x][1];
					arrayCube1[aD[3]][x][sW][4]=tempWing1[x][2];
					arrayCube1[aD[3]][x][sW][5]=tempWing1[x][3];
			}
}
//xAxisMatrix1(1,uD1);
function transposeMatrix1(tempArray1,cT){
	tempWing1= [];
	for (x = dimen1,xT = 1;x>=1;xT++,x--){
			tempWing1[xT] = [];
			for (y=dimen1,yT = 1;y>=1;yT++,y--){
				tempWing1[xT][yT] = [];
				tempWing1[xT][yT][1] =tempArray1[cT][x][y][3];
				tempWing1[xT][yT][2] =tempArray1[cT][x][y][4];
				tempWing1[xT][yT][3] =tempArray1[cT][x][y][5];
			}
		}
		for(x =1;x<=dimen1;x++){
			for (y=1;y<=dimen1;y++){
				tempArray1[cT][x][y][3] = tempWing1[x][y][1];
				tempArray1[cT][x][y][4] = tempWing1[x][y][2];
				tempArray1[cT][x][y][5] = tempWing1[x][y][3];
				
			}
		}
	
	return tempArray1;
}
function rotateMatrix1(tempArray1,cT){ //cT which color of tiles to invert
	tempWing1= [];
	for (y=1,yT = 1;y<=dimen1;yT++,y++){
	
			tempWing1[yT] = [];
			for (x = dimen1,xT = 1;x>=1;xT++,x--){
				tempWing1[yT][xT] = [];
				tempWing1[yT][xT][1] =tempArray1[cT][x][y][3];
				tempWing1[yT][xT][2] =tempArray1[cT][x][y][4];
				tempWing1[yT][xT][3] =tempArray1[cT][x][y][5];
			}
		}
		for(x =1;x<=dimen1;x++){
			for (y=1;y<=dimen1;y++){
				tempArray1[cT][x][y][3] = tempWing1[x][y][1];
				tempArray1[cT][x][y][4] = tempWing1[x][y][2];
				tempArray1[cT][x][y][5] = tempWing1[x][y][3];
				
			}
		}
	
	return tempArray1;
}
function rotMatrixP1(tempArray1,cT){ //cT which color of tiles to invert
	tempWing1= [];
	for (y=dimen1,yT = 1;y>=1;yT++,y--){
	
			tempWing1[yT] = [];
			for (x = 1,xT = 1;x<=dimen1;xT++,x++){
				tempWing1[yT][xT] = [];
				tempWing1[yT][xT][1] =tempArray1[cT][x][y][3];
				tempWing1[yT][xT][2] =tempArray1[cT][x][y][4];
				tempWing1[yT][xT][3] =tempArray1[cT][x][y][5];
			}
		}
		for(x =1;x<=dimen1;x++){
			for (y=1;y<=dimen1;y++){
				tempArray1[cT][x][y][3] = tempWing1[x][y][1];
				tempArray1[cT][x][y][4] = tempWing1[x][y][2];
				tempArray1[cT][x][y][5] = tempWing1[x][y][3];
				
			}
		}
	
	return tempArray1;
}
//zAxisMatrix1(1,fD1);
function zAxisMatrix1(sW,aD){ 
tempWing1 = [];
	arrayCube1 = transposeMatrix1(arrayCube1,5);
	arrayCube1 = rotateMatrix1(arrayCube1,5);
	arrayCube1 = rotateMatrix1(arrayCube1,2);
	arrayCube1 = rotateMatrix1(arrayCube1,2);
	arrayCube1 = rotateMatrix1(arrayCube1,4);
		for (x = 1;x<=dimen1;x++){
				tempWing1[x] = [];
					tempWing1[x][1] = arrayCube1[aD[0]][sW][x][3];
					tempWing1[x][2] = arrayCube1[aD[0]][sW][x][4];
					tempWing1[x][3] = arrayCube1[aD[0]][sW][x][5];

			}

		for (z = 0;z<rD1.length-1;z++){
			for (x = 1;x<=dimen1;x++){
					arrayCube1[aD[z]][sW][x][3]=arrayCube1[aD[z+1]][sW][x][3];
					arrayCube1[aD[z]][sW][x][4]=arrayCube1[aD[z+1]][sW][x][4];
					arrayCube1[aD[z]][sW][x][5]=arrayCube1[aD[z+1]][sW][x][5];
			}
		}
		for (x = 1;x<=dimen1;x++){
					arrayCube1[aD[3]][sW][x][3]=tempWing1[x][1];
					arrayCube1[aD[3]][sW][x][4]=tempWing1[x][2];
					arrayCube1[aD[3]][sW][x][5]=tempWing1[x][3];
			}

	arrayCube1 = transposeMatrix1(arrayCube1,5);
	arrayCube1 = rotMatrixP1(arrayCube1,5);
	arrayCube1 = rotateMatrix1(arrayCube1,2);
	arrayCube1 = rotateMatrix1(arrayCube1,2);
	arrayCube1 = rotMatrixP1(arrayCube1,4);

}
//xAxisMatrix1(1,uD1);

function xAxisMatrix1(sW,aD){ //y axis width
	//tempWing1= [];

//arrayCube1 = transposeMatrix1(arrayCube1);
arrayCube1 = transposeMatrix1(arrayCube1,3);
	///inverse facelet double
		//for (x = dimen,xT = 1;x>=1;xT++,x--){
//			tempWing1[xT] = [];
//			for (y=dimen,yT = 1;y>=1;yT++,y--){
//				tempWing1[xT][yT] = [];
//				tempWing1[xT][yT][1] =arrayCube1[3][x][y][3];
//				tempWing1[xT][yT][2] =arrayCube1[3][x][y][4];
//				tempWing1[xT][yT][3] =arrayCube1[3][x][y][5];
//			}
//		}
//		for(x =1;x<=dimen;x++){
//			for (y=1;y<=dimen;y++){
//				arrayCube1[3][x][y][3] = tempWing1[x][y][1];
//				arrayCube1[3][x][y][4] = tempWing1[x][y][2];
//				arrayCube1[3][x][y][5] = tempWing1[x][y][3];
//				
//			}
//		}
	///////////////////////////////	
 			for (x = 1;x<=dimen1;x++){
				tempWing1[x] = [];
					tempWing1[x][1] = arrayCube1[aD[0]][sW][x][3];
					tempWing1[x][2] = arrayCube1[aD[0]][sW][x][4];
					tempWing1[x][3] = arrayCube1[aD[0]][sW][x][5];

			}

		for (z = 0;z<rD1.length-1;z++){
			for (x = 1;x<=dimen1;x++){
					arrayCube1[aD[z]][sW][x][3]=arrayCube1[aD[z+1]][sW][x][3];
					arrayCube1[aD[z]][sW][x][4]=arrayCube1[aD[z+1]][sW][x][4];
					arrayCube1[aD[z]][sW][x][5]=arrayCube1[aD[z+1]][sW][x][5];
			}
		}
		for (x = 1;x<=dimen1;x++){
					arrayCube1[aD[3]][sW][x][3]=tempWing1[x][1];
					arrayCube1[aD[3]][sW][x][4]=tempWing1[x][2];
					arrayCube1[aD[3]][sW][x][5]=tempWing1[x][3];
			}
//			
//			
//			
//	///inverse facelet double
//		for (x = dimen,xT = 1;x>=1;xT++,x--){
//			tempWing1[xT] = [];
//			for (y=dimen,yT = 1;y>=1;yT++,y--){
//				tempWing1[xT][yT] = [];
//				tempWing1[xT][yT][1] =arrayCube1[3][x][y][3];
//				tempWing1[xT][yT][2] =arrayCube1[3][x][y][4];
//				tempWing1[xT][yT][3] =arrayCube1[3][x][y][5];
//			}
//		}
//		for(x =1;x<=dimen;x++){
//			for (y=1;y<=dimen;y++){
//				arrayCube1[3][x][y][3] = tempWing1[x][y][1];
//				arrayCube1[3][x][y][4] = tempWing1[x][y][2];
//				arrayCube1[3][x][y][5] = tempWing1[x][y][3];
//				
//			}
//		}
arrayCube1 = transposeMatrix1(arrayCube1,3);
	///////////////////////////////	
}


 	




// //printArrayCube1();





//-------------------------------------Filter Permutation-----------------------------//
//yAxisMatrix1(3,rD1);
//xAxisMatrix1(1,uD1);
//zAxisMatrix1(1,fD1);

function execMove1(alg){
	//var alg = document.getElementById('inputAlg').value
	//alert(alg);
	switch(alg){
		case 'M':
		if (dimen1%2 == 1)
			yAxisMatrix1(Math.round(dimen1/2),rCDp1);
			//printArrayCube1();
			break;
				case 'M2':
				if (dimen1%2 == 1){
					yAxisMatrix1(Math.round(dimen1/2),rCDp1);
					yAxisMatrix1(Math.round(dimen1/2),rCDp1);
				}
					//printArrayCube1();
					break;
		case 'Mp':
			if (dimen1%2 == 1)
			yAxisMatrix1(Math.round(dimen1/2),rD1);
			//printArrayCube1();
			break;

		case 'E':
		if (dimen1%2 == 1)
			xAxisMatrix1(Math.round(dimen1/2),uCDp1);
			//printArrayCube1();
			break;
				case 'E2':
				if (dimen1%2 == 1){
					xAxisMatrix1(Math.round(dimen1/2),uCDp1);
					xAxisMatrix1(Math.round(dimen1/2),uCDp1);
				}
					//printArrayCube1();
					break;
		case 'Ep':
		if (dimen1%2 == 1)
			xAxisMatrix1(Math.round(dimen1/2),uD1);
			//printArrayCube1();
			break;

		case 'S':
		if (dimen1%2 == 1)
			zAxisMatrix1(Math.round(dimen1/2),fD1);
		
			//printArrayCube1();
			break;
				case 'S2':
				if (dimen1%2 == 1){
					zAxisMatrix1(Math.round(dimen1/2),fD1);
					zAxisMatrix1(Math.round(dimen1/2),fD1);
				}
					//printArrayCube1();
			break;
		case 'Sp':
			if (dimen1%2 == 1)
			zAxisMatrix1(Math.round(dimen1/2),fCDp1);
			//printArrayCube1();
			break;




		case 'R':
			yAxisMatrix1(dimen1,rD1);
			rotateMatrix1(arrayCube1,5);
			//printArrayCube1();
			break;
				case 'R2':
					yAxisMatrix1(dimen1,rD1);
					rotateMatrix1(arrayCube1,5);
					yAxisMatrix1(dimen1,rD1);
					rotateMatrix1(arrayCube1,5);
					//printArrayCube1();
					break;
		case 'Rp':
			yAxisMatrix1(dimen1,rCDp1);
			rotMatrixP1(arrayCube1,5);
			//printArrayCube1();
			break;
		



		case 'L':
			yAxisMatrix1(1,rCDp1);
			rotateMatrix1(arrayCube1,4);
			//printArrayCube1();	
			break;
				case 'L2':
					yAxisMatrix1(1,rCDp1);
					rotateMatrix1(arrayCube1,4);
					yAxisMatrix1(1,rCDp1);
					rotateMatrix1(arrayCube1,4);
					//printArrayCube1();	
					break;

		case 'Lp':
			yAxisMatrix1(1,rD1);
			rotMatrixP1(arrayCube1,4);
			//printArrayCube1();
			break;
		case 'U':
			xAxisMatrix1(1,uD1);
			rotateMatrix1(arrayCube1,0);
			//printArrayCube1();
			break;
				case 'U2':
					xAxisMatrix1(1,uD1);
					rotateMatrix1(arrayCube1,0);
					xAxisMatrix1(1,uD1);
					rotateMatrix1(arrayCube1,0);
					//printArrayCube1();
					break;	
		case 'Up':
			xAxisMatrix1(1,uCDp1);
			rotMatrixP1(arrayCube1,0);
			//printArrayCube1();
			break;
		case 'D':
			xAxisMatrix1(dimen1,uCDp1);
			rotateMatrix1(arrayCube1,2);
			//printArrayCube1();
			break;
				case 'D2':
					xAxisMatrix1(dimen1,uCDp1);
					rotateMatrix1(arrayCube1,2);
					xAxisMatrix1(dimen1,uCDp1);
					rotateMatrix1(arrayCube1,2);
					//printArrayCube1();
					break;
		case 'Dp':
			xAxisMatrix1(dimen1,uD1);
			rotMatrixP1(arrayCube1,2);
			//printArrayCube1();
			break;
		case 'F':
			zAxisMatrix1(dimen1,fD1);
			rotateMatrix1(arrayCube1,1);
			//printArrayCube1();
			break;
				case 'F2':
					zAxisMatrix1(dimen1,fD1);
					rotateMatrix1(arrayCube1,1);
					zAxisMatrix1(dimen1,fD1);
					rotateMatrix1(arrayCube1,1);
					//printArrayCube1();
			break;
		case 'Fp':
			zAxisMatrix1(dimen1,fCDp1);
			rotMatrixP1(arrayCube1,1);
			//printArrayCube1();
			break;
		case 'B':
			zAxisMatrix1(1,fCDp1);
			rotateMatrix1(arrayCube1,3);
			//printArrayCube1();
			break;
				case 'B2':
					zAxisMatrix1(1,fCDp1);
					rotateMatrix1(arrayCube1,3);
					zAxisMatrix1(1,fCDp1);
					rotateMatrix1(arrayCube1,3);
					//printArrayCube1();
					break;
		case 'Bp':
			zAxisMatrix1(1,fD1);
			rotMatrixP1(arrayCube1,3);
			//printArrayCube1();
			break;

		case 'y':
			for (var i=1;i<=dimen1;i++){
				xAxisMatrix1(i,uD1);
			}
			rotateMatrix1(arrayCube1,0);
			rotMatrixP1(arrayCube1,2);
			break;
				case 'y2':
					for (var i=1;i<=dimen1;i++){
						xAxisMatrix1(i,uD1);
					}
					rotateMatrix1(arrayCube1,0);
					rotMatrixP1(arrayCube1,2);

					for (var i=1;i<=dimen1;i++){
						xAxisMatrix1(i,uD1);
					}
					rotateMatrix1(arrayCube1,0);
					rotMatrixP1(arrayCube1,2);
				break;
		case 'yp':
			for (var i=1;i<=dimen1;i++){
				xAxisMatrix1(i,uCDp1);
			}
			rotMatrixP1(arrayCube1,0);
			rotateMatrix1(arrayCube1,2);
			break;

		case 'x':
			for (var i=1;i<=dimen1;i++){
				yAxisMatrix1(i,rD1);
			}
			rotateMatrix1(arrayCube1,5);
			rotMatrixP1(arrayCube1,4);
			break;
				case 'x2':
					for (var i=1;i<=dimen1;i++){
						yAxisMatrix1(i,rD1);
					}
					rotateMatrix1(arrayCube1,5);
					rotMatrixP1(arrayCube1,4);

					for (var i=1;i<=dimen1;i++){
						yAxisMatrix1(i,rD1);
					}
					rotateMatrix1(arrayCube1,5);
					rotMatrixP1(arrayCube1,4);
				break;
		case 'xp':
			for (var i=1;i<=dimen1;i++){
				yAxisMatrix1(i,rCDp1);
			}
			rotMatrixP1(arrayCube1,5);
			rotateMatrix1(arrayCube1,4);
			break;

		case 'z':
			for (var i=1;i<=dimen1;i++){
				zAxisMatrix1(i,fD1);
			}
			rotateMatrix1(arrayCube1,1);
			rotMatrixP1(arrayCube1,3);
			break;
				case 'z2':
					for (var i=1;i<=dimen1;i++){
						zAxisMatrix1(i,fD1);
					}
					rotateMatrix1(arrayCube1,1);
					rotMatrixP1(arrayCube1,3);
					
					for (var i=1;i<=dimen1;i++){
						zAxisMatrix1(i,fD1);
					}
					rotateMatrix1(arrayCube1,1);
					rotMatrixP1(arrayCube1,3);
				break;
		case 'zp':
		for (var i=1;i<=dimen1;i++){
			zAxisMatrix1(i,fCDp1);
		}
		rotMatrixP1(arrayCube1,1);
		rotateMatrix1(arrayCube1,3);
		break;	
	}
}



function printArrayCube1(){
	var colorMatrix1 = [];
	var h1 = 0;
	// tpad.innerHTML = '';
for (var z = 0;z<dimenLet1.length;z++){
	colorMatrix1[z]=[];
	h1=0;
	for (var x = 1;x<=dimen1;x++){
		for (var y=1;y<=dimen1;y++){
			// tpad.innerHTML += arrayCube1[z][x][y][0] + ' ' +
			// 				  arrayCube1[z][x][y][1] + ' ' +
			// 				  arrayCube1[z][x][y][2] + ' ' + ':::'+
			// 				  arrayCube1[z][x][y][3] + ' ' +
			// 				  arrayCube1[z][x][y][4] + ' ' +
			// 				  arrayCube1[z][x][y][5] + ' ' +
			// 				   '------';	
		 	 colorMatrix1[z][h1] = arrayCube1[z][x][y][3];
			h1++;
		} 
			// tpad.innerHTML+='<br>';
		}
	// tpad.innerHTML+='<br>';
  	}
  // tpad.innerHTML+='<br>';

  // tpad.innerHTML+='hi';

  	var checkIfSolve1 =true;
  	for (var x=0;x<colorMatrix1.length;x++){
			if (!allAreEqual1(colorMatrix1[x])){
				checkIfSolve1 = false; 
			} 
		}
  	// console.log('cube 2 is ' + checkIfSolve1);
  		if (checkIfSolve1){
  				room_status = 'ongame';
  				// socket.emit('p2Solved');
  				console.log('solve p2');
  		}
}
function allAreEqual1(array){
    if(!array.length) return true;
    // I also made sure it works with [false, false] array
    return array.reduce(function(a, b){return (a === b)?a:(!b);}) === array[0];
}
function execPerm1(str){
		// if (userPerspective == 'observer')
		// alert('execPerm = ' + str);

		for (var z = 0;z<dimenLet1.length;z++){
	arrayCube1[z]=[];
	
	for (x = 1;x<=dimen1;x++){
		arrayCube1[z][x]=[];
		for (y=1;y<=dimen1;y++){
			arrayCube1[z][x][y] = [];
			arrayCube1[z][x][y][0]=dimenLet1[z];
			arrayCube1[z][x][y][1]=x;
			arrayCube1[z][x][y][2]=y;
			arrayCube1[z][x][y][3]=dimenLet1[z];
			arrayCube1[z][x][y][4]=x;
			arrayCube1[z][x][y][5]=y;
			
			
			
		}
		
	}

	
	
}
		str = str.replace(/  +/g, ' ');
		str = str.replace(/'/g, 'p');
		var str_array1 = str.split(' ');
		for(var i = 0; i < str_array1.length; i++) {
		   str_array1[i] = str_array1[i].replace(/^\s*/, "").replace(/\s*$/, "");
		   execMove1(str_array1[i]);

		}
		// console.log(arrayCube1[0][1][1][3]);
}


function execCornerBufferAlg(str){
	var completeCheck=0;	
	execPerm1(str);
	for(var z=1;completeCheck==0;){


	var cornerBuffer = arrayCube1[0][1][1][3] + '' + arrayCube1[0][1][1][4] + '' + arrayCube1[0][1][1][5];
		 for (x=0;x<cornerArray.length;x++){
	  		if (cornerBuffer == cornerArray[x][0]){
	  			cornerLetter = cornerArray[x][1];
	  			cornerAlg = cornerArray[x][2];
	  			break;
	  		}

	  	}
	completeCheck=1;
			for (x=1;x<8;x++){
				if (cornerCheck[x]==0){
					completeCheck=0;
					break;
				}
			}

			
	for (x=0;x<8;x++){
			for (y=0;y<3;y++){
				switch (cornerLetter){
					case 'A':
					case 'R':
					case 'E':
						if (completeCheck==1){
							//end loop
							console.log('finish');
							break;
						}
						else{
							for (i=1;i<8;i++){
								if (cornerCheck[i]==0){
										cornerLetter = corner[i].charAt(0);
											for (i=0;i<cornerArray.length;i++){
											  		if (cornerLetter == cornerArray[i][1]){
											  			cornerAlg=cornerArray[i][2];
											  			break;
												  	}

											 }
										break;
								}
							}
							
						}
					break;
					case corner[x].charAt(y):
						cornerCheck[x]=1;
						z++;
						//execute algorithm
						break;
				}
				
			}
		}
		// for (x=0;x<8;x++){
		// 	console.log(x + " " + cornerCheck[x]);
		// }

	
	 	
			console.log(cornerLetter);
			str = cornerAlg;
			cornerSolution+=cornerAlg + " ";
			execPerm1(str);
	}
	console.log(cornerSolution);
	console.log('z='+z);
	if (z%2==0){
		console.log('parity');
		//"R D' R U' R' U' R U R' F' R U R' U' R' F R D R'"
		//execPerm1("R D' " + concatPerm + " D R'");
	}

}

///---------------corner----------------
var cornerSolution='';
var corner=['ARE','BNQ','CJM','DIF','PKV','GLU','XHS','OTW'];
var cornerCheck=[];
var cornerLetter,cornerAlg;
var concatPerm ="R U' R' U' R U R' F' R U R' U' R' F R";
for (x=0;x<8;x++){
	cornerCheck[x]=0;
}
if (dimen1 ==3){
var cornerArray=[['U11','A',''],
			 ['B31','R',''],
			 ['L11','E',''],
			 ['U13','B',"R D' " + concatPerm + " D R'"],
			 ['U33','C',"F " + concatPerm + " F'"],
			 ['U31','D',"F R' " + concatPerm + " R F'"],
			 ['L13','F',"F2 " + concatPerm + " F2"],
			 ['L33','G',"D2 R " + concatPerm + " R' D2"],
			 ['L31','H',"D2 " + concatPerm + " D2"],
			 ['F11','I',"F' D " + concatPerm + " D' F"],
			 ['F13','J',"F2 D " + concatPerm + " D' F2"],
			 ['F33','K',"F D " + concatPerm + " D' F'"],
			 ['F31','L',"D " + concatPerm + " D'"],
			 ['R11','M',"R' " + concatPerm + " R"],
			 ['R13','N',"R2 " + concatPerm + " R2"],
			 ['R33','O',"R " + concatPerm + " R'"],
			 ['R31','P',concatPerm],
			 ['B33','Q',"R' F " + concatPerm + " F' R"],
			 ['B11','S',"D' R " + concatPerm + " R' D"],
			 ['B13','T',"D' " + concatPerm + " D"],
			 ['D11','U',"F' " + concatPerm + " F"],
			 ['D13','V',"D' F' " + concatPerm + " F D"],
			 ['D33','W',"D2 F' " + concatPerm + " F D2"],
			 ['D31','X',"D F' " + concatPerm + " F D'"]];
}
else if (dimen1 == 2){
			var cornerArray=[['U11','A',''],
			 ['B21','R',''],
			 ['L11','E',''],
			 ['U12','B',"R D' " + concatPerm + " D R'"],
			 ['U22','C',"F " + concatPerm + " F'"],
			 ['U21','D',"F R' " + concatPerm + " R F'"],
			 ['L12','F',"F2 " + concatPerm + " F2"],
			 ['L22','G',"D2 R " + concatPerm + " R' D2"],
			 ['L21','H',"D2 " + concatPerm + " D2"],
			 ['F11','I',"F' D " + concatPerm + " D' F"],
			 ['F12','J',"F2 D " + concatPerm + " D' F2"],
			 ['F22','K',"F D " + concatPerm + " D' F'"],
			 ['F21','L',"D " + concatPerm + " D'"],
			 ['R11','M',"R' " + concatPerm + " R"],
			 ['R12','N',"R2 " + concatPerm + " R2"],
			 ['R22','O',"R " + concatPerm + " R'"],
			 ['R21','P',concatPerm],
			 ['B22','Q',"R' F " + concatPerm + " F' R"],
			 ['B11','S',"D' R " + concatPerm + " R' D"],
			 ['B12','T',"D' " + concatPerm + " D"],
			 ['D11','U',"F' " + concatPerm + " F"],
			 ['D12','V',"D' F' " + concatPerm + " F D"],
			 ['D22','W',"D2 F' " + concatPerm + " F D2"],
			 ['D21','X',"D F' " + concatPerm + " F D'"]];

}
///---------------corner----------------
var edgeSolution = '';
var edge=['KU','AQ','BM','CI','DE','NT','JP','LF','HR','SW','OV','GX']
var edgeCheck=[];
var edgeLetter,edgeAlg;
for (x=0;x<edge.length;x++){
	edgeCheck[x]=0;
}
var edgeArray=[['F32','K',''],['D12','U',''],
			 ['U12','A','M2'],
			 ['U23','B',"R' U R U' M2 U R' U' R"],
			 ['U32','C',"U2 M' U2 M'"],
			 ['U21','D',"L U' L' U M2 U' L U L'"],
			 ['L12','E',"B L' B' M2 B L B'"],
			 ['L23','F',"B L2 B' M2 B L2 B'"],
			 ['L32','G',"B L B' M2 B L' B'"],
			 ['L21','H',"L' B L B' M2 B L' B' L"],
			 ['F12','I',"D M' U R2 U' M U R2 U' D' M2"],
			 ['F23','J',"U R U' M2 U R' U'"],
			 ['F21','L',"U' L' U M2 U' L U"],
			 ['R12','M',"B' R B M2 B' R' B"],
			 ['R23','N',"R B' R' B M2 B' R B R'"],
			 ['R32','O',"B' R' B M2 B' R B"],
			 ['R21','P',"B' R2 B M2 B' R2 B"],
			 ['B32','Q',"B' R B U R2 U' M2 U R2 U' B' R' B"],
			 ['B21','R',"U' L U M2 U' L' U"],
			 ['B12','S',"M2 D U R2 U' M' U R2 U' M D'"],
			 ['B23','T',"U R' U' M2 U R U'"],
			 ['D23','V',"U R2 U' M2 U R2 U'"],
			 ['D32','W',"M U2 M U2"],
			 ['D21','X',"U' L2 U M2 U' L2 U"]]



function execEdgeBufferAlg(str){

	var completeCheck=0;
	//completeCheck==0
	for (var z=1;completeCheck==0;z++){
			
	
	var edgeBuffer = arrayCube1[2][1][2][3] + '' + arrayCube1[2][1][2][4] + '' + arrayCube1[2][1][2][5];
	

		 for (var x=0;x<edgeArray.length;x++){
	  		if (edgeBuffer == edgeArray[x][0]){
	  			edgeLetter = edgeArray[x][1];
	  			edgeAlg = edgeArray[x][2];
	  			break;
	  		}

	  	}
	  	//console.log(edgeLetter);
//var edge=['KU','AQ','BM','CI','DE','NT','JP','LF','HR','SW','OV','GX']


			completeCheck=1;
			for (var x=1;x<edge.length;x++){
				if (edgeCheck[x]==0){
					completeCheck=0;
					break;
				}
			}
				if ( (z%2 == 0 && edgeLetter == 'C')){ edgeLetter='W';
				  	for (var x=0;x<edgeArray.length;x++){
				  		if (edgeLetter == edgeArray[x][1]){
							edgeAlg = edgeArray[x][2]; edgeCheck[3]=1; break; } } }
				else if ( (z%2 == 0 && edgeLetter == 'W')){ edgeLetter='C';
				  	for (var x=0;x<edgeArray.length;x++){
				  		if (edgeLetter == edgeArray[x][1]){
							edgeAlg = edgeArray[x][2]; edgeCheck[9]=1; break; } } }
				else if ( (z%2 == 0 && edgeLetter == 'I')){ edgeLetter='S';
				  	for (var x=0;x<edgeArray.length;x++){
				  		if (edgeLetter == edgeArray[x][1]){
							edgeAlg = edgeArray[x][2]; edgeCheck[3]=1; break; } } }

				else if ( (z%2 == 0 && edgeLetter == 'S')){ edgeLetter='I';
				  	for (var x=0;x<edgeArray.length;x++){
				  		if (edgeLetter == edgeArray[x][1]){
							edgeAlg = edgeArray[x][2]; edgeCheck[9]=1; break; } } }
	  			else{

					for (var x=0;x<edge.length;x++){
						for (var y=0;y<2;y++){
							switch (edgeLetter){
								case 'K':
								case 'U':
									if (completeCheck==1){
										//end loop
										console.log('finish');
										break;
									}
									else{
										for (i=1;i<edge.length;i++){
											if (edgeCheck[i]==0){
													edgeLetter = edge[i].charAt(0);
														for (i=0;i<edgeArray.length;i++){
														  		if (edgeLetter == edgeArray[i][1]){
														  			edgeAlg=edgeArray[i][2];
														  			break;
															  	}

														 }
													break;
											}
										}
										
									}
								break;
								case edge[x].charAt(y):
									edgeCheck[x]=1;
									//execute algorithm
									break;
							}
							
						}
					}
				}
		// for (x=0;x<edge.length;x++){
		// 	console.log(x + " " + edgeCheck[x]);
		// }

	


			console.log(edgeLetter);
			str = edgeAlg;
		edgeSolution+=edgeAlg + " ";
		execPerm1(str);
	}
	console.log(edgeSolution);
	

	//execMove1('');
}


// console.log(cornerCheck[0]);
