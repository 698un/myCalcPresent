

class FonF1 {

    constructor(){

        this.tSize=  globalTextSize*1.25;//20;

        this.cnvFon = createGraphics(640,480);
        this.cnvFon.textSize(this.tSize);
        this.cnvFon.background(0);
		this.cnvFon.textAlign(CENTER,CENTER);
        createProgramText();

        this.lineIndex =0;
        this.textYe = 0;
        this.startLine = 0;

        }//constructor


    canvasReSize(){
        if (this.cnvFon.width!=width ||
            this.cnvFon.height!=height) this.cnvFon = createGraphics(width,height);

        }//canvas

    update(){


        //if (frameCount%5!=0) return;
        this.canvasReSize();


        let alpha = 0;
        let th = this.tSize*0.75;

        //this.startLine=(this.startLine+1)%programText.length;

        let lineInScreen = height/th;
        let lineNum=0;
        let ye=0;
        this.cnvFon.background(0);

        //alpha = sqrt(this.textYe*1.0/height);
        //this.cnvFon.fill(255*alpha,255*alpha,0);//,alpha*255);

        this.textYe=this.textYe+3;
        if (this.textYe>=th) {
            this.textYe=this.textYe-th;
            this.startLine=(this.startLine+1)%programText.length;
            }

        let tmpr= 55+mouseY/height*50;


        this.startLine = Math.round(tmpr);
        this.textYe =(tmpr - this.startLine)*th;



        for (let i=0;i<=lineInScreen+2;i++){

            lineNum = (this.startLine+i)%programText.length;

            //this.textYe =(this.textYe+this.tSize*0.75)%height;
            ye = i*th;


            //alpha = 1-sq((ye-height/2)/height*2.0);
            //this.cnvFon.fill(255*alpha,255*alpha,0);//,alpha*255);


            //this.cnvFon.text(programText[lineNum],10,ye-this.textYe);
            this.writeLine(lineNum,ye-this.textYe);

            }


        }//update


    writeLine(lineNum,ye){

        let str = programText[lineNum];
        let len =  str.length;
        let xe;
		
		//define textWidth by vertical
        let tw = 0.1+0.7*(sq((ye-height/2)/height)+0.5);
        let colR = 0;
        let colB = 0;

		//defined velocity of  light in line
        let v =(sin(lineNum*553434)+1+0.2)*10;
        if (v<5) v=5;

        let lightSymbolIndex= (80*sin(lineNum*2323)+tMillis*0.001*v)%100;


        for (let i=0;i<len;i++){
            xe = 10+i*this.tSize*tw;

            colR = 255-abs(i-lightSymbolIndex)*55;
            if (colR<0) colR = 0;

            colB = 127;
            if (colR>220) colB = 255;

			//this.cnvFon.textSize(this.tSize+5*(colR-0)/255);

            this.cnvFon.fill(255,colR,127);


            this.cnvFon.text(str[i],xe,ye);
            }//next xe


        }//writeLine


}//class FonF1





let programText=[];

