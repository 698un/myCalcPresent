

//modul of the display PixelFormat


let pixFormatUI=null;

function setupDspPixelFormat(){
    if (pixFormatUI==null) pixFormatUI = new PixelFormatUI();
    }//setupDspPixelFormat


function rePositionPixelFormat(){




    pixFormatUI.rePosition();
    }//rePosition



function drawDspPixelFormat(){
    //background(0);

    //background(0);
    fonF1.update();
    image(fonF1.cnvFon,0,0);

    //зЕТЕМНЕНИЕ фона сверху
    strokeWeight(10);
    let col = 0;
    for (let ye=0;ye<height/2;ye=ye+5){
        col = (height-ye)/height*255;
        stroke(0,0,0,col/3);
        line(0,ye,width,ye);

    }
    strokeWeight(1);


    pixFormatUI.display();
    }//drawDspPixelFormat
