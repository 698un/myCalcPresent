


class NetSystem{



    constructor(){

        this.clientSet = new ClientSet();
        this.server = new VServer();

        }//constructor

    reposition(){
        this.server.reposition();
        this.clientSet.reposition();

        }

    display(){

        this.server.display();
        this.clientSet.display();


        }//display





}//class NetSystem