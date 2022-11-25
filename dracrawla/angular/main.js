"use strict";
(self["webpackChunktest_project"] = self["webpackChunktest_project"] || []).push([["main"],{

/***/ 158:
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppRoutingModule": () => (/* binding */ AppRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 2816);
/* harmony import */ var _location_location_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./location/location.component */ 179);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 3184);




const routes = [
    {
        path: 'location',
        component: _location_location_component__WEBPACK_IMPORTED_MODULE_0__.LocationComponent,
    },
];
class AppRoutingModule {
}
AppRoutingModule.ɵfac = function AppRoutingModule_Factory(t) { return new (t || AppRoutingModule)(); };
AppRoutingModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({ type: AppRoutingModule });
AppRoutingModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({ imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forRoot(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](AppRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule] }); })();


/***/ }),

/***/ 5041:
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppComponent": () => (/* binding */ AppComponent)
/* harmony export */ });
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../environments/environment */ 2340);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var ngx_socket_io__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngx-socket-io */ 4935);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ 8784);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ 2816);





class AppComponent {
    constructor(socket, changeRef, http) {
        this.socket = socket;
        this.changeRef = changeRef;
        this.http = http;
        this.title = 'test-project';
        this.data = { lat: 10.3157, lng: 123.8854 };
        this.zoom = 14;
        this.kmlUrl = 'https://files-server.tk/0:/Server%20Downloads/mandauekml.kml';
        this.mapTypeId = 'satellite';
        this.activeDevices = [];
    }
    ngOnInit() {
        this.http.get(`${_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.socketUrl}/api/connected-device`)
            .subscribe((res) => {
            this.activeDevices = res;
            this.changeRef.detectChanges();
        });
        this.socket.on('coordinates/room', (res) => {
            const data = JSON.parse(res);
            const idx = this.activeDevices.findIndex(d => d.id === data.deviceId);
            if (idx > -1) {
                this.activeDevices[idx].lat = data.latitude;
                this.activeDevices[idx].lng = data.longitude;
            }
            else {
                this.activeDevices.push({
                    id: data.deviceId,
                    lat: data.latitude,
                    lng: data.longitude
                });
            }
            this.changeRef.detectChanges();
        });
    }
}
AppComponent.ɵfac = function AppComponent_Factory(t) { return new (t || AppComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](ngx_socket_io__WEBPACK_IMPORTED_MODULE_2__.Socket), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__.ChangeDetectorRef), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_3__.HttpClient)); };
AppComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: AppComponent, selectors: [["app-root"]], decls: 1, vars: 0, template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "router-outlet");
    } }, directives: [_angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterOutlet], styles: ["agm-map[_ngcontent-%COMP%] {\n  height: 800px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5jb21wb25lbnQuc2NzcyIsIi4uXFwuLlxcLi5cXC4uXFwuLlxcLi5cXFBzYWxtJTIwQWxvbnpvXFxEZXNrdG9wXFxQeXRob25TZXJ2ZXJcXGRyYWNyYXdsYS10cmFja2VyLWFwcFxcc3JjXFxhcHBcXGFwcC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLGFBQUE7QUNDSiIsImZpbGUiOiJhcHAuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJhZ20tbWFwIHtcclxuICAgIGhlaWdodDogODAwcHg7XHJcbn1cclxuIiwiYWdtLW1hcCB7XG4gIGhlaWdodDogODAwcHg7XG59Il19 */"] });


/***/ }),

/***/ 6747:
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppModule": () => (/* binding */ AppModule)
/* harmony export */ });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/platform-browser */ 318);
/* harmony import */ var ngx_socket_io__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ngx-socket-io */ 4935);
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app-routing.module */ 158);
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app.component */ 5041);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common/http */ 8784);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 6362);
/* harmony import */ var _agm_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @agm/core */ 3333);
/* harmony import */ var _location_location_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./location/location.component */ 179);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 3184);











const config = { url: 'https://dracrawla-rtc.herokuapp.com', options: {} };
class AppModule {
}
AppModule.ɵfac = function AppModule_Factory(t) { return new (t || AppModule)(); };
AppModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineNgModule"]({ type: AppModule, bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_1__.AppComponent] });
AppModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjector"]({ providers: [], imports: [[
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_4__.BrowserModule,
            _app_routing_module__WEBPACK_IMPORTED_MODULE_0__.AppRoutingModule,
            _angular_common__WEBPACK_IMPORTED_MODULE_5__.CommonModule,
            _agm_core__WEBPACK_IMPORTED_MODULE_6__.AgmCoreModule.forRoot({
                apiKey: 'AIzaSyAephg6kRVLxxou5LlEyUynlYRtLjnsdjk'
            }),
            _angular_common_http__WEBPACK_IMPORTED_MODULE_7__.HttpClientModule,
            _angular_common_http__WEBPACK_IMPORTED_MODULE_7__.HttpClientJsonpModule,
            ngx_socket_io__WEBPACK_IMPORTED_MODULE_8__.SocketIoModule.forRoot(config),
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsetNgModuleScope"](AppModule, { declarations: [_app_component__WEBPACK_IMPORTED_MODULE_1__.AppComponent,
        _location_location_component__WEBPACK_IMPORTED_MODULE_2__.LocationComponent], imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_4__.BrowserModule,
        _app_routing_module__WEBPACK_IMPORTED_MODULE_0__.AppRoutingModule,
        _angular_common__WEBPACK_IMPORTED_MODULE_5__.CommonModule, _agm_core__WEBPACK_IMPORTED_MODULE_6__.AgmCoreModule, _angular_common_http__WEBPACK_IMPORTED_MODULE_7__.HttpClientModule,
        _angular_common_http__WEBPACK_IMPORTED_MODULE_7__.HttpClientJsonpModule, ngx_socket_io__WEBPACK_IMPORTED_MODULE_8__.SocketIoModule] }); })();


