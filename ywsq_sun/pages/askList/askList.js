var app = getApp();

Page({
    data: {
        p: 1,
        quesList: [],
        currentType: 0
    },
    goHisHome: function(t) {
        var a = t.currentTarget.dataset.userid;
        app.goHisHome(a);
    },
    onLoad: function(t) {
        var a = this;
        app.util.request({
            url: "entry/wxapp/index/tab",
            cachetime: "0",
            success: function(t) {
                a.setData({
                    allTabs: t.data.data.tab_list
                }), -100 == t.data.status && app.removeToken();
            }
        }), a.diyWinColor();
    },
    tabClick: function(a) {
        var e = this;
        e.setData({
            currentType: a.currentTarget.dataset.index
        }), app.util.request({
            url: "entry/wxapp/question/list",
            cachetime: "0",
            data: {
                p: 1,
                tab_id: a.currentTarget.dataset.tabid
            },
            success: function(t) {
                e.setData({
                    quesList: t.data.data,
                    tabid: a.currentTarget.dataset.tabid
                }), -100 == t.data.status && app.removeToken();
            }
        });
    },
    iAnswer: function(t) {
        var a = t.currentTarget.dataset.quesid;
        wx.navigateTo({
            url: "../probDetails/probDetails?quesId=" + a
        });
    },
    onReachBottom: function() {
        var a = this, t = a.data.p + 1;
        a.setData({
            p: t
        }), app.util.request({
            url: "entry/wxapp/question/list",
            cachetime: "0",
            data: {
                p: t,
                tab_id: a.data.tabid
            },
            success: function(t) {
                a.setData({
                    quesList: a.data.quesList.concat(t.data.data)
                }), -100 == t.data.status && app.removeToken();
            }
        });
    },
    onReady: function() {},
    onShow: function() {
        var a = this;
        app.util.request({
            url: "entry/wxapp/question/list",
            cachetime: "0",
            data: {
                p: 1,
                tab_id: a.data.tabid ? a.data.tabid : ""
            },
            success: function(t) {
                a.setData({
                    quesList: t.data.data
                }), -100 == t.data.status && app.removeToken();
            }
        });
    },
    diyWinColor: function(t) {
        this.data.system ? wx.setNavigationBarTitle({
            title: this.data.system.link_name
        }) : wx.setNavigationBarTitle({
            title: "问题列表"
        });
    }
});