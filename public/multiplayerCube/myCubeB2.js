
	var cube1,renderer1,camera1,scene1,dimension1,controls1,raf1,tiles1;
	 var leftSide1,rightSide1,frontSide1,backSide1,downSide1,upSide1;
	var pivot1,cmp1;
	var degree1;
	var solidPos1;
	var geometry1, material1, m1, solidC1;
	var letterA,textGeometry,textMaterial;

	var rafAnimate1;
	var dimension1 = 3;
	var speed1 = 50;
	var delayTime1=0;

		var primaryLogo1,lpu1;
 	//canvas
 	var container1 = document.createElement( 'div' );
 
 
	



	// renderer1 = new THREE.WebGLRenderer();
	// renderer1.setSize( document.getElementById("player2").offsetWidth, document.getElementById("player2").offsetHeight);
	
	// renderer1.setClearColor( 0xbdbdbd, 1);
	

	// material1 = new THREE.MeshBasicMaterial( {  transparent:false, opacity: 0.0,wireframe:false, color:0x000000  } );
	
	// camera1 = new THREE.PerspectiveCamera( 60, 1.66, 0.1, 1000 );


	// document.getElementById('player2').appendChild(renderer1.domElement);


	//   init1('0');
	 
	function init1(nw1){

		if (nw1 == '1'){
			// console.log('init1 = 1');
			for (var x =0;x<6;x++){
				for (var y = 0; y<(dimension1*dimension1);y++){
						scene1.remove(tiles1[x][y]);
							ff1.dispose();
						
				}
			}
			for (var x=0;x<dimension1;x++){
				for (var y = 0;y<(dimension1*dimension1);y++){
					scene1.remove(solidC1[x][y]);
					geometry1.dispose();
					material1.dispose();
						
				}
			}
			// lpu1.remove(primaryLogo1);
			// scene1.remove(lpu1);
		}


	scene1= new THREE.Scene();
	
	
	geometry1 = new THREE.BoxGeometry( 2, 2, 2 );

	// material1 = new THREE.MeshBasicMaterial( {  transparent:true, opacity: 0.0  } );
	// m1 = new THREE.MeshBasicMaterial( { wireframeLinewidth:51,color: 0xFF00FF, } );

	degree1 = Math.PI/180;


	ff1 = new THREE.PlaneGeometry( 1.7, 1.7);


		// imgPrimary1 = new THREE.ImageUtils.loadTexture('img/primaryLogo.png'); 
	 //    imgLpu1 = new THREE.ImageUtils.loadTexture('img/lpu.png'); 

	 // 	primaryLogo1 =   new THREE.Mesh( new THREE.PlaneGeometry( 5.0, 5.0),new THREE.MeshBasicMaterial( { map: imgPrimary1, alphaTest:0.5} ));
		// lpu1 =   new THREE.Mesh( new THREE.PlaneGeometry( 5.0, 5.0),new THREE.MeshBasicMaterial( { map: imgLpu1 , alphaTest:0.5} ));

		// scene1.add(lpu1);

		// lpu1.add(primaryLogo1);
		// lpu1.position.y =10.0;

		// primaryLogo1.position.z -=0.1;
		
		// primaryLogo1.rotation.y += 180*degree;

	
	init1Cam1();

	solidC1=[];
	solidPos1=[];
	
	
		ad1 = dimension1-1;
	
	
	yPos1=ad1; //c
	xPos1=-ad1;//
	zPos1=-ad1;//
	for (x=0;x<dimension1;x++){
		solidC1.push([]);
		solidPos1.push([]);
		for (y = 0;y<(dimension1*dimension1);y++){
			solidC1[x].push(new THREE.Mesh(geometry1,material1)); 
		   	solidPos1[x].push([]);
		  // 		objects.push( solidC1[x][y]);
			solidPos1[x][y][0] = x;
			solidPos1[x][y][1] = y;
		
			if (y==0 && x==0){
		    solidC1[x][y].position.x = xPos1;
			solidC1[x][y].position.y = yPos1;
			solidC1[x][y].position.z = zPos1;
			}
			else if((y%dimension1==0) && !(y==0)){
			zPos1+=2;
			xPos1=-ad1;//
			solidC1[x][y].position.x=xPos1;
			solidC1[x][y].position.y=yPos1;
			solidC1[x][y].position.z=zPos1;
			}
			else if((x>0) && (y==0)){
			yPos1-=2;
			xPos1=-ad1;//
			zPos1=-ad1;//
			solidC1[x][y].position.x=xPos1;
			solidC1[x][y].position.y=yPos1;
			solidC1[x][y].position.z=zPos1;	
			}
			else{
				xPos1+=2;
			solidC1[x][y].position.x=xPos1;
			solidC1[x][y].position.y=yPos1;
			solidC1[x][y].position.z=zPos1;	
			}
			
			
			scene1.add(solidC1[x][y]);

	
		//	console.log("x = " + x + " y = " + y + " position.y = " + solidC1[x][y].position.x);
		}
	}
	
	//end block

	


//start tiles1
	changeColor1();
	
//	ad -=2;
	var color1="";
	ad1-=dimension1-1;
	var xInc1=(dimension1-1)*-2;

	  var xTileInc = 0;
	  var yTileInc = 0;
	  var yTile5Inc = (dimension1-1)*dimension1;
	 tiles1 = [];
	for (x =0;x<6;x++){
		tiles1.push([]);
		switch (x){
			case 0:
				xInc1=-ad1;
				zInc1=-ad1;
				yInc1=ad1 +1.1;
				xDeg1=90*degree1;
				yDeg1=0;
				zDeg1=0;
			break;
			case 1:
				xInc1=-(ad1 +1.1);
				zInc1=-ad1;
				yInc1=ad1;
				xDeg1=0;
				yDeg1=90*degree1;
				zDeg1=0;
			break;
			case 2:
				xInc1=-ad1;
				zInc1=(ad1+1.1);
				yInc1=ad1;
				xDeg1=0;
				yDeg1=0;
				zDeg1=90*degree1;
			break;
			case 3:
				xInc1=(ad1+1.1);
				zInc1=-ad1;
				yInc1=ad1;
				xDeg1=0;
				yDeg1=90*degree1;
				zDeg1=0;
			
			break;
			case 4:
				xInc1=ad1;
				zInc1=-(ad1+1.1);
				yInc1=ad1;
				xDeg1=0;
				yDeg1=0;
				zDeg1=0;
			break;
			case 5:
				xInc1=-ad1;
				zInc1=ad1;
				yInc1=-(ad1+1.1);
				xDeg1=90*degree1;
				yDeg1=0;
				zDeg1=0;
			
			break;
				
			
		}
		for (var y = 0, xMatrix1 = 1, yMatrix1 = 1; y<(dimension1*dimension1);y++){
					switch (x){
						case 0:
						// color = upSide;
						switch(arrayCube1[0][xMatrix1][yMatrix1][3]){
							case 'U': color1=upSide1; break;
							case 'D': color1=downSide1; break;
							case 'L': color1=leftSide1; break;
							case 'R': color1=rightSide1; break;
							case 'F': color1=frontSide1; break;
							case 'B': color1=backSide1; break;
						}


						

								 if (!(y==0) && (y%(dimension1))==0){
									 //zInc+=1;
									 xInc1=-ad1;
								 }
						break;
						case 1:
						 //color = leftSide;
						switch(arrayCube1[4][xMatrix1][yMatrix1][3]){
							case 'U': color1=upSide1; break;
							case 'D': color1=downSide1; break;
							case 'L': color1=leftSide1; break;
							case 'R': color1=rightSide1; break;
							case 'F': color1=frontSide1; break;
							case 'B': color1=backSide1; break;
						}

								 if (!(y==0) && (y%(dimension1))==0){
									// yInc-=2;
									 zInc1=-ad1;
								 }
						break;
						case 2:
						// color = frontSide;
						switch(arrayCube1[1][xMatrix1][yMatrix1][3]){
							case 'U': color1=upSide1; break;
							case 'D': color1=downSide1; break;
							case 'L': color1=leftSide1; break;
							case 'R': color1=rightSide1; break;
							case 'F': color1=frontSide1; break;
							case 'B': color1=backSide1; break;
						}
								if (!(y==0) && (y%(dimension1))==0){
									// yInc-=2;
									 xInc1=-ad1;
								 }
						break;
						case 3:
						// color = rightSide;
						
						switch(arrayCube1[5][xMatrix1][((dimension1+1) -yMatrix1)][3]){
							case 'U': color1=upSide1; break;
							case 'D': color1=downSide1; break;
							case 'L': color1=leftSide1; break;
							case 'R': color1=rightSide1; break;
							case 'F': color1=frontSide1; break;
							case 'B': color1=backSide1; break;
						}

								if (!(y==0) && (y%(dimension1))==0){
									// yInc-=2;
									 zInc1=-ad1;
								 }
						break;
						case 4:
						// color = backSide;
						// console.log(((dimension1+1)-xMatrix1)  + " " + ((dimension1+1) -yMatrix1) );
						switch(arrayCube1[3][((dimension1+1)-xMatrix1)][((dimension1+1) -yMatrix1)][3]){
							case 'U': color1=upSide1; break;
							case 'D': color1=downSide1; break;
							case 'L': color1=leftSide1; break;
							case 'R': color1=rightSide1; break;
							case 'F': color1=frontSide1; break;
							case 'B': color1=backSide1; break;
						}
								if (!(y==0) && (y%(dimension1))==0){
									// yInc-=2;
									 xInc1=ad1;
								 }
						break;
						case 5:
						// color = downSide;
						switch(arrayCube1[2][xMatrix1][yMatrix1][3]){
							case 'U': color1=upSide1; break;
							case 'D': color1=downSide1; break;
							case 'L': color1=leftSide1; break;
							case 'R': color1=rightSide1; break;
							case 'F': color1=frontSide1; break;
							case 'B': color1=backSide1; break;
						}
								if (!(y==0) && (y%(dimension1))==0){
									// zInc-=2;
									 xInc1=-ad1;
								 }
						break;
					
					}
					yMatrix1++;
						if ((yMatrix1%(dimension1+1))==0){
							yMatrix1=1;
							xMatrix1++;

						}
	  		 tiles1[x].push(new THREE.Mesh( ff1,color1 ));
			  tiles1[x][y].position.z=zInc1;
			  tiles1[x][y].position.x=xInc1;	
			  tiles1[x][y].position.y=yInc1;
			  tiles1[x][y].rotation.x=xDeg1;
			  tiles1[x][y].rotation.y=yDeg1;
			  tiles1[x][y].rotation.z=zDeg1;
			  
	//tile assigning		
			 
			  if (x ==0){
				solidC1[xTileInc][yTileInc].add(tiles1[x][y]);  
				   yTileInc++;
				   
				   if (y==dimension1*dimension1-1){
					yTileInc=0;   
				   }
			  }
			    if (x == 1 ){
			
				 
				 solidC1[xTileInc][yTileInc].add(tiles1[x][y]);
				 yTileInc+=dimension1;
				 
				  if (yTileInc>(dimension1-1)*dimension1){
					  yTileInc=0;
					  xTileInc++;
				  } 
				 
			  }
			  if (xTileInc==dimension1 && yTileInc==0){
				
				xTileInc=0;
				yTileInc=(dimension1-1)*dimension1;  
			  }
		
			 if (x==2){
		  		solidC1[xTileInc][yTileInc].add(tiles1[x][y]);
				yTileInc++;
					if (yTileInc==(dimension1*dimension1)){
						yTileInc=(dimension1-1)*dimension1;
						xTileInc++;
					}
			 }
			 if (xTileInc==dimension1 && yTileInc==(dimension1-1)*dimension1){
			
				xTileInc=0;
				yTileInc=dimension1-1;
			  }
			  if (x ==3){
				solidC1[xTileInc][yTileInc].add(tiles1[x][y]);
				yTileInc+=dimension1;
					if (yTileInc>dimension1*dimension1){
						yTileInc=dimension1-1;
						xTileInc++;
					}
				  
			  }
			   if (xTileInc==dimension1 && yTileInc==dimension1-1){
				
				xTileInc=0;
				yTileInc=(dimension1-1);  
			  }
			  if (x==4){
				solidC1[xTileInc][yTileInc].add(tiles1[x][y]); 
				yTileInc--;
					if (yTileInc==-1){
						yTileInc=dimension1-1;
						xTileInc++;
					}
			  }
			  
			if (xTileInc==dimension1 && yTileInc==dimension1-1){
				
				xTileInc=dimension1-1;
				yTileInc=yTile5Inc;  
			  }
			  if (x==5){
				 solidC1[xTileInc][yTileInc].add(tiles1[x][y]);
				yTileInc++; 
				
					if ((yTileInc%dimension1) == 0){
						yTile5Inc-=dimension1;
						yTileInc=yTile5Inc;	
					}
				 	
			  }
			  
		
		//	 scene1.add(tiles1[x][y]);
			 
		
		
		}
	} //end tiles1
	//scene1.remove(solidC1[0][0]);
	
	//tiles1[0][1].material.color.setHex( 0xeeeeee);
	//solidC1[2][1].children[0].material.color.setHex(0xabceeee);
	renderer1.render( scene1, camera1 );
	// controls1 = new THREE.TrackballControls(camera1,renderer1.domElement);
	// controls1.addEventListener('change',trackCam1);
	}//compute blocks  //init1
		function changeColor1(){
	// leftSide1 = new THREE.MeshBasicMaterial( {color: 0xff8000 , side: THREE.DoubleSide} ); //leftSide
	// frontSide1 = new THREE.MeshBasicMaterial( {color:0x00ff00, side: THREE.DoubleSide} ); //leftSide
	// rightSide1 = new THREE.MeshBasicMaterial( {color:0xFF0033, side: THREE.DoubleSide} ); //leftSide
	// backSide1 = new THREE.MeshBasicMaterial( {color:0x0000ff, side: THREE.DoubleSide} ); //leftSide
	// downSide1 = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} ); //leftSide
	// upSide1 = new THREE.MeshBasicMaterial( {color:0xFFFFFF, side: THREE.DoubleSide} ); //leftSide


	leftSide1 = new THREE.MeshBasicMaterial( {color: 0xff8000 , side: THREE.DoubleSide} ); //leftSide
	frontSide1 = new THREE.MeshBasicMaterial( {color:0x00ff00, side: THREE.DoubleSide} ); //leftSide
	rightSide1 = new THREE.MeshBasicMaterial( {color:0xFF0033, side: THREE.DoubleSide} ); //leftSide
	backSide1 = new THREE.MeshBasicMaterial( {color:0x0000ff, side: THREE.DoubleSide} ); //leftSide
	downSide1 = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} ); //leftSide
	upSide1 = new THREE.MeshBasicMaterial( {color:0xFFFFFF, side: THREE.DoubleSide} ); //leftSide
}


		
	//trackball
	
	// solidC1[0][0].on('click', function()
	// 	{
	// 	    // response to click...
	// 	    alert('hi');
	// 	});
	
	//tiles1[0][0].material.color.setHex(0xeeff);
	
 // 	THREE.SceneUtils.detach(tiles1[0][0],solidC1[0][0],scene1);
    //tiles1[0][0].geometry.colorsNeedUpdate = true;

    //////////////////

