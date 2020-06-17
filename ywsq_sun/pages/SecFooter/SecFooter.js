var _resource = require("../../resource/resource.js"), _resource2 = _interopRequireDefault(_resource);

function _interopRequireDefault(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var app = getApp();

Component({
    properties: {
        chooseNav: {
            type: Number,
            value: 0,
            observer: function(e, a) {}
        }
    },
    data: {},
    attached: function() {
        this._getUrl();
    },
    ready: function() {},
    methods: {
        _getUrl: function() {
            var e = this, a = wx.getStorageSync("footernav");
            console.log(a), a ? 0 == this.data.chooseNav ? e._getNav() : (this.setData({
                nav: a
            }), e._dealData(a)) : e._getNav();
        },
        _getNav: function() {
            var i = this;
            app.util.request({
                url: "entry/wxapp/index/GetMenu",
                cachetime: "0",
                success: function(e) {
                    if (e.data.status) {
                        var a = e.data.data.menu, t = [];
                        for (var r in a) t.push(a[r]);
                        var o = [ {}, {}, {}, {} ];
                        for (var s in t) o[s].txt = t[s].txt, o[s].img = t[s].img, o[s].imgh = t[s].imgh;
                        wx.setStorageSync("footernav", e.data.data), i._dealData(o);
                    } else i._dealData(!1);
                }
            });
        },
        _dealData: function(e) {
            var a = [ {}, {}, {}, {} ];
            switch (a[0].choose = 0, a[1].choose = 0, a[2].choose = 0, a[3].choose = 0, this.data.chooseNav) {
              case 0:
                a[0].choose = 1;
                break;

              case 1:
                a[1].choose = 1;
                break;

              case 2:
                a[2].choose = 1;
                break;

              case 3:
                a[3].choose = 1;
            }
            if (e) for (var t in a) a[t].imgh = e[t].imgh, a[t].img = e[t].img, a[t].txt = e[t].txt; else a[0].imgh = "../../resource/images/index/shouye-1.png", 
            a[0].img = "../../resource/images/index/shouye.png", a[1].imgh = "../../resource/images/index/faxian-1.png", 
            a[1].img = "../../resource/images/index/faxian.png", a[2].imgh = "../../resource/images/index/gouwu-1.png", 
            a[2].img = "../../resource/images/index/gouwu.png", a[3].imgh = "../../resource/images/index/wode-1.png", 
            a[3].img = "../../resource/images/index/wode.png", a[0].txt = "首页", a[1].txt = "发现", 
            a[2].txt = "购物", a[3].txt = "我的";
            wx.setStorageSync("footernav", a), this.setData({
                nav: a
            });
        },
        _onNavTab: function(e) {
            switch (e.currentTarget.dataset.index) {
              case 0:
                wx.reLaunch({
                    url: "../index/index"
                });
                break;

              case 1:
                wx.reLaunch({
                    url: "../found/found"
                });
                break;

              case 2:
                wx.reLaunch({
                    url: "../shopping/shopping"
                });
                break;

              case 3:
                wx.reLaunch({
                    url: "../mine/mine"
                });
            }
        }
    }
});