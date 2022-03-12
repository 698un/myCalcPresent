

//+37529 5827678 Вера


class Cmd {

    constructor() {

        this.parent = null;

        this.pos = createVector(100,100);


        this.w1 = 200;
        this.h1 = 50;

        this.bColor = color(127);//фон
        this.tColor = color(0);//текст
        this.textSize = 20;
        this.caption = "caption";
        this.mPress = false;//признак что нажата
        this.tRelease = 0;//время отпускания
        this.t0=Math.random()*1000;
        this.prevTime=0;//время предыдущей прорисовки

        this.realPos =createVector(0,0);


        }//constuctor






    centerPosition(){
        this.pos.x = width*0.5-this.w1*0.5;
        this.pos.y = height*0.5-this.h1*0.5;
        }//CenterPosition

    //этот метод размещаетт кнопку внизу указанной
    bottomCmd(cmdUp,dHeight){
        this.top = cmdUp.top+cmdUp.h1+dHeight;
        }//CenterPosition



    getRealPosX(){
        if (this.parent!=null) return this.pos.x+this.parent.getRealPosX();
        return this.pos.x;
        }


    getRealPosY(){
        if (this.parent!=null) return this.pos.y+this.parent.getRealPosY();
        return this.pos.y;
        }





    display() {


        this.realPos.x = this.getRealPosX();
        this.realPos.y = this.getRealPosY();

        this.eventMouseDown();//проверяем нажание мышки


        //var tMillis = millis();//запоминаем millis
        //var dt = tMillis-this.prevTime;
        this.prevTime = tMillis;





        if (this.mPress==true &&
            MW_press &&
            this.inRegion()==true) this.tRelease=tMillis+250;

        if (this.tRelease<tMillis ) this.mPress = false;

        //this.mPress = true;

        //смещение текста
        var ds = 0;
        if (this.mPress==true) ds = 2;


        //серый прямоугольник
        strokeWeight(2);
        fill(this.bColor);

        stroke(0);//черная окантовка кнопки
        rect(this.realPos.x+0,this.realPos.y+0,
             this.w1,this.h1);



        //рельефные линии по периметру
        stroke(255);
        if (this.mPress==false) {
             line(this.realPos.x,this.realPos.y,
                  this.realPos.x+this.w1,this.realPos.y);
             line(this.realPos.x,this.realPos.y,
                  this.realPos.x,this.realPos.y+this.h1);
             }//mPress = false

        if (this.mPress==true) {
            line(this.realPos.x+this.w1,this.realPos.y+this.h1,
                 this.realPos.x+this.w1,this.realPos.y);

            line(this.realPos.x+this.w1,this.realPos.y+this.h1,
                 this.realPos.x,this.realPos.y+this.h1);
             }//mPress=  true





    //текст кнопки
       textAlign(CENTER,CENTER);
       textSize(this.textSize);
       fill(this.tColor);
       noStroke();

       text(this.caption,
            this.realPos.x+ this.w1*0.5+ds,
            this.realPos.y+ this.h1*0.5+ds);




        }//show


   eventMouseDown(){
        //выход если мышь не нажата
        if (MW_press==false) return false;

        //выход если нажатие уже есть
        //if (this.mPress==true) return false;

        //==============================здесь мышь уже нажата


        //если мышь нажата внутри региона (и mPress==false)
       if( this.inRegion()==true && MW_prevPress==false) {
                this.mPress=true;
                this.tRelease = tMillis+250;
                return true;
                }

        return false;

        }//click



    inRegion(){
        //realPos  now defined in display method
        this.realPos.x = this.getRealPosX();
        this.realPos.y = this.getRealPosY();

        var mx = mouseX;
        var my = mouseY;


        if (mx>this.realPos.x &&
            my>this.realPos.y &&
            mx<this.realPos.x+this.w1 &&
            my<this.realPos.y+this.h1) {
                      return true;
                      }

         return false;

        }//inRegion




}//class cmd