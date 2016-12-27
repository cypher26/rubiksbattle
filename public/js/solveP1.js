
	var tpad = document.getElementById('tpad');

	var dimen=3;
	var arrayCubeSolve;
	var allMovesP1Solve ='';
	var dimenLet = ['U','F','D','B','L','R'];

	var rD = [0,1,2,3]; //Direction
	var rDp = [3,2,1,0];
	var uD = [4,1,5,3];
	var uDp = [3,5,1,4];
	var fDp = [0,5,2,4];
	var fD = [4,2,5,0];


function initMatrix(){
	// var dimen = 3;
		arrayCubeSolve =[];
	for (var z = 0;z<dimenLet.length;z++){
		arrayCubeSolve[z]=[];
		
		for (x = 1;x<=dimen;x++){
			arrayCubeSolve[z][x]=[];
			for (y=1;y<=dimen;y++){
				arrayCubeSolve[z][x][y] = [];
				arrayCubeSolve[z][x][y][0]=dimenLet[z];
				arrayCubeSolve[z][x][y][1]=x;
				arrayCubeSolve[z][x][y][2]=y;
				arrayCubeSolve[z][x][y][3]=dimenLet[z];
				arrayCubeSolve[z][x][y][4]=x;
				arrayCubeSolve[z][x][y][5]=y;
				
				
				
			}
			
		}

		
		
}
}
 // tpad.innerHTML+='<br>';




