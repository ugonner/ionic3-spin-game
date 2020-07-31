import { Component} from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, ActionSheetController } from 'ionic-angular';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

    winPoint: any;
    betPoint: any;
    betPointValues: any = ['No Bet','Eke', 'Orie', 'Afor', 'Nkwo'];

    spinSpeed: any = 20;
    spin_deg = 0;
    spin_time: any = Math.floor(Math.random() * 100) + 500;
    spin_timer: any = 0;
    spin_stage2 = Math.floor(this.spin_time / 3);
    spin_stage3 = this.spin_stage2 * 2;
    spin_spinner_id: any;
    DisplayPlay: boolean = true;


     spinner_image_urls: Array<string> = [
         "assets/imgs/spinnerpointer.jpg",
         "assets/imgs/spinner-2.jpg",
         "assets/imgs/spinner.jpg"
         ,];
    spinner_image_url: any = this.spinner_image_urls[0];

    game_over_image_urls: Array<string> = [
        "assets/imgs/image2.jpg",
        "assets/imgs/jackpot.jpg"
    ];
    game_over_image_url: any = this.game_over_image_urls[0];
    game_over_message: string = ' ';


     spinner_image: HTMLElement;
     action_btn: HTMLElement;
     result_alert: HTMLElement;
     game_over_div: HTMLElement;


    private percentage_spun: any;
    constructor(public navCtrl: NavController, public navParams: NavParams,
                private alertCtrl: AlertController, private toastCtrl: ToastController,
                private actionSheetCtrl: ActionSheetController) {

  }



  ionViewDidLoad() {
      this.spinner_image = document.getElementById("spinner_image");
      this.action_btn = document.getElementById("action_btn");
      /*this.result_alert = document.getElementById("result_alert");*/
      this.game_over_div = document.getElementById("game_over_div");

      console.log('ionViewDidLoad HomePage');
  }

    betSelector(){
        let action = this.actionSheetCtrl.create({
            "title": 'PLACE BET ON',
            'buttons': [
                {
                    text: 'Eke',
                    handler: ()=>{
                        this.betPoint = 1;
                    },
                    role: 'destructive'
                },
                {
                    text: 'Orie',
                    handler: ()=>{
                        this.betPoint = 2;
                    },
                    role: 'destructive'
                },
                {
                    text: 'Afor',
                    handler: ()=>{
                        this.betPoint = 3;
                    },
                    role: 'destructive'
                },
                {
                    text: 'Nkwo',
                    handler: ()=>{
                        this.betPoint = 4;
                    },
                    role: 'destructive'
                },
                {
                    text: 'CANCEL',
                    role: 'cancel'
                }
            ]

        });
        action.present();

    }


    imageSelector(){
        let action = this.actionSheetCtrl.create({
            "title": 'CHOOSE WHEEL',
            'buttons': [
                {
                    text: 'Rainbow It',
                    handler: ()=>{
                        this.spinner_image_url = this.spinner_image_urls[0];
                    },
                    role: 'destructive'
                },
                {
                    text: 'Red It',
                    handler: ()=>{
                        this.spinner_image_url = this.spinner_image_urls[1];
                    },
                    role: 'destructive'
                },
                {
                    text: 'Biafran',
                    handler: ()=>{
                        this.spinner_image_url = this.spinner_image_urls[2];
                    },
                    role: 'destructive'
                },
                {
                    text: 'CANCEL',
                    role: 'cancel'
                }
            ]

        });
        action.present();

    }

    speedSelector(){
        let action = this.actionSheetCtrl.create({
            "title": 'SET SPINNER-SPEED',
            'buttons': [
                {
                    text: 'High',
                    handler: ()=>{
                        this.spinSpeed = 10;
                    },
                    role: 'destructive'
                },
                {
                    text: 'Normal',
                    handler: ()=>{
                        this.spinSpeed = 50;
                    },
                    role: 'destructive'
                },
                {
                    text: 'Slow',
                    handler: ()=>{
                        this.spinSpeed = 100;
                    },
                    role: 'destructive'
                },
                {
                    text: 'SlowPush',
                    handler: ()=>{
                        this.spinSpeed = 200;
                    },
                    role: 'destructive'
                },
                {
                    text: 'CANCEL',
                    role: 'cancel'
                }
            ]

        });
        action.present();

    }

    presentToast(message: string, duration: number){
        this.toastCtrl.create({
            "message": message,
            "duration": duration
        }).present();

    }



  spinSpinner(){

   /*let spin_stage2 = (this.spin_time)/3;
   let spin_stage3 = spin_stage2 * 2;*/

    if(this.spin_timer == this.spin_time){

        if(this.spinner_image_url == "assets/imgs/spinnerpointer.jpg"){

            if((((this.spin_deg - 360)+360)%360) == 0){
                this.winPoint = 4;
            }else if((((this.spin_deg - 270)+360)%360) == 0){
                this.winPoint = 3;
            }else if((((this.spin_deg - 180)+360)%360) == 0){
                this.winPoint = 2;
            }else if((((this.spin_deg - 90)+360)%360) == 0){
                this.winPoint = 1;
            }else{
                this.winPoint = 0;
            }
        }else{

            if((((this.spin_deg - 360)+360)%360) == 0){
                this.winPoint = 2;
            }else if((((this.spin_deg - 270)+360)%360) == 0){
                this.winPoint = 3;
            }else if((((this.spin_deg - 180)+360)%360) == 0){
                this.winPoint = 4;
            }else if((((this.spin_deg - 90)+360)%360) == 0){
                this.winPoint = 1;
            }else{
                this.winPoint = 0;
            }
        }
        let betPoint = this.betPoint;
        if(this.winPoint == this.betPoint){
            this.game_over_image_url = this.game_over_image_urls[1];
            this.game_over_message = "Bet Won For "+ this.betPointValues[betPoint];
            this.game_over_div.style.display = "inline-block";
            this.presentToast("Bet Won For "+ this.betPointValues[betPoint],10000);
        }else{
            this.game_over_message = "Bet Lost For "+ this.betPointValues[betPoint]+" Result: "+this.betPointValues[this.winPoint]+" , Please Reload And Retry, GOODLUCK!";
            this.game_over_div.style.display = "inline-block";
            this.presentToast("Bet Lost For "+ this.betPointValues[betPoint]+" Result: "+this.betPointValues[this.winPoint]+" , Please Reload And Retry, GOODLUCK!",10000);

        }
        this.spin_timer = 0;
        this.betPoint = null;
        clearInterval(this.spin_spinner_id);

    }else{
            this.percentage_spun = Math.floor((this.spin_timer/this.spin_time) * 100);
            this.spinner_image.style.transform = "rotate("+this.spin_deg+"deg)";
            this.action_btn.innerHTML = (this.percentage_spun+1) +"%";

            this.spin_timer++;
            this.spin_deg +=90;
            /*if((this.spin_timer%2) == 0 ){
                this.spin_deg += 90;
            }else{
                this.spin_deg += 45;
            }*/

        /*if((this.spin_timer >= this.spin_stage2) && (this.spin_timer <= this.spin_stage3)){
            this.spin_deg += 90;
         }else if((this.spin_timer > this.spin_stage3)){
            this.spin_deg += 45;
         }else{
            this.spin_deg += 45;
         }*/
    }
  }

    startRotation(){
        if(this.betPoint == null){
            this.presentToast("Please pick a bet", 5000);
            return false;
        }
        this.DisplayPlay = false;
        return this.spin_spinner_id = setInterval(()=>{
            this.spinSpinner();
        }, this.spinSpeed);
    }


    reloadSpinner(){
        this.spin_deg = 0;
        this.spin_time = Math.floor(Math.random() * 100) + 500;
        this.game_over_div.style.display = "none";
        this.spinner_image.style.transform = "none";
        this.presentToast("Please pick a bet", 5000);
        this.DisplayPlay = true;
        return true;

    }
}


/*
<script>

*/
/* for my speed alteration;
 if((spin_timer ?= spin_stage2) && (spin_timer <= spin_stage3)){
 spin_deg += 60;
 }else if((spin_timer ? spin_stage3)){
 spin_deg += 30;
 }else{
 spin_deg += 90;
 }*//*

</script>*/
