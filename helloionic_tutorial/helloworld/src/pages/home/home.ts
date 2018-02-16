import { Component } from '@angular/core';
import { NavController,IonicPage,ToastController,ActionSheetController } from 'ionic-angular';

import {AngularFireAuth} from 'angularfire2/auth'
import {AngularFirestore,AngularFirestoreCollection,AngularFirestoreDocument  } from 'angularfire2/firestore'
import 'firebase/firestore'
import firebase from 'firebase'

import { Part } from '../../models/part.interface';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { FirebaseFirestore } from '@firebase/firestore-types';

//
export interface Announcement { title: string; body: string }
export interface AnnouncementId extends Announcement{ id?: string };

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  part = {} as Part;
  myProdId:string;
  
  db;

   d = new Date();
   h = this.d.getHours();
   m = this.d.getMinutes();
   s = this.d.getSeconds();
   s2:string = this.h+" : "+this.m+" : "+this.s;
   

 itemsCollection: AngularFirestoreCollection<Part>; //Firestore collection
  items: Observable<Part[]>; // read collection
  

  constructor(private toast:ToastController,
      private afAuth : AngularFireAuth, 
      private afs:AngularFirestore,
      public navCtrl: NavController,
      private actionSheetCtrl:ActionSheetController)
   {
    this.itemsCollection = this.afs.collection ('items');//ref()
    this.items = this.itemsCollection.valueChanges();

    this.db =  firebase.firestore();
    this.part.time=this.s2;
    
   

   // this.items2 = this.itemsCollection.snapshotChanges()
   /* .map(actions =>{
      return actions.map(a =>{
        const data = a.payload.doc.data() as Part;
        const id = a.payload.doc.id;
        return { id, ...data };
      })
    }); */
   }

   logForm(part:Part)
   {
     
      this.db.collection("items").add({
      partName : part.partName,
      partNumber : part.partNumber,
      partDesc : part.partDesc,
      location : part.location,
      time : part.time
    }) .then( (result) => 
      {
        this.itemsCollection.doc(result.id).update({
        prodid:result.id
      })

     /*  part.partName=""
      part.partNumber="" */

     /*  console.log("Document addded with id >>> ", result.id);
      this.part.id = (result.id).toString() ;
      console.log(this.afs.doc.name); */
  })
  .catch( (error) => {
    alert("fill all data");
      //console.error("Error adding document: ", error);
  });

    /* this.itemsCollection.add({
      partName : part.partName,
      partNumber : part.partNumber,
      partDesc : part.partDesc,
      location : part.location
    })
    .then( (result) => {
        console.log("Document addded with id >>> ", result.id);
        console.log(this.afs.doc.name);
    })
    .catch( (error) => {
        console.error("Error adding document: ", error);
    });  */
   }

    delete(prod)
    {
        //  this.itemsCollection.doc(part).delete();
        this.itemsCollection.doc(prod.prodid).delete();//item.id
        // console.log(this.afs.doc.name.toString());
    }

  /*   edit(prod,part:Part)
    {
      this.part.partName = prod.partName;
     this.part.partNumber = prod.partNumber;
      this.part.partDesc = prod.partDesc;
      this.part.location = prod.location ;

    } */

    selectItemList(prod,part:Part)
    {
      this.actionSheetCtrl.create({
       // title : `${shopItem.partName}`,
        buttons : [ 
          /* update */
          {
            text : 'Delete',
            role : 'Destructive',
            handler :()=>{
              this.itemsCollection.doc(prod.prodid).delete();

            }
            
          },
         
          {
            text : 'Edit',
          
            handler :()=>{
              console.log(prod.partName+" & "+prod.partNumber)
              console.log("before myprodId=>"+this.myProdId)
              console.log("prodid==> "+prod.prodid)

            //this.itemsCollection.doc(prod.prodid)

            this.myProdId=prod.prodid;
            console.log("after myprodId=>"+this.myProdId)

             this.part.partName = prod.partName;
             this.part.partNumber = prod.partNumber;
             this.part.partDesc = prod.partDesc;
             this.part.location = prod.location ;
             this.part.time = prod.time;

             console.log(part.partName+" & "+this.part.partNumber)
            }
          },
          
          {
            text : 'cancle',
            role : 'Destructive',
            handler :()=>{
              

            }
          }
    ] 
      }).present();
    }
   
   update(prod,part:Part) {
    
      this.itemsCollection.doc(this.myProdId).update({
         partName : this.part.partName,
        partNumber : this.part.partNumber,
        partDesc : this.part.partDesc,
        location : this.part.location ,
        time : this.part.time
      
      }) .then( (result) => {
        console.log("Document addded with id >>> ", /* result.id */);
        console.log(this.afs.doc.name);
    })
    .catch( (error) => {
        console.error("Error adding document: ", error);
    });

  } 

  ionViewWillLoad()
  {
    this.afAuth.authState.subscribe(data =>
      {
        if(data.email && data.uid){
          this.toast.create({
            message : `welcome, ${data.email}`,
            duration : 6000
          }).present();
          }
          else{
            this.toast.create({
              message : 'could not find that user!!',
              duration : 6000
            }).present();
            
          }
        })
 
      }


      uploadImage()
      {
        this.navCtrl.push('ImagesPage');
      }
      
  }

