var _0x1b6ae9 = _0x8e41;
(function (_0x59bf03, _0x4c5009) {
  var _0x15916a = _0x8e41,
    _0x1061d5 = _0x59bf03();
  while (!![]) {
    try {
      var _0x45da8f =
        -parseInt(_0x15916a(0x12a)) / 0x1 +
        (parseInt(_0x15916a(0x11a)) / 0x2) *
          (-parseInt(_0x15916a(0x156)) / 0x3) +
        -parseInt(_0x15916a(0x12b)) / 0x4 +
        parseInt(_0x15916a(0x159)) / 0x5 +
        parseInt(_0x15916a(0x153)) / 0x6 +
        parseInt(_0x15916a(0x139)) / 0x7 +
        (parseInt(_0x15916a(0x144)) / 0x8) * (parseInt(_0x15916a(0x11f)) / 0x9);
      if (_0x45da8f === _0x4c5009) break;
      else _0x1061d5["push"](_0x1061d5["shift"]());
    } catch (_0x160adc) {
      _0x1061d5["push"](_0x1061d5["shift"]());
    }
  }
})(_0x5639, 0x93ebd);
var view,
  pushbasemaps = [],
  options = { query: { f: _0x1b6ae9(0x13f) }, responseType: _0x1b6ae9(0x13f) };
