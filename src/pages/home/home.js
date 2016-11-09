"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var create_deadline_1 = require('../modal/create_deadline');
var options_1 = require('../popover/options');
var storage_1 = require('../../services/storage');
var HomePage = (function () {
    function HomePage(navCtrl, modalCtrl, storageService, popoverCtrl) {
        this.navCtrl = navCtrl;
        this.modalCtrl = modalCtrl;
        this.storageService = storageService;
        this.popoverCtrl = popoverCtrl;
        this.deadlines = [];
    }
    HomePage.prototype.ionViewWillEnter = function () {
        this.getData();
    };
    HomePage.prototype.getData = function () {
        var _this = this;
        this.storageService.getData().then(function (data) {
            if (data) {
                _this.deadlines = JSON.parse(data);
                _this.calculateDays();
            }
        });
    };
    HomePage.prototype.calculateDays = function () {
        for (var i = this.deadlines.length - 1; i >= 0; i--) {
            this.deadlines[i]['days_left'] = this.dateDiffInDays(this.deadlines[i]['end_date']);
        }
    };
    HomePage.prototype.ngOnInit = function () {
    };
    HomePage.prototype.editDeadline = function (index) {
        var profileModal = this.modalCtrl.create(create_deadline_1.Profile, { 'deadlines': this.deadlines, 'index_of': index });
        profileModal.present();
    };
    HomePage.prototype.presentPopover = function (index, ev) {
        ev.stopPropagation();
        ev.preventDefault();
        var popover = this.popoverCtrl.create(options_1.PopoverPage, {
            index: index,
            deadlines: this.deadlines
        });
        popover.present({
            ev: ev
        });
    };
    HomePage.prototype.onClickMe = function () {
        var profileModal = this.modalCtrl.create(create_deadline_1.Profile, { 'deadlines': this.deadlines });
        profileModal.present();
    };
    // http://stackoverflow.com/questions/3224834/get-difference-between-2-dates-in-javascript
    HomePage.prototype.dateDiffInDays = function (end_date) {
        var date_now = new Date().toISOString();
        var date_now_object = new Date(date_now);
        var end_date_object = new Date(end_date);
        // Discard the time and time-zone information.
        var utc1 = Date.UTC(date_now_object.getFullYear(), date_now_object.getMonth(), date_now_object.getDate());
        var utc2 = Date.UTC(end_date_object.getFullYear(), end_date_object.getMonth(), end_date_object.getDate());
        //_MS_PER_DAY = 1000 * 60 * 60 * 24 = 86400000
        return Math.floor((utc2 - utc1) / 86400000);
    };
    HomePage = __decorate([
        core_1.Component({
            templateUrl: 'build/pages/home/home.html',
            providers: [storage_1.StorageService]
        })
    ], HomePage);
    return HomePage;
}());
exports.HomePage = HomePage;
;