//  	 var tryko = tiles1[0][0];
//  	 tryko.position.set(0,2,0);
//  	 tryko.material.color.setHex(0xeeeff);
// 	mesh.material.color.setHex(0xeeeff);
////////////////
	// scene1.children[1].children[0].material.color.setHex(0xeeeff);



	// renderer1.render( scene1, camera1 );
	
	//render1();
		function init1Cam1(){
			// document.getElementById('txtx').value = 6.826888528374662;
			// document.getElementById('txty').value = 4.683904919445453 ;
			// document.getElementById('txtz').value =7.769909726436357;
			
			camera1.position.x= 7.226525622389737;
			camera1.position.y= 6.164650291010791;
			camera1.position.z= 7.73261306595859;
			camera1.rotation.x= -0.6730479785136418;
			camera1.rotation.y= 0.6310664858727041;
			camera1.rotation.z= 0.4480982252579138;

	}
	function changeDimen1(){
			
			
			scene1= new THREE.Scene();
			renderer1.render(scene1,camera1);
			dimension1 = Number(document.getElementById("txtDimen").value);
			init1();
	}

	function trackCam1(){
		//camera1
		// document.getElementById('txtx').value = camera1.position.x;
		// document.getElementById('txty').value = camera1.position.y;
		// document.getElementById('txtz').value = camera1.position.z;
		// document.getElementById('txtRx').value = camera1.rotation.x;
		// document.getElementById('txtRy').value = camera1.rotation.y;
		// document.getElementById('txtRz').value = camera1.rotation.z;
		
		
		// camera1.position.x = document.getElementById('txtx').value;
		// camera1.position.y = document.getElementById('txty').value;
		// camera1.position.z = document.getElementById('txtz').value;
		
		// console.log("camera1.position.x=",camera1.position.x,";");
		// console.log("camera1.position.y=",camera1.position.y,";");
		// console.log("camera1.position.z=",camera1.position.z,";");
		// console.log("camera1.rotation.x=",camera1.rotation.x,";");
		// console.log("camera1.rotation.y=",camera1.rotation.y,";");
		// console.log("camera1.rotation.z=",camera1.rotation.z,";");
		//camera1

		renderer1.render( scene1, camera1 );
	}
	function disableCamera1(){
	//		document.getElementById("btnAdjust").className = "btn btn-info btn-sm";
	//	document.getElementById("btnCancelAdjust").className = "btn btn-info btn-sm disabled";
		cancelAnimationFrame(rafAnimate1);
	}
	//animation() //enable camera1

	function animation1(){


			// for (var x=0;x<dimension1;x++){
			
			// 	for (var y = 0;y<(dimension1*dimension1);y++){
						
						// solidC[x][y].position.setFromMatrixPosition( solidC1[x][y].matrixWorld ); //ok
						// solidC[x][y].setRotationFromMatrix(solidC1[x][y].matrixWorld); //ok

					//	socket.emit('updatePixels1',solidC1[x][y].matrixWorld);
						 
			// 	}	
			// }
		
	
		// solidC[0][0].position.setFromMatrixPosition( solidC1[0][0].matrixWorld ); //ok
		
		// 	solidC[0][0].setRotationFromMatrix(solidC1[0][0].matrixWorld);
		scene1.rotation.y +=0.0025;

		rafAnimate1 = requestAnimationFrame(animation1);
		renderer1.render(scene1,camera1);
		// controls1.update();

	}//trackball
	//////////////////////////////////////////////////////////////////////////////////////////////////
	
	var tempContX1,tempContY1,h1;
	var setFinish1=true;
	//var speed = 500-Number(slidSpeed);

	//var typeEasing = TWEEN.Easing.Circular.Out;
	var typeEasing = TWEEN.Easing.Linear.None;
	//speed = 800;
	function removeBlocksZ1(colsDeg,cols){
			for (x = 0;x<h1;x++){
					THREE.SceneUtils.detach(solidC1[tempContX1[x]][tempContY1[x]],pivot1,scene1);
				}
		}

	function getBlocksZ1(colsDeg,cols){
	 pivot1 = new THREE.Object3D();
		scene1.add(pivot1);
		tempContX1 = [];
		tempContY1 = [];
		h1 = 0;
		var maxVal = dimension1-1;
					for (z=1;z<=colsDeg;z++,cols--){
						  for (x = 0;x<dimension1;x++){
						
								for (y = 0;y<(dimension1*dimension1);y++){
								if (solidC1[x][y].position.z>=(maxVal-((cols-1)*2))-1.5 && solidC1[x][y].position.z<=(maxVal-((cols-1)*2))+1.5){
									THREE.SceneUtils.attach(solidC1[x][y],scene1,pivot1);
											tempContX1.push(x);
											tempContY1.push(y);
												h1++;
										}
								}
						}
			     	}

	}
	
	function face1(rot,spec,widthSpec,turn,str){
		if (setFinish1==true){
				render1();
				getBlocksZ1(widthSpec,spec); //colsDeg,cols
				 new TWEEN.Tween(pivot1.rotation)
                .to({ z: rot + (Math.PI/turn)}, speed1)
                .easing( typeEasing)
                .delay(delayTime1)
                .onComplete(function() {
					  renderer1.render(scene1,camera1);
					   
                  sendAlgDB1(str,function(){
                  	setFinish1 = true;
                  });
                
				
			     cancelAnimationFrame(raf1);
				 removeBlocksZ1(widthSpec,spec);
                })
				.start();
			}
			setFinish1=false;
			
	}
	
	function getBlocksY1(colsDeg,cols){
		 pivot1 = new THREE.Object3D();
		scene1.add(pivot1);
		tempContX1 = [];
		tempContY1 = [];
		h1 = 0;
		var maxVal = dimension1-1;
					for (z=1;z<=colsDeg;z++,cols--){
						  for (x = 0;x<dimension1;x++){
						
								for (y = 0;y<(dimension1*dimension1);y++){
								if (solidC1[x][y].position.x>=(maxVal-((cols-1)*2))-1.5 && solidC1[x][y].position.x<=(maxVal-((cols-1)*2))+1.5){
									THREE.SceneUtils.attach(solidC1[x][y],scene1,pivot1);
											tempContX1.push(x);
											tempContY1.push(y);
											h1++;
										}
								}
							}
			     	}
	}
	function removeBlocksY1(colsDeg,cols){
	for (x = 0;x<h1;x++){
				THREE.SceneUtils.detach(solidC1[tempContX1[x]][tempContY1[x]],pivot1,scene1);
		}
	}
	function right1(rot,spec,widthSpec,turn,str){
		
		if (setFinish1==true){
			render1();
				getBlocksY1(widthSpec,spec);
				 new TWEEN.Tween(pivot1.rotation)
                .to({ x: rot + Math.PI/turn}, speed1)
                .easing( typeEasing)
                .delay(delayTime1)
                .onComplete(function() {
					 
              	   renderer1.render(scene1,camera1);
					sendAlgDB1(str,function(){
						setFinish1 = true;
					});
				 
				
				 cancelAnimationFrame(raf1);
				 removeBlocksY1(widthSpec,spec);
				 	
                })
				.start();
			}

			setFinish1=false;

	}
	
	function getBlocksX1(colsDeg,cols){
		 pivot1 = new THREE.Object3D();
		scene1.add(pivot1);
		tempContX1 = [];
		tempContY1 = [];
		h1 = 0;
		
		var maxVal = dimension1-1;
					for (z=1;z<=colsDeg;z++,cols--){
						  for (x = 0;x<dimension1;x++){
						
								for (y = 0;y<(dimension1*dimension1);y++){
									if (solidC1[x][y].position.y>=(maxVal-((cols-1)*2))-1.5 && solidC1[x][y].position.y<=(maxVal-((cols-1)*2))+1.5){
											THREE.SceneUtils.attach(solidC1[x][y],scene1,pivot1);
											tempContX1.push(x);
											tempContY1.push(y);
											h1++;
											
											
									}
									
							}
						}
			     	}

	}
	function removeBlocksX1(colsDeg,cols){
	for (x = 0;x<h1;x++){
						THREE.SceneUtils.detach(solidC1[tempContX1[x]][tempContY1[x]],pivot1,scene1);
				}
	}


	function up1(rot,spec,widthSpec,turn,str){
		if (setFinish1==true){

				render1();
				getBlocksX1(widthSpec,spec); //colsDeg,cols
				 new TWEEN.Tween(pivot1.rotation)
                .to({ y: rot + Math.PI/turn}, speed1)
                .easing( typeEasing)
                .delay(delayTime1)
                .onComplete(function() {
					
					  renderer1.render(scene1,camera1);
					  
sendAlgDB1(str,function(){
	setFinish1 = true;
});
					
				cancelAnimationFrame(raf1);
				 removeBlocksX1(widthSpec,spec);
				  })
				.start();
			}
			
			
			setFinish1=false;
			
		
	}
	
	function rotateX1(rot, turn,str){
		if (setFinish1==true){
				render1();
				getBlocksAll1();
				 new TWEEN.Tween(pivot1.rotation)
                .to({x: rot + Math.PI/turn}, speed1)
                .easing( typeEasing)
                .delay(delayTime1)
                .onComplete(function() {
                  renderer1.render(scene1,camera1);
					 sendAlgDB1(str,function(){
					 	setFinish1 = true;
					 });
                
				
			     cancelAnimationFrame(raf1);
				  removeBlocksAll1();
                })
				.start();
			}
			setFinish1=false;
	}
	function rotateZ1(rot, turn,str){
		if (setFinish1==true){
				render1();
				getBlocksAll1();
				 new TWEEN.Tween(pivot1.rotation)
                .to({z: rot + Math.PI/turn}, speed1)
                .easing( typeEasing)
                .delay(delayTime1)
                .onComplete(function() {
                  renderer1.render(scene1,camera1);
					  sendAlgDB1(str,function(){
					  	setFinish1 = true;
					  });
                 
				
			     cancelAnimationFrame(raf1);
				  removeBlocksAll1();
                })
				.start();
			}
			setFinish1=false;
	}
	function rotateY1(rot, turn,str){
		if (setFinish1==true){
				render1();
				getBlocksAll1();
				 new TWEEN.Tween(pivot1.rotation)
                .to({y: rot + Math.PI/turn}, speed1)
                .easing( typeEasing)
                .delay(delayTime1)
                .onComplete(function() {
                  renderer1.render(scene1,camera1);
				 

				 sendAlgDB1(str,function(){
				 	setFinish1 = true;
				 });
                 
				
			     cancelAnimationFrame(raf1);
				  removeBlocksAll1();
                })
				.start();
			}
			setFinish1=false;
	}
	function getBlocksAll1(){
		 pivot1 = new THREE.Object3D();
		scene1.add(pivot1);
		
		  for (x = 0;x<dimension1;x++){
			
			for (y = 0;y<dimension1*dimension1;y++){
					THREE.SceneUtils.attach(solidC1[x][y],scene1,pivot1);
				
				
			}
			
		}

	}
	function removeBlocksAll1(){
		for (x = 0;x<dimension1;x++){
			
			for (y = 0;y<dimension1*dimension1;y++){
				//pivot1.updateMatrixWorld();
				
					THREE.SceneUtils.detach(solidC1[x][y],pivot1,scene1);
				
				
			}
			
		}
	}

	var arrayAlg1 =[];
	for (var x=0;x<dimension1;x++){
		arrayAlg1.push([]);
		
		for (y = 0;y<(dimension1*dimension1);y++){
		
				arrayAlg1[x][y] = '0';

		  }
	}

	function render1() {
		
		
		raf1 = requestAnimationFrame( render1 );
		TWEEN.update();


			
						//socket.emit('updatePixels1',solidC1[x][y].matrixWorld);
					
			
		for (var x=0;x<dimension1;x++){
			
			for (var y = 0;y<(dimension1*dimension1);y++){
						
						//solidC[x][y].position.setFromMatrixPosition( solidC1[x][y].matrixWorld ); //ok
						//solidC[x][y].setRotationFromMatrix(solidC1[x][y].matrixWorld); //ok

						//socket.emit('updatePixels1',solidC1[0][0].matrixWorld);

					// position = new THREE.Vector3();
					// position.setFromMatrixPosition( solidC1[0][0].matrixWorld );

					arrayAlg1[x][y] = solidC1[x][y].matrixWorld;

					//solidC[0][0].rotation = solidC1[0][0].rotation;

					//solidC[0][0].position.set(position.x,position.y,position.z);

					//solidC[0][0].rotation.set(new THREE.Vector3(solidC1[0][0].x,solidC1[0][0].y,solidC1[0][0].z));
				//	console.log(position.x + ',' + position.y + ',' + position.z);
						 
					}	
			}
			//socket.emit('updatePixels1',solidC1[0][0].matrixWorld,solidC1[0][1].matrixWorld);	
			//if (playerControl1 == true){
			// 	if (scrambler == 1){
				
			// }else{
				angular.element(document.getElementById('controller_id')).scope().updatePixels1(arrayAlg1);
				// socket.emit('updatePixels1',arrayAlg1);	
			// }

			//}
			
			renderer1.render( scene1, camera1 );
			//console.log('pc1: ' + playerControl + ' pc2: ' + playerControl1 );
		//	console.log(' pControl: ' + playerControl1);
			// }
			
			
		
	}
	function sendAlgDB1(alg,callback){
		// console.log(alg);
		allAlgP2 += alg + " ";
					angular.element(document.getElementById('controller_id')).scope().sendAlgP2(allAlgP2,arrayAlg1,function(){
						
					});
		callback();
	}

	//animation1();
var allAlgP2 = "";