// variable to hold a reference to our A-Frame world
let world;
let spots = [];
let room1Items = [];
let room2Items = [];
let room3Items = [];
let level1, level2, level3;
let userCurrentRoom;


function setup() {
	// no canvas needed
	noCanvas();

	// construct the A-Frame world
	// this function requires a reference to the ID of the 'a-scene' tag in our HTML document
	world = new World('VRScene');

	// world.setFlying(true);

	world.setBackground(165, 201, 201);

	world.setUserPosition(0, 1.4, 0);

	level1 = "incomplete";
	level2 = "incomplete";
	level3 = "incomplete";

	userCurrentRoom = "room1";

	instruction = "show";



	///////////////////////////////  ROOM 1   //////////////////////////////////////////

	//// Checklists
	buffer1 = createGraphics(250, 250);
	checklist1 = world.createDynamicTextureFromCreateGraphics( buffer1 );
	buffer1.background(255, 232, 168);
	textAlign(CENTER);
	buffer1.textSize(20);
	buffer1.textStyle(BOLD);
	buffer1.text("Checklist", width/2, 50);
	buffer1.textSize(12);
	buffer1.textStyle(NORMAL);
	buffer1.text("1. Put the scissors onto the desk", width/2, 80);
	buffer1.text("2. Put the shirt into the closet", width/2, 110);
	buffer1.text("3. Put the chair in front of the desk", width/2, 140);
	rectMode(CENTER);
	
	buffer1.stroke(0);
	buffer1.strokeWeight(2);
	scissorCheckBox = color(255, 255, 255);
	shirtCheckBox = color(255, 255, 255);
	chairCheckBox = color(255, 255, 255);


	//// ROOM 1 CONTAINER --> add to the world
	room1container = new Container3D({
		x:0, y:0, z:0
	});
	world.add(room1container);

	//// room 1 furniture --> Add as a child to ROOM 1 CONTAINER
	wall1 = new Plane({
		x: -3, y: 3, z: 0, 
		width: 6, height: 6, 
		asset: 'bed_wall',
		repeatX: 10,
		repeatY: 10,
		rotationY: 90,
		metalness: 0.25,
		side: 'double'
	});
	room1container.addChild(wall1);

	wall2 = new Plane({
		x: 3, y: 3, z: 0, 
		width: 6, height: 6, 
		asset: 'bed_wall',
		repeatX: 10,
		repeatY: 10,
		rotationY: 90,
		metalness: 0.25,
		side: 'double'
	});
	room1container.addChild(wall2);

	wall3 = new Plane({
		x: 0, y: 3, z: 3, 
		width: 6, height: 6, 
		asset: 'bed_wall',
		repeatX: 10,
		repeatY: 10,
		rotationY: 180,
		metalness: 0.25,
		side: 'double'
	});
	room1container.addChild(wall3);

	wall4 = new Plane({
		x: 0, y: 3, z: -3, 
		width: 6, height: 6, 
		asset: 'bed_wall',
		repeatX: 10,
		repeatY: 10,
		rotationY: 180,
		metalness: 0.25,
		side: 'double'
	});
	room1container.addChild(wall4);

	roof = new Plane ({
		x: 0, y: 5, z: 0,
		width: 6, height: 6,
		red: 255, green: 255, blue: 255,
		rotationX: -90,
		side: 'double'
	});
	room1container.addChild(roof);

	kitFloor = new Plane ({
		x: 0, y: 0.006, z: 0,
		width: 6, height: 6,
		asset: 'kitFloor',
		repeatX: 5,
		repeatY: 5,
		side: 'double',
		rotationX: 90
	});
	room1container.addChild(kitFloor);

	desk = new GLTF({
		asset: 'desk_gltf',
		x:2, y:0, z:-0.5,
		scaleX:0.03,
		scaleY:0.03,
		scaleZ:0.03,
		rotationY: -90
	});
	room1container.addChild(desk);

	bed = new GLTF({
		asset: 'bed_gltf',
		x: -2, y: 0, z: -1.5,
		scaleX:0.012,
		scaleY:0.012,
		scaleZ:0.012,
	});
	room1container.addChild(bed);

	closet = new GLTF({
		asset: 'closet_gltf',
		x: 1.3, y: 0, z: 16,
		rotationY: 90,  
	});
	room1container.addChild(closet);

	checklistBoard1 = new Plane ({
		asset: checklist1,
		x: 0, y: 1.5, z: -2.95,
		width: 1, height: 1, 
		side: 'double',
		dynamicTexture: true,
		dynamicTextureWidth: 250,
		dynamicTextureHeight: 250
	});
	room1container.addChild(checklistBoard1);

	//// Room 1 Spots Container --> add as a child to ROOM 1 CONTAINER
	spotContainer1 = new Container3D ({
		x: 0, y: 10, z: 0
	})
	room1container.addChild(spotContainer1);

	//// Room 1 Spots --> Push into the universal spots array
	////spots.push(new Spot(x, y, z, "room"));
	spots.push(new Spot(0, 0, 0, "room1"));

	spots.push(new Spot(1, 0, 0, "room1"));

	spots.push(new Spot(2, 0, 0, "room1"));

	spots.push(new Spot(0, 0, 1, "room1"));

	spots.push(new Spot(0, 0, 2, "room1"));

	// Desk front spot
	spots.push(new Spot(1.5, 0, 1.7, "room1"));

	// Desk top spot
	spots.push(new Spot(2.5, 0.85, 2, "room1"));

	spots.push(new Spot(0, 0, -1, "room1"));
	spots.push(new Spot(0, 0, -2, "room1"));
	spots.push(new Spot(1, 0, -1, "room1"));

	// Closet spot
	spots.push(new Spot(2.5, 1, -2, "room1"));

	//Bed spot
	spots.push(new Spot(-2, 0.65, -1, "room1"));

	//// model syntax: 
	  // new Model(asset,     x, y, z,     scale,     containerWidth, containerHeight, containerDepth,     rotateX, rotateY, rotateZ,     offsetX, offsetY, offsetZ,     heightOffset,     correctX, correctZ,     room)
	//// Room Items Push into universal items array
	scissors1 = new Model("scissors_gltf", "images/scissorsInventory.png",    1, 0.01, 0,      2,      0.6, 0.2, 0.6,     0, 0, 0,     0, 0, 0,     0.045,     2.5, 2,     'room1');
	room1Items.push(scissors1);
	
	tShirt1 = new Model("tshirt_gltf", "images/tshirtInventory.png",    -2, 1, -2,     0.001,     0.8, 0.8, 0.5,     0, 0, 0,     0, -1.3, 0,     0.3,     2.5, -2,     'room1');
	room1Items.push(tShirt1);

	chair1 = new Model("chair_gltf", "images/chairInventory.png",     -2, 0.5, 0,     0.01,     0.7, 0.7, 0.7,     0, 95, 0,     0, -0.5, -0.2,     0.5,     1.5, 1.7,      'room1');
	room1Items.push(chair1);





	///////////////////////////////   ROOM 2   //////////////////////////////////////////

	//// Room2 Checklists
	buffer2 = createGraphics(350, 250);
	checklist2 = world.createDynamicTextureFromCreateGraphics( buffer2 );
	buffer2.background(255, 232, 168);
	textAlign(CENTER);
	buffer1.textSize(20);
	buffer1.textStyle(BOLD);
	buffer2.text("Checklist", width/2, 50);
	buffer1.textSize(12);
	buffer1.textStyle(NORMAL);
	buffer2.text("1. Put tooth brush on the right side of the sink", width/2, 80);
	buffer2.text("2. Put the tooth paste on the left side of the sink", width/2, 110);
	buffer2.text("3. Put towel at the bottom of the wood shelf", width/2, 140);
	buffer2.text("4. Put the shampoo on the bathtub", width/2, 170);
	rectMode(CENTER);
	
	buffer2.stroke(0);
	buffer2.strokeWeight(2);
	toothbrushCheckBox = color(255, 255, 255);
	toothpasteCheckBox = color(255, 255, 255);
	towelCheckBox = color(255, 255, 255);
	shampooCheckBox = color(255, 255, 255);
	
	//// ROOM 2 CONTAINER --> add to the world
	room2container = new Container3D({
		x: 10, y: 0, z: 10
	})
	world.add(room2container);

	//// room 2 furniture --> Add as a child to ROOM 2 CONTAINER
	bathroomWall1 = new Plane({
		x: -3, y: 3, z: 0, 
		width: 6, height: 6, 
		asset: 'wall',
		repeatX: 10,
		repeatY: 10,
		rotationY: 90,
		metalness: 0.25,
		side: 'double'
	});
	room2container.addChild(bathroomWall1);

	bathroomWall2 = new Plane({
		x: 3, y: 3, z: 0, 
		width: 6, height: 6, 
		asset: 'wall',
		repeatX: 10,
		repeatY: 10,
		rotationY: 90,
		metalness: 0.25,
		side: 'double'
	});
	room2container.addChild(bathroomWall2);

	bathroomWall3 = new Plane({
		x: 0, y: 3, z: 3, 
		width: 6, height: 6, 
		asset: 'wall',
		repeatX: 10,
		repeatY: 10,
		rotationY: 180,
		metalness: 0.25,
		side: 'double'
	});
	room2container.addChild(bathroomWall3);

	bathroomWall4 = new Plane({
		x: 0, y: 3, z: -3, 
		width: 6, height: 6, 
		asset: 'wall',
		repeatX: 10,
		repeatY: 10,
		rotationY: 180,
		metalness: 0.25,
		side: 'double'
	});
	room2container.addChild(bathroomWall4);

	bathroomRoof = new Plane ({
		x: 0, y: 5, z: 0,
		width: 6, height: 6,
		red: 255, green: 255, blue: 255,
		rotationX: -90,
		side: 'double'
	});
	room2container.addChild(bathroomRoof);
	
	woodShelf = new GLTF({
		asset: 'woodShelf_gltf',
		x:-2.1, y:1, z:-2,
		scaleX:0.3,
		scaleY:0.3,
		scaleZ:0.3,
		//rotationY: -90
	});
	room2container.addChild(woodShelf);
	bathtub = new GLTF({
		asset: 'bathtub_gltf',
		x:0.7, y:0.5, z:-2,
		scaleX:0.7,
		scaleY:0.7,
		scaleZ:0.7,
		rotationY: -90
	});
	room2container.addChild(bathtub);
	bathroomSink= new GLTF({
		asset: 'sink_gltf',
		x:2.1, y:0.7, z:0.1,
		scaleX:2.5,
		scaleY:4,
		scaleZ:2.5,
		rotationY:90
	});
	room2container.addChild(bathroomSink);
	toilet= new GLTF({
		asset: 'toilet_gltf',
		x:3, y:0, z:2,
		scaleX:2.5,
		scaleY:2.5,
		scaleZ:2.5,
		rotationY:-90
	});
	room2container.addChild(toilet);
	checklistBoard2 = new Plane ({
		asset: checklist2,
		x: 0, y: 2, z: -2.95,
		width: 1, height: 1, 
		side: 'double',
		dynamicTexture: true,
		dynamicTextureWidth: 250,
		dynamicTextureHeight: 250
	});
	room2container.addChild(checklistBoard2);
	//// Room 2 Spots Container --> add as a child to ROOM 2 CONTAINER
	spotContainer2 = new Container3D ({
		x: 0, y: 10, z: 0
	})
	room2container.addChild(spotContainer2);	

	//// Room 2 Spots --> Push into the universal spots array
	////spots.push(new Spot(x, y, z, "room"));
	//ground spot (no use) 
	spots.push(new Spot(0, 0, 2, "room2"));
	spots.push(new Spot(0, 0, 1, "room2"));
	spots.push(new Spot(0, 0, 0, "room2"));
	spots.push(new Spot(0, 0, -1, "room2"));

	spots.push(new Spot(-1, 0, 2, "room2"));
	spots.push(new Spot(-1, 0, 1, "room2"));
	spots.push(new Spot(-1, 0, 0, "room2"));
	spots.push(new Spot(-1, 0, -1, "room2"));

	spots.push(new Spot(-2, 0, 2, "room2"));
	spots.push(new Spot(-2, 0, 1, "room2"));
	spots.push(new Spot(-2, 0, 0, "room2"));
	spots.push(new Spot(-2, 0, -1, "room2"));

	spots.push(new Spot(2, 1, 2, "room2"));

	//shelf spot 
	spots.push(new Spot(-2, 0.5, -1.6, "room2")); //for towel 

	//sink spot
	spots.push(new Spot(2.3, 1.3, 0.8, "room2"));//for toothbrush 
	spots.push(new Spot(2.3, 1.3, -0.4, "room2"));//for toothpaste

	//bathtub spot 
	spots.push(new Spot(-1, 1.2, -1, "room2"));//for shampoo


	//// model syntax: 
	  // new Model(asset,     x, y, z,     scale,     containerWidth, containerHeight, containerDepth,     rotateX, rotateY, rotateZ,     offsetX, offsetY, offsetZ,     heightOffset,     correctX, correctZ,     room)
	//// Room Items Push into universal items array
	toothbrush = new Model("toothbrush_gltf", "images/bathroom/inventory/toothbrushInventory.png",    -1, 0.4, 0,      0.3,      0.2, 0.8, 0.2,     0, 0, 0,     0, 0, -0.4,     0.3,       2.3,0.8,    'room2');
	room2Items.push(toothbrush);
	toothpaste = new Model("toothpaste_gltf", "images/bathroom/inventory/toothpasteInventory.png",    -2, 2.4, -1.8,      0.001,       0.7, 0.2,0.3,     0, -90, 0,     0, 0, 0.0,     0,       2.3,-0.4,    'room2');
	room2Items.push(toothpaste);
	towel = new Model("towel_gltf", "images/bathroom/inventory/towelInventory.png",    1, 0.2, 1,      0.003,      1, 0.4, 1,     0, 0, 0,     0.13, 0, 0.1,     0,       -2,-1.6,    'room2');
	room2Items.push(towel);
	shampoo= new Model("shampoo_gltf", "images/bathroom/inventory/shampooInventory.png",    1.7, 1.4, 2.1,      0.04,      0.3, 0.8, 0.3,     0, -90, 30,     0.5, -0.4, 0.3,     0.46,       -1,-1,    'room2');
	room2Items.push(shampoo);







	///////////////////////////////   ROOM 3   //////////////////////////////////////////

	//// Checklists
	buffer3 = createGraphics(300, 250);
	checklist3 = world.createDynamicTextureFromCreateGraphics( buffer3 );
	buffer3.background(255, 232, 168);
	textAlign(CENTER);
	buffer1.textSize(20);
	buffer1.textStyle(BOLD);
	buffer3.text("Checklist", width/2, 50);
	buffer1.textSize(14);
	buffer1.textStyle(NORMAL);
	buffer3.text("1. Put the pot on the stove", width/2, 80);
	buffer3.text("2. Put the soup on the table", width/2, 110);
	buffer3.text("3. Put the toaster on the counter", width/2, 140);
	buffer3.text("4. Put the paper towel next to the toaster", width/2, 170);
	buffer3.text("5. Put the banana peel into the trash bin", width/2, 200);
	buffer3.text("6. Put the dishes near the stove", width/2, 230);
	rectMode(CENTER);
	
	buffer3.stroke(0);
	buffer3.strokeWeight(2);
	potCheckBox = color(255, 255, 255);
	soupCheckBox = color(255, 255, 255);
	toasterCheckBox = color(255, 255, 255);
	paperCheckBox = color(255, 255, 255);
	bananaCheckBox = color(255, 255, 255);
	dishCheckBox = color(255, 255, 255);

	//// ROOM 3 CONTAINER --> add to the world
	room3container = new Container3D({
		x: 20, y: 0, z: 20
	})
	world.add(room3container);

	//// room 3 furniture --> Add as a child to ROOM 2 CONTAINER
	kitWall1 = new Plane({
		x: -3, y: 3, z: 0, 
		width: 6, height: 6, 
		asset: 'kit_wall',
		repeatX: 10,
		repeatY: 10,
		rotationY: 90,
		metalness: 0.25,
		side: 'double'
	});
	room3container.addChild(kitWall1);

	kitWall2 = new Plane({
		x: 3, y: 3, z: 0, 
		width: 6, height: 6, 
		asset: 'kit_wall',
		repeatX: 10,
		repeatY: 10,
		rotationY: 90,
		metalness: 0.25,
		side: 'double'
	});
	room3container.addChild(kitWall2);

	kitWall3 = new Plane({
		x: 0, y: 3, z: 3, 
		width: 6, height: 6, 
		asset: 'kit_wall',
		repeatX: 10,
		repeatY: 10,
		rotationY: 180,
		metalness: 0.25,
		side: 'double'
	});
	room3container.addChild(kitWall3);

	kitWall4 = new Plane({
		x: 0, y: 3, z: -3, 
		width: 6, height: 6, 
		asset: 'kit_wall',
		repeatX: 10,
		repeatY: 10,
		rotationY: 180,
		metalness: 0.25,
		side: 'double'
	});
	room3container.addChild(kitWall4);

	kitFloor = new Plane ({
		x: 0, y: 0.01, z: 0,
		width: 6, height: 6,
		asset: 'kitFloor',
		repeatX: 5,
		repeatY: 5,
		side: 'double',
		rotationX: 90
	});
	room3container.addChild(kitFloor);

	kitRoof = new Plane ({
		x: 0, y: 5, z: 0,
		width: 6, height: 6,
		red: 255, green: 255, blue: 255,
		rotationX: -90,
		side: 'double'
	});
	room3container.addChild(kitRoof);

	kitSet = new GLTF({
		asset: 'kitSet_gltf',
		x: -0.35, y: 0, z: -.33,
		scaleX: 0.034, scaleY: 0.03, scaleZ: 0.03
	});
	room3container.addChild(kitSet);

	fridge = new GLTF({
		asset: 'fridge_gltf',
		x: 2.61, y: 1.15, z: 0.57,
		scaleX: 1.2, scaleY: 1.2, scaleZ: 1.3
	});
	room3container.addChild(fridge);

	microwave = new GLTF({
		asset: 'microwave_gltf',
		x: -.85, y: 1.63, z: -2.82,
		scaleY: 1.5, scaleZ: 1.7,
		rotationY: -90
	});
	room3container.addChild(microwave);

	stove = new GLTF({
		asset: 'stove_gltf',
		x: -.85, y: 0.35, z: -2.57,
		scaleX: 1.3, scaleY: 1, scaleZ: 1.4,
		rotationY: -90,
	});
	room3container.addChild(stove);

	table = new GLTF({
		asset: 'table_gltf',
		x: -1.25, y: 0, z: 1.7,
		scaleX: 0.0013, scaleY: 0.0013, scaleZ: 0.0013,
		rotationY: -90,
	});
	room3container.addChild(table);

	trashc = new GLTF({
		asset: 'trashc_gltf',
		x: 2.4, y: 0, z: 2.35,
		scaleX: 1.2, scaleY: 1.5, scaleZ: 1.2,
		rotationY: -90
	});
	room3container.addChild(trashc);

	shiba = new GLTF({
		asset: 'shiba_gltf',
		x: -.5, y: .87, z: 1.2,
		scaleX: 0.25, scaleY: 0.25, scaleZ: 0.25,
		rotationY: -150
	});
	room3container.addChild(shiba);

	//// Room 3 Spots Container --> add as a child to ROOM 2 CONTAINER
	spotContainer3 = new Container3D ({
		x: 0, y: 10, z: 0
	})
	room3container.addChild(spotContainer3);

	//// Room 3 Spots --> Push into the universal spots array
	////spots.push(new Spot(x, y, z, "room"));
	spots.push(new Spot(-0.5, 0, -1.5, "room3"));
	spots.push(new Spot(-2, 0, -1.5, "room3"));
	spots.push(new Spot(1, 0, -1.5, "room3"));

	spots.push(new Spot(-0.5, 0, -0.5, "room3"));
	spots.push(new Spot(-2, 0, -0.5, "room3"));
	spots.push(new Spot(1, 0, -0.5, "room3"));

	spots.push(new Spot(1, 0, 0.5, "room3"));
	spots.push(new Spot(1, 0, 1.5, "room3"));
	spots.push(new Spot(1, 0, 2.5, "room3"));

	spots.push(new Spot(-0.5, 1.1, -2.45, "room3")); //steel-pot spot
	spots.push(new Spot(-1.3, 0.96, 0.9, "room3")); // soup spot
	spots.push(new Spot(2.5, 1.1, -1.5, "room3")); // toaster spot
	spots.push(new Spot(2.5, 1.1, -1, "room3")); // paper spot
	spots.push(new Spot(2.5, 0.7, 2.35, "room3")); // trash spot
	spots.push(new Spot(-2, 1.1, -2.45, "room3")); // dishes spot

	//// model syntax: 
	  // new Model(asset,     x, y, z,     scale,     containerWidth, containerHeight, containerDepth,     rotateX, rotateY, rotateZ,     offsetX, offsetY, offsetZ,     heightOffset,     correctX, correctZ,     room)
	//// Room Items Push into universal items array
	steel_pot = new Model("pot_gltf", "images/kitchen/inventory/potInventory.png",
						-2, 0.2, -1.5,		// x, y, z
						0.05,      			// scale
						0.7, 0.3, 0.4,     	// containerWidth, containerHeight, containerDepth
						0, 0, 0,     		// rotationX, Y, Z
						-.15, -.15, 0,     	// offsetX, Y, Z
						0.15,     			// heightOffset
						-0.5, -2.45,     	// correctX, Z
						'room3');
	room3Items.push(steel_pot);

	soup = new Model("soup_gltf", "images/kitchen/inventory/soupInventory.png",
						1, 1.2, -2.5,		// x, y, z
						.004,      			// scale
						0.3, 0.15, 0.3,     // containerWidth, containerHeight, containerDepth
						0, 0, 0,     		// rotationX, Y, Z
						0, -0.05, 0,     	// offsetX, Y, Z
						0.06,     			// heightOffset
						-1.3, 0.9,     		// correctX, Z
						'room3');
	room3Items.push(soup);

	toaster = new Model("toaster_gltf", "images/kitchen/inventory/toasterInventory.png",
						-2.2, 0.8, 1.3,		// x, y, z
						5,      			// scale
						0.3, 0.3, 0.5,     	// containerWidth, containerHeight, containerDepth
						0, 90, 0,     		// rotationX, Y, Z
						-0.02, -0.2, 0,     // offsetX, Y, Z
						0.2,     			// heightOffset
						2.5, -1.5,     		// correctX, Z
						'room3');
	room3Items.push(toaster);

	paper = new Model("paper_gltf", "images/kitchen/inventory/paperInventory.png",
						-1.2, 0.2, 0.6,		// x, y, z
						0.01,      			// scale
						0.2, 0.3, 0.2,     	// containerWidth, containerHeight, containerDepth
						0, 0, 0,     		// rotationX, Y, Z
						0, -0.13, 0,     	// offsetX, Y, Z
						0.2,     			// heightOffet
						2.5, -1,     		// correctX, Z
						'room3');
	room3Items.push(paper);

	banana = new Model("banana_gltf", "images/kitchen/inventory/bananaInventory.png",
						1.5, 0.2, -2,		// x, y, z
						90,      			// scale
						0.5, 0.3, 0.5,     	// containerWidth, containerHeight, containerDepth
						0, 0, 0,     		// rotationX, Y, Z
						0, 0.2, -0.2,     	// offsetX, Y, Z
						0.25,     			// heightOffet
						2.5, 2.35,     		// correctX, Z
						'room3');
	room3Items.push(banana);

	dish = new Model("dish_gltf", "images/kitchen/inventory/dishesInventory.png",
						1, 0.2, 0.5,		// x, y, z
						1,      			// scale
						0.5, 0.3, 0.4,     	// containerWidth, containerHeight, containerDepth
						0, 0, 0,     		// rotationX, Y, Z
						0, 0.1, -0.2,     	// offsetX, Y, Z
						0.2,     			// heightOffet
						-2, -2.45,     		// correctX, Z
						'room3');
	room3Items.push(dish);

	checklistBoard3 = new Plane ({
		asset: checklist3,
		x: -2.9, y: 1.78, z: -.57,
		width: 1, height: 1, 
		side: 'double',
		dynamicTexture: true,
		dynamicTextureWidth: 250,
		dynamicTextureHeight: 250,
		rotationY: 90
	});
	room3container.addChild(checklistBoard3);

	sensor = new Sensor();


	p = new Plane({
		x: 0, y: 0, z: 0, 
		width: 100, height: 100, 
		red:171, green: 213, blue: 255,
		asset: 'planks',
		repeatX: 100,
		repeatY: 100,
		rotationX: -90,
		metalness: 0.25,
		side: 'double',
		
	});
	world.add(p);
}







