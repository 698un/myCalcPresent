

//modul of the display F1



//let gameplay_init = false;

let netSystem;// = new NetSystem();

let fonClientStart=null;
let cmdClientAdd=null;
let fonF1=1;
//computer

function setupDspF1(){


    netSystem = new NetSystem();
    netSystem.computerSet.addComputer();

    let fonW = netSystem.computerSet.computer[1].w1-netSystem.computerSet.computer[1].borderWidth*2;
    let fonH = netSystem.computerSet.computer[1].h1-netSystem.computerSet.computer[1].borderWidth*2-netSystem.computerSet.computer[1].titleHeight;

    fonClientStart = new FonClientStart(fonW,fonH);

    cmdClientAdd = new Cmd();
    cmdClientAdd.pos.x = 0;
    cmdClientAdd.caption = "+ CLIENT";
    cmdClientAdd.pos.y = height-cmdClientAdd.h1;

    //регулятор скорости запросов
    scrollVSend = new VStatus();
    //значения
    scrollVSend.min = 50;    scrollVSend.max = 500;    scrollVSend.value = 100;
    scrollVSend.titleBeforeValue = "Speed=";    scrollVSend.titleAfterValue = " px";
    scrollVSend.controlEnabled = true;







    fonF1 = new FonF1();



    }//setupDspF1

function rePositionF1(){
    netSystem.reposition();
    cmdClientAdd.pos.y = height-cmdClientAdd.h1;

    }


function drawDspF1(){


    fonClientStart.update();//backGround for startClient

    //background(0);
    fonF1.update();
    image(fonF1.cnvFon,0,0);



    netSystem.update();
    netSystem.display();

    cmdClientAdd.display();
    scrollVSend.display();

    if (cmdClientAdd.eventMouseDown()) netSystem.computerSet.addComputer();

    if (scrollVSend.eventChangeValue()) vSend = scrollVSend.value;

    }//drawDspF1