//yAxisMatrixSolve(3,rD);
function yAxisMatrixSolve(sW,aD){ //y axis width
	tempWing=[];
		for (x = 1;x<=dimen;x++){
				tempWing[x] = [];
					tempWing[x][1] = arrayCubeSolve[aD[0]][x][sW][3];
					tempWing[x][2] = arrayCubeSolve[aD[0]][x][sW][4];
					tempWing[x][3] = arrayCubeSolve[aD[0]][x][sW][5];
			}
		for (z = 0;z<rD.length-1;z++){
			for (x = 1;x<=dimen;x++){
					arrayCubeSolve[aD[z]][x][sW][3]=arrayCubeSolve[aD[z+1]][x][sW][3];
					arrayCubeSolve[aD[z]][x][sW][4]=arrayCubeSolve[aD[z+1]][x][sW][4];
					arrayCubeSolve[aD[z]][x][sW][5]=arrayCubeSolve[aD[z+1]][x][sW][5];
			}
		}
		for (x = 1;x<=dimen;x++){
					arrayCubeSolve[aD[3]][x][sW][3]=tempWing[x][1];
					arrayCubeSolve[aD[3]][x][sW][4]=tempWing[x][2];
					arrayCubeSolve[aD[3]][x][sW][5]=tempWing[x][3];
			}
}
//xAxisMatrixSolve(1,uD);
function transposeMatrixSolve(tempArray,cT){
	tempWing= [];
	for (x = dimen,xT = 1;x>=1;xT++,x--){
			tempWing[xT] = [];
			for (y=dimen,yT = 1;y>=1;yT++,y--){
				tempWing[xT][yT] = [];
				tempWing[xT][yT][1] =tempArray[cT][x][y][3];
				tempWing[xT][yT][2] =tempArray[cT][x][y][4];
				tempWing[xT][yT][3] =tempArray[cT][x][y][5];
			}
		}
		for(x =1;x<=dimen;x++){
			for (y=1;y<=dimen;y++){
				tempArray[cT][x][y][3] = tempWing[x][y][1];
				tempArray[cT][x][y][4] = tempWing[x][y][2];
				tempArray[cT][x][y][5] = tempWing[x][y][3];
				
			}
		}
	
	return tempArray;
}
function rotateMatrix(tempArray,cT){ //cT which color of tiles to invert
	tempWing= [];
	for (y=1,yT = 1;y<=dimen;yT++,y++){
	
			tempWing[yT] = [];
			for (x = dimen,xT = 1;x>=1;xT++,x--){
				tempWing[yT][xT] = [];
				tempWing[yT][xT][1] =tempArray[cT][x][y][3];
				tempWing[yT][xT][2] =tempArray[cT][x][y][4];
				tempWing[yT][xT][3] =tempArray[cT][x][y][5];
			}
		}
		for(x =1;x<=dimen;x++){
			for (y=1;y<=dimen;y++){
				tempArray[cT][x][y][3] = tempWing[x][y][1];
				tempArray[cT][x][y][4] = tempWing[x][y][2];
				tempArray[cT][x][y][5] = tempWing[x][y][3];
				
			}
		}
	
	return tempArray;
}
function rotateMatrixP(tempArray,cT){ //cT which color of tiles to invert
	tempWing= [];
	for (y=dimen,yT = 1;y>=1;yT++,y--){
	
			tempWing[yT] = [];
			for (x = 1,xT = 1;x<=dimen;xT++,x++){
				tempWing[yT][xT] = [];
				tempWing[yT][xT][1] =tempArray[cT][x][y][3];
				tempWing[yT][xT][2] =tempArray[cT][x][y][4];
				tempWing[yT][xT][3] =tempArray[cT][x][y][5];
			}
		}
		for(x =1;x<=dimen;x++){
			for (y=1;y<=dimen;y++){
				tempArray[cT][x][y][3] = tempWing[x][y][1];
				tempArray[cT][x][y][4] = tempWing[x][y][2];
				tempArray[cT][x][y][5] = tempWing[x][y][3];
				
			}
		}
	
	return tempArray;
}
//zAxisMatrixSolve(1,fD);
function zAxisMatrixSolve(sW,aD){ 
tempWing = [];
	arrayCubeSolve = transposeMatrixSolve(arrayCubeSolve,5);
	arrayCubeSolve = rotateMatrix(arrayCubeSolve,5);
	arrayCubeSolve = rotateMatrix(arrayCubeSolve,2);
	arrayCubeSolve = rotateMatrix(arrayCubeSolve,2);
	arrayCubeSolve = rotateMatrix(arrayCubeSolve,4);
		for (x = 1;x<=dimen;x++){
				tempWing[x] = [];
					tempWing[x][1] = arrayCubeSolve[aD[0]][sW][x][3];
					tempWing[x][2] = arrayCubeSolve[aD[0]][sW][x][4];
					tempWing[x][3] = arrayCubeSolve[aD[0]][sW][x][5];

			}

		for (z = 0;z<rD.length-1;z++){
			for (x = 1;x<=dimen;x++){
					arrayCubeSolve[aD[z]][sW][x][3]=arrayCubeSolve[aD[z+1]][sW][x][3];
					arrayCubeSolve[aD[z]][sW][x][4]=arrayCubeSolve[aD[z+1]][sW][x][4];
					arrayCubeSolve[aD[z]][sW][x][5]=arrayCubeSolve[aD[z+1]][sW][x][5];
			}
		}
		for (x = 1;x<=dimen;x++){
					arrayCubeSolve[aD[3]][sW][x][3]=tempWing[x][1];
					arrayCubeSolve[aD[3]][sW][x][4]=tempWing[x][2];
					arrayCubeSolve[aD[3]][sW][x][5]=tempWing[x][3];
			}

	arrayCubeSolve = transposeMatrixSolve(arrayCubeSolve,5);
	arrayCubeSolve = rotateMatrixP(arrayCubeSolve,5);
	arrayCubeSolve = rotateMatrix(arrayCubeSolve,2);
	arrayCubeSolve = rotateMatrix(arrayCubeSolve,2);
	arrayCubeSolve = rotateMatrixP(arrayCubeSolve,4);

}
//xAxisMatrixSolve(1,uD);

