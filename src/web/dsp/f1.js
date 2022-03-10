

//modul of the display F1



let netSystem;// = new NetSystem();




function setupDspF1(){
    netSystem = new NetSystem();
    netSystem.clientRep.addClient();
    }//setupDspF1

function repositionF1(){
    netSystem.reposition();

    }


function drawDspF1(){
    background(0);
    netSystem.display();
    }//drawDspF1
