
//управление физическим временем
let dt=0.01;
let tOld =0;
let tNow=0;
let tMillis=0;

//значение поворота колеса мышы
let MW_delta = 0.01;
let MW_press = false;
let MW_prevPress = false;

let widthPrev;//=width;//640;
let heightPrev;// = height;//360;

let firstDraw=true;
let animatedEnabled=true;

let currentScene = "gameplay";
let oldScene="none";

let menu;

function setup() {


    noSmooth();

    createCanvas(800,500,P2D);
	menu=new VMenu();//главное меню
    dspSetup();
    windowResized();

    widthPrev =  width;
    heightPrev = height;
    }//setup


function timeReCalc(){
    tMillis = millis();
    tNow = tMillis*0.001;
    dt=tNow-tOld;
    tOld = tNow;
    }


function draw() {
    timeReCalc();

    if (firstDraw==true) {
        dspSetup();
        firstDraw = false;
        }

	
    dspReDraw();

	//work with menu
	menu.display();
	let menuEvent=menu.mouseEvent();
	if (menuEvent=="gameplay") currentScene="gameplay";
    if (menuEvent=="antia")    currentScene="antia";



    if (width!=widthPrev ||
        height!=heightPrev ) {
                    windowResized();
                    widthPrev = width;
                    heightPrev = height;
                    }


    MW_delta = 0;//reset to sero mouseWheelValue after cicle of draw
    MW_prevPress=MW_press;
    //console.log( document.getElementById("pt1").innerText.length);
    }//draw




function windowResized() {

    resizeCanvas(windowWidth,windowHeight)
    menu.rePosition();
	
    if (currentScene=="gameplay") rePositionF1();
    if (currentScene=="antia")    rePositionAntia();

    }//windowResized





function mouseWheel(event){
    MW_delta = event.deltaY;


    }

function mousePressed(event){
    MW_press = true;
    //alert(getRandomHash(10));

    //let s = createIP();
    }

function mouseReleased(event){

    MW_press = false;
    console.log("mouseRelease");
    }


function dspSetup(){
    if (currentScene=="gameplay") setupDspF1();
    if (currentScene=="antia") setupDspAntia();
    firstDraw = true;
    }//dspReSetup



function dspReDraw(){

    if (oldScene!=currentScene) {
        oldScene = currentScene;
        dspSetup();
        }


    if (currentScene=="gameplay") drawDspF1();
    if (currentScene=="antia") drawDspAntia();
    }//dspReDraw

