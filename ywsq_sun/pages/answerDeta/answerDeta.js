var _resource = require("../../resource/resource.js"), _resource2 = _interopRequireDefault(_resource);

function _interopRequireDefault(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var app = getApp(), checkSubmit = !1;

Page({
    data: {},
    hisHomeTap: function(t) {
        var a = t.currentTarget.dataset.userid;
        wx.navigateTo({
            url: "../hisHome/hisHome?userId=" + a
        });
    },
    onLoad: function(t) {
        var a = this, e = wx.getStorageSync("users");
        a.setData({
            answerId: t.answerId,
            users: e
        }), a.onShow(), a.diyWinColor();
    },
    tipDetails: function(t) {
        var a = t.currentTarget.dataset.tipid;
        wx.navigateTo({
            url: "../tipDetails/tipDetails?tipId=" + a
        });
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
        e ? app.util.request({
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
        }), checkSubmit = !1);
    },
    bindPreview: function(t) {
        var a = t.currentTarget.dataset.index;
        wx.previewImage({
            current: this.data.answerDetails.image[a],
            urls: this.data.answerDetails.image
        });
    },
    clickLike: function(t) {
        var e = this, a = t.currentTarget.dataset.answerid;
        wx.showLoading({
            title: "加载中",
            mask: !0
        }), app.util.request({
            url: "entry/wxapp/question/answerFavour",
            cachetime: "0",
            data: {
                answer_id: a
            },
            success: function(t) {
                if (1 == t.data.status) if ("成功" == t.data.msg) {
                    var a = e.data.tipLike;
                    a++, e.setData({
                        tipLike: a
                    });
                } else if ("取消点赞成功" == t.data.msg) {
                    a = e.data.tipLike;
                    a--, e.setData({
                        tipLike: a
                    });
                }
                -100 == t.data.status && app.removeToken(), wx.hideLoading();
            }
        });
    },
    focusTap: function(t) {
        var a = this, e = t.currentTarget.dataset.userid;
        app.util.request({
            url: "entry/wxapp/user/follow",
            cachetime: "0",
            data: {
                to_uid: e
            },
            success: function(t) {
                1 == t.data.status && a.onShow(), -100 == t.data.status && app.removeToken();
            }
        });
    },
    allComments: function(t) {
        var a = t.currentTarget.dataset.answerid;
        wx.navigateTo({
            url: "../commentList/commentList?answerId=" + a
        });
    },
    onReady: function() {},
    onShow: function() {
        var a = this;
        app.util.request({
            url: "entry/wxapp/question/answerDetail",
            cachetime: "0",
            data: {
                answer_id: a.data.answerId
            },
            success: function(t) {
                1 == t.data.status && (a.setData({
                    answerDetails: t.data.data,
                    tipLike: t.data.data.favour
                }), app.util.request({
                    url: "entry/wxapp/heart/userHeart",
                    cachetime: "0",
                    data: {
                        user_id: a.data.answerDetails.user_id,
                        cut: 1
                    },
                    success: function(t) {
                        1 == t.data.status && a.setData({
                            tipDetails: t.data.data
                        }), -100 == t.data.status && app.removeToken();
                    }
                })), -100 == t.data.status && app.removeToken();
            }
        }), app.util.request({
            url: "entry/wxapp/question/commentList",
            cachetime: "0",
            data: {
                answer_id: a.data.answerId,
                cut: 1
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
            title: "回答详情"
        });
    }
});