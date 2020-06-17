Page({
    data: {
        numText: 0
    },
    onLoad: function(t) {
        this.diyWinColor();
    },
    bindInput: function(t) {
        this.setData({
            numText: t.detail.cursor
        });
    },
    onReady: function() {},
    onShow: function() {},
    diyWinColor: function(t) {
        this.data.system ? wx.setNavigationBarTitle({
            title: this.data.system.link_name
        }) : wx.setNavigationBarTitle({
            title: "写评论"
        });
    }
});