function createProgramText() {

    programText.push('package by.unil2.itstep.testSring1.dao.repository;');
    programText.push('import by.unil2.itstep.testSring1.dao.model.PixelLine;');
    programText.push('import by.unil2.itstep.testSring1.dao.model.enums.ImageStatus;');
    programText.push('import by.unil2.itstep.testSring1.exceptions.AccessException;');
    programText.push('import by.unil2.itstep.testSring1.exceptions.CalcException;');
    programText.push('import by.unil2.itstep.testSring1.utilits.CalcOptions;');
    programText.push('import by.unil2.itstep.testSring1.dao.model.MyImage;');
    programText.push('import by.unil2.itstep.testSring1.utilits.MyLocker;');
    programText.push('import by.unil2.itstep.testSring1.utilits.loger.MyLogger;');
    programText.push('import org.springframework.stereotype.Component;');
    programText.push('import javax.servlet.ServletConfig;');
    programText.push('import java.io.File;');
    programText.push('import java.util.Random;');
    programText.push('@Component');
    programText.push('public class ImageRepository {');
    programText.push('    private final CalcOptions calcOpt;');
    programText.push('    private final MyLogger myLog;');
    programText.push(' //constructor');
    programText.push('public ImageRepository(CalcOptions inpCalcOptions,');
    programText.push('                           MyLogger inpMyLogger');
    programText.push('                           ) {');
    programText.push('        //this.config = inpServletConfig;//.getServletContext();');
    programText.push('        //String contextPath = config.getServletContext().getContextPath();');
    programText.push('        //System.out.println("PATH = "+contextPath);');
    programText.push('        this.calcOpt = inpCalcOptions;');
    programText.push('this.myLog   = inpMyLogger;');
    programText.push('this.reset();');
    programText.push('}');
    programText.push('    private int imgWidth;');
    programText.push('private int imgHeight;');
    programText.push('private int imgAntialiasing;//РіР»СѓР±РёРЅР° Р°РЅС‚РёР°Р»СЊСЏСЃРёРЅРіР°');
    programText.push('private String sceneKey;');
    programText.push('private String imageResultatFolder;');
    programText.push('    public void reset(){');
    programText.push('        myLog.info(" Init applicationPath: "+calcOpt.getApplicationPath());');
    programText.push('');
    programText.push('//create Folder for images');

    programText.push('');
    programText.push('    try {');
    programText.push('        this.deleteAllImages();');
    programText.push('} catch (Exception e){');
    programText.push('myLog.trace("DELETE IMAGES ERROR");');
    programText.push('};');
    programText.push('');
    programText.push('//set options from config');
    programText.push('this.imageResultatFolder=calcOpt.getApplicationPath()+');
    programText.push('                                 File.separator+');
    programText.push('                                 calcOpt.getStr("imageResultatFolder");//get folder of images from config');
    programText.push('');
    programText.push('        this.imgWidth=           calcOpt.getInt("imageWidth" );');
    programText.push('        this.imgHeight=          calcOpt.getInt("imageHeight");');
    programText.push('        this.imgAntialiasing =   calcOpt.getInt("antialiasing" );');
    programText.push('');
    programText.push('        this.imgCountInBuffer =calcOpt.getInt("imageInBuffer");//ImageInBufferCount();');
    programText.push('        this.imgInBuffer = new MyImage[imgCountInBuffer];//create buffer for several images');
    programText.push('');
    programText.push('//create object of images in buffer');
    programText.push('        for (int i=0;i<imgCountInBuffer;i++){');
    programText.push('            imgInBuffer[i] = new MyImage(this.imgWidth,');
    programText.push('                                         this.imgHeight,');
    programText.push('                                         i,         //mark all imageObject in buffer as frameIndex');
    programText.push('                                         calcOpt.getInt("lineLifeTime"),  //set lineLifeTime for every pixelLine in this image');
    programText.push('                                         this.imageResultatFolder');
    programText.push('                                         );');
    programText.push('');
    programText.push('');
    programText.push('');
    programText.push('            newFrameNum = imgCountInBuffer;//defined next frameIndex as last frameIndex in buffer+1');
    programText.push('        }//Next i');
    programText.push('');
    programText.push('        //generate new  sceneKey');
    programText.push('        this.sceneKey = getNewKey();');
    programText.push('}//reset');
    programText.push('');
    programText.push('    public int getImageWidth() {');
    programText.push('        return this.imgWidth;');
    programText.push('    }');
    programText.push('    public int getImageHeight() {');
    programText.push('        return this.imgHeight;');
    programText.push('    }');
    programText.push('    public int getImageAntialiasing() {');
    programText.push('        return this.imgAntialiasing;');
    programText.push('    }');
    programText.push('');
    programText.push('    public String getSceneKey() {');
    programText.push('        return this.sceneKey;');
    programText.push('    }');
    programText.push('');
    programText.push('    private MyImage[] imgInBuffer;');
    programText.push('    private int imgCountInBuffer;');
    programText.push('    private int newFrameNum;');
    programText.push('    private int sourceIndex=0;');
    programText.push('');
    programText.push('    public PixelLine getEmptyPixelLine(String clientKey) throws Exception {');
    programText.push('');
    programText.push('        PixelLine currentPixelLine = null;');
    programText.push('');
    programText.push('        //clearCompletteImagesFromBuffer();//');
    programText.push('');
    programText.push('        int i;');
    programText.push('        for (int j = sourceIndex; j < sourceIndex+imgCountInBuffer; j++) {');
    programText.push('');
    programText.push('            i=j;');
    programText.push('            if (i>imgCountInBuffer-1) i=(i-imgCountInBuffer+1);');
    programText.push('');
    programText.push('');
    programText.push('//            i=Math.random()*');
    programText.push('');
    programText.push('            //Loked image because search by all pixelLine in current image');
    programText.push('            synchronized (MyLocker.getLocker()) {');
    programText.push('                //search only in uncomplette images');
    programText.push('                if (imgInBuffer[i].getProcesstatus() == ImageStatus.CALC_PROCESS)');
    programText.push('                    currentPixelLine = imgInBuffer[i].getEmptyPixelLine(clientKey);');
    programText.push('            }//synchronized');
    programText.push('');
    programText.push('            //if free pixelLine  is exist then return it');
    programText.push('            //synchronized (MyLocker.getLocker()) {');
    programText.push('            if (currentPixelLine != null) return currentPixelLine;');
    programText.push('');
    programText.push('        }//next i');
    programText.push('');
    programText.push('        //if not empty pixelLine then exception');
    programText.push('        throw new CalcException("Calculate is END");');
    programText.push('');
    programText.push('    }');
    programText.push('');
    programText.push('    private void  clearCompletteImagesFromBuffer(){');
    programText.push('');
    programText.push('        //search completted images and erase it');
    programText.push('        for (int i = 0; i < imgCountInBuffer; i++) {');
    programText.push('            //action for save correct');
    programText.push('            if (imgInBuffer[i].getProcesstatus() == ImageStatus.SAVE_COMPLETTE ||');
    programText.push('                imgInBuffer[i].getProcesstatus() == ImageStatus.SAVE_ERROR) {');
    programText.push('                myLog.info("image " + imgInBuffer[i].getFrameNum() + " "+ imgInBuffer[i].getProcesstatus());');
    programText.push('                deleteOneImageFromBuffer(i);');
    programText.push('            }');
    programText.push('');
    programText.push('        }//next i');
    programText.push('');
    programText.push('    }//clearCompletteImagesFromBuffer(){');
    programText.push('');
    programText.push('    private synchronized void deleteOneImageFromBuffer(int index){');
    programText.push('');
    programText.push('        if (imgInBuffer[index].getProcesstatus()==ImageStatus.CALC_PROCESS) return;');
    programText.push('');
    programText.push('        int oldFrameNum = imgInBuffer[index].getFrameNum();');
    programText.push('');
    programText.push('        //Remark image as nextFrame');
    programText.push('        imgInBuffer[index].clear();');
    programText.push('        imgInBuffer[index].setFrameNum(newFrameNum);');
    programText.push('        newFrameNum++;');
    programText.push('        imgInBuffer[index].setProcesstatus(ImageStatus.CALC_PROCESS);');
    programText.push('');
    programText.push('        myLog.trace("CreateImage "+(newFrameNum-1)+" in BUFFER "+"[" + oldFrameNum+"->"+(newFrameNum-1)+"]");');
    programText.push('');
    programText.push('        //Create log (images inBuffer)');
    programText.push('        StringBuffer logMessage = new StringBuffer("Images in buffer: ");');
    programText.push('        for (int i=0;i<imgCountInBuffer;i++)');
    programText.push('        logMessage.append(imgInBuffer[i].getFrameNum()+" , ");');
    programText.push('');
    programText.push('        myLog.trace(logMessage.toString());');
    programText.push('');
    programText.push('        if (index==sourceIndex) {');
    programText.push('            sourceIndex++;');
    programText.push('            if (sourceIndex>imgCountInBuffer-1) sourceIndex = 0;');
    programText.push('        }');
    programText.push('');
    programText.push('    }//deleteOneImageFromBuffer');
    programText.push('');
    programText.push('    public synchronized Long insertComplettePixelLine(PixelLine complettePixelLine) throws Exception {');
    programText.push('');
    programText.push('        //define image in buffer');
    programText.push('        int frameNumber = complettePixelLine.getFrameNumber();');
    programText.push('        MyImage currentImage = getImageByFrameNumber(frameNumber);');
    programText.push('');
    programText.push('        //exception if image not found or not CALC_PROCESS');
    programText.push('        if (currentImage == null ||');
    programText.push('            currentImage.getProcesstatus()!=ImageStatus.CALC_PROCESS) {');
    programText.push('');
    programText.push('            myLog.warn("PixelLine not actual");');
    programText.push('            throw new CalcException("PixelLine not actual");');
    programText.push('        }');
    programText.push('');
    programText.push('        //flush to found image line of resultat');
    programText.push('        try {');
    programText.push('');
    programText.push('            //clearing buffer if send last pixelLine of image');
    programText.push('            if (complettePixelLine.getLineNumber()==this.imgHeight-1) clearCompletteImagesFromBuffer();');
    programText.push('');
    programText.push('            return currentImage.flushComplettePixelLine(complettePixelLine);');
    programText.push('        } catch (Exception e) {');
    programText.push('            myLog.error("not flush resultat "+e.getMessage());');
    programText.push('            throw e;');
    programText.push('        }');
}
        /*


    }//insertComplettePixelLine



    private MyImage getImageByFrameNumber(int inpFrame) {
        synchronized (MyLocker.getLocker()) {
            for (int i = 0; i < imgCountInBuffer; i++)
            if (imgInBuffer[i].getFrameNum() == inpFrame &&
                imgInBuffer[i].getProcesstatus()==ImageStatus.CALC_PROCESS) return imgInBuffer[i];
        }
        return null;
    }//getImageByFrameNumber


    private void deleteAllImages() throws Exception{

        String folderPath = System.getProperty("user.dir")+
            File.separator +
            calcOpt.getStr("imageResultatFolder")+
            File.separator;

        try {
            //deleting in cicle all files in directory
            for (File myFile : new File(folderPath).listFiles())
            if (myFile.isFile()) myFile.delete();
        } catch (Exception e) {throw new Exception(e.getMessage());}

        myLog.debug("Delete allImages");


    }//deleteAllImages




    private String getNewKey(){
        Random rnd = new Random();
        StringBuilder sb1=new StringBuilder("");
        for (int i=0;i<20;i++) sb1.append((char)('a'+rnd.nextInt('z'-'a')));
        return sb1.toString();
    }//getNewKey


}

*/