function xAxisMatrixSolve(sW,aD){ //y axis width
	//tempWing= [];

//arrayCubeSolve = transposeMatrixSolve(arrayCubeSolve);
arrayCubeSolve = transposeMatrixSolve(arrayCubeSolve,3);
	///inverse facelet double
		//for (x = dimen,xT = 1;x>=1;xT++,x--){
//			tempWing[xT] = [];
//			for (y=dimen,yT = 1;y>=1;yT++,y--){
//				tempWing[xT][yT] = [];
//				tempWing[xT][yT][1] =arrayCubeSolve[3][x][y][3];
//				tempWing[xT][yT][2] =arrayCubeSolve[3][x][y][4];
//				tempWing[xT][yT][3] =arrayCubeSolve[3][x][y][5];
//			}
//		}
//		for(x =1;x<=dimen;x++){
//			for (y=1;y<=dimen;y++){
//				arrayCubeSolve[3][x][y][3] = tempWing[x][y][1];
//				arrayCubeSolve[3][x][y][4] = tempWing[x][y][2];
//				arrayCubeSolve[3][x][y][5] = tempWing[x][y][3];
//				
//			}
//		}
	///////////////////////////////	
 			for (x = 1;x<=dimen;x++){
				tempWing[x] = [];
					tempWing[x][1] = arrayCubeSolve[aD[0]][sW][x][3];
					tempWing[x][2] = arrayCubeSolve[aD[0]][sW][x][4];
					tempWing[x][3] = arrayCubeSolve[aD[0]][sW][x][5];

			}

		for (z = 0;z<rD.length-1;z++){
			for (x = 1;x<=dimen;x++){
					arrayCubeSolve[aD[z]][sW][x][3]=arrayCubeSolve[aD[z+1]][sW][x][3];
					arrayCubeSolve[aD[z]][sW][x][4]=arrayCubeSolve[aD[z+1]][sW][x][4];
					arrayCubeSolve[aD[z]][sW][x][5]=arrayCubeSolve[aD[z+1]][sW][x][5];
			}
		}
		for (x = 1;x<=dimen;x++){
					arrayCubeSolve[aD[3]][sW][x][3]=tempWing[x][1];
					arrayCubeSolve[aD[3]][sW][x][4]=tempWing[x][2];
					arrayCubeSolve[aD[3]][sW][x][5]=tempWing[x][3];
			}
//			
//			
//			
//	///inverse facelet double
//		for (x = dimen,xT = 1;x>=1;xT++,x--){
//			tempWing[xT] = [];
//			for (y=dimen,yT = 1;y>=1;yT++,y--){
//				tempWing[xT][yT] = [];
//				tempWing[xT][yT][1] =arrayCubeSolve[3][x][y][3];
//				tempWing[xT][yT][2] =arrayCubeSolve[3][x][y][4];
//				tempWing[xT][yT][3] =arrayCubeSolve[3][x][y][5];
//			}
//		}
//		for(x =1;x<=dimen;x++){
//			for (y=1;y<=dimen;y++){
//				arrayCubeSolve[3][x][y][3] = tempWing[x][y][1];
//				arrayCubeSolve[3][x][y][4] = tempWing[x][y][2];
//				arrayCubeSolve[3][x][y][5] = tempWing[x][y][3];
//				
//			}
//		}
arrayCubeSolve = transposeMatrixSolve(arrayCubeSolve,3);
	///////////////////////////////	
}


 	




// //printCube();





//-------------------------------------Filter Permutation-----------------------------//
//yAxisMatrixSolve(3,rD);
//xAxisMatrixSolve(1,uD);
//zAxisMatrixSolve(1,fD);

