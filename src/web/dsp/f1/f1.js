

//modul of the display F1





let netSystem;// = new NetSystem();

let fonClientStart=null;
let cmdClientAdd=null;
let fonF1;


function setupDspF1(){
    netSystem = new NetSystem();
    netSystem.clientSet.addClient();

    let fonW = netSystem.clientSet.client[1].w1-netSystem.clientSet.client[1].borderWidth*2;
    let fonH = netSystem.clientSet.client[1].h1-netSystem.clientSet.client[1].borderWidth*2-netSystem.clientSet.client[1].titleHeight;

    fonClientStart = new FonClientStart(fonW,fonH);

    cmdClientAdd = new Cmd();
    cmdClientAdd.pos.x = 0;
    cmdClientAdd.caption = "+ CLIENT";
    cmdClientAdd.pos.y = height-cmdClientAdd.h1;


    fonF1 = new FonF1();





    }//setupDspF1

function repositionF1(){
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

    if (cmdClientAdd.eventMouseDown()) netSystem.clientSet.addClient();

    }//drawDspF1
