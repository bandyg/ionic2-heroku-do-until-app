import { Component } from '@angular/core';
import { ModalController, NavController, ViewController, NavParams, PopoverController, Content } from 'ionic-angular';
import { Modal } from '../modal/todo';
import { PopoverPage } from '../popover/options';
import { StorageService} from '../../providers/storage';

@Component({
  templateUrl: 'home.html'
})

export class HomePage {

	public todos = [];
	constructor(public navCtrl: NavController, public modalCtrl: ModalController, public storageService: StorageService, public popoverCtrl: PopoverController) {}

	ionViewWillEnter() { 
		this.getData();        
    }

	getData() {
		this.storageService.getData().then((data) => {
	        if (data) {
	            this.todos = JSON.parse(data);
	            this.calculateDays();
	        } else {
	        	this.todos = [];
	        }
	    });
	}

	//sets days left for each todo item
	calculateDays() {
		for (var i = this.todos.length - 1; i >= 0; i--) {
			this.todos[i]['days_left'] = this.dateDiffInDays(this.todos[i]['end_date']);
		} 
	}
	
	//presents modal for editting a todo item
	editTodo(item) {
		let modal = this.modalCtrl.create(Modal, {'todo':item});
		this.navCtrl.push(modal);
	}

	//initialazes and presents a todo popover
	presentPopover(index, ev) {
		ev.stopPropagation();
		ev.preventDefault();

	    let popover = this.popoverCtrl.create(PopoverPage, {
	      todos: this.todos,
	      index: index
	    });

	    popover.present({
	      ev: ev
	    });
  	}
	
	//presents modal for creating a new todo item
	newTodo() {
		let modal = this.modalCtrl.create(Modal);
		//modal.present();
		this.navCtrl.push(modal);

	}

	// http://stackoverflow.com/questions/3224834/get-difference-between-2-dates-in-javascript
	//calculates days left untill a todo item is expired
	dateDiffInDays(end_date) {
		var date_now = new Date().toISOString();
		var date_now_object = new Date(date_now);
		var end_date_object = new Date(end_date);
		// Discard the time and time-zone information.
		var utc1 = Date.UTC(date_now_object.getFullYear(), date_now_object.getMonth(), date_now_object.getDate());
		var utc2 = Date.UTC(end_date_object.getFullYear(), end_date_object.getMonth(), end_date_object.getDate());

		//_MS_PER_DAY = 1000 * 60 * 60 * 24 = 86400000
		return Math.floor((utc2 - utc1) / 86400000);
	}
};





