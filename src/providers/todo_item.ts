import {Injectable} from '@angular/core';
import {StorageService} from '../providers/storage';

@Injectable()
export class TodoItem  {
     private icons = [
    'alarm', 'alert', 'basket', 'beer', 'bicycle', 'boat', 'body', 'book', 'bowtie', 'briefcase', 'brush',
     'bug', 'build', 'bulb', 'bus', 'cafe', 'call', 'car', 'camera','card', 'cart','cash','chatboxes','cloud', 'desktop',
     'cut', 'document', 'logo-euro', 'eye', 'film', 'flag', 'flash', 'flame', 'flask', 'football', 'game-controller-b',
     'hammer', 'heart', 'happy', 'home', 'ice-cream', 'infinite','jet','key','laptop','list','lock','magnet', 'man',
     'mic', 'musical-notes', 'no-smoking', 'nuclear', 'paw', 'pin', 'plane', 'restaurant', 'search', 'shirt', 'logo-usd',
     'videocam', 'walk', 'wine', 'woman'];
    public icons_collection = this.createArray();
    
    constructor(private storageService: StorageService) {}
    
    //saves todo data in storage
    save(data) {
        return new Promise((resolve, reject) => {
              this.addToStorage(data, resolve);
        });
    }

    //creates new todo item
    addToStorage(data, resolve) {
        let todos;
        this.storageService.getData().then((storage_data) => {
            //each todo gets a timestamp as id
            data.id = Date.now();
            if (storage_data) {
                todos = JSON.parse(storage_data);
                todos.push(data)
            } else {
                todos = [data];
            }
            
            this.storageService.save(todos).then(() => {
                resolve();
            });
        }); 
    }

    //updates an existing todo item
    edit(data) {
        return new Promise((resolve, reject) => {
            this.storageService.getData().then((storage_data) => {
                let todos = JSON.parse(storage_data);
                 todos.forEach(function(item, index, array) {
                     if (item.id == data.id) {
                         array[index] = data;
                     }
                 })
                 this.storageService.save(todos).then(() => {
                    resolve();
                });
             }); 
        });
    }

    //deletes a todo item with based on its id
    remove(id) {
        return new Promise((resolve, reject) => {
            this.storageService.getData().then((storage_data) => {
                let todos = JSON.parse(storage_data);
                todos.forEach(function(item, index, array) {
                    if (item.id == id) {
                        array.splice(index, 1);
                    }
                 })
                 this.storageService.save(todos).then(() => {
                    resolve();
                });
             }); 
        });
    }

    //sets the selected icon for a todo item
    setIcon(todo) {
        var icon_index = this.icons_collection.map(function(item) {
             return item.icon_name; }).indexOf(todo.icon);
        var icon_found = this.icons_collection[icon_index];
        icon_found.selected = true;
        this.icons_collection.splice(0, 0, this.icons_collection.splice(icon_index, 1)[0]);
     }

    //Generates an array of icon objects
    createArray() {
        var array = [];
         this.icons.forEach(function(item) {
            array.push({'icon_name': item, 'selected': false});
        }.bind(this));
        return array;
    }
}