/***/ }),

/***/ 179:
/*!************************************************!*\
  !*** ./src/app/location/location.component.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LocationComponent": () => (/* binding */ LocationComponent)
/* harmony export */ });
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../environments/environment */ 2340);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var ngx_socket_io__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngx-socket-io */ 4935);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ 8784);
/* harmony import */ var _agm_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @agm/core */ 3333);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 6362);






function LocationComponent_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](1, "agm-marker", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const x_r1 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("latitude", x_r1.lat)("longitude", x_r1.lng)("iconUrl", "/assets/images/robot.png");
} }
class LocationComponent {
    constructor(socket, changeRef, http) {
        this.socket = socket;
        this.changeRef = changeRef;
        this.http = http;
        this.title = 'test-project';
        this.data = { lat: 10.3157, lng: 123.8854 };
        this.zoom = 14;
        this.kmlUrl = 'https://files-server.tk/0:/Server%20Downloads/mandauekml.kml';
        this.mapTypeId = 'satellite';
        this.activeDevices = [];
    }
    ngOnInit() {
        this.http.get(`${_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.socketUrl}/api/connected-device`)
            .subscribe((res) => {
            this.activeDevices = res;
            this.changeRef.detectChanges();
        });
        this.socket.on('coordinates/room', (res) => {
            const data = JSON.parse(res);
            const idx = this.activeDevices.findIndex(d => d.id === data.deviceId);
            if (idx > -1) {
                this.activeDevices[idx].lat = data.latitude;
                this.activeDevices[idx].lng = data.longitude;
            }
            else {
                this.activeDevices.push({
                    id: data.deviceId,
                    lat: data.latitude,
                    lng: data.longitude
                });
            }
            this.changeRef.detectChanges();
        });
    }
}
LocationComponent.ɵfac = function LocationComponent_Factory(t) { return new (t || LocationComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](ngx_socket_io__WEBPACK_IMPORTED_MODULE_2__.Socket), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__.ChangeDetectorRef), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_3__.HttpClient)); };
LocationComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: LocationComponent, selectors: [["app-location"]], decls: 4, vars: 6, consts: [[3, "latitude", "longitude", "zoom"], [4, "ngFor", "ngForOf"], [3, "geoJson"], [3, "url"], [3, "latitude", "longitude", "iconUrl"]], template: function LocationComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "agm-map", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, LocationComponent_ng_container_1_Template, 2, 3, "ng-container", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](2, "agm-data-layer", 2)(3, "agm-kml-layer", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("latitude", ctx.data.lat)("longitude", ctx.data.lng)("zoom", ctx.zoom);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx.activeDevices);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("geoJson", ctx.geoJsonObject);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("url", ctx.kmlUrl);
    } }, directives: [_agm_core__WEBPACK_IMPORTED_MODULE_4__.AgmMap, _angular_common__WEBPACK_IMPORTED_MODULE_5__.NgForOf, _agm_core__WEBPACK_IMPORTED_MODULE_4__.AgmMarker, _agm_core__WEBPACK_IMPORTED_MODULE_4__.AgmDataLayer, _agm_core__WEBPACK_IMPORTED_MODULE_4__.AgmKmlLayer], styles: ["agm-map[_ngcontent-%COMP%] {\n  height: 800px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvY2F0aW9uLmNvbXBvbmVudC5zY3NzIiwiLi5cXC4uXFwuLlxcLi5cXC4uXFwuLlxcLi5cXFBzYWxtJTIwQWxvbnpvXFxEZXNrdG9wXFxQeXRob25TZXJ2ZXJcXGRyYWNyYXdsYS10cmFja2VyLWFwcFxcc3JjXFxhcHBcXGxvY2F0aW9uXFxsb2NhdGlvbi5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLGFBQUE7QUNDSiIsImZpbGUiOiJsb2NhdGlvbi5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbImFnbS1tYXAge1xyXG4gICAgaGVpZ2h0OiA4MDBweDtcclxufVxyXG4iLCJhZ20tbWFwIHtcbiAgaGVpZ2h0OiA4MDBweDtcbn0iXX0= */"] });


/***/ }),

/***/ 2340:
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "environment": () => (/* binding */ environment)
/* harmony export */ });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
    production: false,
    socketUrl: 'https://dracrawla-rtc.herokuapp.com'
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ 4431:
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser */ 318);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app/app.module */ 6747);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./environments/environment */ 2340);




if (_environments_environment__WEBPACK_IMPORTED_MODULE_1__.environment.production) {
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.enableProdMode)();
}
_angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__.platformBrowser().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_0__.AppModule)
    .catch(err => console.error(err));


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendor"], () => (__webpack_exec__(4431)));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=main.js.map