function draw() {
	for (let i = 0; i < room1Items.length; i++) {
		room1Items[i].modelMove();


		if (room1Items[i].correctSpot()) {
		};
		room1Items[i].inventoryImage();
	}

	for (let i = 0; i < room2Items.length; i++) {
		room2Items[i].modelMove();
		room2Items[i].correctSpot();
		room2Items[i].inventoryImage();
	}

	for (let i = 0; i < room3Items.length; i++) {
		room3Items[i].modelMove();
		room3Items[i].correctSpot();
		room3Items[i].inventoryImage();
	}

	for (let i = 0; i < spots.length; i++) {
		spots[i].spot.setOpacity(0.5);
		spots[i].itemDetect();
	}

	if (room1Items[0].correctStatus == "YES" && room1Items[1].correctStatus == "YES" && room1Items[2].correctStatus == "YES") {
		level1 = "complete";
	}
	else {
		level1 = "incomplete";
	}

	if (room2Items[0].correctStatus == "YES" && room2Items[1].correctStatus == "YES" && room2Items[2].correctStatus == "YES" && room2Items[3].correctStatus == "YES") {
		level2 = "complete";
	}
	else {
		level2 = "incomplete";
	}

	if (room3Items[0].correctStatus == "YES" && room3Items[1].correctStatus == "YES" && room3Items[2].correctStatus == "YES" && room3Items[3].correctStatus == "YES" && room3Items[4].correctStatus == "YES" && room3Items[5].correctStatus == "YES") {
		level3 = "complete";
	}
	else {
		level3 = "incomplete";
	}

	if (level1 == "complete" || level2 == "complete" || level3 == "complete") {
		document.getElementById('level1_success').style.visibility='visible';
	}
	else {
		document.getElementById('level1_success').style.visibility='hidden';
	}

	if (level2 == "complete") {
		document.getElementById("subtitle").innerHTML = "Hit [SPACE] to proceed to Level 3";
	}

	if (level3 == "complete") {
		document.getElementById("subtitle").innerHTML = "You have cleared all 3 levels. Congrats!";
	}



	// Checklist boxes
	buffer1.fill(scissorCheckBox);
	buffer1.rect(20, 65, 20, 20);
	buffer1.fill(shirtCheckBox);
	buffer1.rect(20, 95, 20, 20);
	buffer1.fill(chairCheckBox);
	buffer1.rect(20, 125, 20, 20);

	// Room 1 checklist colors
	if ( room1Items[0].correctStatus == "YES" ) {
		scissorCheckBox = color(0, 255, 0);
	}
	else {
		scissorCheckBox = color(255, 255, 255);
	}
	if ( room1Items[1].correctStatus == "YES" ) {
		shirtCheckBox = color(0, 255, 0);
	}
	else {
		shirtCheckBox = color(255, 255, 255);
	}
	if ( room1Items[2].correctStatus == "YES" ) {
		chairCheckBox = color(0, 255, 0);
	}
	else {
		chairCheckBox = color(255, 255, 255);
	}

	//room2 checklist boxes 
	buffer2.fill(toothbrushCheckBox);
	buffer2.rect(20, 65, 20, 20);
	buffer2.fill(toothpasteCheckBox);
	buffer2.rect(20, 95, 20, 20);
	buffer2.fill(towelCheckBox);
	buffer2.rect(20, 125, 20, 20);
	buffer2.fill(shampooCheckBox);
	buffer2.rect(20, 155, 20, 20);

	// Room 2 checklist colors
	if ( room2Items[0].correctStatus == "YES" ) {
		toothbrushCheckBox = color(0, 255, 0);
	}
	else {
		toothbrushCheckBox = color(255, 255, 255);
	}
	if ( room2Items[1].correctStatus == "YES" ) {
		toothpasteCheckBox = color(0, 255, 0);
	}
	else {
		toothpasteCheckBox = color(255, 255, 255);
	}
	if ( room2Items[2].correctStatus == "YES" ) {
		towelCheckBox = color(0, 255, 0);
	}
	else {
		towelCheckBox = color(255, 255, 255);
	}
	if ( room2Items[3].correctStatus == "YES" ) {
		shampooCheckBox = color(0, 255, 0);
	}
	else {
		shampooCheckBox = color(255, 255, 255);
	}

	// Room3 Checklist boxes
	buffer3.fill(potCheckBox);
	buffer3.rect(20, 65, 20, 20);
	buffer3.fill(soupCheckBox);
	buffer3.rect(20, 95, 20, 20);
	buffer3.fill(toasterCheckBox);
	buffer3.rect(20, 125, 20, 20);
	buffer3.fill(paperCheckBox);
	buffer3.rect(20, 155, 20, 20);
	buffer3.fill(bananaCheckBox);
	buffer3.rect(20, 185, 20, 20);
	buffer3.fill(dishCheckBox);
	buffer3.rect(20, 215, 20, 20);

	// Room3 Checklist colors
	if ( room3Items[0].correctStatus == "YES" ) {
		potCheckBox = color(0, 255, 0);
	}
	else {
		potCheckBox = color(255, 255, 255);
	}
	if ( room3Items[1].correctStatus == "YES" ) {
		soupCheckBox = color(0, 255, 0);
	}
	else {
		soupCheckBox = color(255, 255, 255);
	}
	if ( room3Items[2].correctStatus == "YES" ) {
		toasterCheckBox = color(0, 255, 0);
	}
	else {
		toasterCheckBox = color(255, 255, 255);
	}
	if ( room3Items[3].correctStatus == "YES" ) {
		paperCheckBox = color(0, 255, 0);
	}
	else {
		paperCheckBox = color(255, 255, 255);
	}
	if ( room3Items[4].correctStatus == "YES" ) {
		bananaCheckBox = color(0, 255, 0);
	}
	else {
		bananaCheckBox = color(255, 255, 255);
	}
	if ( room3Items[5].correctStatus == "YES" ) {
		dishCheckBox = color(0, 255, 0);
	}
	else {
		dishCheckBox = color(255, 255, 255);
	}


	sensor.follow();
	sensor.limit();


}





