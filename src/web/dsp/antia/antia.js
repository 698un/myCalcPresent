

//modul of the display antia

let image0;
let image1;
let testImageWidth = 50;

function setupDspAntia(){

	
	image0 = new AImage(50,5);
	image1 = new AImage(50,5);
	rePositionAntia();

    }//setupDspAntia

function rePositionAntia(){


    let minWidth = width/3;
    if (height/3<minWidth) minWidth = height/3;

    image0.setSize(minWidth,minWidth);
    image1.setSize(minWidth,minWidth);

    image0.pos.x = minWidth*0.5;
    image1.pos.x = image0.pos.x+image0.w1+globalBorderWidth;

    image0.pos.y = minWidth*0.5;
    image1.pos.y = image0.pos.y;

    }//rePosition



function drawDspAntia(){
    background(0);

    image0.display();
    image1.display();

    }//drawDspAntia
