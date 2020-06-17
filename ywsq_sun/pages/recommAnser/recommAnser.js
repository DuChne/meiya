var app = getApp();

Page({
    data: {
        p: 1,
        answerList: []
    },
    onLoad: function(t) {
        var a = wx.getStorageSync("users");
        this.setData({
            users: a
        }), this.diyWinColor();
    },
    goHisHome: function(t) {
        var a = t.currentTarget.dataset.userid;
        wx.navigateTo({
            url: "../hisHome/hisHome?userId=" + a
        });
    },
    onReady: function() {},
    onShow: function() {
        var a = this;
        app.util.request({
            url: "entry/wxapp/heart/answer",
            cachetime: "0",
            success: function(t) {
                1 == t.data.status ? a.setData({
                    answerList: t.data.data
                }) : -100 == t.data.status && app.removeToken();
            }
        });
    },
    onReachBottom: function() {
        var a = this, t = a.data.p + 1;
        a.setData({
            p: t
        }), app.util.request({
            url: "entry/wxapp/heart/answer",
            cachetime: "0",
            data: {
                p: t
            },
            success: function(t) {
                a.setData({
                    answerList: a.data.answerList.concat(t.data.data)
                }), -100 == t.data.status && app.removeToken();
            }
        });
    },
    diyWinColor: function(t) {
        this.data.system ? wx.setNavigationBarTitle({
            title: this.data.system.link_name
        }) : wx.setNavigationBarTitle({
            title: "推荐答主"
        });
    },
    focusTap: function(t) {
        var a = this, e = t.currentTarget.dataset.statu, s = t.currentTarget.dataset.index;
        this.util(e);
        var i = t.currentTarget.dataset.userid;
        app.util.request({
            url: "entry/wxapp/user/follow",
            cachetime: "0",
            data: {
                to_uid: i
            },
            success: function(t) {
                1 == t.data.status && (a.onShow(), 1 == a.data.answerList[s].isFollow ? a.setData({
                    followed: 1
                }) : a.setData({
                    followed: 0
                })), -100 == t.data.status && app.removeToken();
            }
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