
	var cube,renderer,camera,scene,dimension,controls,raf,tiles;
	var pivot,cmp;
	var degree;
	var limit=0;
	var solidPos;
	var objects = [];

	dimension = 3;
		var speed = 400;
		var delayTime=0;
	
 	//canvas
 	container = document.createElement( 'div' );
 
	//document.body.appendChild( container );
	document.getElementById('player1').appendChild(container);
	
	

		
	scene = new THREE.Scene();
	// scene.updateMatrixWorld(true);
	camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.1, 1000 );
	initCam();
	renderer = new THREE.WebGLRenderer();
	
	renderer.setSize( document.getElementById("player1").offsetWidth-20 , document.getElementById("player1").offsetHeight-10 );
	renderer.setClearColor( 0x000000, 1);
	container.appendChild( renderer.domElement );

	

	var geometry = new THREE.BoxGeometry( 2, 2, 2 );
	var material = new THREE.MeshBasicMaterial( {  transparent:true, opacity: 0.0  } );
	var m = new THREE.MeshBasicMaterial( { wireframeLinewidth:51,color: 0xFF00FF, } );
	limit = 0;
	degree = Math.PI/180;
	camera.position.z=2;
	var ff = new THREE.PlaneGeometry( 1.7, 1.7);
	
	//interactive 


	
				var letterA,textGeometry,textMaterial;

					////// 	INSERT LETTER ///////////
					// var loader = new THREE.FontLoader();
						
					// loader.load(  'fonts/helvetiker_regular.typeface.json', function ( font ) {

					//   var textGeometry = new THREE.TextGeometry( "A", {

					//     font: font,

					//     size: 1,
					//     height: .2,
					//     curveSegments: 1,

					//     bevelThickness: 1,
					//     bevelSize:1,
					//     bevelEnabled: false

					//   });

					//   var textMaterial = new THREE.MeshBasicMaterial( 
					//     { color: 0xff7f7f , side:THREE.BackSide}
					//   );

					//   letterA = new THREE.Mesh( textGeometry, textMaterial );
					//  	letterA.position.y = 4;
					//  	letterA.position.x = -1.5;
					//  	letterA.rotation.x = 90 * degree;
					//  	letterA.rotation.z = 180 * degree;
					//   scene.add( letterA );	
					//   renderer.render(scene,camera);

					// });
					//////////////////////////
  var solidC = [];
// $(function() {
//    $('#player1').focus();
// });

// $('#player1').bind('keypress', function(event) {

//     //If you want to check the code from the key
//     //console.log(event.keyCode);
//     console.log(event.keyCode);
//     switch(event.keyCode){
//       //actions for the keys
//      // var code = e.keyCode ? e.keyCode : e.which;
//        case 70:
//               checkNotation('Fp'); break;
// 	   case 102:
// 	          checkNotation('F'); break;
// 	   case 66:
// 	          checkNotation('Bp'); break;
// 	   case 98:
// 	          checkNotation('B'); break;
// 	   case 85:
// 	          checkNotation('Up'); break;
// 	   case 117:
// 	          checkNotation('U'); break;
// 	   case 68:
// 	          checkNotation('Dp'); break;
// 	   case 100:
// 	          checkNotation('D'); break;
// 	   case 82:
// 		      checkNotation('Rp'); break;
// 	   case 114:
// 	          checkNotation('R'); break;
// 	   case 76:
// 	          checkNotation('Lp'); break;
// 	   case 108:
// 	          checkNotation('L'); break;
// 	   case 88:
// 	          checkNotation('xp'); break;
// 	   case 120:
// 	          checkNotation('x'); break;
// 	   case 89:
//       		  checkNotation('yp'); break;
//        case 121: 
//      		  checkNotation('y'); break;
// 	   case 90:
//       		  checkNotation('zp'); break; 
//        case 122:
//       		  checkNotation('z'); break;

