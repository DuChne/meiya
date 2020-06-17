var _resource = require("../../resource/resource.js"), _resource2 = _interopRequireDefault(_resource);

function _interopRequireDefault(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var app = getApp(), checksubmit = !1;

Page({
    data: {
        changeAddress: 0,
        cartList: [],
        totalPay: 0,
        amountPay: 0,
        coupon_id: 0,
        userAddress: {},
        coupon: 0,
        coupon_money: 0,
        addressAuth: !0
    },
    onLoad: function(e) {
        var a = this;
        if (a.diyWinColor(), e.coupon_id) {
            var t = e.coupon_id;
            a.setData({
                coupon_id: t
            });
        }
        var r = [], s = 0, o = 0, n = wx.getStorageSync("userAddress"), u = wx.getStorageSync("ptName");
        n && a.setData({
            userAddress: n,
            changeAddress: 1
        }), _resource2.default.fetchCartList(function(e) {
            1 == e.data.status && (e.data.data.forEach(function(e) {
                e.selected && (e.goods_num, s += e.goods_num * e.goods_price, r.push(e));
            }), o = s = s.toFixed(2), a.setData({
                cartList: r,
                totalPay: s,
                amountPay: o,
                ptName: u
            }), a.userCoupon(s));
        });
    },
    userCoupon: function(e) {
        var o = this;
        _resource2.default.userCoupon({
            money: e
        }, function(e) {
            if (1 == e.data.status) {
                var a = e.data.data, t = o.data.coupon_money, r = o.data.coupon_id;
                r && a.forEach(function(e) {
                    e.id == r && (t = e.money);
                });
                var s = o.data.amountPay - t;
                s = s.toFixed(2), o.setData({
                    coupon: a.length,
                    coupon_money: t,
                    amountPay: s
                });
            }
        });
    },
    changeCoupon: function() {
        wx.navigateTo({
            url: "../coupons/coupons?money=" + this.data.totalPay
        });
    },
    selectAddress: function(e) {
        var t = this;
        wx.chooseAddress({
            success: function(e) {
                var a = e;
                delete a.errMsg, wx.setStorageSync("userAddress", a), t.setData({
                    userAddress: a,
                    changeAddress: !0,
                    addressAuth: !0
                });
            },
            fail: function(e) {
                console.log(e), "chooseAddress:fail auth deny" == e.errMsg && (_resource2.default.errorToast("请重新点击授权"), 
                t.setData({
                    addressAuth: !1
                }));
            }
        });
    },
    bindopensetting: function(e) {
        !0 === e.detail.authSetting["scope.address"] && this.setData({
            addressAuth: !0
        });
    },
    postOrder: function() {
        if (0 == this.data.changeAddress) return _resource2.default.errorToast("请选择收货地址"), 
        !1;
        if (!0 === checksubmit) return _resource2.default.errorToast("请勿重复点击"), !1;
        checksubmit = !0;
        var e = this.data.userAddress;
        _resource2.default.postOrder({
            address: JSON.stringify(e),
            coupon_id: this.data.coupon_id,
            pay_way: "wx"
        }, function(e) {
            if (1 != e.data.status) return _resource2.default.errorToast(e.data.msg), checksubmit = !1;
            app.globalData.subOrderSn = e.data.data.order_sn, app.globalData.price = e.data.data.total_fee, 
            _resource2.default.getPaySign({
                order_id: e.data.data.order_id
            }, function(e) {
                if (1 == e.data.status) {
                    var a = e.data.data;
                    wx.requestPayment({
                        appId: a.appId,
                        timeStamp: a.timeStamp,
                        nonceStr: a.nonceStr,
                        package: a.package,
                        signType: "MD5",
                        paySign: a.paySign,
                        success: function(e) {
                            checksubmit = !1, "requestPayment:ok" === e.errMsg ? (app.globalData.type = "success", 
                            wx.navigateTo({
                                url: "../mineOrder/mineOrder"
                            })) : "requestPayment:cancel" === e.errMsg && (app.globalData.type = "fail", wx.navigateTo({
                                url: "../mineOrder/mineOrder?t=WAITPAY"
                            }));
                        },
                        fail: function(e) {
                            checksubmit = !1, app.globalData.type = "fail", wx.navigateTo({
                                url: "../mineOrder/mineOrder?t=WAITPAY"
                            });
                        },
                        complete: function(e) {}
                    });
                } else _resource2.default.errorToast(e.data.msg), checksubmit = !1;
            });
        });
    },
    onReady: function() {},
    onShow: function() {},
    diyWinColor: function(e) {
        this.data.system ? wx.setNavigationBarTitle({
            title: this.data.system.link_name
        }) : wx.setNavigationBarTitle({
            title: "确认订单"
        });
    }
});