var _resource = require("../../resource/resource.js"), _resource2 = _interopRequireDefault(_resource);

function _interopRequireDefault(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Page({
    data: {
        order: {}
    },
    onLoad: function(e) {
        var r = this;
        r.diyWinColor(), _resource2.default.orderDetail({
            order_id: e.id
        }, function(e) {
            1 == e.data.status && r.setData({
                order: e.data.data
            });
        });
    },
    cancelOrder: function(e) {
        var r = e.target.dataset.orderId;
        wx.showModal({
            content: "你是否需要取消订单",
            showCancel: !0,
            success: function(e) {
                0 != e.confirm && _resource2.default.cancalOrder({
                    order_id: r
                }, function(e) {
                    1 == e.data.status ? (_resource2.default.successToast("订单取消成功"), wx.navigateTo({
                        url: "../mineOrder/mineOrder"
                    })) : _resource2.default.errorToast("订单取消失败");
                });
            }
        });
    },
    deleteOrder: function(e) {
        var r = e.target.dataset.orderId;
        wx.showModal({
            content: "你是否需要删除订单",
            showCancel: !0,
            success: function(e) {
                0 != e.confirm && _resource2.default.delOrder({
                    order_id: r
                }, function(e) {
                    1 == e.data.status ? (_resource2.default.successToast("删除成功"), wx.navigateTo({
                        url: "../mineOrder/mineOrder"
                    })) : _resource2.default.errorToast("删除失败");
                });
            }
        });
    },
    confirmOrder: function(e) {
        var r = e.target.dataset.orderId;
        wx.showModal({
            content: "确定收货",
            showCancel: !0,
            success: function(e) {
                0 != e.confirm && _resource2.default.confirmOrder({
                    order_id: r
                }, function(e) {
                    1 == e.data.status ? (_resource2.default.successToast("收货成功"), wx.navigateTo({
                        url: "../mineOrder/mineOrder?t=FINISH"
                    })) : _resource2.default.errorToast("收货失败");
                });
            }
        });
    },
    payOrder: function(e) {
        var r = e.target.dataset.orderId;
        _resource2.default.getPaySign({
            order_id: r
        }, function(e) {
            if (1 == e.data.status) {
                var r = e.data.data;
                wx.requestPayment({
                    appId: r.appId,
                    timeStamp: r.timeStamp,
                    nonceStr: r.nonceStr,
                    package: r.package,
                    signType: "MD5",
                    paySign: r.paySign,
                    success: function(e) {
                        "requestPayment:ok" === e.errMsg ? (app.globalData.type = "success", wx.navigateTo({
                            url: "../mineOrder/mineOrder?t=WAITTING"
                        })) : "requestPayment:cancel" === e.errMsg && (app.globalData.type = "fail", _resource2.default.errorToast("支付已取消"));
                    },
                    fail: function() {},
                    complete: function(e) {}
                });
            } else _resource2.default.errorToast(e.data.msg);
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    diyWinColor: function(e) {
        this.data.system ? wx.setNavigationBarTitle({
            title: this.data.system.link_name
        }) : wx.setNavigationBarTitle({
            title: "订单详情"
        });
    }
});