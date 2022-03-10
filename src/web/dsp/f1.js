

//modul of the display F1





let netSystem;// = new NetSystem();

let fonClientStart=null;
let cmdClientAdd=null;


function setupDspF1(){
    netSystem = new NetSystem();
    netSystem.clientSet.addClient();

    let fonW = netSystem.clientSet.client[0].w1-netSystem.clientSet.client[0].borderWidth*2;
    let fonH = netSystem.clientSet.client[0].h1-netSystem.clientSet.client[0].borderWidth*2-netSystem.clientSet.client[0].titleHeight;

    fonClientStart = new FonClientStart(fonW,fonH);

    cmdClientAdd = new Cmd();
    cmdClientAdd.pos.x = 0;
    cmdClientAdd.caption = "+ CLIENT";
    cmdClientAdd.pos.y = height-cmdClientAdd.h1;




}//setupDspF1

function repositionF1(){
    netSystem.reposition();
    cmdClientAdd.pos.y = height-cmdClientAdd.h1;

    }


function drawDspF1(){


    fonClientStart.update();//backGround for startClient

    background(0);
    netSystem.display();

    cmdClientAdd.display();

    if (cmdClientAdd.eventMouseDown()) netSystem.clientSet.addClient();

    }//drawDspF1
