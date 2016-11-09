"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var ToDoFactory = (function () {
    function ToDoFactory(storageService) {
        this.storageService = storageService;
    }
    ToDoFactory.prototype.addItem = function (data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            data.id = Date.now();
            _this.addToStorage(data, resolve);
        });
    };
    ToDoFactory.prototype.addToStorage = function (data, resolve) {
        var _this = this;
        var new_data;
        this.storageService.getData().then(function (storage_data) {
            if (storage_data) {
                new_data = JSON.parse(storage_data);
                new_data.push(data);
            }
            else {
                new_data = [data];
            }
            _this.storageService.save(new_data).then(function () {
                resolve();
            });
        });
    };
    ToDoFactory.prototype.updateItem = function (data, index) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.storageService.getData().then(function (storage_data) {
                var new_data = JSON.parse(storage_data);
                new_data[index] = data;
                _this.storageService.save(new_data).then(function () {
                    resolve();
                });
            });
        });
    };
    ToDoFactory = __decorate([
        core_1.Injectable()
    ], ToDoFactory);
    return ToDoFactory;
}());
exports.ToDoFactory = ToDoFactory;
