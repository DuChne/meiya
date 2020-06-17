function _defineProperty(t, a, e) {
    return a in t ? Object.defineProperty(t, a, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[a] = e, t;
}

var app = getApp();

Page({
    data: {},
    onLoad: function(t) {
        var a = this;
        app.util.request({
            url: "entry/wxapp/user/coupon",
            cachetime: "0",
            success: function(t) {
                1 == t.data.status ? a.setData({
                    couponsList: t.data.data,
                    info: t.data
                }) : -100 == t.data.status && app.removeToken();
            }
        }), a.diyWinColor();
    },
    selectOne: function(t) {
        var a = t.currentTarget.dataset.index, e = t.currentTarget.dataset.couponid;
        this.setData({
            currIdx: a,
            click: !0,
            couponId: e
        });
    },
    exchangeNow: function(t) {
        var e = this;
        e.data.click ? app.util.request({
            url: "entry/wxapp/user/exchange",
            cachetime: "0",
            data: {
                coupon_id: e.data.couponId
            },
            success: function(t) {
                var a = t.data.data.integral;
                1 == t.data.status ? (wx.showToast({
                    title: "兑换成功",
                    icon: "none"
                }), e.setData(_defineProperty({}, "info.integral", a))) : -2 == t.data.status ? wx.showToast({
                    title: t.data.msg,
                    icon: "none"
                }) : -100 == t.data.status && app.removeToken();
            }
        }) : wx.showToast({
            title: "请选择优惠券",
            icon: "none"
        });
    },
    onReady: function() {},
    onShow: function() {},
    diyWinColor: function(t) {
        this.data.system ? wx.setNavigationBarTitle({
            title: this.data.system.link_name
        }) : wx.setNavigationBarTitle({
            title: "签到兑换优惠券"
        });
    }
});