function _0x8e41(_0x23e11e, _0xd12b52) {
  var _0x563942 = _0x5639();
  return (
    (_0x8e41 = function (_0x8e4147, _0x47809d) {
      _0x8e4147 = _0x8e4147 - 0x10c;
      var _0x25851f = _0x563942[_0x8e4147];
      return _0x25851f;
    }),
    _0x8e41(_0x23e11e, _0xd12b52)
  );
}
function loadMap(
  _0x768fcd,
  _0x2e5f38,
  _0x4ae69d,
  _0x545b4d,
  _0xe31867,
  _0x5e3166,
  _0x587890,
  _0x470fc5,
  _0x24f6c4,
  _0x2ff03f,
  _0x1b6f1e,
  _0x55b89d,
  _0x2431d8,
  _0x1a0514,
  _0x15d172,
  _0x58c6e0,
  _0x58cc3b,
  _0xb0b4b1,
  _0xeb3ec5,
  _0x121ed1,
  _0x403bfb,
  _0x57ecd1,
  _0x397734,
  _0x5e0d9c,
  _0x34909d,
  _0xf7ba3e,
  _0x596c9a,
  _0x547752,
  _0x126925,
  _0x46ac1d,
  _0x3444ab,
  _0x52f8b2,
  _0x2431d8,
  _0x16284e,
  _0x218872,
  _0x46ac1d
) {
  var _0x4cae92 = _0x1b6ae9;
  _Map = new _0x5e3166({});
  var _0x3a7973 = new Helper();
  if (_myToken != null && _myToken != "") {
    var _0x2bbb62 = _mapData[_0x4cae92(0x136)][_0x4cae92(0x15e)](
        _0x4cae92(0x115)
      ),
      _0x10d299 = _mapData[_0x4cae92(0x136)][_0x4cae92(0x15b)](0x0, _0x2bbb62);
    _0x24f6c4[_0x4cae92(0x138)]({
      server: _0x10d299 + "services",
      token: _myToken,
    });
  }
  _0x3a7973[_0x4cae92(0x154)](
    _0x3a7973[_0x4cae92(0x133)](),
    "Bảng\x20đồ\x20lưới\x20điện\x20" + _mapData[_0x4cae92(0x116)]
  ),
    (view = new _0x587890({
      container: _0x4cae92(0x150),
      map: _Map,
      zoom: 0xd,
    })),
    _0x2aaeb4(_mapData["FeatureLayer"]);
  var _0x2d3f2d = new _0x3444ab({ view: view, unit: _0x4cae92(0x151) });
  view["ui"][_0x4cae92(0x11c)](_0x2d3f2d, { position: _0x4cae92(0x134) });
  var _0x55b89d = new _0x55b89d({ view: view }, _0x4cae92(0x164));
  _0x2fdd00(), _0x5b88cf();
  var _0x5eeacd = new _0x1a0514({ view: view });
  view["ui"][_0x4cae92(0x11c)](_0x5eeacd, "top-left"),
    $(_0x4cae92(0x163))["on"](_0x4cae92(0x13a), function () {
      var _0x4c6d87 = _0x4cae92,
        _0x5940f4 = new _0x58c6e0({ view: view });
      _0x5940f4[_0x4c6d87(0x12e)]();
    });
  var _0x7202cf = new _0x52f8b2({ view: view });
  view["ui"][_0x4cae92(0x11c)](_0x7202cf, _0x4cae92(0x111));
  function _0x2aaeb4(_0x3afeca) {
    var _0x58dd58 = _0x4cae92,
      _0x2224cd = _0x58dd58(0x11e) + _mapData[_0x58dd58(0x116)] + "\x27",
      _0x4b29b2 = _0x3afeca["trim"]() + _0x58dd58(0x114);
    _0xeb3ec5(_0x4b29b2, options)[_0x58dd58(0x10e)](function (_0x240c57) {
      var _0x5b6de4 = _0x58dd58,
        _0x4d3b3d = _0x240c57[_0x5b6de4(0x13c)],
        _0x462a43 = _0x4d3b3d[_0x5b6de4(0x15a)][_0x5b6de4(0x10d)];
      for (var _0x4aa3b3 = _0x462a43 - 0x1; _0x4aa3b3 >= 0x0; _0x4aa3b3--) {
        var _0x383379 = _0x4d3b3d["layers"][_0x4aa3b3],
          _0x403fc8 = new _0x470fc5({
            url: _0x3afeca + "/" + _0x383379["id"]["toString"](),
            name: _0x383379[_0x5b6de4(0x14f)],
            outFields: ["*"],
            visible: !![],
            definitionExpression: _0x2224cd,
          });
        _Map[_0x5b6de4(0x11c)](_0x403fc8),
          _0x495390(_0x403fc8),
          _0x4c84ee(_0x403fc8);
      }
    });
  }
  function _0x4c84ee(_0x5a68f0) {
    var _0x1be7e5 = _0x4cae92;
    if (_0x5a68f0[_0x1be7e5(0x129)] === _0x3a7973["ThietBiDoDem_TT"]()) {
      var _0x5127c7 = _0x5a68f0[_0x1be7e5(0x162)]();
      return (
        (_0x5127c7[_0x1be7e5(0x137)] = view[_0x1be7e5(0x158)]),
        _0x5a68f0["queryFeatures"](_0x5127c7)[_0x1be7e5(0x10e)](function (
          _0x352270
        ) {
          var _0x558290 = _0x1be7e5,
            _0x816248 = _0x352270[_0x558290(0x132)][_0x558290(0x127)](function (
              _0x264130
            ) {
              var _0x1ef3eb = _0x558290;
              return (
                (_0x5127c7[_0x1ef3eb(0x137)] = view[_0x1ef3eb(0x158)]),
                _0x264130[_0x1ef3eb(0x10c)]
              );
            });
          return view["goTo"](_0x816248, { duration: 0x1f4 }), _0x816248;
        })
      );
    }
  }
  view["on"](_0x4cae92(0x126), function (_0x623dac) {
    var _0x4febeb = _0x4cae92,
      _0x55a909 = view[_0x4febeb(0x143)](_0x623dac);
    if (_0x55a909) {
      var _0x27dc9d = _0x55a909["x"],
        _0x56fc64 = _0x55a909["y"];
      document["getElementById"](_0x4febeb(0x140))["innerHTML"] =
        _0x4febeb(0x165) +
        _0x27dc9d[_0x4febeb(0x14b)](0x3) +
        _0x4febeb(0x142) +
        _0x56fc64[_0x4febeb(0x14b)](0x3);
    }
  }),
    view["ui"][_0x4cae92(0x11c)](_0x4cae92(0x14a), "bottom-right"),
    _0x1466bd();
  function _0x1466bd() {
    var _0x2987dc = _0x4cae92,
      _0x4ab012 = new _0x2ff03f({ url: _mapData[_0x2987dc(0x141)] }),
      _0x57fbc5 = new _0x768fcd({
        baseLayers: [_0x4ab012],
        title: _0x2987dc(0x11d),
        id: _0x2987dc(0x112),
      });
    pushbasemaps[_0x2987dc(0x12f)](_0x57fbc5);
    var _0x318c32 = new _0x2e5f38(
      { source: pushbasemaps, view: view },
      _0x2987dc(0x112)
    );
    _0x57fbc5 && (_0x318c32[_0x2987dc(0x12d)] = _0x57fbc5);
  }
  function _0x2fdd00() {
    var _0x19110e = _0x4cae92,
      _0x460b35 = document[_0x19110e(0x120)]("div");
    (_0x460b35["id"] = _0x19110e(0x13e)),
      (_0x460b35[_0x19110e(0x166)] = _0x19110e(0x113));
    var _0xf97fd3 = document["createElement"](_0x19110e(0x130));
    (_0xf97fd3[_0x19110e(0x166)] = "esri-icon-table"),
      _0x460b35[_0x19110e(0x155)](_0xf97fd3),
      (_0x460b35[_0x19110e(0x15d)][_0x19110e(0x119)] = _0x19110e(0x13d)),
      _0x460b35["addEventListener"](_0x19110e(0x13a), function (_0x38021e) {
        var _0x6a9b13 = _0x19110e;
        (document[_0x6a9b13(0x110)]("docking-window")[_0x6a9b13(0x15d)][
          "display"
        ] = _0x6a9b13(0x118)),
          (this[_0x6a9b13(0x15d)]["display"] = _0x6a9b13(0x13d));
      }),
      view["ui"][_0x19110e(0x11c)](_0x460b35, _0x19110e(0x135));
  }
  function _0x5b88cf() {
    var _0x46c8ee = _0x4cae92;
    try {
      var _0x235d15 = document["getElementById"](_0x46c8ee(0x131));
      _0x235d15[_0x46c8ee(0x14e)](_0x46c8ee(0x13a), function () {
        _0x465533();
      });
    } catch (_0x3d06f3) {}
  }
  function _0x495390(_0x75aeae) {
    var _0x22eb12 = _0x4cae92,
      _0x8aa670 = document[_0x22eb12(0x110)](_0x22eb12(0x169)),
      _0x5bc99e = document[_0x22eb12(0x110)](_0x22eb12(0x13b));
    if (_0x8aa670 && _0x5bc99e) {
      var _0x5209ff = _0x75aeae["id"],
        _0x4332e9 = _0x75aeae[_0x22eb12(0x14f)],
        _0x4ed6b4 = document[_0x22eb12(0x120)](_0x22eb12(0x11b));
      (_0x4ed6b4["value"] = _0x5209ff),
        (_0x4ed6b4[_0x22eb12(0x124)] = _0x4332e9);
      if (_0x8aa670) _0x8aa670[_0x22eb12(0x11c)](_0x4ed6b4);
      var _0x3f3f5b = document["createElement"](_0x22eb12(0x11b));
      (_0x3f3f5b[_0x22eb12(0x14c)] = _0x5209ff),
        (_0x3f3f5b[_0x22eb12(0x124)] = _0x4332e9);
      if (_0x5bc99e) _0x5bc99e[_0x22eb12(0x11c)](_0x3f3f5b);
    }
  }
  function _0x465533() {
    var _0x5e0e3f = _0x4cae92;
    _0x3a7973["showLoadingMessage"](_0x5e0e3f(0x14d));
    var _0x3f6126 = document[_0x5e0e3f(0x110)](_0x5e0e3f(0x169)),
      _0x5e0c22 = document["getElementById"](_0x5e0e3f(0x13b)),
      _0x290f20 = document["getElementById"](_0x5e0e3f(0x117)),
      _0x84ec27 = _0x3f6126[_0x5e0e3f(0x14c)],
      _0x5bd2e1 = _0x5e0c22[_0x5e0e3f(0x14c)],
      _0x2656cf = _0x290f20["value"],
      _0xca57dc = _0x238e6d(_Map["allLayers"][_0x5e0e3f(0x125)], _0x84ec27),
      _0x219deb = _0x238e6d(
        _Map[_0x5e0e3f(0x167)][_0x5e0e3f(0x125)],
        _0x5bd2e1
      ),
      _0x3f058c = [],
      _0x54e65f = _0xca57dc[_0x5e0e3f(0x162)](),
      _0x355a99 = infoTable[_0x5e0e3f(0x12c)](_0xca57dc, _0x54e65f),
      _0x4dfa77 = _0x355a99[_0x5e0e3f(0x10e)](function (_0x1ae721) {
        var _0x4a209e = [];
        return (
          _0x1ae721["forEach"](function (_0x846561) {
            var _0x41fe88 = _0x8e41;
            _0x4a209e = _0x4a209e[_0x41fe88(0x147)](
              _0x846561[_0x41fe88(0x132)]
            );
          }),
          _0x4a209e
        );
      });
    _0x4dfa77[_0x5e0e3f(0x10e)](function (_0x298b99) {
      var _0x298ada = _0x5e0e3f,
        _0xef7061 = _0x298b99[_0x298ada(0x127)](function (_0x36a8a6) {
          var _0x498298 = _0x298ada,
            _0x459d41 = _0x36a8a6[_0x498298(0x123)][_0x498298(0x15f)],
            _0x497581 = _0x219deb["createQuery"]();
          return (
            (_0x497581[_0x498298(0x10c)] = _0x36a8a6[_0x498298(0x10c)]),
            (_0x497581[_0x498298(0x161)] = _0x2656cf),
            typeof _selectFeature !== _0x498298(0x15c) &&
              _selectFeature &&
              _selectFeature[_0x498298(0x149)] &&
              _selectFeature[_0x498298(0x149)]["title"] ===
                _0x219deb[_0x498298(0x152)] &&
              (_0x497581[_0x498298(0x10f)] =
                _0x498298(0x146) + _selectFeature["attributes"]["OBJECTID"]),
            _0x219deb[_0x498298(0x157)](_0x497581)
              ["then"](function (_0xee2ece) {
                var _0x4527d5 = _0x498298;
                if (_0xee2ece > 0x0) _0x3f058c[_0x4527d5(0x12f)](_0x459d41);
                return _0xee2ece;
              })
              [_0x498298(0x168)](function (_0x11f0a1) {
                var _0x3508be = _0x498298;
                console["log"](_0x3508be(0x148) + _0x11f0a1);
              })
          );
        });
      Promise["all"](_0xef7061)
        ["then"](function () {
          var _0x8afe5b = _0x298ada;
          _0x3a7973[_0x8afe5b(0x145)](),
            infoTable[_0x8afe5b(0x122)](_0xca57dc, _0x3f058c),
            _0x3a7973[_0x8afe5b(0x121)](),
            _0x3a7973[_0x8afe5b(0x160)]();
        })
        [_0x298ada(0x168)](function (_0x4b8d84) {
          var _0x50b514 = _0x298ada;
          console[_0x50b514(0x128)](_0x50b514(0x148) + _0x4b8d84),
            _0x3a7973[_0x50b514(0x160)]();
        });
    });
  }
  function _0x238e6d(_0x923c9, _0x2dbe13) {
    var _0x112876 = _0x4cae92;
    for (
      var _0x579095 = 0x0;
      _0x579095 <= _0x923c9[_0x112876(0x10d)];
      _0x579095++
    ) {
      if (_0x923c9[_0x579095]["id"] == _0x2dbe13) return _0x923c9[_0x579095];
    }
    return null;
  }
}
function _0x5639() {
  var _0x3c231c = [
    "substring",
    "undefined",
    "style",
    "indexOf",
    "OBJECTID",
    "hideLoadingMessage",
    "spatialRelationship",
    "createQuery",
    ".mylocation",
    "list-legend",
    "X:\x20",
    "className",
    "allLayers",
    "catch",
    "targetLayer",
    "geometry",
    "length",
    "then",
    "where",
    "getElementById",
    "top-left",
    "ddc_body_baseMap",
    "esri-widget--button\x20esri-widget\x20esri-interactive",
    "/layers",
    "services",
    "DonViQuanLy",
    "relationship-select",
    "block",
    "display",
    "455974nlJIMr",
    "option",
    "add",
    "Bản\x20đồ\x20nền\x20mặc\x20định",
    "DonViQuanLy=\x27",
    "117VPjBHj",
    "createElement",
    "hidePopupMap",
    "getDataFromObjects",
    "attributes",
    "text",
    "items",
    "pointer-move",
    "map",
    "log",
    "layerId",
    "674248JOYnzf",
    "4170656GZbhRU",
    "getAllFeature",
    "activeBasemap",
    "locate",
    "push",
    "span",
    "queryFilterBtn",
    "features",
    "EvtView",
    "bottom-right",
    "bottom-left",
    "URL",
    "outSpatialReference",
    "registerToken",
    "2465575tQVEwK",
    "click",
    "queryLayer",
    "data",
    "none",
    "btnShowInfoTable",
    "json",
    "SetLocation",
    "MapImageLayer",
    "\x20-\x20Y:\x20",
    "toMap",
    "962264SEQHSj",
    "removeFeatureTableHtml",
    "OBJECTID\x20=\x20",
    "concat",
    "Lỗi\x20truy\x20vấn\x20không\x20gian:\x20",
    "layer",
    "showLocationMove",
    "toFixed",
    "value",
    "Đang\x20thực\x20hiện\x20truy\x20vấn\x20không\x20gian...",
    "addEventListener",
    "name",
    "map-container",
    "dual",
    "title",
    "3055566gQSDUU",
    "SaveLogFunction",
    "appendChild",
    "12mwbuAU",
    "queryFeatureCount",
    "spatialReference",
    "4047900nCPBzf",
    "layers",
  ];
  _0x5639 = function () {
    return _0x3c231c;
  };
  return _0x5639();
}