function execMoveSolve(alg){
	//var alg = document.getElementById('inputAlg').value
	//alert(alg);
	switch(alg){
	
		case 'M':
			if (dimen%2 == 1)
			yAxisMatrixSolve(Math.round(dimen/2),rDp);
			//printCube();
			break;
				case 'M2':
						if (dimen%2 == 1){
					yAxisMatrixSolve(Math.round(dimen/2),rDp);
					yAxisMatrixSolve(Math.round(dimen/2),rDp);
						}
					//printCube();
					break;
		case 'Mp':
				if (dimen%2 == 1)
			yAxisMatrixSolve(Math.round(dimen/2),rD);
			//printCube();
			break;

		case 'E':
				if (dimen%2 == 1)
			xAxisMatrixSolve(Math.round(dimen/2),uDp);
			//printCube();
			break;
				case 'E2':
				if (dimen%2 == 1){
					xAxisMatrixSolve(Math.round(dimen/2),uDp);
					xAxisMatrixSolve(Math.round(dimen/2),uDp);
				}
					//printCube();
					break;
		case 'Ep':
			if (dimen%2 == 1)
			xAxisMatrixSolve(Math.round(dimen/2),uD);
			//printCube();
			break;

		case 'S':
			if (dimen%2 == 1)
			zAxisMatrixSolve(Math.round(dimen/2),fD);
		
			//printCube();
			break;
				case 'S2':
				if (dimen%2 == 1){
					zAxisMatrixSolve(Math.round(dimen/2),fD);
					zAxisMatrixSolve(Math.round(dimen/2),fD);
				}
					//printCube();
			break;
		case 'Sp':
			if (dimen%2 == 1)
			zAxisMatrixSolve(Math.round(dimen/2),fDp);
			//printCube();
			break;




		case 'R':
			yAxisMatrixSolve(dimen,rD);
			rotateMatrix(arrayCubeSolve,5);
			//printCube();
			break;
				case 'R2':
					yAxisMatrixSolve(dimen,rD);
					rotateMatrix(arrayCubeSolve,5);
					yAxisMatrixSolve(dimen,rD);
					rotateMatrix(arrayCubeSolve,5);
					//printCube();
					break;
		case 'Rp':
			yAxisMatrixSolve(dimen,rDp);
			rotateMatrixP(arrayCubeSolve,5);
			//printCube();
			break;
		



		case 'L':
			yAxisMatrixSolve(1,rDp);
			rotateMatrix(arrayCubeSolve,4);
			//printCube();	
			break;
				case 'L2':
					yAxisMatrixSolve(1,rDp);
					rotateMatrix(arrayCubeSolve,4);
					yAxisMatrixSolve(1,rDp);
					rotateMatrix(arrayCubeSolve,4);
					//printCube();	
					break;

		case 'Lp':
			yAxisMatrixSolve(1,rD);
			rotateMatrixP(arrayCubeSolve,4);
			//printCube();
			break;
		case 'U':
			xAxisMatrixSolve(1,uD);
			rotateMatrix(arrayCubeSolve,0);
			//printCube();
			break;
				case 'U2':
					xAxisMatrixSolve(1,uD);
					rotateMatrix(arrayCubeSolve,0);
					xAxisMatrixSolve(1,uD);
					rotateMatrix(arrayCubeSolve,0);
					//printCube();
					break;	
		case 'Up':
			xAxisMatrixSolve(1,uDp);
			rotateMatrixP(arrayCubeSolve,0);
			//printCube();
			break;
		case 'D':
			xAxisMatrixSolve(dimen,uDp);
			rotateMatrix(arrayCubeSolve,2);
			//printCube();
			break;
				case 'D2':
					xAxisMatrixSolve(dimen,uDp);
					rotateMatrix(arrayCubeSolve,2);
					xAxisMatrixSolve(dimen,uDp);
					rotateMatrix(arrayCubeSolve,2);
					//printCube();
					break;
		case 'Dp':
			xAxisMatrixSolve(dimen,uD);
			rotateMatrixP(arrayCubeSolve,2);
			//printCube();
			break;
		case 'F':
			zAxisMatrixSolve(dimen,fD);
			rotateMatrix(arrayCubeSolve,1);
			//printCube();
			break;
				case 'F2':
					zAxisMatrixSolve(dimen,fD);
					rotateMatrix(arrayCubeSolve,1);
					zAxisMatrixSolve(dimen,fD);
					rotateMatrix(arrayCubeSolve,1);
					//printCube();
			break;
		case 'Fp':
			zAxisMatrixSolve(dimen,fDp);
			rotateMatrixP(arrayCubeSolve,1);
			//printCube();
			break;
		case 'B':
			zAxisMatrixSolve(1,fDp);
			rotateMatrix(arrayCubeSolve,3);
			//printCube();
			break;
				case 'B2':
					zAxisMatrixSolve(1,fDp);
					rotateMatrix(arrayCubeSolve,3);
					zAxisMatrixSolve(1,fDp);
					rotateMatrix(arrayCubeSolve,3);
					//printCube();
					break;
		case 'Bp':
			zAxisMatrixSolve(1,fD);
			rotateMatrixP(arrayCubeSolve,3);
			//printCube();
			break;

		case 'y':
			for (var i=1;i<=dimen;i++){
				xAxisMatrixSolve(i,uD);
			}
			rotateMatrix(arrayCubeSolve,0);
			rotateMatrixP(arrayCubeSolve,2);
			break;
				case 'y2':
					for (var i=1;i<=dimen;i++){
						xAxisMatrixSolve(i,uD);
					}
					rotateMatrix(arrayCubeSolve,0);
					rotateMatrixP(arrayCubeSolve,2);

					for (var i=1;i<=dimen;i++){
						xAxisMatrixSolve(i,uD);
					}
					rotateMatrix(arrayCubeSolve,0);
					rotateMatrixP(arrayCubeSolve,2);
				break;
		case 'yp':
			for (var i=1;i<=dimen;i++){
				xAxisMatrixSolve(i,uDp);
			}
			rotateMatrixP(arrayCubeSolve,0);
			rotateMatrix(arrayCubeSolve,2);
			break;

		case 'x':
			for (var i=1;i<=dimen;i++){
				yAxisMatrixSolve(i,rD);
			}
			rotateMatrix(arrayCubeSolve,5);
			rotateMatrixP(arrayCubeSolve,4);
			break;
				case 'x2':
					for (var i=1;i<=dimen;i++){
						yAxisMatrixSolve(i,rD);
					}
					rotateMatrix(arrayCubeSolve,5);
					rotateMatrixP(arrayCubeSolve,4);

					for (var i=1;i<=dimen;i++){
						yAxisMatrixSolve(i,rD);
					}
					rotateMatrix(arrayCubeSolve,5);
					rotateMatrixP(arrayCubeSolve,4);
				break;
		case 'xp':
			for (var i=1;i<=dimen;i++){
				yAxisMatrixSolve(i,rDp);
			}
			rotateMatrixP(arrayCubeSolve,5);
			rotateMatrix(arrayCubeSolve,4);
			break;

		case 'z':
			for (var i=1;i<=dimen;i++){
				zAxisMatrixSolve(i,fD);
			}
			rotateMatrix(arrayCubeSolve,1);
			rotateMatrixP(arrayCubeSolve,3);
			break;
				case 'z2':
					for (var i=1;i<=dimen;i++){
						zAxisMatrixSolve(i,fD);
					}
					rotateMatrix(arrayCubeSolve,1);
					rotateMatrixP(arrayCubeSolve,3);
					
					for (var i=1;i<=dimen;i++){
						zAxisMatrixSolve(i,fD);
					}
					rotateMatrix(arrayCubeSolve,1);
					rotateMatrixP(arrayCubeSolve,3);
				break;
		case 'zp':
		for (var i=1;i<=dimen;i++){
			zAxisMatrixSolve(i,fDp);
		}
		rotateMatrixP(arrayCubeSolve,1);
		rotateMatrix(arrayCubeSolve,3);
		break;	
	}
}


