

//modul of the display PixelFormat


let pixFormatUI=null;

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