//     }
// });

	

	function initCam(){
			// document.getElementById('txtx').value = 6.826888528374662;
			// document.getElementById('txty').value = 4.683904919445453 ;
			// document.getElementById('txtz').value =7.769909726436357;
			
			camera.position.x= 7.226525622389737;
			camera.position.y= 6.164650291010791;
			camera.position.z= 7.73261306595859;
			camera.rotation.x= -0.6730479785136418;
			camera.rotation.y= 0.6310664858727041;
			camera.rotation.z= 0.4480982252579138;

	}
	  init();
	  var leftSide,rightSide,frontSide,backSide,downSide,upSide;
	function init(){
		
	initCam();
	//solidC.length = 0;
	//start block
	solidC=[];
	solidPos=[];
	
	
		ad = dimension-1;
	
	
	yPos=ad; //c
	xPos=-ad ;//
	zPos=-ad;//
	for (x=0;x<dimension;x++){
		solidC.push([]);
		solidPos.push([]);
		for (y = 0;y<(dimension*dimension);y++){
			solidC[x].push(new THREE.Mesh(geometry,material)); 
		   	solidPos[x].push([]);
		  // 		objects.push( solidC[x][y]);
			solidPos[x][y][0] = x;
			solidPos[x][y][1] = y;
		
			if (y==0 && x==0){
		    solidC[x][y].position.x = xPos;
			solidC[x][y].position.y = yPos;
			solidC[x][y].position.z = zPos;
			}
			else if((y%dimension==0) && !(y==0)){
			zPos+=2;
			xPos=-ad;//
			solidC[x][y].position.x=xPos;
			solidC[x][y].position.y=yPos;
			solidC[x][y].position.z=zPos;
			}
			else if((x>0) && (y==0)){
			yPos-=2;
			xPos=-ad;//
			zPos=-ad;//
			solidC[x][y].position.x=xPos;
			solidC[x][y].position.y=yPos;
			solidC[x][y].position.z=zPos;	
			}
			else{
				xPos+=2;
			solidC[x][y].position.x=xPos;
			solidC[x][y].position.y=yPos;
			solidC[x][y].position.z=zPos;	
			}
			
			
			scene.add(solidC[x][y]);

	
		//	console.log("x = " + x + " y = " + y + " position.y = " + solidC[x][y].position.x);
		}
	}
	
	//end block

	


//start tiles
	changeColor();
	
//	ad -=2;
	var color="";
	ad-=dimension-1;
	var xInc=(dimension-1)*-2;

	  var xTileInc = 0;
	  var yTileInc = 0;
	  var yTile5Inc = (dimension-1)*dimension;
	 tiles = [];
	for (x =0;x<6;x++){
		tiles.push([]);
		switch (x){
			case 0:
				xInc=-ad;
				zInc=-ad;
				yInc=ad +1.1;
				xDeg=90*degree;
				yDeg=0;
				zDeg=0;
			break;
			case 1:
				xInc=-(ad +1.1);
				zInc=-ad;
				yInc=ad;
				xDeg=0;
				yDeg=90*degree;
				zDeg=0;
			break;
			case 2:
				xInc=-ad;
				zInc=(ad+1.1);
				yInc=ad;
				xDeg=0;
				yDeg=0;
				zDeg=90*degree;
			break;
			case 3:
				xInc=(ad+1.1);
				zInc=-ad;
				yInc=ad;
				xDeg=0;
				yDeg=90*degree;
				zDeg=0;
			
			break;
			case 4:
				xInc=ad;
				zInc=-(ad+1.1);
				yInc=ad;
				xDeg=0;
				yDeg=0;
				zDeg=0;
			break;
			case 5:
				xInc=-ad;
				zInc=ad;
				yInc=-(ad+1.1);
				xDeg=90*degree;
				yDeg=0;
				zDeg=0;
			
			break;
				
			
		}
		for (y = 0;y<(dimension*dimension);y++){
					switch (x){
						case 0:
						color = upSide;
							//console.log("y = " + y + " dimension-1 "  + (y%(dimension-1)));
								 if (!(y==0) && (y%(dimension))==0){
									 //zInc+=1;
									 xInc=-ad;
								 }
						break;
						case 1:
						color = leftSide;
								 if (!(y==0) && (y%(dimension))==0){
									// yInc-=2;
									 zInc=-ad;
								 }
						break;
						case 2:
						color = frontSide;
								if (!(y==0) && (y%(dimension))==0){
									// yInc-=2;
									 xInc=-ad;
								 }
						break;
						case 3:
						color = rightSide;
								if (!(y==0) && (y%(dimension))==0){
									// yInc-=2;
									 zInc=-ad;
								 }
						break;
						case 4:
						color = backSide;
								if (!(y==0) && (y%(dimension))==0){
									// yInc-=2;
									 xInc=ad;
								 }
						break;
						case 5:
						color = downSide;
								if (!(y==0) && (y%(dimension))==0){
									// zInc-=2;
									 xInc=-ad;
								 }
						break;
					
					}
	  		 tiles[x].push(new THREE.Mesh( ff,color ));
			  tiles[x][y].position.z=zInc;
			  tiles[x][y].position.x=xInc;	
			  tiles[x][y].position.y=yInc;
			  tiles[x][y].rotation.x=xDeg;
			  tiles[x][y].rotation.y=yDeg;
			  tiles[x][y].rotation.z=zDeg;
			  
	//tile assigning		
			 
			  if (x ==0){
				solidC[xTileInc][yTileInc].add(tiles[x][y]);  
				   yTileInc++;
				   
				   if (y==dimension*dimension-1){
					yTileInc=0;   
				   }
			  }
			    if (x == 1 ){
			
				 
				 solidC[xTileInc][yTileInc].add(tiles[x][y]);
				 yTileInc+=dimension;
				 
				  if (yTileInc>(dimension-1)*dimension){
					  yTileInc=0;
					  xTileInc++;
				  } 
				 
			  }
			  if (xTileInc==dimension && yTileInc==0){
				
				xTileInc=0;
				yTileInc=(dimension-1)*dimension;  
			  }
		
			 if (x==2){
		  		solidC[xTileInc][yTileInc].add(tiles[x][y]);
				yTileInc++;
					if (yTileInc==(dimension*dimension)){
						yTileInc=(dimension-1)*dimension;
						xTileInc++;
					}
			 }
			 if (xTileInc==dimension && yTileInc==(dimension-1)*dimension){
			
				xTileInc=0;
				yTileInc=dimension-1;
			  }
			  if (x ==3){
				solidC[xTileInc][yTileInc].add(tiles[x][y]);
				yTileInc+=dimension;
					if (yTileInc>dimension*dimension){
						yTileInc=dimension-1;
						xTileInc++;
					}
				  
			  }
			   if (xTileInc==dimension && yTileInc==dimension-1){
				
				xTileInc=0;
				yTileInc=(dimension-1);  
			  }
			  if (x==4){
				solidC[xTileInc][yTileInc].add(tiles[x][y]); 
				yTileInc--;
					if (yTileInc==-1){
						yTileInc=dimension-1;
						xTileInc++;
					}
			  }
			  
			if (xTileInc==dimension && yTileInc==dimension-1){
				
				xTileInc=dimension-1;
				yTileInc=yTile5Inc;  
			  }
			  if (x==5){
				 solidC[xTileInc][yTileInc].add(tiles[x][y]);
				yTileInc++; 
				
					if ((yTileInc%dimension) == 0){
						yTile5Inc-=dimension;
						yTileInc=yTile5Inc;	
					}
				 	
			  }
			  
		
		//	 scene.add(tiles[x][y]);
			 
		
		
		}
	} //end tiles
	//scene.remove(solidC[0][0]);
	
	//tiles[0][1].material.color.setHex( 0xeeeeee);
	//solidC[2][1].children[0].material.color.setHex(0xabceeee);
	renderer.render( scene, camera );
	}//compute blocks  //init
		function changeColor(){
	leftSide = new THREE.MeshBasicMaterial( {color: 0xFFFFFF, side: THREE.DoubleSide} ); //leftSide
	frontSide = new THREE.MeshBasicMaterial( {color: 0xFF0033, side: THREE.DoubleSide} ); //leftSide
	rightSide = new THREE.MeshBasicMaterial( {color:0xffff00, side: THREE.DoubleSide} ); //leftSide
	backSide = new THREE.MeshBasicMaterial( {color: 0xff8000, side: THREE.DoubleSide} ); //leftSide
	downSide = new THREE.MeshBasicMaterial( {color:0x00ff00, side: THREE.DoubleSide} ); //leftSide
	upSide = new THREE.MeshBasicMaterial( {color:0x0000ff, side: THREE.DoubleSide} ); //leftSide
								}
		controls = new THREE.TrackballControls(camera,renderer.domElement);
	controls.addEventListener('change',trackCam);
	//trackball
	
	// solidC[0][0].on('click', function()
	// 	{
	// 	    // response to click...
	// 	    alert('hi');
	// 	});
	
	//tiles[0][0].material.color.setHex(0xeeff);
	
 // 	THREE.SceneUtils.detach(tiles[0][0],solidC[0][0],scene);
    //tiles[0][0].geometry.colorsNeedUpdate = true;

    //////////////////

