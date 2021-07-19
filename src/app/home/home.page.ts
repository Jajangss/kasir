import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ServiceService } from '../services/service.service';
import { KasirService } from '../services/kasir.service';
import { TransactionService } from '../services/transaction.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  Username:any;

  public item:any = [];
  public sum = [];
  public name:any = [];
  public total = 0;
  public totalPrice = 0;
  public bayar = 0;

  constructor(
    public loadingController: LoadingController,
    private serviceService: ServiceService,
    private kasirService : KasirService,
    private transactionService : TransactionService,
    public alert : AlertController
    ) {}

  ngOnInit(): void {
    //ambil data dari localstorage
    let dataStorage=JSON.parse(localStorage.getItem(this.serviceService.TOKEN_KEY));
    this.Username=dataStorage.Username;

    this.kasirService.getData().subscribe((result:any) => {
      result.map((res)=> {
        this.item.push(res)
      })
      console.log(this.item)
    })
  }

  async logout(){
    const loading = await this.loadingController.create({
      message: 'Please wait...'
    });
    await loading.present();
    localStorage.clear();
    this.serviceService.logout();
    loading.dismiss();
   }

   onSave(){
    this.sum.push({
      id : this.name.id,
      name : this.name.name,
      qty : this.total,
      price : this.name.price,
      total : this.name.price * this.total
    })

    this.totalPrice += this.name.price * this.total

    console.log(this.sum)
   }

   async inputData(){
     const data = await this.transactionService.getData({data:this.sum, bayar:this.bayar, total:this.totalPrice})

     if (data){
      if (this.bayar > this.totalPrice) {
        const alert = await this.alert.create({
          header: 'Hasil',
          subHeader: 'Transaksi Berhasil',
          message: `Kembalian = ${this.bayar - this.totalPrice}`,
          buttons: ['OK']
        });

        await alert.present();
      } else if(this.bayar == this.totalPrice) {
        const alert = await this.alert.create({
          header: 'Hasil',
          subHeader: 'Transaksi Berhasil',
          message: `Uang Pas`,
          buttons: ['OK']
        });

        await alert.present();
      } else {
        const alert = await this.alert.create({
          header: 'Hasil',
          subHeader: 'Transaksi Berhasil',
          message: `Uang Kurang`,
          buttons: ['OK']
        });

        await alert.present();
      }

      this.sum = []
      this.bayar = 0
      this.totalPrice = 0
      this.total = 0


     }
   }

}
