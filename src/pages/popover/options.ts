import { Component } from '@angular/core';
import {ViewController, NavParams } from 'ionic-angular';
import {TodoItem} from '../../providers/todo_item';

@Component({
  templateUrl: 'options.html'
})

export class PopoverPage {

    constructor(private viewCtrl: ViewController, private navParams: NavParams, private todoItem: TodoItem) {}

    removeTodoItem() {
        this.todoItem.remove(this.navParams.data.todos[this.navParams.data.index].id).then(() => {
        	this.navParams.data.todos.splice(this.navParams.data.index, 1);
            this.viewCtrl.dismiss(this.navParams);
        });
    }
}




