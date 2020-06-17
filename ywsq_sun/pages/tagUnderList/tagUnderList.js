var app = getApp();

Page({
    data: {
        p: 1
    },
    onLoad: function(t) {
        var a = this;
        a.setData({
            titles: t.titles
        }), app.util.request({
            url: "entry/wxapp/dynamic/list",
            cachetime: "0",
            data: {
                top: 2,
                tab_id: t.tab_id
            },
            success: function(t) {
                1 == t.data.status && a.setData({
                    foundList: t.data.data
                }), -100 == t.data.status && app.removeToken();
            }
        }), a.diyWinColor();
    },
    onReachBottom: function() {
        var a = this, t = a.data.p + 1;
        a.setData({
            p: t
        }), app.util.request({
            url: "entry/wxapp/dynamic/list",
            cachetime: "0",
            data: {
                p: t,
                top: 2
            },
            success: function(t) {
                a.setData({
                    foundList: a.data.foundList.concat(t.data.data)
                }), -100 == t.data.status && app.removeToken();
            }
        });
    },
    goDetails: function(t) {
        var a = t.currentTarget.dataset.quesid, e = t.currentTarget.dataset.tipid;
        a ? wx.navigateTo({
            url: "../probDetails/probDetails?quesId=" + a
        }) : e && wx.navigateTo({
            url: "../tipDetails/tipDetails?tipId=" + e
        });
    },
    onReady: function() {},
    onShow: function() {},
    diyWinColor: function(t) {
        var a = this;
        a.data.system ? wx.setNavigationBarTitle({
            title: a.data.system.link_name
        }) : wx.setNavigationBarTitle({
            title: a.data.titles
        });
    }
});