class Spot {
	constructor(x, y, z, room) {
		this.room = room;
		this.spot = new Sphere({
			x: x, y: y, z: z,
			radius: 0.1,
			red: 255, green: 255, blue: 0,
			opacity: 0.5,

			clickFunction: function(spot) {
				for (let i = 0; i < room1Items.length; i++) {
					if (room1Items[i].container.y == 10) {
						room1Items[i].container.setPosition(spot.x, spot.y + room1Items[i].heightOffset, spot.z);
					}
					
				}
				for (let i = 0; i < room2Items.length; i++) {
					if (room2Items[i].container.y == 10) {
						room2Items[i].container.setPosition(spot.x, spot.y + room2Items[i].heightOffset, spot.z);
					}
				}
				for (let i = 0; i < room3Items.length; i++) {
					if (room3Items[i].container.y == 10) {
						room3Items[i].container.setPosition(spot.x, spot.y + room3Items[i].heightOffset, spot.z);
					}
				}
				spotContainer1.setPosition(0, 10, 0);
				spotContainer2.setPosition(0, 10, 0);
				spotContainer3.setPosition(0, 10, 0);
				document.getElementById("inventory_image").src="images/emptyInventory.png";

				
			},

			enterFunction: function(spot) {
				spot.setColor(0, 255, 0);
				console.log(spot.x, spot.y, spot.z);
			},

			leaveFunction: function(spot) {
				spot.setColor(255, 255, 0);
			}
		});

		if (this.room == "room1") {
			spotContainer1.addChild(this.spot);
		}
		if (this.room == "room2") {
			spotContainer2.addChild(this.spot);
		}
		if (this.room == "room3") {
			spotContainer3.addChild(this.spot);
		}

	}

