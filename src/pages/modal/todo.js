"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
//imports
var core_1 = require('@angular/core');
var storage_1 = require('../../services/storage');
var to_do_1 = require('../../factories/to_do');
var Profile = (function () {
    function Profile(viewCtrl, params, storageService, todoFactory) {
        this.viewCtrl = viewCtrl;
        this.params = params;
        this.storageService = storageService;
        this.todoFactory = todoFactory;
        this.icons = [
            'alarm', 'alert', 'basket', 'beer', 'bicycle', 'boat', 'body', 'book', 'bowtie', 'briefcase', 'brush',
            'bug', 'build', 'bulb', 'bus', 'cafe', 'call', 'car', 'camera', 'card', 'cart', 'cash', 'chatboxes', 'cloud', 'desktop',
            'cut', 'document', 'logo-euro', 'eye', 'film', 'flag', 'flash', 'flame', 'flask', 'football', 'game-controller-b',
            'hammer', 'heart', 'happy', 'home', 'ice-cream', 'infinite', 'jet', 'key', 'laptop', 'list', 'lock', 'magnet', 'man',
            'mic', 'musical-notes', 'no-smoking', 'nuclear', 'paw', 'pin', 'plane', 'restaurant', 'search', 'shirt', 'logo-usd',
            'videocam', 'walk', 'wine', 'woman'];
        this.icons_collection = [];
        this.deadlines_collection = this.params.data.deadlines;
        this.index_of = this.params.data.index_of;
        this.deadline_data = this.deadlines_collection[this.index_of];
        this.deadline = this.deadline_data || {
            end_date: new Date().toISOString(),
            icon: 'alarm'
        };
        this.createArray();
        this.setSelectedIcon();
    }
    Profile.prototype.setSelectedIcon = function () {
        var icon_index = this.icons_collection.map(function (item) {
            return item.icon_name;
        }).indexOf(this.deadline.icon);
        var icon_found = this.icons_collection[icon_index];
        icon_found.selected = true;
        this.icons_collection.splice(0, 0, this.icons_collection.splice(icon_index, 1)[0]);
    };
    Profile.prototype.selectIcon = function (selected_item, selected_index) {
        selected_item.selected = true;
        this.icons_collection.forEach(function (item, index) {
            item.selected = false;
        });
        this.icons_collection[selected_index].selected = true;
        this.deadline.icon = selected_item.icon_name;
    };
    Profile.prototype.createArray = function () {
        this.icons.forEach(function (item) {
            this.icons_collection.push({ 'icon_name': item, 'selected': false });
        }.bind(this));
    };
    Profile.prototype.dismiss = function (data) {
        this.viewCtrl.dismiss(data);
    };
    Profile.prototype.createDeadline = function (deadline) {
        var _this = this;
        this.todoFactory.addItem(deadline).then(function () {
            _this.viewCtrl.dismiss();
        });
    };
    Profile.prototype.editDeadline = function (item) {
        /*this.deadlines_collection[this.index_of] = item;
        this.saveToStorage(this.deadlines_collection);*/
        var _this = this;
        this.todoFactory.updateItem(item, this.index_of).then(function () {
            _this.viewCtrl.dismiss();
        });
    };
    Profile.prototype.saveToStorage = function (data) {
        var _this = this;
        this.storageService.save(data).then(function () {
            _this.viewCtrl.dismiss();
        });
    };
    Profile = __decorate([
        core_1.Component({
            templateUrl: 'build/pages/modal/create_deadline.html',
            providers: [storage_1.StorageService, to_do_1.ToDoFactory]
        })
    ], Profile);
    return Profile;
}());
exports.Profile = Profile;
