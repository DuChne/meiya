var app = getApp();

Page({
    data: {
        selectedFlag: []
    },
    onLoad: function(a) {
        var e = this;
        e.setData({
            askpage: a.askpage
        }), app.util.request({
            url: "entry/wxapp/index/tab",
            cachetime: "0",
            success: function(a) {
                e.setData({
                    recommTabs: a.data.data.rec_tab,
                    allTabs: a.data.data.tab_list
                });
                for (var t = 0; t < a.data.data.tab_list.length; t++) e.data.selectedFlag.push(!1);
            }
        }), e.diyWinColor();
    },
    tagUnderList: function(a) {
        var t = a.currentTarget.dataset.tagid, e = a.currentTarget.dataset.tagtext;
        wx.navigateTo({
            url: "../tagUnderList/tagUnderList?tab_id=" + t + "&&titles=" + e
        });
    },
    changeToggle: function(a) {
        var t = a.currentTarget.dataset.index;
        this.data.selectedFlag[t] ? this.data.selectedFlag[t] = !1 : this.data.selectedFlag[t] = !0, 
        this.setData({
            selectedFlag: this.data.selectedFlag,
            index: t
        });
    },
    selTagTap: function(a) {
        var t = this;
        if (1 == t.data.askpage && app.globalData.hadTag.length < 3) {
            var e = app.globalData.hadTag, s = a.currentTarget.dataset.tagid, i = a.currentTarget.dataset.tagtext;
            0 <= e.indexOf(s) ? wx.showToast({
                title: "标签重复！",
                icon: "none"
            }) : (app.globalData.hadTag.push(s), app.globalData.tagText.push(i), wx.navigateBack({}));
        } else if (2 == t.data.askpage) {
            var n = a.currentTarget.dataset.tagid, d = a.currentTarget.dataset.tagtext;
            wx.navigateTo({
                url: "../tagUnderList/tagUnderList?tab_id=" + n + "&&titles=" + d
            });
        }
        return !1;
    },
    onReady: function() {},
    onShow: function() {},
    diyWinColor: function(a) {
        this.data.system ? wx.setNavigationBarTitle({
            title: this.data.system.link_name
        }) : wx.setNavigationBarTitle({
            title: "全部标签"
        });
    }
});