	itemDetect() {
		for (let i = 0; i < room1Items.length; i++) {
			if (room1Items[i].container.x == this.spot.x && room1Items[i].container.z == this.spot.z && room1Items[i].room == this.room) {
				this.spot.setOpacity(0);
			}
		}

		for (let i = 0; i < room2Items.length; i++) {
			if (room2Items[i].container.x == this.spot.x && room2Items[i].container.z == this.spot.z && room2Items[i].room == this.room) {
				this.spot.setOpacity(0);
			}
		}



		for (let i = 0; i < room3Items.length; i++) {
			if (room3Items[i].container.x == this.spot.x && room3Items[i].container.z == this.spot.z && room3Items[i].room == this.room) {
				this.spot.setOpacity(0);
			}
		}
	}





}

class Model {
	constructor(asset, inventoryAsset, x, y, z, scale, containerW, containerH, containerD, rotateX, rotateY, rotateZ, offsetX, offsetY, offsetZ, heightOffset, correctX, correctZ, room) {
		this.offsetX = offsetX;
		this.offsetY = offsetY;
		this.offsetZ = offsetZ;
		this.heightOffset = heightOffset;
		this.correctX = correctX;
		this.correctZ = correctZ;
		this.correctStatus = "NO";
		this.room = room;
		this.inventoryAsset = inventoryAsset;
		this.model = new GLTF ({
			asset: asset,
			x: x + this.offsetX, y: y + this.offsetY, z: z + this.offsetZ,
			scaleX: scale,
			scaleY: scale,
			scaleZ: scale,
			rotationX: rotateX,
			rotationY: rotateY,
			rotationZ: rotateZ,
			// container: this.container
			
		})

		this.container = new Box ({
			x:x, y:y, z:z, 
			width: containerW, height: containerH, depth: containerD,
			red: 255, green: 255, blue: 255,
			opacity: 0,
			enterFunction: function(theContainer) {
				theContainer.setOpacity(0.5);
			},
			leaveFunction: function(theContainer) {
				theContainer.setOpacity(0);
			},

			clickFunction: function(theContainer) {
				theContainer.setPosition(0, 10, 0);
				spotContainer1.setPosition(0, 0, 0);
				spotContainer2.setPosition(0, 0, 0);
				spotContainer3.setPosition(0, 0, 0);
			}
		})

		if (this.room == "room1") {
			room1container.addChild(this.model);
			room1container.addChild(this.container);
		}
		if (this.room == "room2") {
			room2container.addChild(this.model);
			room2container.addChild(this.container);
		}
		if (this.room == "room3") {
			room3container.addChild(this.model);
			room3container.addChild(this.container);
		}
		// world.add(this.model);
		// world.add(this.container);
	}

