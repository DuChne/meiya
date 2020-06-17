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
    data: {
        p: 1
    },
    onLoad: function(t) {
        this.diyWinColor();
    },
    goHisHome: function(t) {
        var a = t.currentTarget.dataset.userid;
        wx.navigateTo({
            url: "../hisHome/hisHome?userId=" + a
        });
    },
    focusTap: function(t) {
        var a = this, e = t.currentTarget.dataset.statu, s = t.currentTarget.dataset.index;
        this.util(e);
        var i = t.currentTarget.dataset.userid, n = "fansList[" + s + "].isFollow";
        app.util.request({
            url: "entry/wxapp/user/follow",
            cachetime: "0",
            data: {
                to_uid: i
            },
            success: function(t) {
                wx.showToast({
                    title: t.data.msg
                }), "成功" == t.data.msg ? a.setData(_defineProperty({}, n, 1)) : "取消关注成功" == t.data.msg && a.setData(_defineProperty({}, n, 0)), 
                -100 == t.data.status && app.removeToken();
            }
        });
    },
    onReady: function() {},
    onShow: function() {
        var a = this;
        app.util.request({
            url: "entry/wxapp/user/my_fan",
            cachetime: "0",
            success: function(t) {
                1 == t.data.status ? a.setData({
                    fansList: t.data.data
                }) : -100 == t.data.status && app.removeToken();
            }
        });
    },
    onReachBottom: function() {
        var a = this, t = a.data.p + 1;
        a.setData({
            p: t
        }), app.util.request({
            url: "entry/wxapp/user/my_fan",
            cachetime: "0",
            data: {
                p: t
            },
            success: function(t) {
                1 == t.data.status && a.setData({
                    fansList: a.data.fansList.concat(t.data.data)
                }), -100 == t.data.status && app.removeToken();
            }
        });
    },
    diyWinColor: function(t) {
        this.data.system ? wx.setNavigationBarTitle({
            title: this.data.system.link_name
        }) : wx.setNavigationBarTitle({
            title: "我的粉丝"
        });
    },
    toFocusOn: function(t) {
        var a = t.currentTarget.dataset.statu;
        this.util(a);
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
        (this.animation = a).opacity(0).height(0).step(), this.setData({
            animationData: a.export()
        }), setTimeout(function() {
            a.opacity(1).height("480rpx").step(), this.setData({
                animationData: a
            }), "close" == t && this.setData({
                showModalStatus: !1
            });
        }.bind(this), 200), "open" == t && this.setData({
            showModalStatus: !0
        });
    }
});