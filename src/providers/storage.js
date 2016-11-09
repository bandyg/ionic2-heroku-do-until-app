"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ionic_angular_1 = require('ionic-angular');
var core_1 = require('@angular/core');
var StorageService = (function () {
    function StorageService() {
        this.storage = new ionic_angular_1.Storage(ionic_angular_1.SqlStorage, { name: 'deadlines' });
    }
    StorageService.prototype.getData = function () {
        return this.storage.get('deadlines');
    };
    StorageService.prototype.save = function (data) {
        var newData = JSON.stringify(data);
        return this.storage.set('deadlines', newData);
    };
    StorageService = __decorate([
        core_1.Injectable()
    ], StorageService);
    return StorageService;
}());
exports.StorageService = StorageService;
