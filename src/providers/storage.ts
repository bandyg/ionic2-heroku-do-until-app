import {Storage} from '@ionic/storage';
import {Injectable} from '@angular/core';
import { NativeStorage } from 'ionic-native';

@Injectable()
export class StorageService {
 
    public data;

    constructor(public storage: Storage) {}

    //storage get
    getData() {
        return this.storage.get('todos');  
    }

    //storage set 
    save(data) {
        let newData = JSON.stringify(data);
        return this.storage.set('todos', newData);
    }
}