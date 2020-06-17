var app = getApp();

Page({
    data: {},
    seleDetails: function(t) {
        var a = t.currentTarget.dataset.contentid;
        wx.navigateTo({
            url: "../selRecommend/selRecommend?contentId=" + a
        });
    },
    onLoad: function(t) {
        var a = this;
        app.util.request({
            url: "entry/wxapp/index/article",
            cachetime: "0",
            data: {
                cut: 0,
                is_rec: 1
            },
            success: function(t) {
                1 == t.data.status && a.setData({
                    allSelected: t.data.data
                }), -100 == t.data.status && app.removeToken();
            }
        }), a.diyWinColor();
    },
    onReady: function() {},
    onShow: function() {},
    diyWinColor: function(t) {
        this.data.system ? wx.setNavigationBarTitle({
            title: this.data.system.link_name
        }) : wx.setNavigationBarTitle({
            title: "全部精选"
        });
    }
});