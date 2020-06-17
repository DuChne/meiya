var _resource = require("../../resource/resource.js"), _resource2 = _interopRequireDefault(_resource);
var common = require('../../resource/common.js');
function _interopRequireDefault(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

function _defineProperty(t, a, e) {
    return a in t ? Object.defineProperty(t, a, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[a] = e, t;
}

var app = getApp(), checkSubmit = !1;

Page({
    getposterurl: function(t) {
        this.setData({
            loadingflag: !0,
            posterurl: t.detail.url
        }), this.data.clickposterFlag && this.showPoster();
    },
    showPoster: function(t) {
        if (this.data.loadingflag) {
            wx.previewImage({
                urls: [ this.data.posterurl ]
            }), this.setData({
                clickposterFlag: !1
            }), wx.hideLoading(), app.util.request({
                url: "entry/wxapp/DelCtxImg",
                cachetime: "0",
                data: {
                    wxcode: this.data.qr
                },
                success: function(t) {}
            });
        } else this.setData({
            clickposterFlag: !0
        }), wx.showLoading({
            title: "加载中..."
        }), setTimeout(function() {
            wx.hideLoading();
        }, 2e3);
        this.setData({
            showModalStatus: !1
        });
    },
    data: {
        clickposterFlag: !1,
        addToTime: undefined,
        loadingflag: !1,
        isShowMore: true,
        collection: 0,
        isShowIndexBack: !1,
        swiperHeight: 860
    },
    goHisHome: function(t) {
        var a = t.currentTarget.dataset.userid;
        app.goHisHome(a);
    },
    loadPreview (e) {
      console.log(e.detail.height, e.detail.width)
      this.setData({
        swiperHeight: e.detail.height / e.detail.width * 750
      })
    },
    backHome: function(t) {
        wx.reLaunch({
            url: "../index/index"
        });
    },
    onLoad: function(t) {
      console.log(t)
        var a = wx.getStorageSync("users");
        if (t.referrer == 'noteDetails') {
          this.setData({
            isShowIndexBack: true,
          })
        }
        this.setData({
            tipId: t.scene ? t.scene : t.tipId,
            users: a
        });
    },
    getWindowHeight () {
      wx.getSystemInfo
    },
    bindPreview: function(t) {
        var a = t.currentTarget.dataset.index;
        wx.previewImage({
            current: this.data.tipDetails.image[a],
            urls: this.data.tipDetails.image
        });
    },
    focusTap: function(t) {
        var e = this, a = t.currentTarget.dataset.userid;
        app.util.request({
            url: "entry/wxapp/user/follow",
            cachetime: "0",
            data: {
                to_uid: a
            },
            success: function(t) {
                if (1 == t.data.status) if ("取消关注成功" == t.data.msg) {
                    var a = "tipDetails.isFollow";
                    e.setData(_defineProperty({}, a, 0));
                } else if ("成功" == t.data.msg) {
                    a = "tipDetails.isFollow";
                    e.setData(_defineProperty({}, a, 1));
                }
                -100 == t.data.status && app.removeToken();
            }
        });
    },
    bindCollectTap: function(t) {
        var a = this;
        app.util.request({
            url: "entry/wxapp/heart/collection",
            cachetime: "0",
            data: {
                heart_id: a.data.tipId
            },
            success: function(t) {
                if (1 == t.data.status) {
                    a.data.tipDetails.isCollection;
                    "成功" == t.data.msg ? a.setData({
                        hadCollect: 1,
                        collection: a.data.tipDetails.collection + 1
                    }) : "取消收藏成功" == t.data.msg && a.setData({
                        hadCollect: 0, 
                        collection: a.data.tipDetails.collection + 0
                    });
                }
                -100 == t.data.status && app.removeToken();
            }
        });
    },
    clickLike: function(t) {
        var e = this, a = t.currentTarget.dataset.tipid;
        app.util.request({
            url: "entry/wxapp/heart/heartFavour",
            cachetime: "0",
            data: {
                heart_id: a
            },
            success: function(t) {
                if (1 == t.data.status) {
                    e.data.tipDetails.isFavour;
                    if ("成功" == t.data.msg) {
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
                }
                -100 == t.data.status && app.removeToken();
            }
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
        var a = this, e = t.currentTarget.dataset.tipid, i = a.data.content;
        app.util.request({
            url: "entry/wxapp/heart/commentHeart",
            cachetime: "0",
            data: {
                heart_id: e,
                content: i
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
        });
    },
    allComments: function(t) {
        var a = t.currentTarget.dataset.tipid;
        wx.navigateTo({
            url: "../commentList/commentList?tipId=" + a
        });
    },
    onReady: function() {},
    onShareAppMessage: function(e) {
        var i = this;
      console.log("&referrer=noteDetails",e)
        return {
          title: i.data.tipDetails.title,
          path: "ywsq_sun/pages/tipDetails/tipDetails?tipId=" + i.data.tipId + "&referrer=noteDetails",
          imageUrl: i.data.tipDetails.image[0]
        };
    },
    onShow: function() {
        var a = this;
        setTimeout(function(t) {
            app.util.request({
                url: "entry/wxapp/heart/commentList",
                cachetime: "0",
                data: {
                    heart_id: a.data.tipId,
                    cut: 1
                },
                success: function(t) {
                  if (1 == t.data.status) {
                    t.data.data.forEach((element, index) => {
                      t.data.data[index].content = element.content.replace(/\[(.+?)\]/g, "")
                    })
                  }
                    1 == t.data.status && a.setData({
                        commentsList: t.data.data
                    }), -100 == t.data.status && app.removeToken();
                }
            });
        }, 1e3);
    },
    diyWinColor: function(t) {
        this.data.system ? wx.setNavigationBarTitle({
            title: this.data.system.link_name
        }) : wx.setNavigationBarTitle({
            title: "笔记详情"
        });
    },
    moreListCom: function() {
      var a = this;
      a.data.tipId && app.util.request({
        url: "entry/wxapp/heart/commentList",
        cachetime: "0",
        data: {
          heart_id: a.data.tipId
        },
        success: function (t) {
          if (1==t.data.status) {
            t.data.data.forEach((element,index) => {
              t.data.data[index].content = element.content.replace(/\[(.+?)\]/g, "")
            })
          }
          1 == t.data.status && a.setData({
            commentsList: t.data.data,
            isShowMore: false
          }), -100 == t.data.status && app.removeToken();
        }
      });
    },
    updateUserInfo: function(t) {
        var a = this;
        setTimeout(function() {
            t.detail && (app.util.request({
                url: "entry/wxapp/heart/detail",
                cachetime: "0",
                data: {
                    heart_id: a.data.tipId
                },
                success: function(t) {
                  if (1 == t.data.status) {
                    try {
                      t.data.data.title = unescape(escape(t.data.data.title.replace(/\[(.+?)\]/g, "")).replace("%20", ""))
                      t.data.data.description = t.data.data.description.replace(/\[(.+?)\]/g, "").replace(t.data.data.title, "")
                      if(0 == escape(t.data.data.description).indexOf("%0A")){
                        t.data.data.description = unescape(escape(t.data.data.description).slice(3))
                      }
                      console.log(escape(t.data.data.description).indexOf("%0A"))
                    } catch (e) { console.log(e) }
                    
                    a.setData({
                      addToTime: common.format(t.data.data.addtime),
                      tipDetails: t.data.data,
                      collection: t.data.data.collection,
                      tipLike: t.data.data.favour,
                      hadCollect: t.data.data.isCollection - 0
                    })
                  }
                  -100 == t.data.status && app.removeToken(), setTimeout(function () {
                    a.posterInfo();
                  }, 1500);
                }
            }), app.util.request({
                url: "entry/wxapp/public/get_code",
                cachetime: "0",
                data: {
                    scene: a.data.tipId
                },
                success: function(t) {
                    1 == t.data.status ? a.setData({
                        qr: t.data.data
                    }) : -100 == t.data.status && app.removeToken();
                }
            }), a.diyWinColor());
        }, 1e3);
    },
    bindShareTap: function(t) {
        var a = t.currentTarget.dataset.statu;
        this.util(a);
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
            a.opacity(1).height("250rpx").step(), this.setData({
                animationData: a
            }), "close" == t && this.setData({
                showModalStatus: !1
            });
        }.bind(this), 200), "open" == t && this.setData({
            showModalStatus: !0
        });
    },
    posterInfo: function() {
        var t = this, a = wx.getStorageSync("users");
        setTimeout(function() {
            null != a && t.setData({
                posterinfo: {
                    avatar: a.avatar,
                    banner: t.data.tipDetails.image[0],
                    title: t.data.tipDetails.title,
                    hot: "浏览量：" + t.data.tipDetails.views,
                    qr: t.data.qr,
                    address: "去哪儿找：" + t.data.tipDetails.source
                }
            });
        }, 1500);
    }
});