App({
    siteInfo: require("siteinfo.js"),
    util: require("/we7/js/util.js"),
    onLaunch: function() {
        var e = wx.getStorageSync("logs") || [];
        e.unshift(Date.now()), wx.setStorageSync("logs", e), wx.clearStorage("comeIn");
    },
    removeToken: function(e) {
        wx.removeStorageSync("token"), wx.showToast({
            title: "登录超时",
            icon: "none"
        });
    },
    goHisHome: function(e) {
        wx.navigateTo({
            url: "../hisHome/hisHome?userId=" + e
        });
    },
    getCurrentPageUrlWithArgs: function() {
        var e = getCurrentPages(), t = e[e.length - 1], n = t.route, o = t.options, r = n + "?";
        for (var i in o) {
            r += i + "=" + o[i] + "&";
        }
        return r = r.substring(0, r.length - 1);
    },
    globalData: {
        userInfo: null,
        hadTag: [],
        tagText: []
    }
});