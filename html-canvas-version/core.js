var canvas = document.getElementById( "canvas" );
var context = canvas.getContext( "2d" );
var OPTIONS = {
	SIZE: {
		WIDTH: 800,
		HEIGHT: 600,
		ROAD_WIDTH: 50
	},
	COLORS: {
		BACKGROUND: '#EEEEEE',
		ROAD: '#EE9944',
		CAR: '#99EE44'
	},
	CARS: {
		NUM: 100,
		SIZE: {
			HEIGHT: 20,
			WIDTH: 40,
			PADDING: 20
		}
	}
};
var cars = [];

// set canvas size
canvas.width = OPTIONS.SIZE.WIDTH;
canvas.height = OPTIONS.SIZE.HEIGHT; 
canvas.style.width = OPTIONS.SIZE.WIDTH + 'px';
canvas.style.height = OPTIONS.SIZE.HEIGHT + 'px';

// create car objects
for( var i = 0; i < OPTIONS.CARS.NUM; i++ ) {
	if( i < ( OPTIONS.CARS.NUM / 2 ) ) {
		cars[ i ] = {
			x: i * ( OPTIONS.CARS.SIZE.WIDTH + OPTIONS.CARS.SIZE.PADDING ),
			y: ( OPTIONS.SIZE.HEIGHT - OPTIONS.SIZE.ROAD_WIDTH ) / 2,
			v: 1,
			d: 0
		};
	} else {
		cars[ i ] = {
			x: ( i - OPTIONS.CARS.NUM / 2 ) * ( OPTIONS.CARS.SIZE.WIDTH + OPTIONS.CARS.SIZE.PADDING ),
			y: ( OPTIONS.SIZE.HEIGHT - OPTIONS.SIZE.ROAD_WIDTH + OPTIONS.CARS.SIZE.WIDTH + OPTIONS.CARS.SIZE.PADDING ) / 2,
			v: 1,
			d: Math.PI
		};
	}
}

// run simulation
function run() {
    requestAnimationFrame( run );

    // clear canvas
	clearCanvas();

	// draw background
	context.fillStyle = OPTIONS.COLORS.BACKGROUND;
	context.fillRect( 0, 0, OPTIONS.SIZE.WIDTH, OPTIONS.SIZE.HEIGHT );

	// draw intersection
	context.fillStyle = OPTIONS.COLORS.ROAD;
	context.fillRect( ( OPTIONS.SIZE.WIDTH - OPTIONS.SIZE.ROAD_WIDTH ) / 2, 0, OPTIONS.SIZE.ROAD_WIDTH, OPTIONS.SIZE.HEIGHT );
	context.fillRect( 0, ( OPTIONS.SIZE.HEIGHT - OPTIONS.SIZE.ROAD_WIDTH ) / 2, OPTIONS.SIZE.WIDTH, OPTIONS.SIZE.ROAD_WIDTH );

	// draw cars
	for( var i = 0; i < OPTIONS.CARS.NUM; i++ ) {
		cars[ i ].x += cars[ i ].v * Math.cos( cars[ i ].d );
		cars[ i ].y += cars[ i ].v * Math.sin( cars[ i ].d );

		drawCar( cars[ i ] );
	}
}
run();

function clearCanvas() {
	context.clearRect( 0, 0, context.canvas.width, context.canvas.height );
}

function drawCar( car ) {
	context.fillStyle = OPTIONS.COLORS.CAR;
	context.fillRect( car.x, car.y, OPTIONS.CARS.SIZE.WIDTH, OPTIONS.CARS.SIZE.HEIGHT );
}