var _resource = require("../../resource/resource.js"), _resource2 = _interopRequireDefault(_resource);

function _interopRequireDefault(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var app = getApp(), token = wx.getStorageSync("token"), checkSubmit = !1;

Page({
    data: {
        pics: [],
        image_ids: []
    },
    onLoad: function(e) {
        this.setData({
            quesId: e.quesId
        }), this.diyWinColor();
    },
    chooseImage: function() {
        var i = this, s = i.data.pics;
        s.length < 9 ? wx.chooseImage({
            count: 9 - s.length,
            sizeType: [ "original", "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(e) {
                var t = {
                    path: e.tempFilePaths
                }, a = i.data.image_ids;
                return _resource2.default.uploadimg(t, function(e) {
                    1 == e.status && (a.push(e.data.image_id), i.setData({
                        image_ids: a
                    }));
                }), s = s.concat(e.tempFilePaths), i.setData({
                    pics: s
                }), !1;
            }
        }) : wx.showToast({
            title: "最多上传9张图片！",
            icon: "none"
        });
    },
    uploadimg: function(e, t) {
        var a = this, i = e.i ? e.i : 0, s = e.success ? e.success : 0, o = e.fail ? e.fail : 0;
        wx.uploadFile({
            url: e.url,
            filePath: e.path[i],
            name: "upfile",
            formData: t,
            success: function(e) {
                1 == e.data && s++;
            },
            fail: function(e) {
                2 == e.data && o++;
            },
            complete: function() {
                ++i == e.path.length ? (wx.hideLoading(), wx.showToast({
                    title: "发布成功！！！",
                    icon: "success",
                    success: function() {
                        a.setData({
                            pics: [],
                            content: "",
                            disabled: !1,
                            sendtitle: "发送"
                        }), app.globalData.aci = "";
                    }
                })) : (e.i = i, e.success = s, e.fail = o, a.uploadimg(e, t));
            }
        });
    },
    deleteImage: function(e) {
        var t = this, a = t.data.pics, i = t.data.image_ids, s = e.currentTarget.dataset.index;
        a.splice(s, 1), i.splice(s, 1), t.setData({
            pics: a,
            image_ids: i
        });
    },
    publish: function(e) {
        if (1 == checkSubmit) return _resource2.default.errorToast("请勿重复点击"), !1;
        checkSubmit = !0;
        var t = e.detail.value, a = e.detail.formId, i = this;
        i.data.pics;
        if (wx.showLoading({
            title: "内容发布中，请稍后...",
            mask: !0
        }), i.setData({
            disabled: !0,
            sendtitle: "稍后"
        }), "" == e.detail.value.desc) return wx.showToast({
            title: "发布内容不能为空",
            icon: "none"
        }), checkSubmit = !1;
        app.util.request({
            url: "entry/wxapp/question/answer",
            cachetime: "0",
            data: {
                question_id: i.data.quesId,
                desc: t.desc,
                image_ids: i.data.image_ids,
                formId: "the formId is a mock one" == a ? "" : a
            },
            success: function(e) {
                checkSubmit = !1, 1 == e.data.status && wx.showToast({
                    title: "发布成功"
                }), 2 == e.data.status && wx.showToast({
                    title: "已提交待审核"
                }), -100 == e.data.status && app.removeToken(), setTimeout(function() {
                    wx.navigateBack({});
                }, 2e3);
            },
            fail: function() {
                i.setData({
                    disabled: !1,
                    sendtitle: "发送"
                }), wx.showToast({
                    title: "可能由于网络原因，发布失败，请重新发布",
                    icon: "none",
                    success: function() {
                        wx.hideLoading();
                    }
                });
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    diyWinColor: function(e) {
        this.data.system ? wx.setNavigationBarTitle({
            title: this.data.system.link_name
        }) : wx.setNavigationBarTitle({
            title: "写回答"
        });
    }
});