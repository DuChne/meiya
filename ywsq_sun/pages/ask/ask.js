var _resource = require("../../resource/resource.js"), _resource2 = _interopRequireDefault(_resource);

function _interopRequireDefault(a) {
    return a && a.__esModule ? a : {
        default: a
    };
}

var app = getApp(), checkSubmit = !1;

Page({
    data: {
        pics: [],
        image_ids: []
    },
    onLoad: function(a) {
        this.diyWinColor();
    },
    chooseImage: function() {
        var s = this, i = s.data.pics;
        i.length < 9 ? wx.chooseImage({
            count: 9 - i.length,
            sizeType: [ "original", "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(a) {
                var t = {
                    path: a.tempFilePaths
                }, e = s.data.image_ids;
                _resource2.default.uploadimg(t, function(a) {
                    1 == a.status ? (e.push(a.data.image_id), s.setData({
                        image_ids: e
                    })) : _resource2.default.errorToast(a.data.msg);
                }), i = i.concat(a.tempFilePaths), s.setData({
                    pics: i
                });
            }
        }) : wx.showToast({
            title: "最多上传9张图片！",
            icon: "none"
        });
    },
    deleteImage: function(a) {
        var t = this, e = t.data.pics, s = t.data.image_ids, i = a.currentTarget.dataset.index;
        e.splice(i, 1), s.splice(i, 1), t.setData({
            pics: e,
            image_ids: s
        });
    },
    selTagTap: function(a) {
        wx.navigateTo({
            url: "../allTag/allTag?askpage=1"
        });
    },
    deleteTap: function(a) {
        var t = a.currentTarget.dataset.index;
        app.globalData.tagText.splice(t, 1), app.globalData.hadTag.splice(t, 1), this.setData({
            hadTag: app.globalData.hadTag,
            tagText: app.globalData.tagText
        });
    },
    bindRelease: function(a) {
        wx.getStorageSync("token");
        var e = this;
        if (1 == checkSubmit) return _resource2.default.errorToast("请勿重复点击"), !1;
        checkSubmit = !0;
        var t = a.detail.value.asktitle, s = a.detail.value.askdesc, i = e.data.hadTag, o = a.detail.formId;
        i = i.join(","), e.setData({
            asktitle: t,
            askdesc: s
        }), "" == t ? (wx.showToast({
            title: "请填标题",
            icon: "none"
        }), checkSubmit = !1) : "" == s ? (wx.showToast({
            title: "请填问题详情",
            icon: "none"
        }), checkSubmit = !1) : "" == i ? (wx.showToast({
            title: "请选择标签",
            icon: "none"
        }), checkSubmit = !1) : app.util.request({
            url: "entry/wxapp/question/quiz",
            cachetime: "0",
            data: {
                title: t,
                desc: s,
                tab_ids: i,
                image_ids: e.data.image_ids,
                formId: "the formId is a mock one" == o ? "" : o
            },
            success: function(a) {
                if (checkSubmit = !1, -100 == a.data.status && app.removeToken(), e.setData({
                    releaseAgain: 0
                }), 1 == a.data.status) {
                    var t = a.data.data;
                    wx.showModal({
                        title: "提示",
                        content: "提交成功",
                        showCancel: !1,
                        success: function(a) {
                            a.confirm && wx.navigateTo({
                                url: "../probDetails/probDetails?quesId=" + t
                            });
                        }
                    }), app.globalData.hadTag = [], app.globalData.tagText = [], e.setData({
                        askdesc: "",
                        asktitle: ""
                    });
                } else 2 == a.data.status ? (wx.showModal({
                    title: "提示",
                    content: "提交成功，待审核",
                    showCancel: !1,
                    success: function(a) {
                        a.confirm && wx.redirectTo({
                            url: "../index/index"
                        });
                    }
                }), app.globalData.hadTag = [], app.globalData.tagText = [], e.setData({
                    askdesc: "",
                    asktitle: ""
                })) : -100 == a.data.status ? app.removeToken() : wx.showModal({
                    title: "提示",
                    content: a.data.msg,
                    showCancel: !1
                });
            }
        });
    },
    onReady: function() {},
    onShow: function() {
        this.setData({
            hadTag: app.globalData.hadTag,
            tagText: app.globalData.tagText
        });
    },
    diyWinColor: function(a) {
        this.data.system ? wx.setNavigationBarTitle({
            title: this.data.system.link_name
        }) : wx.setNavigationBarTitle({
            title: "发布笔记"
        });
    }
});