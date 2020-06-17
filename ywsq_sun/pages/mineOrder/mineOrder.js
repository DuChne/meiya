var _resource = require("../../resource/resource.js"), _resource2 = _interopRequireDefault(_resource);

function _interopRequireDefault(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

Page({
    data: {
        currentPage: 1,
        moreData: !0,
        activeNav: "all",
        currentStatus: 0,
        carDatas: [ "all", "WAITPAY", "WAITTING", "FINISH" ],
        orderList: []
    },
    onLoad: function(t) {
        t.t && this.setData({
            t: t.t
        });
    },
    tabClick: function(t) {
        var a = t.currentTarget.dataset.index;
        this.setData({
            currentStatus: t.currentTarget.dataset.index,
            activeNav: this.data.carDatas[a],
            currentPage: 1
        }), this.fetchOrderList();
    },
    fetchOrderList: function() {
        var r = this, o = wx.getStorageSync("ptName");
        _resource2.default.fetchOrderList({
            type: r.data.activeNav,
            p: r.data.currentPage
        }, function(t) {
            if (1 == t.data.status) {
                var a = !(t.data.data.length <= 0), e = 1 == r.data.currentPage ? t.data.data : r.data.orderList.concat(t.data.data);
                r.setOrderData(e), r.setData({
                    ptName: o,
                    moreData: a,
                    orderList: e,
                    currentPage: ++r.data.currentPage
                });
            }
        });
    },
    setOrderData: function(t) {
        return t.forEach(function(t) {
            t.order = {
                orderStatus: t.order_status,
                orderSn: t.order_sn,
                subOrderSn: t.sub_order_sn,
                isButtonHidden: "待发货" == t.order_status_desc || "待收货" == t.order_status_desc
            }, t.goods_list.forEach(function(t) {
                var a = parseFloat(t.total_price);
                t.total_price = a.toFixed(2);
            });
        }), t;
    },
    cancelOrder: function(t) {
        var e = this, r = t.target.dataset.orderId;
        wx.showModal({
            content: "你是否需要取消订单",
            showCancel: !0,
            success: function(t) {
                0 != t.confirm && _resource2.default.cancalOrder({
                    order_id: r
                }, function(t) {
                    1 == t.data.status ? (e.data.orderList.forEach(function(t, a) {
                        t.order_id == r && ("all" != e.data.activeNav ? e.data.orderList.splice(a, 1) : (t.order_status = 3, 
                        t.pay_btn = 0, t.cancel_btn = 0));
                    }), _resource2.default.successToast("订单取消成功"), e.setData({
                        orderList: e.setOrderData(e.data.orderList)
                    })) : _resource2.default.errorToast("订单取消失败");
                });
            }
        });
    },
    deleteOrder: function(t) {
        var e = this, r = t.target.dataset.orderId;
        wx.showModal({
            content: "你是否需要删除订单",
            showCancel: !0,
            success: function(t) {
                0 != t.confirm && _resource2.default.delOrder({
                    order_id: r
                }, function(t) {
                    1 == t.data.status ? (e.data.orderList.forEach(function(t, a) {
                        t.order_id == r && e.data.orderList.splice(a, 1);
                    }), _resource2.default.successToast("删除成功"), e.setData({
                        orderList: e.setOrderData(e.data.orderList)
                    })) : _resource2.default.errorToast("删除失败");
                });
            }
        });
    },
    confirmOrder: function(t) {
        var e = this, r = t.target.dataset.orderId;
        wx.showModal({
            content: "确定收货",
            showCancel: !0,
            success: function(t) {
                0 != t.confirm && _resource2.default.confirmOrder({
                    order_id: r
                }, function(t) {
                    200 === t.statusCode ? (e.data.orderList.forEach(function(t, a) {
                        t.order_id == r && "all" != e.data.activeNav ? e.data.orderList.splice(a, 1) : t.order_status = "交易成功";
                    }), _resource2.default.successToast("收货成功"), e.setData({
                        orderList: e.setOrderData(e.data.orderList)
                    })) : _resource2.default.errorToast("收货失败");
                });
            }
        });
    },
    payOrder: function(t) {
        var a = t.target.dataset.orderId;
        _resource2.default.getPaySign({
            order_id: a
        }, function(t) {
            if (1 == t.data.status) {
                var a = t.data.data;
                wx.requestPayment({
                    appId: a.appId,
                    timeStamp: a.timeStamp,
                    nonceStr: a.nonceStr,
                    package: a.package,
                    signType: "MD5",
                    paySign: a.paySign,
                    success: function(t) {
                        "requestPayment:ok" === t.errMsg ? (app.globalData.type = "success", wx.navigateTo({
                            url: "../mineOrder/mineOrder?t=WAITTING"
                        })) : "requestPayment:cancel" === t.errMsg && (app.globalData.type = "fail", _resource2.default.errorToast("支付已取消"));
                    },
                    fail: function() {},
                    complete: function(t) {}
                });
            } else _resource2.default.errorToast(t.data.msg);
        });
    },
    godetail: function(t) {
        var a = t.currentTarget.dataset.orderId;
        wx.navigateTo({
            url: "../orderDetails/orderDetails?id=" + a
        });
    },
    onReachBottom: function() {
        var t = this;
        if (0 == this.data.moreData) return !1;
        wx.showNavigationBarLoading(), setTimeout(function() {
            wx.hideNavigationBarLoading(), t.fetchOrderList();
        }, 1e3);
    },
    onReady: function() {},
    onShow: function() {},
    diyWinColor: function(t) {
        this.data.system ? wx.setNavigationBarTitle({
            title: this.data.system.link_name
        }) : wx.setNavigationBarTitle({
            title: "我的订单"
        });
    },
    updateUserInfo: function(t) {
        var a = wx.getStorageSync("token"), e = this;
        if (t.detail) {
            if (e.data.t) {
                var r = e.data.carDatas.indexOf(e.data.t);
                e.setData({
                    currentStatus: r,
                    activeNav: options.t
                });
            }
            a ? e.fetchOrderList() : setTimeout(function(t) {
                e.fetchOrderList();
            }, 500), e.diyWinColor();
        }
    }
});