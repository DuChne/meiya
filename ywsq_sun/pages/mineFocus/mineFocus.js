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
    cancleFocus: function(t) {
        var a = this, e = t.currentTarget.dataset.index, s = a.data.focusList, i = t.currentTarget.dataset.userid;
        wx.showModal({
            title: "提示",
            content: "确定取消关注？",
            success: function(t) {
                t.confirm ? app.util.request({
                    url: "entry/wxapp/user/follow",
                    cachetime: "0",
                    data: {
                        to_uid: i
                    },
                    success: function(t) {
                        1 == t.data.status && "取消关注成功" == t.data.msg && (s.splice(e, 1), a.setData({
                            focusList: s
                        }), wx.showToast({
                            title: "取消关注成功"
                        })), -100 == t.data.status && app.removeToken();
                    }
                }) : t.cancel;
            }
        });
    },
    onReady: function() {},
    onShow: function() {
        var a = this;
        app.util.request({
            url: "entry/wxapp/user/my_follow",
            cachetime: "0",
            success: function(t) {
                a.setData({
                    focusList: t.data.data
                });
            }
        });
    },
    onReachBottom: function() {
        var a = this, t = a.data.p + 1;
        a.setData({
            p: t
        }), app.util.request({
            url: "entry/wxapp/user/my_follow",
            cachetime: "0",
            data: {
                p: t
            },
            success: function(t) {
                a.setData({
                    focusList: a.data.focusList.concat(t.data.data)
                }), -100 == t.data.status && app.removeToken();
            }
        });
    },
    diyWinColor: function(t) {
        this.data.system ? wx.setNavigationBarTitle({
            title: this.data.system.link_name
        }) : wx.setNavigationBarTitle({
            title: "我的关注"
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