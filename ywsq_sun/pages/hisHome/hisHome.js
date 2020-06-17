var app = getApp();

Page({
    data: {
        currentIdx: 2,
        p: 1
    },
    onLoad: function(t) {
        var a = this, e = wx.getStorageSync("users");
        a.setData({
            userId: t.userId,
            users: e
        }), app.util.request({
            url: "entry/wxapp/dynamic/userHome",
            cachetime: "0",
            data: {
                user_id: t.userId
            },
            success: function(t) {
                1 == t.data.status && a.setData({
                    userInfo: t.data.data,
                    followed: t.data.data.isFollow
                }), -100 == t.data.status && app.removeToken();
            }
        }), a.diyWinColor();
    },
    tabClick: function(t) {
        this.setData({
            currentIdx: t.currentTarget.dataset.index,
            p: 1
        });
    },
    onReachBottom: function() {
        var a = this, t = a.data.p + 1;
        a.setData({
            p: t
        }), 0 == a.data.currentIdx ? app.util.request({
            url: "entry/wxapp/question/userAnswer",
            cachetime: "0",
            data: {
                p: t,
                user_id: a.data.userId
            },
            success: function(t) {
                a.setData({
                    userAnswer: a.data.userAnswer.concat(t.data.data)
                }), -100 == t.data.status && app.removeToken();
            }
        }) : 1 == a.data.currentIdx ? app.util.request({
            url: "entry/wxapp/question/userQuestion",
            cachetime: "0",
            data: {
                p: t,
                user_id: a.data.userId
            },
            success: function(t) {
                a.setData({
                    userQuestion: a.data.userQuestion.concat(t.data.data)
                }), -100 == t.data.status && app.removeToken();
            }
        }) : 2 == a.data.currentIdx ? app.util.request({
            url: "entry/wxapp/heart/userHeart",
            cachetime: "0",
            data: {
                p: t,
                user_id: a.data.userId
            },
            success: function(t) {
                a.setData({
                    userHeart: a.data.userHeart.concat(t.data.data)
                }), -100 == t.data.status && app.removeToken();
            }
        }) : 3 == a.data.currentIdx && app.util.request({
            url: "entry/wxapp/dynamic/userCollection",
            cachetime: "0",
            data: {
                p: t,
                user_id: a.data.userId
            },
            success: function(t) {
                a.setData({
                    userCollection: a.data.userCollection.concat(t.data.data)
                }), -100 == t.data.status && app.removeToken();
            }
        });
    },
    answDetails: function(t) {
        var a = t.currentTarget.dataset.answerid;
        wx.navigateTo({
            url: "../answerDeta/answerDeta?answerId=" + a
        });
    },
    askDetails: function(t) {
        var a = t.currentTarget.dataset.quesid;
        wx.navigateTo({
            url: "../probDetails/probDetails?quesId=" + a
        });
    },
    tipDetails: function(t) {
        var a = t.currentTarget.dataset.tipid;
        wx.navigateTo({
            url: "../tipDetails/tipDetails?tipId=" + a
        });
    },
    onReady: function() {},
    onShow: function() {
        var a = this;
        app.util.request({
            url: "entry/wxapp/question/userAnswer",
            cachetime: "0",
            data: {
                user_id: a.data.userId
            },
            success: function(t) {
                1 == t.data.status && a.setData({
                    userAnswer: t.data.data
                }), -100 == t.data.status && app.removeToken();
            }
        }), app.util.request({
            url: "entry/wxapp/question/userQuestion",
            cachetime: "0",
            data: {
                user_id: a.data.userId
            },
            success: function(t) {
                1 == t.data.status && a.setData({
                    userQuestion: t.data.data
                }), -100 == t.data.status && app.removeToken();
            }
        }), app.util.request({
            url: "entry/wxapp/dynamic/userCollection",
            cachetime: "0",
            data: {
                user_id: a.data.userId
            },
            success: function(t) {
                1 == t.data.status && a.setData({
                    userCollection: t.data.data
                }), -100 == t.data.status && app.removeToken();
            }
        }), app.util.request({
            url: "entry/wxapp/heart/userHeart",
            cachetime: "0",
            data: {
                user_id: a.data.userId,
                cut: 0
            },
            success: function(t) {
                1 == t.data.status && a.setData({
                    userHeart: t.data.data
                }), -100 == t.data.status && app.removeToken();
            }
        });
    },
    diyWinColor: function(t) {
        this.data.system ? wx.setNavigationBarTitle({
            title: this.data.system.link_name
        }) : wx.setNavigationBarTitle({
            title: "TA的主页"
        });
    },
    focusTap: function(t) {
        var a = this, e = t.currentTarget.dataset.statu;
        this.util(e);
        var s = t.currentTarget.dataset.userid;
        a.data.users.user_id == a.data.userInfo.user_id ? wx.showToast({
            title: "不可关注自己",
            icon: "none"
        }) : app.util.request({
            url: "entry/wxapp/user/follow",
            cachetime: "0",
            data: {
                to_uid: s
            },
            success: function(t) {
                1 == t.data.status && (a.onShow(), "取消关注成功" == t.data.msg ? a.setData({
                    followed: 0
                }) : "成功" == t.data.msg && a.setData({
                    followed: 1
                })), -100 == t.data.status && app.removeToken();
            }
        });
    },
    close: function(t) {
        var a = t.currentTarget.dataset.statu;
        this.util(a);
    },
    util: function(t) {
        var a = wx.createAnimation({
            duration: 200,
            timingFunction: "linear",
            delay: 0
        });
        (this.animation = a).opacity(0).height(0).step(), this.setData({
            animationData: a.export()
        }), setTimeout(function() {
            a.opacity(1).height("480rpx").step(), this.setData({
                animationData: a
            }), "close" == t && this.setData({
                showModalStatus: !1
            });
        }.bind(this), 200), "open" == t && this.setData({
            showModalStatus: !0
        });
    }
});