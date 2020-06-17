var _resource = require("../../resource/resource.js"), _resource2 = _interopRequireDefault(_resource);

function _interopRequireDefault(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var app = getApp(), checkSubmit = !1;

Page({
    data: {
        p: 1,
        commentsList: []
    },
    onLoad: function(t) {
        console.log(t);
        this.setData({
            answerId: t.answerId ? t.answerId : "",
            tipId: t.tipId ? t.tipId : ""
        }), this.diyWinColor();
    },
    input: function(t) {
        this.setData({
            content: t.detail.value
        });
    },
    sendComment: function(t) {
        if (1 == checkSubmit) return _resource2.default.errorToast("请勿重复点击"), !1;
        checkSubmit = !0;
        var a = this, e = a.data.content;
        console.log(a.data.answerId), console.log(a.data.tipId), console.log(e), a.data.answerId ? e ? app.util.request({
            url: "entry/wxapp/question/commentAnswer",
            cachetime: "0",
            data: {
                answer_id: a.data.answerId,
                content: e
            },
            success: function(t) {
                wx.showToast({
                    title: t.data.msg,
                    icon: "none"
                }), a.setData({
                    content: ""
                }), -100 == t.data.status && app.removeToken(), setTimeout(function() {
                    a.onShow(), checkSubmit = !1;
                }, 2e3);
            }
        }) : (wx.showToast({
            title: "请输入评论内容",
            icon: "none"
        }), checkSubmit = !1) : a.data.tipId && (e ? app.util.request({
            url: "entry/wxapp/heart/commentHeart",
            cachetime: "0",
            data: {
                heart_id: a.data.tipId,
                content: e
            },
            success: function(t) {
                wx.showToast({
                    title: t.data.msg,
                    icon: "none"
                }), a.setData({
                    content: ""
                }), -100 == t.data.status && app.removeToken(), setTimeout(function() {
                    a.onShow(), checkSubmit = !1;
                }, 2e3);
            }
        }) : (wx.showToast({
            title: "请输入评论内容",
            icon: "none"
        }), checkSubmit = !1));
    },
    onReachBottom: function() {
        var a = this, t = a.data.p + 1;
        a.setData({
            p: t
        }), a.data.answerId ? app.util.request({
            url: "entry/wxapp/question/commentList",
            cachetime: "0",
            data: {
                p: t,
                answer_id: a.data.answerId
            },
            success: function(t) {
                a.setData({
                    commentsList: a.data.commentsList.concat(t.data.data)
                }), -100 == t.data.status && app.removeToken();
            }
        }) : a.data.tipId && app.util.request({
            url: "entry/wxapp/heart/commentList",
            cachetime: "0",
            data: {
                p: t,
                heart_id: a.data.tipId
            },
            success: function(t) {
                a.setData({
                    commentsList: a.data.commentsList.concat(t.data.data)
                }), -100 == t.data.status && app.removeToken();
            }
        });
    },
    onReady: function() {},
    onShow: function() {
        var a = this;
        a.data.answerId ? app.util.request({
            url: "entry/wxapp/question/commentList",
            cachetime: "0",
            data: {
                answer_id: a.data.answerId
            },
            success: function(t) {
                1 == t.data.status && a.setData({
                    commentsList: t.data.data
                }), -100 == t.data.status && app.removeToken();
            }
        }) : a.data.tipId && app.util.request({
            url: "entry/wxapp/heart/commentList",
            cachetime: "0",
            data: {
                heart_id: a.data.tipId
            },
            success: function(t) {
                1 == t.data.status && a.setData({
                    commentsList: t.data.data
                }), -100 == t.data.status && app.removeToken();
            }
        });
    },
    diyWinColor: function(t) {
        this.data.system ? wx.setNavigationBarTitle({
            title: this.data.system.link_name
        }) : wx.setNavigationBarTitle({
            title: "评论列表"
        });
    }
});