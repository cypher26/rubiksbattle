
	// var tpad = document.getElementById('tpad');
	var dimen = 3;
	var arrayCube =[];
	
	var dimenLet = ['U','F','D','B','L','R'];
matrixInit();
function matrixInit(){
	for (z = 0;z<dimenLet.length;z++){
		arrayCube[z]=[];
		
		for (x = 1;x<=dimen;x++){
			arrayCube[z][x]=[];
			for (y=1;y<=dimen;y++){
				arrayCube[z][x][y] = [];
				arrayCube[z][x][y][0]=dimenLet[z];
				arrayCube[z][x][y][1]=x;
				arrayCube[z][x][y][2]=y;
				arrayCube[z][x][y][3]=dimenLet[z];
				arrayCube[z][x][y][4]=x;
				arrayCube[z][x][y][5]=y;
				
				
				
			}
			
		}

		
		
	}
}
// tpad.innerHTML+='<br>';



var rD = [0,1,2,3]; //Direction
var rDp = [3,2,1,0];
var uD = [4,1,5,3];
var uDp = [3,5,1,4];
var fDp = [0,5,2,4];
var fD = [4,2,5,0];
//yAxisMatrix(3,rD);
function yAxisMatrix(sW,aD){ //y axis width
	tempWing=[];
		for (x = 1;x<=dimen;x++){
				tempWing[x] = [];
					tempWing[x][1] = arrayCube[aD[0]][x][sW][3];
					tempWing[x][2] = arrayCube[aD[0]][x][sW][4];
					tempWing[x][3] = arrayCube[aD[0]][x][sW][5];
			}
		for (z = 0;z<rD.length-1;z++){
			for (x = 1;x<=dimen;x++){
					arrayCube[aD[z]][x][sW][3]=arrayCube[aD[z+1]][x][sW][3];
					arrayCube[aD[z]][x][sW][4]=arrayCube[aD[z+1]][x][sW][4];
					arrayCube[aD[z]][x][sW][5]=arrayCube[aD[z+1]][x][sW][5];
			}
		}
		for (x = 1;x<=dimen;x++){
					arrayCube[aD[3]][x][sW][3]=tempWing[x][1];
					arrayCube[aD[3]][x][sW][4]=tempWing[x][2];
					arrayCube[aD[3]][x][sW][5]=tempWing[x][3];
			}
}
//xAxisMatrix(1,uD);
function transposeMatrix(tempArray,cT){
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
//zAxisMatrix(1,fD);
function zAxisMatrix(sW,aD){ 
tempWing = [];
	arrayCube = transposeMatrix(arrayCube,5);
	arrayCube = rotateMatrix(arrayCube,5);
	arrayCube = rotateMatrix(arrayCube,2);
	arrayCube = rotateMatrix(arrayCube,2);
	arrayCube = rotateMatrix(arrayCube,4);
		for (x = 1;x<=dimen;x++){
				tempWing[x] = [];
					tempWing[x][1] = arrayCube[aD[0]][sW][x][3];
					tempWing[x][2] = arrayCube[aD[0]][sW][x][4];
					tempWing[x][3] = arrayCube[aD[0]][sW][x][5];

			}

		for (z = 0;z<rD.length-1;z++){
			for (x = 1;x<=dimen;x++){
					arrayCube[aD[z]][sW][x][3]=arrayCube[aD[z+1]][sW][x][3];
					arrayCube[aD[z]][sW][x][4]=arrayCube[aD[z+1]][sW][x][4];
					arrayCube[aD[z]][sW][x][5]=arrayCube[aD[z+1]][sW][x][5];
			}
		}
		for (x = 1;x<=dimen;x++){
					arrayCube[aD[3]][sW][x][3]=tempWing[x][1];
					arrayCube[aD[3]][sW][x][4]=tempWing[x][2];
					arrayCube[aD[3]][sW][x][5]=tempWing[x][3];
			}

	arrayCube = transposeMatrix(arrayCube,5);
	arrayCube = rotateMatrixP(arrayCube,5);
	arrayCube = rotateMatrix(arrayCube,2);
	arrayCube = rotateMatrix(arrayCube,2);
	arrayCube = rotateMatrixP(arrayCube,4);

}
//xAxisMatrix(1,uD);

function xAxisMatrix(sW,aD){ //y axis width
	//tempWing= [];

//arrayCube = transposeMatrix(arrayCube);
arrayCube = transposeMatrix(arrayCube,3);
	///inverse facelet double
		//for (x = dimen,xT = 1;x>=1;xT++,x--){
//			tempWing[xT] = [];
//			for (y=dimen,yT = 1;y>=1;yT++,y--){
//				tempWing[xT][yT] = [];
//				tempWing[xT][yT][1] =arrayCube[3][x][y][3];
//				tempWing[xT][yT][2] =arrayCube[3][x][y][4];
//				tempWing[xT][yT][3] =arrayCube[3][x][y][5];
//			}
//		}
//		for(x =1;x<=dimen;x++){
//			for (y=1;y<=dimen;y++){
//				arrayCube[3][x][y][3] = tempWing[x][y][1];
//				arrayCube[3][x][y][4] = tempWing[x][y][2];
//				arrayCube[3][x][y][5] = tempWing[x][y][3];
//				
//			}
//		}
	///////////////////////////////	
 			for (x = 1;x<=dimen;x++){
				tempWing[x] = [];
					tempWing[x][1] = arrayCube[aD[0]][sW][x][3];
					tempWing[x][2] = arrayCube[aD[0]][sW][x][4];
					tempWing[x][3] = arrayCube[aD[0]][sW][x][5];

			}

		for (z = 0;z<rD.length-1;z++){
			for (x = 1;x<=dimen;x++){
					arrayCube[aD[z]][sW][x][3]=arrayCube[aD[z+1]][sW][x][3];
					arrayCube[aD[z]][sW][x][4]=arrayCube[aD[z+1]][sW][x][4];
					arrayCube[aD[z]][sW][x][5]=arrayCube[aD[z+1]][sW][x][5];
			}
		}
		for (x = 1;x<=dimen;x++){
					arrayCube[aD[3]][sW][x][3]=tempWing[x][1];
					arrayCube[aD[3]][sW][x][4]=tempWing[x][2];
					arrayCube[aD[3]][sW][x][5]=tempWing[x][3];
			}
//			
//			
//			
//	///inverse facelet double
//		for (x = dimen,xT = 1;x>=1;xT++,x--){
//			tempWing[xT] = [];
//			for (y=dimen,yT = 1;y>=1;yT++,y--){
//				tempWing[xT][yT] = [];
//				tempWing[xT][yT][1] =arrayCube[3][x][y][3];
//				tempWing[xT][yT][2] =arrayCube[3][x][y][4];
//				tempWing[xT][yT][3] =arrayCube[3][x][y][5];
//			}
//		}
//		for(x =1;x<=dimen;x++){
//			for (y=1;y<=dimen;y++){
//				arrayCube[3][x][y][3] = tempWing[x][y][1];
//				arrayCube[3][x][y][4] = tempWing[x][y][2];
//				arrayCube[3][x][y][5] = tempWing[x][y][3];
//				
//			}
//		}
arrayCube = transposeMatrix(arrayCube,3);
	///////////////////////////////	
}


 	




// printArrayCube();





//-------------------------------------Filter Permutation-----------------------------//
//yAxisMatrix(3,rD);
//xAxisMatrix(1,uD);
//zAxisMatrix(1,fD);

function execMove(alg){
	//var alg = document.getElementById('inputAlg').value
	//alert(alg);
	switch(alg){
		case 'M':
			yAxisMatrix(2,rDp);
			// printArrayCube();
			break;
				case 'M2':
					yAxisMatrix(2,rDp);
					yAxisMatrix(2,rDp);
					// printArrayCube();
					break;
		case 'Mp':
			yAxisMatrix(2,rD);
			// printArrayCube();
			break;
		case 'R':
			yAxisMatrix(3,rD);
			rotateMatrix(arrayCube,5);
			// printArrayCube();
			break;
				case 'R2':
					yAxisMatrix(3,rD);
					rotateMatrix(arrayCube,5);
					yAxisMatrix(3,rD);
					rotateMatrix(arrayCube,5);
					// printArrayCube();
					break;
		case 'Rp':
			yAxisMatrix(3,rDp);
			rotateMatrixP(arrayCube,5);
			// printArrayCube();
			break;
		
		case 'L':
			yAxisMatrix(1,rDp);
			rotateMatrix(arrayCube,4);
			// printArrayCube();	
			break;
				case 'L2':
					yAxisMatrix(1,rDp);
					rotateMatrix(arrayCube,4);
					yAxisMatrix(1,rDp);
					rotateMatrix(arrayCube,4);
					// printArrayCube();	
					break;

		case 'Lp':
			yAxisMatrix(1,rD);
			rotateMatrixP(arrayCube,4);
			// printArrayCube();
			break;
		case 'U':
			xAxisMatrix(1,uD);
			rotateMatrix(arrayCube,0);
			// printArrayCube();
			break;
				case 'U2':
					xAxisMatrix(1,uD);
					rotateMatrix(arrayCube,0);
					xAxisMatrix(1,uD);
					rotateMatrix(arrayCube,0);
					// printArrayCube();
					break;	
		case 'Up':
			xAxisMatrix(1,uDp);
			rotateMatrixP(arrayCube,0);
			// printArrayCube();
			break;
		case 'D':
			xAxisMatrix(3,uDp);
			rotateMatrix(arrayCube,2);
			// printArrayCube();
			break;
				case 'D2':
					xAxisMatrix(3,uDp);
					rotateMatrix(arrayCube,2);
					xAxisMatrix(3,uDp);
					rotateMatrix(arrayCube,2);
					// printArrayCube();
					break;
		case 'Dp':
			xAxisMatrix(3,uD);
			rotateMatrixP(arrayCube,2);
			// printArrayCube();
			break;
		case 'F':
			zAxisMatrix(3,fD);
			rotateMatrix(arrayCube,1);
			// printArrayCube();
			break;
				case 'F2':
					zAxisMatrix(3,fD);
					rotateMatrix(arrayCube,1);
					zAxisMatrix(3,fD);
					rotateMatrix(arrayCube,1);
					// printArrayCube();
			break;
		case 'Fp':
			zAxisMatrix(3,fDp);
			rotateMatrixP(arrayCube,1);
			// printArrayCube();
			break;
		case 'B':
			zAxisMatrix(1,fDp);
			rotateMatrix(arrayCube,3);
			// printArrayCube();
			break;
				case 'B2':
					zAxisMatrix(1,fDp);
					rotateMatrix(arrayCube,3);
					zAxisMatrix(1,fDp);
					rotateMatrix(arrayCube,3);
					// printArrayCube();
					break;
		case 'Bp':
			zAxisMatrix(1,fD);
			rotateMatrixP(arrayCube,3);
			// printArrayCube();
			break;
	}
}



function printArrayCube(){
	// tpad.innerHTML = '';
for (z = 0;z<dimenLet.length;z++){
	for (x = 1;x<=dimen;x++){
		for (y=1;y<=dimen;y++){
			tpad.innerHTML += arrayCube[z][x][y][0] + ' ' +
							  arrayCube[z][x][y][1] + ' ' +
							  arrayCube[z][x][y][2] + ' ' + ':::'+
							  arrayCube[z][x][y][3] + ' ' +
							  arrayCube[z][x][y][4] + ' ' +
							  arrayCube[z][x][y][5] + ' ' +
							   '------';	
		} 
			tpad.innerHTML+='<br>';
		}
	tpad.innerHTML+='<br>';
  }
  tpad.innerHTML+='<br>';

  //tpad.innerHTML+='hi';
}
function execPerm(str){
		
		str = str.replace(/  +/g, ' ');
		str = str.replace(/'/g, 'p');
		var str_array = str.split(' ');
		for(var i = 0; i < str_array.length; i++) {
		   str_array[i] = str_array[i].replace(/^\s*/, "").replace(/\s*$/, "");
		   execMove(str_array[i]);

		}
}


function execCornerBufferAlg(str){
	parity=false;
	matrixInit();
	cornerSolution = '';
	for (x=0;x<8;x++){
	cornerCheck[x]=0;
	}
	var completeCheck=0;	
	execPerm(str);
	for(var z=1;completeCheck==0;){


	var cornerBuffer = arrayCube[0][1][1][3] + '' + arrayCube[0][1][1][4] + '' + arrayCube[0][1][1][5];
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
							// console.log('finish');
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

	
	 	
			// console.log(cornerLetter);
			str = cornerAlg;
			cornerSolution+=cornerAlg + " ";
			execPerm(str);
	}
	// alert(cornerSolution);

	// console.log('z='+z);
	// console.log('z='+z);
	if (z%2==0){
		parity = true;
		execPerm(cornerArray[3][2]);
		cornerSolution+=cornerArray[3][2] + " ";
		
	}
		return cornerSolution;

}

///---------------corner----------------
var cornerSolution='';
var corner=['ARE','BNQ','CJM','DIF','PKV','GLU','XHS','OTW'];
var cornerCheck=[];
var cornerLetter,cornerAlg;
var parity;
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
	edgeSolution = '';
	for (x=0;x<edge.length;x++){
	edgeCheck[x]=0;
	}
	var completeCheck=0;
	//completeCheck==0
	for (var z=1;completeCheck==0;z++){
			
	
	var edgeBuffer = arrayCube[2][1][2][3] + '' + arrayCube[2][1][2][4] + '' + arrayCube[2][1][2][5];
	

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
	  				specialCase:
					for (var x=0;x<edge.length;x++){
						for (var y=0;y<2;y++){
							switch (edgeLetter){
								case 'K':
								case 'U':
									if (completeCheck==1){
										//end loop
										// console.log('finish');
										break;
									}
									else{
										for (i=1;i<edge.length;i++){
											if (edgeCheck[i]==0){
													edgeLetter = edge[i].charAt(0);
													console.log('edge = ' + edgeLetter);
													if ( (z%2 == 0 && edgeLetter == 'C')){ edgeLetter='W';
													  	for (var x=0;x<edgeArray.length;x++){
													  		if (edgeLetter == edgeArray[x][1]){
																edgeAlg = edgeArray[x][2]; edgeCheck[3]=1; break specialCase; } } }
													else if ( (z%2 == 0 && edgeLetter == 'W')){ edgeLetter='C';
													  	for (var x=0;x<edgeArray.length;x++){
													  		if (edgeLetter == edgeArray[x][1]){
																edgeAlg = edgeArray[x][2]; edgeCheck[9]=1; break specialCase; } } }
													else if ( (z%2 == 0 && edgeLetter == 'I')){ edgeLetter='S';
													  	for (var x=0;x<edgeArray.length;x++){
													  		if (edgeLetter == edgeArray[x][1]){
																edgeAlg = edgeArray[x][2]; edgeCheck[3]=1; break specialCase; } } }

													else if ( (z%2 == 0 && edgeLetter == 'S')){ edgeLetter='I';
													  	for (var x=0;x<edgeArray.length;x++){
													  		if (edgeLetter == edgeArray[x][1]){
																edgeAlg = edgeArray[x][2]; edgeCheck[9]=1; break specialCase; } } }
													else{
														for (i=0;i<edgeArray.length;i++){
															  		if (edgeLetter == edgeArray[i][1]){
															  			edgeAlg=edgeArray[i][2];
															  			break;
																  	}
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

	


			// console.log(edgeLetter);
			str = edgeAlg;
		edgeSolution+=edgeAlg + " ";
		execPerm(str);
	}
	if (parity){
		edgeSolution+="M2 y L2 R U R' U' R' F R2 U' R' U' R U R' F' L2 ";
		// execPerm("M2 y L2 R U R' U' R' F R2 U' R' U' R U R' F' L2 ");
	}
	return edgeSolution;
	// console.log(edgeSolution);
	

	//execMove('');
}

this.solve=function (scramble)
{
    return  execCornerBufferAlg(scramble) + execEdgeBufferAlg('');
}


// console.log(cornerCheck[0]);
// </script>
// <input type='text' placeholder='sample' id='inputAlg'></input>
// <button onClick="execCornerBufferAlg(document.getElementById('inputAlg').value);">Corner</button>
// <button onClick="execPerm(document.getElementById('inputAlg').value);">Move</button>
// <button onClick="execEdgeBufferAlg('');">Edge</button>

// </body>
// </html>