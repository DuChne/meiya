function _defineProperty(t, e, a) {
    return e in t ? Object.defineProperty(t, e, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = a, t;
}

var app = getApp();

Page({
    data: {},
    onLoad: function(t) {
        var e = JSON.parse(t.userInfoStr);
        this.setData({
            userInfo: e
        }), this.diyWinColor();
    },
    sendComment: function(t) {
        var e = this, a = t.detail.value;
        app.util.request({
            url: "entry/wxapp/user/edit_user",
            cachetime: "0",
            data: {
                autograph: a
            },
            success: function(t) {
                if (1 == t.data.status) {
                    wx.showToast({
                        title: "修改成功"
                    });
                    e.setData(_defineProperty({}, "userInfo.autograph", a));
                }
                -100 == t.data.status && app.removeToken();
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    diyWinColor: function(t) {
        this.data.system ? wx.setNavigationBarTitle({
            title: this.data.system.link_name
        }) : wx.setNavigationBarTitle({
            title: "编辑资料"
        });
    }
});