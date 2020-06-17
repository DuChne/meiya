var _resource = require("../../resource/resource.js"), _resource2 = _interopRequireDefault(_resource);

function _interopRequireDefault(o) {
    return o && o.__esModule ? o : {
        default: o
    };
}

Page({
    data: {
        couponList: []
    },
    onLoad: function(o) {
        this.diyWinColor(), this.userCoupon(o.money);
    },
    userCoupon: function(o) {
        var e = this;
        _resource2.default.userCoupon({
            money: o
        }, function(o) {
            if (1 == o.data.status) {
                var t = o.data.data;
                e.setData({
                    couponList: t
                });
            }
        });
    },
    useCoupon: function(o) {
        var t = o.currentTarget.dataset.couponId;
        wx.navigateTo({
            url: "../toPayOrder/toPayOrder?coupon_id=" + t
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    diyWinColor: function(o) {
        this.data.system ? wx.setNavigationBarTitle({
            title: this.data.system.link_name
        }) : wx.setNavigationBarTitle({
            title: "待使用优惠券"
        });
    }
});