var app = getApp();

Page({
    data: {},
    onLoad: function(t) {
        var a = this;
        a.setData({
            contentId: t.contentId
        }), app.util.request({
            url: "entry/wxapp/index/articleDetail",
            cachetime: "0",
            data: {
                content_id: t.contentId
            },
            success: function(t) {
                1 == t.data.status ? a.setData({
                    seleDetails: t.data.data
                }) : -100 == t.data.status && app.removeToken();
            }
        }), a.diyWinColor();
    },
    goodsDetail: function(t) {
        var a = t.currentTarget.dataset.goodsid;
        wx.navigateTo({
            url: "../goodsDetail/goodsDetail?id=" + a
        });
    },
    onReady: function() {},
    onShow: function() {},
    diyWinColor: function(t) {
        this.data.system ? wx.setNavigationBarTitle({
            title: this.data.system.link_name
        }) : wx.setNavigationBarTitle({
            title: "精选推荐"
        });
    }
});