var _resource = require("../../resource/resource.js"), _resource2 = _interopRequireDefault(_resource);

function _interopRequireDefault(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

Page({
    data: {
        cartList: [],
        totalNumber: 0,
        totalPrice: 0,
        checkedStatus: !0,
        buyNumber: 0,
        buyPrice: 0
    },
    onLoad: function(t) {
        this.diyWinColor();
    },
    selectProduct: function(t) {
        var e = t.currentTarget.dataset.id, o = t.currentTarget.dataset.checkedStatus, a = 0, r = 0, s = 0, u = 0, d = [];
        o = !0 === o;
        var c = !0;
        this.data.cartList.forEach(function(t) {
            t.id != e && 0 != e || (t.selected = 0 == e ? !o : !t.selected), t.selected ? (d.push(t.id), 
            s += t.goods_num, u += t.goods_num * t.goods_price) : c = !1, a += t.goods_num, 
            r += t.goods_num * t.goods_price;
        }), _resource2.default.updCartStatus({
            cart_id: d.join()
        }), c = 0 == e ? !o : c, this.setData({
            cartList: this.data.cartList,
            checkedStatus: c,
            totalNumber: a,
            totalPrice: r.toFixed(2),
            buyNumber: s,
            buyPrice: u.toFixed(2)
        });
    },
    changeNumber: function(t) {
        var o = t.currentTarget.dataset.id, a = t.currentTarget.dataset.type, r = 0, s = 0, u = 0, d = 0;
        this.data.cartList.forEach(function(t) {
            if (t.price_total = parseFloat(t.price_total), t.id == o) {
                if ("plus" == a) if (t.store_count == t.goods_num) _resource2.default.errorToast("库存不足"); else {
                    t.goods_num++, t.price_total += 1 * t.goods_price;
                    var e = {
                        cart_id: o,
                        type: a
                    };
                    _resource2.default.updCartNumber(e, function(t) {
                        1 == t.data.status || _resource2.default.errorToast(t.data.msg);
                    });
                } else if (t.goods_num <= 1) ; else {
                    t.goods_num--, t.price_total -= t.goods_price;
                    e = {
                        cart_id: o,
                        type: a
                    };
                    _resource2.default.updCartNumber(e, function(t) {
                        1 == t.data.status || _resource2.default.errorToast(t.data.msg);
                    });
                }
                t.goods_num == t.store_count ? t.plus_class = "disabled" : t.plus_class = "", 1 == t.goods_num ? t.decr_class = "disabled" : t.decr_class = "";
            }
            t.selected && (u += t.goods_num, d += t.goods_num * t.goods_price), r += t.goods_num, 
            s += t.goods_num * t.goods_price, t.price_total = t.price_total.toFixed(2);
        }), this.setData({
            cartList: this.data.cartList,
            totalNumber: r,
            totalPrice: s.toFixed(2),
            buyNumber: u,
            buyPrice: d.toFixed(2)
        });
    },
    toSettlement: function() {
        0 != this.data.buyNumber ? wx.navigateTo({
            url: "../toPayOrder/toPayOrder"
        }) : _resource2.default.errorToast("请勾选商品");
    },
    delProduct: function(c) {
        var i = this;
        wx.showModal({
            content: "您确定在购物车中删除该商品",
            showCancel: !0,
            success: function(t) {
                if (0 != t.confirm) {
                    var o = c.currentTarget.dataset.id, e = i.data.cartList, a = 0, r = 0, s = 0, u = 0, d = 0;
                    e.forEach(function(t, e) {
                        t.id == o ? d = e : (t.selected && (s += t.goods_num, u += t.goods_num * t.goods_price), 
                        a += t.goods_num, r += t.goods_num * t.goods_price);
                    }), e.splice(d, 1), _resource2.default.delCartProduct({
                        cart_id: o
                    }, function(t) {
                        1 == t.data.status ? i.setData({
                            cartList: e,
                            totalNumber: a,
                            totalPrice: r.toFixed(2),
                            buyNumber: s,
                            buyPrice: u.toFixed(2)
                        }) : _resource2.default.errorToast(t.data.msg);
                    });
                }
            }
        });
    },
    onReady: function() {},
    onShow: function() {
        var s = this, u = wx.getStorageSync("ptName");
        _resource2.default.fetchCartList(function(t) {
            var e = 0, o = 0, a = 0, r = 0;
            1 == t.data.status && (t.data.data.forEach(function(t) {
                t.selected ? (a += t.goods_num, r += t.goods_num * t.goods_price) : s.setData({
                    checkedStatus: !1
                }), e += t.goods_num, o += t.goods_num * t.goods_price, t.goods_num == t.store_count ? t.plus_class = "disabled" : t.plus_class = "", 
                1 == t.goods_number ? t.decr_class = "disabled" : t.decr_class = "", t.price_total = t.price_total.toFixed(2);
            }), s.setData({
                ptName: u,
                cartList: t.data.data,
                totalNumber: e,
                totalPrice: o.toFixed(2),
                buyNumber: a,
                buyPrice: r.toFixed(2)
            }));
        });
    },
    diyWinColor: function(t) {
        this.data.system ? wx.setNavigationBarTitle({
            title: this.data.system.link_name
        }) : wx.setNavigationBarTitle({
            title: "购物车"
        });
    }
});