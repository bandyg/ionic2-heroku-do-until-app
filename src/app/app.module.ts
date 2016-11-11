import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { Modal } from '../pages/modal/todo';
import { PopoverPage } from '../pages/popover/options';
import { TodoItem } from '../providers/todo_item';
import { StorageService } from '../providers/storage';
import {Storage} from '@ionic/storage';
import {enableProdMode} from '@angular/core';

enableProdMode();
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    PopoverPage,
    Modal
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    PopoverPage,
    Modal,
    HomePage 
  ],
  providers: [
   Storage,
   TodoItem,
   StorageService
  ]
})
export class AppModule {}
