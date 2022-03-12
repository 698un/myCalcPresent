

class CompConsole{


    constructor(){
        this.item = new Array(100);
        this.tSize = globalTextSize;

        //clear all item
        for (let i=0;i<this.item.length;i++){
            this.item[i] = "";
            }//next i
        }//constructor



    //insert new item
    addLog(newItem){
        //move all item to up
        for (let i=0;i<this.item.length-1;i++) this.item[i]=this.item[i+1];
        //insert newItem to down
        this.item[this.item.length-1] = newItem;
        }//addLog




    }//class CompConsole