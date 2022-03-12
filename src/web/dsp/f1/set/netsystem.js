


class NetSystem{



    constructor(){
        this.computerSet = new ComputerSet();
        this.requestSet = new RequestSet();
        }//constructor

    reposition(){
        this.computerSet.reposition();
        }

     update(){
        this.requestSet.update();
        this.computerSet.update();
        }

    display(){
        //показать запросы
        this.requestSet.display();
        //показать клиентов (и сервер)
        this.computerSet.display();
        }//display





}//class NetSystem