// execPermSolve('R');
// printCube();

function printCube(){
	// tpad.innerHTML = '';
	var colorMatrixSolve = [];
	var h = 0;
	// tpad.innerHTML = '';

for (var z = 0;z<dimenLet.length;z++){
	colorMatrixSolve[z]=[];
	h=0;
	for (var x = 1;x<=dimen;x++){
		for (var y=1;y<=dimen;y++){
			
			// tpad.innerHTML += arrayCubeSolve[z][x][y][0] + ' ' +
			// 				  arrayCubeSolve[z][x][y][1] + ' ' +
			// 				  arrayCubeSolve[z][x][y][2] + ' ' + ':::'+
			// 				  arrayCubeSolve[z][x][y][3] + ' ' +
			// 				  arrayCubeSolve[z][x][y][4] + ' ' +
			// 				  arrayCubeSolve[z][x][y][5] + ' ' +
			// 				   '------';	
			colorMatrixSolve[z][h] = arrayCubeSolve[z][x][y][3];
			h++;
		} 
			// tpad.innerHTML+='<br>';
		}
	// tpad.innerHTML+='<br>';
  }
  // tpad.innerHTML+='<br>';

// alert('gumagana ba');
  //tpad.innerHTML+='hi';
  		var checkIfSolve =true;
  	

		for (var x=0;x<colorMatrixSolve.length;x++){
			if (!allAreEqual(colorMatrixSolve[x])){
				// console.log('c = ' + colorMatrixSolve[x]);
				checkIfSolve = false; 
			} 
		}
			// console.log('cube 1 is ' + checkIfSolve);
			// console.log('checkIfSolve ' + checkIfSolve);
			if (checkIfSolve){
					// console.log('true');
					return true;
				}else{
					// console.log('false');
					return false;
				}

}

