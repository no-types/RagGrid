/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./javascript/RagGrid.js":
/*!*******************************!*\
  !*** ./javascript/RagGrid.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


HTMLWidgets.widget({

  name: 'RagGrid',

  type: 'output',

  factory: function factory(el, width, height) {
    var gridOptions = {};
    // TODO: define shared variables for this instance
    var sel_handle = new crosstalk.SelectionHandle();
    var filter_handle = new crosstalk.FilterHandle();
    sel_handle.on("change", function (e) {
      if (e.sender !== sel_handle) {
        // scatter.clearBrush(); 
        gridOptions.api.forEachNode(function (node) {
          if (node.data && node.data.ctKey && e.value.indexOf(node.data.ctKey) != -1) {
            node.setSelected(true);
          } else {
            node.setSelected(false);
          }
        });
      }

      console.log(e);
    });
    filter_handle.on("change", function (e) {
      // scatter.filter(e.value);
      console.log(e);
    });
    return {

      renderValue: function renderValue(x) {
        var data = x.data;

        var defaultGridOptions = {
          rowSelection: 'multiple',
          enableSorting: true,
          enableFilter: true,
          groupMultiAutoColumn: true,
          groupSuppressAutoColumn: true,
          enableRangeSelection: false,
          enableColResize: true,
          pagination: true,
          paginationAutoPageSize: true,
          onRowClicked: function onRowClicked(event) {
            var selectionKeys = [];
            gridOptions.api.getSelectedNodes().forEach(function (node) {
              if (node.data && node.data.ctKey) {
                selectionKeys.push(node.data.ctKey);
              }
            });
            sel_handle.set(selectionKeys);
          }
        };

        if (x.licenseKey) {
          var enterpriseGridOptions = {
            enableStatusBar: true,
            alwaysShowStatusBar: false // status bar can be be fixed
          };
          defaultGridOptions = Object.assign(defaultGridOptions, enterpriseGridOptions);
        }

        if (x.settings.crosstalk_group) {
          sel_handle.setGroup(x.settings.crosstalk_group);
          filter_handle.setGroup(x.settings.crosstalk_group);
        }

        gridOptions = Object.assign(defaultGridOptions, x.gridOptions);
        var rowHeaders = Object.keys(data);
        if (rowHeaders.length == 0) {
          return;
        }
        var filedRowHeaderMap = {};
        rowHeaders.forEach(function (rowHeader) {
          filedRowHeaderMap[rowHeader] = rowHeader.replace(".", "_");
        });
        var rowLength = data[rowHeaders[0]].length;
        var colDef = rowHeaders.map(function (rowHeader) {
          var options = { 'headerName': rowHeader, 'field': filedRowHeaderMap[rowHeader],
            enableValue: x.isNumeric[rowHeader] };

          var enterpriseColumnDefinitionOptions = x.licenseKey ? {
            enableRowGroup: !x.isNumeric[rowHeader],
            enablePivot: !x.isNumeric[rowHeader]
          } : {};
          return Object.assign(options, enterpriseColumnDefinitionOptions);
        });
        var rowDataList = [];

        var _loop = function _loop(rowIndex) {
          var rowData = {};
          rowHeaders.forEach(function (rowHeader) {
            rowData[filedRowHeaderMap[rowHeader]] = data[rowHeader][rowIndex];
          });
          if (x.settings.crosstalk_key) {
            rowData.ctKey = x.settings.crosstalk_key[rowIndex];
          }
          rowDataList.push(rowData);
        };

        for (var rowIndex = 0; rowIndex < rowLength; rowIndex++) {
          _loop(rowIndex);
        }
        if (x.licenseKey) {
          agGrid.LicenseManager.setLicenseKey(x.licenseKey);
        }
        gridOptions.columnDefs = colDef;
        gridOptions.rowData = rowDataList;

        el.setAttribute("class", "ag-theme-balham");
        new agGrid.Grid(el, gridOptions);
        // TODO: code to render the widget, e.g.
        //el.innerText = x.message;
      },

      resize: function resize(width, height) {

        // TODO: code to re-render the widget with a new size

      }

    };
  }
});

/***/ }),

/***/ 0:
/*!*************************************!*\
  !*** multi ./javascript/RagGrid.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./javascript/RagGrid.js */"./javascript/RagGrid.js");


/***/ })

/******/ });
//# sourceMappingURL=RagGrid.js.map