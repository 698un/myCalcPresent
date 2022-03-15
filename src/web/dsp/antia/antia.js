

//modul of the display antia

let image0;
let image1;
let testImageWidth = 50;

let antiaUI=null;

function setupDspAntia(){

    if (antiaUI==null) antiaUI = new AntiaUI();

     }//setupDspAntia

function rePositionAntia(){

    antiaUI.rePosition();

    }//rePosition



function drawDspAntia(){
    background(0);

    antiaUI.display();


    }//drawDspAntia
