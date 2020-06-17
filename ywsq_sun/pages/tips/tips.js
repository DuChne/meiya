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
        var i = this, s = i.data.pics;
        s.length < 9 ? wx.chooseImage({
            count: 9 - s.length,
            sizeType: [ "original", "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(a) {
                var t = {
                    path: a.tempFilePaths
                }, e = i.data.image_ids;
                _resource2.default.uploadimg(t, function(a) {
                    1 == a.status ? (e.push(a.data.image_id), i.setData({
                        image_ids: e
                    })) : _resource2.default.errorToast(a.data.msg);
                }), s = s.concat(a.tempFilePaths), i.setData({
                    pics: s
                });
            }
        }) : wx.showToast({
            title: "最多上传9张图片！",
            icon: "none"
        });
    },
    deleteImage: function(a) {
        var t = this, e = t.data.pics, i = t.data.image_ids, s = a.currentTarget.dataset.index;
        e.splice(s, 1), i.splice(s, 1), t.setData({
            pics: e,
            image_ids: i
        });
    },
    selTagTap: function(a) {
        if(3 ==this.data.tagText.length) {
          return wx.showToast({
            title: '最多只能选择三种标签',
            icon: 'none'
          })
        }
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
    bindInput: function(a) {
        this.setData({
            textLen: a.detail.cursor
        });
    },
    publish: function(a) {
        if (1 == checkSubmit) return _resource2.default.errorToast("请勿重复点击"), !1;
        checkSubmit = !0;
        var e = this, t = a.detail.value.title, i = a.detail.value.reason, s = a.detail.value.buypath, o = e.data.hadTag, n = a.detail.formId;
        o = o.join(","), "" == e.data.pics ? (wx.showToast({
            title: "请选择图片",
            icon: "none"
        }), checkSubmit = !1) : "" == t ? (wx.showToast({
            title: "请填标题",
            icon: "none"
        }), checkSubmit = !1) : "" == i ? (wx.showToast({
            title: "请填推荐理由",
            icon: "none"
        }), checkSubmit = !1) : "" == s ? (wx.showToast({
            title: "请填购买详情",
            icon: "none"
        }), checkSubmit = !1) : "" == o ? (wx.showToast({
            title: "请选择标签",
            icon: "none"
        }), checkSubmit = !1) : app.util.request({
            url: "entry/wxapp/heart/publish",
            cachetime: "0",
            data: {
                title: t,
                desc: i,
                source: s,
                tab_ids: o,
                image_ids: e.data.image_ids,
                formId: "the formId is a mock one" == n ? "" : n
            },
            success: function(a) {
                checkSubmit = !1;
                var t = a.data.data;
                1 == a.data.status ? (wx.showToast({
                    title: "发布成功"
                }), setTimeout(function(a) {
                    wx.navigateTo({
                        url: "../tipDetails/tipDetails?tipId=" + t
                    });
                }, 1500), app.globalData.hadTag = [], app.globalData.tagText = []) : 2 == a.data.status ? (wx.showModal({
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
      console.log(this.data.tagText)
    },
    diyWinColor: function(a) {
        this.data.system ? wx.setNavigationBarTitle({
            title: this.data.system.link_name
        }) : wx.setNavigationBarTitle({
            title: "写笔记"
        });
    }
});