function allAreEqual(array){
    if(!array.length) return true;
    // I also made sure it works with [false, false] array
    return array.reduce(function(a, b){return (a === b)?a:(!b);}) === array[0];
}
function execPermSolve(str){

	
		//reset first
		for (var z = 0;z<dimenLet.length;z++){
	arrayCubeSolve[z]=[];
			
			for (x = 1;x<=dimen;x++){
				arrayCubeSolve[z][x]=[];
				for (y=1;y<=dimen;y++){
					arrayCubeSolve[z][x][y] = [];
					arrayCubeSolve[z][x][y][0]=dimenLet[z];
					arrayCubeSolve[z][x][y][1]=x;
					arrayCubeSolve[z][x][y][2]=y;
					arrayCubeSolve[z][x][y][3]=dimenLet[z];
					arrayCubeSolve[z][x][y][4]=x;
					arrayCubeSolve[z][x][y][5]=y;
				}
				
			}
			
		}


		str = str.replace(/  +/g, ' ');
		str = str.replace(/'/g, 'p');
		var str_array = str.split(' ');
		for(var i = 0; i < str_array.length; i++) {
		   str_array[i] = str_array[i].replace(/^\s*/, "").replace(/\s*$/, "");
		   execMoveSolve(str_array[i]);

		}
		// console.log(printCube());
		// console.log(arrayCubeSolve[0][1][1][3]);
}


function execCornerBufferAlg(str){
	var completeCheck=0;	
	execPermSolve(str);
	for(var z=1;completeCheck==0;){


	var cornerBuffer = arrayCubeSolve[0][1][1][3] + '' + arrayCubeSolve[0][1][1][4] + '' + arrayCubeSolve[0][1][1][5];
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
			execPermSolve(str);
	}
	console.log(cornerSolution);
	console.log('z='+z);
	if (z%2==0){
		console.log('parity');
		//"R D' R U' R' U' R U R' F' R U R' U' R' F R D R'"
		//execPermSolve("R D' " + concatPerm + " D R'");
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
if (dimen ==3){
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
else if (dimen == 2){
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
			
	
	var edgeBuffer = arrayCubeSolve[2][1][2][3] + '' + arrayCubeSolve[2][1][2][4] + '' + arrayCubeSolve[2][1][2][5];
	

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
	


			console.log(edgeLetter);
			str = edgeAlg;
		edgeSolution+=edgeAlg + " ";
		execPermSolve(str);
	}
	console.log(edgeSolution);
	


}

function simulateIfSolve(data){

			// data = "R";
			// alert('testing')
		// dimen = cDimen;
		 initMatrix();
	     allMovesP1Solve = data;
         execPermSolve(allMovesP1Solve);
		         
         return printCube();
}

this.isSolve = function(data){
	return simulateIfSolve(data);
}






// this.isSolve = function(data){
// 	return simulateIfSolve(data);
// }

// define([], function() {
// 	return {
// 	  //   testing: function() {

// 	  //    	console.log('hi testing');
// 		 // }
// 		 isSolve: function(data){
// 		 	return simulateIfSolve(data);
// 		 }
// 	}
// });


var doSomething = (function () {
  "use strict";
   return {
      // test: (function () {
      //   return simulateIfSolve("R");
      // })()
      // ,
      test: (function (data) {
        return simulateIfSolve(data);
        // return data;
      })
   };
}());
