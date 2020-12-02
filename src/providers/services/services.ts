
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
@Injectable()
export class ServicesProvider {
  currentUser: any;
  newData: any;
  formData: any;

  customers=[];

  constructor(public storage: Storage) {
  }


  addCustomer(data) {

    let tmpdata = localStorage.getItem('customer');
    var currentCustomers = JSON.parse(tmpdata)
    
    if(currentCustomers) {
      for(let i=0; i<currentCustomers.length; i++) {
      var cust_id = currentCustomers[i].cust_id;
    }
      data['cust_id'] = cust_id + 1;
    } else
      data['cust_id'] = 1;
    if (tmpdata){
        this.newData = currentCustomers;
        this.newData.push(data);
        localStorage.setItem('customer',JSON.stringify(this.newData));
      }else{
        localStorage.setItem('customer', JSON.stringify([data]));     
      }
  }
  
  getCustomer(){
    var customers = JSON.parse(localStorage.getItem('customer'));
    return customers;
  }

  deleteCustomer(item) {
 
    this.customers = JSON.parse(localStorage.getItem('customer'));
    
      for(let i = 0; i < this.customers.length; i++) {
        if(this.customers[i].cust_id == item.cust_id){       
          this.customers.splice(i, 1);
        }
   
      }
      localStorage.setItem('customer', JSON.stringify(this.customers));
  }
  addlocation(data) {

    let tmpdata = localStorage.getItem('location');
    var currentloc = JSON.parse(tmpdata)
    
    if(currentloc) {
      for(let i=0; i<currentloc.length; i++) {
      var loc_id = currentloc[i].loc_id;
    }
      data['loc_id'] = loc_id + 1;
    } else
      data['loc_id'] = 1;
    if (tmpdata){
        this.newData = currentloc;
        this.newData.push(data);
        localStorage.setItem('location',JSON.stringify(this.newData));
      }else{
        localStorage.setItem('location', JSON.stringify([data]));     
      }
  }

  getLocation(){
    var loactionList = JSON.parse(localStorage.getItem('location'));
    return loactionList;
  }
}