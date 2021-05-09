var canvas;
var gl;
var vPosition;
var program;

var letter1vertices, letter2vertices;
var buffer1, buffer2;

var redValue=1;
var greenValue=0;
var blueValue=0;

var posX=0.0;
var posY=0.0;

var scaleX=1;
var scaleY=1;
// TODO: define any global variables you need

window.onload = function init()
{
	canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    //  Configure WebGL
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

    //  Load shaders and initialize attribute buffers
    program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

		colorLoc = gl.getUniformLocation(program,"color");
		//positionLoc= gl.getUniformLocation(program,"pos")

		drawLetters();

 function drawLetters(){

    letter1vertices = [
						vec2(-0.7, 0.4),
                        vec2(-0.7, -0.4),
                        vec2(-0.6, 0.4),
                        vec2(-0.6, -0.4),
						//b sağ üst
												vec2(-0.6, 0.4),
                        vec2(-0.6, 0.3),
                        vec2(-0.3, 0.2),
                        vec2(-0.3, 0.1),

												vec2(-0.3, 0.1),
												vec2(-0.3, 0.2),
												vec2(-0.6, 0.0),
												vec2(-0.6, 0.0),

					 vec2(-0.6, +0.0),
					 vec2(-0.3, -0.3),
					 vec2(-0.3, -0.4),

					 vec2(-0.3, -0.4),
					 vec2(-0.6, +0.0),
					 vec2(-0.7, +0.0),

					 vec2(-0.7, +0.0),
					 vec2(-0.6 ,+0.0),
					 vec2(-0.3, +0.2)



									];


    letter2vertices = [ vec2(0.1, 0.4),
                        vec2(0.1, -0.4),
                        vec2(0.2, 0.4),
                        vec2(0.2, -0.4),
                        vec2(0.2, -0.4),
										                        vec2(0.2, -0.4),
																						vec2(0.2, +0.0),


																						vec2(0.2, 0.0),
																						vec2(0.5, 0.4),
																						vec2(0.5, 0.3),

																						vec2(0.5, 0.3),

																						vec2(0.5, 0.4),
																						vec2(0.2, det2+0.0),


																						vec2(0.2, 0.0),
																						vec2(0.5, -0.3),
																						vec2(0.5, -0.4),

																						vec2(0.5, -0.4),
																						vec2(0.1, 0.0),
																						vec2(0.2, 0.0),

																						vec2(0.2, 0.0),
																						vec2(0.5, 0.4),
																						vec2(0.20, 0.1) ];
															 }
    // TODO: create vertex coordinates for your initial letters instead of these vertices

    // Load the data into the GPU
		buffer1 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, buffer1 );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(letter1vertices), gl.STATIC_DRAW );

    buffer2 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, buffer2 );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(letter2vertices), gl.STATIC_DRAW );

		document.getElementById("posX").oninput = function(event) {
				posX=this.value;
    };
    document.getElementById("posY").oninput = function(event) {
				posY=this.value;
    };
    document.getElementById("scaleX").oninput = function(event) {
        //TODO: fill here to adjust scale according to slider value
				scaleX=parseFloat(event.target.value);
    };
    document.getElementById("scaleY").oninput = function(event) {
        //TODO: fill here to adjust scale according to slider value
				scaleY=parseFloat(event.target.value);
				    };
    document.getElementById("redSlider").oninput = function(event) {
        //TODO: fill here to adjust color according to slider value
				redValue=event.target.value;
    };
    document.getElementById("greenSlider").oninput = function(event) {
        //TODO: fill here to adjust color according to slider value
				 greenValue=event.target.value;
    };
    document.getElementById("blueSlider").oninput = function(event) {
        //TODO: fill here to adjust color according to slider value
				blueValue=event.target.value;
    };

    render();
};

function render() {
    gl.clear( gl.COLOR_BUFFER_BIT );
		colorLoc=gl.getUniformLocation(program,"color");
		positionLoc=gl.getUniformLocation(program,"pos");
		scaleLoc=gl.getUniformLocation(program,"scale");
		gl.uniform2fv(positionLoc, vec2(posX, posY));
		gl.uniform2fv(scaleLoc, vec2(scaleX, scaleY));


    // TODO: Send necessary uniform variables to shader and
    // perform draw calls for drawing letters

    // bind vertex buffer and associate position data with shader variables
		color = vec4(window.redValue,window.greenValue,window.blueValue,1.0);
		gl.uniform4fv(colorLoc,color);
    gl.bindBuffer( gl.ARRAY_BUFFER, buffer1 );
		gl.bufferSubData(gl.ARRAY_BUFFER,0, flatten(letter1vertices));
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
    // draw triangle
	gl.drawArrays(gl.TRIANGLE_STRIP, vPosition, letter1vertices.length);

		// bind vertex buffer and associate position data with shader variables
		color = vec4(1-window.redValue,1-window.greenValue,1-window.blueValue,1.0);
		gl.uniform4fv(colorLoc,color);
    gl.bindBuffer( gl.ARRAY_BUFFER, buffer2 );
		gl.bufferSubData(gl.ARRAY_BUFFER, vPosition, flatten(letter2vertices));
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
    // draw rectangle
	gl.drawArrays(gl.TRIANGLE_STRIP, vPosition, letter2vertices.length);

    window.requestAnimFrame(render);
}
