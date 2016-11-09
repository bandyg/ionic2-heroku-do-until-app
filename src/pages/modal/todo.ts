//imports
import { Component } from '@angular/core';
import {ViewController, NavParams } from 'ionic-angular';
import {StorageService} from '../../providers/storage';
import {TodoItem} from '../../providers/todo_item';
//import {FormBuilder, ControlGroup, Validators} from '@angular/common';

@Component({
  templateUrl: 'todo.html'
})

export class Modal {

	public todo;
	constructor(public viewCtrl: ViewController, public params: NavParams, public storageService: StorageService, public todoItem: TodoItem) {}

	ngOnInit() {
		this.todo = this.params.data.todo || {
		 	end_date: new Date().toISOString(),
		 	icon: 'alarm'
		};

		this.todoItem.setIcon(this.todo);
	}

	//updates the selected icon
	selectIcon(icon, selected_index) {
	 	this.todoItem.icons_collection.forEach(function(item, index) {
	 		item.selected = false;
	 	});
	 	icon.selected = true;

	 	this.todo.icon = icon.icon_name;
	}

	//dismiss of popup
	dismiss(data) {
	 	this.viewCtrl.dismiss(data);
	}

	//saves a new to do item in storage
	saveItem(item) {
	    this.todoItem.save(item).then(() => {
	    	this.viewCtrl.dismiss();
	    });
	}

	//updates an existing to do item
	editItem(item) {
	    this.todoItem.edit(item).then(() => {
	    	this.viewCtrl.dismiss();
	    });
	}
}



