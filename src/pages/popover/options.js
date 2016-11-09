"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var storage_1 = require('../../services/storage');
var PopoverPage = (function () {
    function PopoverPage(viewCtrl, navParams, storageService) {
        this.viewCtrl = viewCtrl;
        this.navParams = navParams;
        this.storageService = storageService;
    }
    PopoverPage.prototype.deleteDeadline = function () {
        var _this = this;
        this.storageService.getData().then(function (data) {
            var parsed_data = JSON.parse(data);
            _this.navParams.data.deadlines.splice(_this.navParams.data.index, 1);
            parsed_data.splice(_this.navParams.data.index, 1);
            _this.storageService.save(parsed_data).then(function () {
                _this.viewCtrl.dismiss(parsed_data);
            });
        });
    };
    PopoverPage = __decorate([
        core_1.Component({
            templateUrl: 'build/pages/popover/options.html',
            providers: [storage_1.StorageService]
        })
    ], PopoverPage);
    return PopoverPage;
}());
exports.PopoverPage = PopoverPage;
