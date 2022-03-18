

//modul of the display PixelFormat


let pixFormatUI=null;

function setupDspPixelFormat(){
    if (pixFormatUI==null) pixFormatUI = new PixelFormatUI();
    }//setupDspPixelFormat


function rePositionPixelFormat(){
    pixFormatUI.rePosition();
    }//rePosition



function drawDspPixelFormat(){
    background(0);
    pixFormatUI.display();
    }//drawDspPixelFormat