//  	 var tryko = tiles[0][0];
//  	 tryko.position.set(0,2,0);
//  	 tryko.material.color.setHex(0xeeeff);
// 	mesh.material.color.setHex(0xeeeff);
////////////////
	// scene.children[1].children[0].material.color.setHex(0xeeeff);



	renderer.render( scene, camera );
	
	//render();
	
	function changeDimen(){
			
			
			scene = new THREE.Scene();
			renderer.render(scene,camera);
			dimension = Number(document.getElementById("txtDimen").value);
			init();
	}

	function trackCam(){
		//camera
		// document.getElementById('txtx').value = camera.position.x;
		// document.getElementById('txty').value = camera.position.y;
		// document.getElementById('txtz').value = camera.position.z;
		// document.getElementById('txtRx').value = camera.rotation.x;
		// document.getElementById('txtRy').value = camera.rotation.y;
		// document.getElementById('txtRz').value = camera.rotation.z;
		
		
		// camera.position.x = document.getElementById('txtx').value;
		// camera.position.y = document.getElementById('txty').value;
		// camera.position.z = document.getElementById('txtz').value;
		
		// console.log("camera.position.x=",camera.position.x,";");
		// console.log("camera.position.y=",camera.position.y,";");
		// console.log("camera.position.z=",camera.position.z,";");
		// console.log("camera.rotation.x=",camera.rotation.x,";");
		// console.log("camera.rotation.y=",camera.rotation.y,";");
		// console.log("camera.rotation.z=",camera.rotation.z,";");
		//camera

		renderer.render( scene, camera );
	}
	function disableCamera(){
	//		document.getElementById("btnAdjust").className = "btn btn-info btn-sm";
	//	document.getElementById("btnCancelAdjust").className = "btn btn-info btn-sm disabled";
		cancelAnimationFrame(rafAnimate);
	}
	//animation() //enable camera
	function animation(){


		//document.getElementById("btnAdjust").className = "btn btn-info btn-sm disabled";
		//document.getElementById("btnCancelAdjust").className = "btn btn-info btn-sm ";

			// socket.on('playerPixels1', function (data){
			// 		console.log(data);

			// 		// for (var x=0;x<dimension;x++){
								
			// 		// 		for (var y = 0;y<(dimension*dimension);y++){
				
			// 				solidC[0][0].position.setFromMatrixPosition(data ); //ok
			// 				solidC[0][0].setRotationFromMatrix(data);
						
								
			// 		// 		}
			// 		// }
			// });
		rafAnimate=	requestAnimationFrame(animation);
		scene.rotation.y+=0.005;
		renderer.render(scene,camera);
		// controls.update();

	}//trackball
	//////////////////////////////////////////////////////////////////////////////////////////////////
	function testFunc(){
		scene.rotation.y=0;
	}
	var tempContX,tempContY,h;
	var setFinish=true;
	//var speed = 500-Number(slidSpeed);

	//var typeEasing = TWEEN.Easing.Circular.Out;
	var typeEasing = TWEEN.Easing.Linear.None;
	//speed = 800;
	function removeBlocksZ(colsDeg,cols){
			for (x = 0;x<h;x++){
					THREE.SceneUtils.detach(solidC[tempContX[x]][tempContY[x]],pivot,scene);
				}
		}

	function getBlocksZ(colsDeg,cols){
	 pivot = new THREE.Object3D();
		scene.add(pivot);
		tempContX = [];
		tempContY = [];
		h = 0;
		var maxVal = dimension-1;
					for (z=1;z<=colsDeg;z++,cols--){
						  for (x = 0;x<dimension;x++){
						
								for (y = 0;y<(dimension*dimension);y++){
								if (solidC[x][y].position.z>=(maxVal-((cols-1)*2))-1.5 && solidC[x][y].position.z<=(maxVal-((cols-1)*2))+1.5){
									THREE.SceneUtils.attach(solidC[x][y],scene,pivot);
											tempContX.push(x);
											tempContY.push(y);
												h++;
										}
								}
						}
			     	}

	}
	
	function face(rot,spec,widthSpec,turn){
		if (setFinish==true){
				render();
				getBlocksZ(	widthSpec,spec); //colsDeg,cols
				 new TWEEN.Tween(pivot.rotation)
                .to({ z: rot + (Math.PI/turn)}, speed)
                .easing( typeEasing)
                .delay(delayTime)
                .onComplete(function() {
					  renderer.render(scene,camera);
						
                  
                setFinish=true;
				
			     cancelAnimationFrame(raf);
				 removeBlocksZ(widthSpec,spec);
                })
				.start();
			}
			setFinish=false;
			
	}
	
	function getBlocksY(colsDeg,cols){
		 pivot = new THREE.Object3D();
		scene.add(pivot);
		tempContX = [];
		tempContY = [];
		h = 0;
		var maxVal = dimension-1;
					for (z=1;z<=colsDeg;z++,cols--){
						  for (x = 0;x<dimension;x++){
						
								for (y = 0;y<(dimension*dimension);y++){
								if (solidC[x][y].position.x>=(maxVal-((cols-1)*2))-1.5 && solidC[x][y].position.x<=(maxVal-((cols-1)*2))+1.5){
									THREE.SceneUtils.attach(solidC[x][y],scene,pivot);
											tempContX.push(x);
											tempContY.push(y);
						//					console.log(h + " " +tempContX[h]+ " " +tempContY[h]);
											h++;
											
											
										}
										
								}
						}
			     	}
	}
	function removeBlocksY(colsDeg,cols){
	for (x = 0;x<h;x++){
				THREE.SceneUtils.detach(solidC[tempContX[x]][tempContY[x]],pivot,scene);
		}
	}
	function right(rot,spec,widthSpec,turn){
		
		if (setFinish==true){
			render();
				getBlocksY(widthSpec,spec);
				 new TWEEN.Tween(pivot.rotation)
                .to({ x: rot + Math.PI/turn}, speed)
                .easing( typeEasing)
                .delay(delayTime)
                .onComplete(function() {
					 
              	   renderer.render(scene,camera);
					
				 setFinish=true;
				
				 cancelAnimationFrame(raf);
				 removeBlocksY(widthSpec,spec);
				 	
                })
				.start();
			}

			setFinish=false;

	}
	
	function getBlocksX(colsDeg,cols){
		 pivot = new THREE.Object3D();
		scene.add(pivot);
		tempContX = [];
		tempContY = [];
		h = 0;
		
		var maxVal = dimension-1;
					for (z=1;z<=colsDeg;z++,cols--){
						  for (x = 0;x<dimension;x++){
						
								for (y = 0;y<(dimension*dimension);y++){
									if (solidC[x][y].position.y>=(maxVal-((cols-1)*2))-1.5 && solidC[x][y].position.y<=(maxVal-((cols-1)*2))+1.5){
											THREE.SceneUtils.attach(solidC[x][y],scene,pivot);
											tempContX.push(x);
											tempContY.push(y);
											h++;
											
											
									}
									
							}
						}
			     	}

	}
	function removeBlocksX(colsDeg,cols){
	for (x = 0;x<h;x++){
						THREE.SceneUtils.detach(solidC[tempContX[x]][tempContY[x]],pivot,scene);
				}
	}


	function up(rot,spec,widthSpec,turn){
		if (setFinish==true){
				render();
				getBlocksX(widthSpec,spec); //colsDeg,cols
				 new TWEEN.Tween(pivot.rotation)
                .to({ y: rot + Math.PI/turn}, speed)
                .easing( typeEasing)
                .delay(delayTime)
                .onComplete(function() {
					
					  renderer.render(scene,camera);
					  
					setFinish=true;
				cancelAnimationFrame(raf);
				 removeBlocksX(widthSpec,spec);
				  })
				.start();
			}
			
			
			setFinish=false;
			
		
	}
	
	function rotateX(rot, turn){
		if (setFinish==true){
				render();
				getBlocksAll();
				 new TWEEN.Tween(pivot.rotation)
                .to({x: rot + Math.PI/turn}, speed)
                .easing( typeEasing)
                .delay(delayTime)
                .onComplete(function() {
                  renderer.render(scene,camera);
					 
                 setFinish=true;
				
			     cancelAnimationFrame(raf);
				  removeBlocksAll();
                })
				.start();
			}
			setFinish=false;
	}
	function rotateZ(rot, turn){
		if (setFinish==true){
				render();
				getBlocksAll();
				 new TWEEN.Tween(pivot.rotation)
                .to({z: rot + Math.PI/turn}, speed)
                .easing( typeEasing)
                .delay(delayTime)
                .onComplete(function() {
                  renderer.render(scene,camera);
					  
                 setFinish=true;
				
			     cancelAnimationFrame(raf);
				  removeBlocksAll();
                })
				.start();
			}
			setFinish=false;
	}
	function rotateY(rot, turn){
		if (setFinish==true){
				render();
				getBlocksAll();
				 new TWEEN.Tween(pivot.rotation)
                .to({y: rot + Math.PI/turn}, speed)
                .easing( typeEasing)
                .delay(delayTime)
                .onComplete(function() {
                  renderer.render(scene,camera);
					  
                 setFinish=true;
				
			     cancelAnimationFrame(raf);
				  removeBlocksAll();
                })
				.start();
			}
			setFinish=false;
	}
	function getBlocksAll(){
		 pivot = new THREE.Object3D();
		scene.add(pivot);
		
		  for (x = 0;x<dimension;x++){
			
			for (y = 0;y<dimension*dimension;y++){
					THREE.SceneUtils.attach(solidC[x][y],scene,pivot);
				
				
			}
			
		}

	}
	function removeBlocksAll(){
		for (x = 0;x<dimension;x++){
			
			for (y = 0;y<dimension*dimension;y++){
				//pivot.updateMatrixWorld();
				
					THREE.SceneUtils.detach(solidC[x][y],pivot,scene);
				
				
			}
			
		}
	}
	function onWindowResize() {

				windowHalfX = window.innerWidth / 2;
				windowHalfY = window.innerHeight / 2;

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );

			}
		var arrayAlg =[];
		for (x=0;x<dimension;x++){
			arrayAlg.push([]);
			
			for (y = 0;y<(dimension*dimension);y++){
			
					arrayAlg[x][y] = '0';

			  }
		}

	function render() {
		raf = requestAnimationFrame( render );
		TWEEN.update();

		//console.log("render");
			for (var x=0;x<dimension;x++){
			
				for (var y = 0;y<(dimension*dimension);y++){
						arrayAlg[x][y] = solidC[x][y].matrixWorld;

				}	
			}

		//if (playerControl == true){
			if (scrambler == 1){
			
				socket.emit('updatePixels1',arrayAlg);	
				socket.emit('updatePixels',arrayAlg);
				console.log('testing');
			}else{
				socket.emit('updatePixels',arrayAlg);
			}
			//console.log('exec');
		//}
		renderer.render( scene, camera );
		// }
		
		
		
	}

	animation();