	modelMove() {
		this.model.setPosition( this.container.x + this.offsetX, this.container.y + this.offsetY, this.container.z + this.offsetZ )
	}

	correctSpot() {
		if (this.container.x == this.correctX && this.container.z == this.correctZ) {
			this.correctStatus = "YES";
			return true;
		}
		else {
			this.correctStatus = "NO";
			return false;
		}
		console.log(this.correctStatus);
	}

	inventoryImage() {
		if (this.container.y == 10) {
			document.getElementById("inventory_image").src=this.inventoryAsset;
		}
	}
}

class Sensor {
	constructor() {
		this.x = world.getUserPosition().x;
		this.z = world.getUserPosition().z;
	}

	follow() {
		this.x = world.getUserPosition().x;
		this.z = world.getUserPosition().z;
	}

	limit() {
		if (userCurrentRoom == "room1") {
			if (this.x > 2.5) {
				world.setUserPosition(2.5, 1.3, this.z);
			}
			if (this.x < -2.5) {
				world.setUserPosition(-2.5, 1.3, this.z);
			}
			if (this.z > 2.5) {
				world.setUserPosition(this.x, 1.3, 2.5);
			}
			if (this.z < -2.5) {
				world.setUserPosition(this.x, 1.3, -2.5);
			}
		}

		if (userCurrentRoom == "room2") {
			if (this.x > 12.5) {
				world.setUserPosition(12.5, 1.3, this.z);
			}
			if (this.x < 7.5) {
				world.setUserPosition(7.5, 1.3, this.z);
			}
			if (this.z > 12.5) {
				world.setUserPosition(this.x, 1.3, 12.5);
			}
			if (this.z < 7.5) {
				world.setUserPosition(this.x, 1.3, 7.5);
			}
		}

		if (userCurrentRoom == "room3") {
			if (this.x > 22.5) {
				world.setUserPosition(22.5, 1.3, this.z);
			}
			if (this.x < 17.5) {
				world.setUserPosition(17.5, 1.3, this.z);
			}
			if (this.z > 22.5) {
				world.setUserPosition(this.x, 1.3, 22.5);
			}
			if (this.z < 17.5) {
				world.setUserPosition(this.x, 1.3, 17.5);
			}
		}
	}
}

function keyPressed() {
	if (keyCode == 32) {
		if (level2 == "complete") {
			goToLevel3();
			for (let i = 0; i < room2Items.length; i++) {
				room2Items[i].container.setPosition(-100, -100, -100);
			}
		}

		else if (level1 == "complete") {
			goToLevel2();
			for (let i = 0; i < room1Items.length; i++) {
				room1Items[i].container.setPosition(-100, -100, -100);
			}
		}
	}

	if (keyCode == 32) {
		document.getElementById('instruction').style.visibility='hidden';
	}
}

function goToLevel2() {
	userCurrentRoom = "room0";
	world.setUserPosition(8, 1.5, 12);
	setTimeout(function(){
		userCurrentRoom = "room2";
	}, 1000);
}

function goToLevel3() {
	userCurrentRoom = "room0";
	world.setUserPosition(20, 1.4, 20);
	setTimeout(function(){
		userCurrentRoom = "room3";
	}, 1000);
}