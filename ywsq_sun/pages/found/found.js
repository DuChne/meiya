var app = getApp();

Page({
    data: {
        p: 1,
        foundList: [],
        currSel: 0
    },
    goHisHome: function(t) {
        var a = t.currentTarget.dataset.userid;
        app.goHisHome(a);
    },
    bindAllSelected: function(t) {
        wx.navigateTo({
            url: "../allSelected/allSelected"
        });
    },
    seleDetails: function(t) {
        var a = t.currentTarget.dataset.contentid;
        wx.navigateTo({
            url: "../selRecommend/selRecommend?contentId=" + a
        });
    },
    tabClick: function(t) {
        var a = t.currentTarget.dataset.tabid, e = this;
        e.setData({
            currSel: t.currentTarget.dataset.index
        }), app.util.request({
            url: "entry/wxapp/dynamic/list",
            cachetime: "0",
            data: {
                top: 1,
                tab_id: a,
                p: 1
            },
            success: function(t) {
                1 == t.data.status ? e.setData({
                    foundList: t.data.data,
                    p: 1,
                    tabid: a
                }) : -100 == t.data.status && app.removeToken();
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
    onLoad: function(t) {
        var a = this;
        app.util.request({
            url: "entry/wxapp/index/article",
            cachetime: "0",
            data: {
                cut: 1
            },
            success: function(t) {
                1 == t.data.status && a.setData({
                    selectRecomms: t.data.data
                }), -100 == t.data.status && app.removeToken(), wx.hideLoading();
            }
        }), app.util.request({
            url: "entry/wxapp/index/tab",
            cachetime: "0",
            success: function(t) {
                1 == t.data.status && a.setData({
                    allTabs: t.data.data.tab_list
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
                top: 1,
                tab_id: a.data.tabid
            },
            success: function(t) {
                a.setData({
                    foundList: a.data.foundList.concat(t.data.data)
                }), -100 == t.data.status && app.removeToken();
            }
        });
    },
    onReady: function() {},
    onShow: function() {
        var a = this;
        app.util.request({
            url: "entry/wxapp/dynamic/list",
            cachetime: "0",
            data: {
                p: 1,
                top: 1,
                tab_id: a.data.tabid ? a.data.tabid : ""
            },
            success: function(t) {
                a.setData({
                    foundList: t.data.data,
                    p: 1
                });
            }
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    diyWinColor: function(t) {
        this.data.system ? wx.setNavigationBarTitle({
            title: this.data.system.link_name
        }) : wx.setNavigationBarTitle({
            title: "发现"
        });
    }
});