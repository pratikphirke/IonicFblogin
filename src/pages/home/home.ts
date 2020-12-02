import { Component } from '@angular/core';
import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';
import { AlertController, App, NavController, Platform } from 'ionic-angular';
import * as pdfmake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { ServicesProvider } from '../../providers/services/services';
import { AddCustomerPage } from '../add-customer/add-customer';
import { AddLocationPage } from '../add-location/add-location';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  customers: any;
  locationList: any;
  customername:any;
  pdfData = [];
  iab: any;
  blobPdf: any;
  pdfObj: any;
  currentDate: any = new Date().toISOString();
  newData: any;
  
  constructor(public app: App,
    public navCtrl: NavController,
    public services: ServicesProvider,
    private file: File,
    private fileOpener: FileOpener,
    private platform: Platform,
    public alertCtrl: AlertController) { 
    this.customers = this.services.getCustomer()
    this.locationList = this.services.getLocation()
    //console.log('GET Customer-----------------',this.locationList)
  }
  addCustomerDetails(){
    this.navCtrl.setRoot(AddCustomerPage);
  }
  addLocationDetails(){
    this.navCtrl.setRoot(AddLocationPage);
  }

  DeleteCustomer(item){
    this.services.deleteCustomer(item);
    this.customername = item.firstName
    this.showAlert()
  }
  showAlert() {
    const alert = this.alertCtrl.create({
      title: 'Sucessfull..',
      subTitle: 'Delete customer  ' + this.customername,
      buttons: ['OK']
    });
    
    this.navCtrl.setRoot(HomePage);
    alert.present();
 
  }
  sortCustomer(item){
    var allDailyRecords: any;
    var requestedRecord=[];
   for(let i = 0; i < this.customers.length; i++) {
        if(this.customers[i].address == item.location){       
        console.log('equal CUSTOMERS*****',this.customers)
        localStorage.setItem('sortCustomer',JSON.stringify(this.customers));
          this.sortAlert()
        }
        allDailyRecords = JSON.parse(localStorage.getItem('sortCustomer'));
        if(allDailyRecords) {
          for(let i=0; i<allDailyRecords.length; i++) {
            if(allDailyRecords[i].address == item.location) {
    
              requestedRecord.push(allDailyRecords[i]);
    
            }
          }
          console.log('REQUESTEED RECORD -----',requestedRecord)
          return requestedRecord;
        }
        return null;
    
    
      }
      
  }
  sortAlert() {
    const alert = this.alertCtrl.create({
      title: 'Sucessfull..',
      subTitle: 'Matched location  ',
      buttons: ['OK']
    });
    
    this.navCtrl.setRoot(HomePage);
    alert.present();
 
  }
  sortNotMatch() {
    const alert = this.alertCtrl.create({
      title: 'AWw..',
      subTitle: 'location Not Match ',
      buttons: ['OK']
    });
    
    this.navCtrl.setRoot(HomePage);
    alert.present();
 
  }

  makePdf(item) {
    //console.log('selected Customer-----------------',item)
    pdfmake.vfs = pdfFonts.pdfMake.vfs;
    var docDefinition = {
    content: [
    {
    columns: [
    {
    },
    [
      { text: 'From', style: 'header' },
      { text: 'Admin : '+ 'admin@gmail.com ', style: 'sub_header' },
      { text: 'Task Demo', style: 'sub_header' },
     // { text: 'WEBSITE: https://milkman.org/', style: 'url' },
    ]
    ]
    },
    { text: 'To', style: 'subheader' },
   // this.customers.Name,
    //this.selectedCustomer.address,
    //this.selectedCustomer.mobile,
    { text: 'Customer Deatils ', style: 'billtag'},
    {
      style: 'itemsTable',
      table: {
          widths: ['*', 75, 75],
          body: [
            ['Date ', this.currentDate],
            ['First Name ', item.firstName],
            ['Last Name ', item.lastName],
            ['Email ', item.email],
            ['Mobile ', item.mobile],
            ['Address ', item.address],
          ]
      }
    },
    
   // { text: 'Date', style: 'date' },
   // this.currentDate
    ],
    styles: {
      header: {
        bold: true,
        fontSize: 16,
        alignment: 'right'
      },
      subheader: {
        fontSize: 18,
        alignment: 'left'
      },
      sub_header: {
        fontSize: 12,
        alignment: 'right'
      },
      date: {
        fontSize: 12,
        alignment: 'left'
      },
      url: {
        fontSize: 12,
        alignment: 'right'
      },
      itemsTable: {
        marginTop: 70,
      },
      billtag: {
        alignment: 'center',
      }
    },
    pageSize: 'A4',
    pageOrientation: 'portrait'
    };
    //pdfmake.createPdf(docDefinition).open();
    // this.pdfObj = pdfmake.createPdf(docDefinition).open();
    // this.downloadPdf(this.pdfObj);
    var self = this;
    pdfmake.createPdf(docDefinition).getBuffer(function (buffer) {
      let utf8 = new Uint8Array(buffer);
      let binaryArray = utf8.buffer;
      self.downloadPdf(binaryArray);
    })
  }

  downloadPdf(data: any){
    if (this.platform.is('ios')) {
    // Use inAppBrowser plugin,
    // easier and faster in iOS
      this.pdfObj.active = false;
      this.pdfObj.fileURL = URL.createObjectURL(data);
      var browser = this.iab.create(
        this.pdfObj.fileURL, 
        '_blank',
        'location=no,' +
        'toolbar=yes,' +
        'enableViewportScale=yes,' +
        'closebuttoncaption=Cerrar PDF,' +
        'hardwareback=no'
      );
      browser.show();
    } else if (this.platform.is('cordova')) {
      //alert(data)
      // lets save and then open the file
      this.blobPdf = data; // Lets store the pdf Blob
      let filedir = this.file.dataDirectory;
      this.file.writeFile( //save PDF
        filedir, 
        "Customer Details.pdf", 
        this.blobPdf, 
        {replace:true}
      ).then(() =>{
        this.fileOpener.open( //open in native PDF
          filedir + 'Customer Details.pdf', 
          'application/pdf'
        ).then(() => {
          this.pdfObj.active = false;
        }).catch(e => console.log('Open error', e));
      }).catch(e => console.log('Save error',e));
    } (error) => {
        alert('err')  
  }
  
  }
  logout(){
  
    this.app.getRootNav().setRoot(LoginPage);
    
  //  this.app.getRootNav().setRoot(LoginPage);
  }
}
