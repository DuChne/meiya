var app = getApp();

Page({
    data: {
        p: 1,
        psize: 5,
        answerList: []
    },
    goHisHome: function(a) {
        var t = a.currentTarget.dataset.userid;
        app.goHisHome(t);
    },
    onLoad: function(a) {
        var t = this, e = wx.getStorageSync("users");
        t.setData({
            quesId: a.quesId,
            users: e
        }), app.util.request({
            url: "entry/wxapp/question/detail",
            cachetime: "0",
            data: {
                question_id: a.quesId
            },
            success: function(a) {
                console.log(a), t.setData({
                    quesDetails: a.data.data,
                    hadCollect: a.data.data.isCollection - 0
                }), -100 == a.data.status && app.removeToken();
            }
        }), t.diyWinColor();
    },
    bindCollectTap: function(a) {
        var t = this;
        app.util.request({
            url: "entry/wxapp/question/collection",
            cachetime: "0",
            data: {
                question_id: t.data.quesId
            },
            success: function(a) {
                if (1 == a.data.status) {
                    t.data.quesDetails.isCollection;
                    "成功" == a.data.msg ? t.setData({
                        hadCollect: 1
                    }) : "取消收藏成功" == a.data.msg && t.setData({
                        hadCollect: 0
                    });
                }
                -100 == a.data.status && app.removeToken();
            }
        });
    },
    clickLike: function(a) {
        var t = this, e = a.currentTarget.dataset.answerid;
        wx.showLoading({
            title: "加载中",
            mask: !0
        }), app.util.request({
            url: "entry/wxapp/question/answerFavour",
            cachetime: "0",
            data: {
                answer_id: e
            },
            success: function(a) {
                -100 == a.data.status && app.removeToken(), t.onShow(), wx.hideLoading();
            }
        });
    },
    iAnswer: function(a) {
        wx.navigateTo({
            url: "../answer/answer?quesId=" + this.data.quesId
        });
    },
    answerDetails: function(a) {
        var t = a.currentTarget.dataset.answerid;
        wx.navigateTo({
            url: "../answerDeta/answerDeta?answerId=" + t
        });
    },
    onReachBottom: function() {
        var t = this, a = t.data.p + 1;
        t.setData({
            p: a
        }), app.util.request({
            url: "entry/wxapp/question/answerList",
            cachetime: "0",
            data: {
                p: a,
                question_id: t.data.quesId
            },
            success: function(a) {
                t.setData({
                    answerList: t.data.answerList.concat(a.data.data)
                }), -100 == a.data.status && app.removeToken();
            }
        });
    },
    onReady: function() {},
    onShow: function() {
        var t = this;
        wx.showLoading({
            title: "加载中",
            mask: !0
        }), app.util.request({
            url: "entry/wxapp/question/answerList",
            cachetime: "0",
            data: {
                question_id: t.data.quesId
            },
            success: function(a) {
                t.setData({
                    answerList: a.data.data
                }), wx.hideLoading(), -100 == a.data.status && app.removeToken();
            }
        });
    },
    diyWinColor: function(a) {
        this.data.system ? wx.setNavigationBarTitle({
            title: this.data.system.link_name
        }) : wx.setNavigationBarTitle({
            title: "问题详情"
        });
    }
});