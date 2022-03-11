


class NetSystem{



    constructor(){

        this.clientSet = new ClientSet();
        this.requestSet = new RequestSet();

        }//constructor

    reposition(){

        this.clientSet.reposition();

        }

     update(){
        this.requestSet.update();
        this.clientSet.update();
        }

    display(){

        //показать запросы
        this.requestSet.display();

        //показать клиентов (и сервер)
        this.clientSet.display();


        }//display





}//class NetSystem