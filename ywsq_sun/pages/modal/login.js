var app = getApp();

Component({
    properties: {
        login: {
            type: Boolean,
            value: !1,
            observer: function(e, t, n) {}
        }
    },
    data: {
        modalMsg: "获取你的公开信息(昵称、头像等)"
    },
    attached: function() {
        this.wxauthSetting();
    },
    methods: {
        wxauthSetting: function(e) {
            var n = this;
            wx.getStorageSync("token") ? (n.setData({
                login: !0
            }), n.triggerEvent("watch", !0)) : wx.login({
                success: function(e) {
                    var t = e.code;
                    wx.setStorageSync("code", t), wx.getSetting({
                        success: function(e) {
                            e.authSetting["scope.userInfo"] ? wx.getUserInfo({
                                success: function(e) {
                                    n.setData({
                                        thumb: e.userInfo.avatarUrl,
                                        nickname: e.userInfo.nickName
                                    }), wx.setStorageSync("user_info", e.userInfo);
                                    e.userInfo.nickName, e.userInfo.avatarUrl, e.userInfo.gender;
                                    app.util.request({
                                        url: "entry/wxapp/index/wxAppToken",
                                        cachetime: "0",
                                        method: "post",
                                        data: {
                                            code: t,
                                            nickName: e.userInfo.nickName,
                                            gender: e.userInfo.gender,
                                            language: e.userInfo.language,
                                            city: e.userInfo.city,
                                            province: e.userInfo.province,
                                            country: e.userInfo.country,
                                            avatarUrl: e.userInfo.avatarUrl
                                        },
                                        success: function(e) {
                                            n.setData({
                                                login: !0
                                            }), n.triggerEvent("watch", !0), wx.setStorageSync("users", e.data.data), wx.setStorageSync("token", e.data.token), 
                                            wx.setStorageSync("uniacid", e.data.data.uniacid);
                                            var t = app.getCurrentPageUrlWithArgs();
                                            "ywsq_sun/pages/index/index" != t && wx.redirectTo({
                                                url: "/" + t
                                            });
                                        }
                                    });
                                },
                                fail: function(e) {
                                    n.setData({
                                        login: !1
                                    }), n.triggerEvent("watch", !1);
                                }
                            }) : (n.setData({
                                login: !1
                            }), n.triggerEvent("watch", !1));
                        }
                    });
                },
                fail: function() {
                    wx.showModal({
                        title: "获取信息失败",
                        content: "请允许授权以便为您提供给服务!!!",
                        success: function(e) {
                            n.setData({
                                login: !1
                            }), n.triggerEvent("watch", !1);
                        }
                    });
                }
            });
        }
    }
});