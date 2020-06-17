var _resource = require("../../resource/resource.js"), _resource2 = _interopRequireDefault(_resource);

function _interopRequireDefault(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

function _defineProperty(t, a, e) {
    return a in t ? Object.defineProperty(t, a, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[a] = e, t;
}

var WxParse = require("../../wxParse/wxParse.js"), app = getApp(), checksubmit = !1;

Page({
    data: {
        buyNumber: 1,
        buyNumMin: 1,
        indicatorDots: !0,
        autoplay: !0,
        interval: 3e3,
        duration: 1e3,
        banners: [],
        goodsInfo: {
            cartNum: 0
        },
        goods_attr: [],
        sku_id: 0,
        sku_name: "",
        go: "",
        goods_id: 0
    },
    backIndex: function(t) {
        wx.reLaunch({
            url: "../index/index"
        });
    },
    onLoad: function(t) {
        this.diyWinColor(), this.setData({
            goods_id: t.id
        });
    },
    labelItemTap: function(t) {
        var a, e = this.data.goods_attr, o = [], r = t.currentTarget.dataset.attrKey, i = t.currentTarget.dataset.vid;
        e[r].attr_val.forEach(function(t) {
            t.vid == i ? t.active = 1 : t.active = 0;
        }), e.forEach(function(t) {
            t.attr_val.forEach(function(t) {
                1 == t.active && o.push(t.vid);
            });
        }), this.setData((_defineProperty(a = {
            goods_attr: e
        }, "goodsInfo.default_attr_ids", o), _defineProperty(a, "buyNumber", 1), a)), this.changeProperty();
    },
    numJianTap: function(t) {
        var a = this;
        if (a.data.buyNumber > a.data.buyNumMin) {
            var e = a.data.buyNumber;
            e--, a.setData({
                buyNumber: e
            });
        }
    },
    numJiaTap: function(t) {
        var a = this;
        if (a.data.buyNumber < a.data.goodsInfo.store_count) {
            var e = a.data.buyNumber;
            e++, a.setData({
                buyNumber: e
            });
        }
    },
    onReady: function() {},
    onShow: function() {
        var e = this, t = {
            goods_id: this.data.goods_id
        };
        _resource2.default.fetchGoodsInfo(t, function(t) {
            if (console.log(t), 1 == t.data.status) {
                var a = t.data.data;
                WxParse.wxParse("article", "html", a.goods_content, e, 0), e.setData({
                    goodsInfo: a,
                    goods_attr: a.attr,
                    banners: a.goods_images
                }), e.changeProperty();
            }
            -100 == t.data.status && app.removeToken();
        });
    },
    diyWinColor: function(t) {
        this.data.system ? wx.setNavigationBarTitle({
            title: this.data.system.link_name
        }) : wx.setNavigationBarTitle({
            title: "商品详情"
        });
    },
    buyNowTap: function(t) {
        var a = t.currentTarget.dataset.statu;
        this.util(a), this.setData({
            go: "order"
        });
    },
    joinCartTap: function(t) {
        var a = t.currentTarget.dataset.statu;
        this.util(a), this.setData({
            go: "cart"
        });
    },
    close: function(t) {
        var a = t.currentTarget.dataset.statu;
        this.util(a);
    },
    util: function(t) {
        var a = wx.createAnimation({
            duration: 200,
            timingFunction: "linear",
            delay: 0
        });
        (this.animation = a).opacity(0).step(), this.setData({
            animationData: a.export()
        }), setTimeout(function() {
            a.opacity(1).step(), this.setData({
                animationData: a
            }), "close" == t && this.setData({
                showModalStatus: !1
            });
        }.bind(this), 200), "open" == t && this.setData({
            showModalStatus: !0
        });
    },
    submit: function() {
        if (0 < this.data.goods_attr.length && 0 == this.data.sku_id) return _resource2.default.errorToast("请选商品规格"), 
        !1;
        this.util("close"), this.addCart();
    },
    navigateToCart: function() {
        wx.navigateTo({
            url: "../shoppingCart/shoppingCart"
        });
    },
    changeProperty: function() {
        var e = this, t = e.data.goodsInfo.sku, o = e.data.goodsInfo.default_attr_ids;
        t.forEach(function(t) {
            var a;
            t.attr_value_ids == o && e.setData((_defineProperty(a = {
                sku_id: t.sku_id,
                sku_name: t.properties_name
            }, "goodsInfo.shop_price", t.price), _defineProperty(a, "goodsInfo.store_count", t.quantity), 
            a));
        });
    },
    addCart: function() {
        if (!0 === checksubmit) return _resource2.default.errorToast("请勿重复点击"), !1;
        checksubmit = !0;
        var e = this, t = {
            goods_id: this.data.goodsInfo.goods_id,
            goods_num: this.data.buyNumber,
            sku_id: this.data.sku_id,
            sku_name: this.data.sku_name,
            selected: "order" == e.data.go ? 1 : 0
        };
        _resource2.default.fetchAddCart(t, function(t) {
            if (checksubmit = !1, 1 == t.data.status) {
                if ("order" == e.data.go) return wx.navigateTo({
                    url: "../toPayOrder/toPayOrder"
                }), !1;
                _resource2.default.successToast("加入成功");
                var a = e.data.goodsInfo.cartNum;
                e.setData(_defineProperty({}, "goodsInfo.cartNum", a + e.data.buyNumber));
            } else _resource2.default.errorToast(t.data.msg);
        }, function(t) {
            checksubmit = !1;
        });
    }
});