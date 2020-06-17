var _resource = require("../../resource/resource.js"), _resource2 = _interopRequireDefault(_resource);

function _interopRequireDefault(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var app = getApp();

Page({
    data: {
        autoplay: !0,
        interval: 3e3,
        duration: 1e3,
        circular: !0,
        is_modal_Hidden: !0,
        comeIn: !0,
        tabid: '',
        allTabs: [],
        pages: 0,
        p: 1,
        psize: 5,
        foundList: [],
        leftDataNumber: 0,
        rightDataNumber: 0,
        selectRecomms: []
    },
    goDetailsPs: function() {
        wx.navigateTo({
            url: "../psDetails/psDetails"
        });
    },
    onLoad: function() {
        var a = this;
        _resource2.default.getad({}, function(t) {
            wx.showLoading({
                title: "加载中",
                mask: !0
            }), a.setData({
                banners: t.data.data.ad ? t.data.data.ad : 0,
                tags: t.data.data.tab ? t.data.data.tab : 0,
                recommAnsers: t.data.data.user ? t.data.data.user : 0
            }), setTimeout(function(t) {
                wx.hideLoading();
            }, 1500);
        }), app.util.request({
            url: "entry/wxapp/index/GetMenu",
            cachetime: "0",
            success: function(t) {
                wx.showLoading({
                    title: "加载中",
                    mask: !0
                }), a.setData({
                    ptInfo: t.data.data
                }), wx.setStorageSync("ptInfo", t.data.data), setTimeout(function(t) {
                    wx.hideLoading();
                  }, 1500), a.diyWinColor();
            }
        }), app.util.request({
            url: "entry/wxapp/index/article",
            cachetime: "0",
            data: {
                psize: a.data.psize
            },
            success: function(t) {
                a.setData({
                    selectRecomms: t.data.data
                }), wx.hideLoading();
            }
          });
    },
    goDetails: function (t) {
      var a = t.currentTarget.dataset.quesid, e = t.currentTarget.dataset.tipid;
      a ? wx.navigateTo({
        url: "../probDetails/probDetails?quesId=" + a
      }) : e && wx.navigateTo({
        url: "../tipDetails/tipDetails?tipId=" + e
      });
    },
    goHisHome: function (t) {
      var a = t.currentTarget.dataset.userid;
      app.goHisHome(a);
    },
    goShopping: function(t) {
        var a = t.currentTarget.dataset.index;
        console.log(a)
        wx.navigateTo({
            url: "/" + this.data.banners[a].path
        });
    },
    askQuesTap: function(t) {
        wx.navigateTo({
            url: "../ask/ask"
        });
    },
    writeAnswer: function(t) {
        wx.navigateTo({
            url: "../askList/askList"
        });
    },
    showTips: function(t) {
        wx.navigateTo({
            url: "../tips/tips"
        });
    },
    tagUnderList: function(t) {
        var a = t.currentTarget.dataset.tagid, e = t.currentTarget.dataset.tagtext;
        wx.navigateTo({
            url: "../tagUnderList/tagUnderList?tab_id=" + a + "&&titles=" + e
        });
    },
    seleDetails: function(t) {
        var a = t.currentTarget.dataset.contentid;
        wx.navigateTo({
            url: "../selRecommend/selRecommend?contentId=" + a
        });
    },
    onReachBottom: function() {
        var a = this, t = a.data.p + 1;
        a.setData({
            p: t
        }), app.util.request({
            url: "entry/wxapp/index/article",
            cachetime: "0",
            data: {
                p: t,
                psize: a.data.psize
            },
            success: function(t) {
                a.setData({
                    selectRecomms: a.data.selectRecomms.concat(t.data.data)
                }), wx.hideLoading();
            }
          }), a.onQuestionBottom();
    },
    tranAllTabs: function (e) {
      
      e.currentTarget.dataset&&this.setData({
        tabid: e.currentTarget.dataset.tagid,
        pages: 0,
        foundList: []
      }); this.onQuestionBottom()
    },
    onQuestionBottom: function () {
      var a = this, t = a.data.pages + 1;
      a.setData({
        pages: t
      }), app.util.request({
        url: "entry/wxapp/advisory/list",
        cachetime: "0",
        data: {
          p: a.data.pages,
          top: 0,
          tab_id: a.data.tabid
        },
        success: function (t) {
          try {
            t.data.data.forEach((element, index) => {
              t.data.data[index].title = element.title.replace(/\[(.+?)\]/g, "")
            })
          } catch (e) { console.log(e) }
          a.setData({
            foundList: a.data.foundList.concat(t.data.data)
          }), -100 == t.data.status && app.removeToken();
        }
      });
    },
    goAllTag: function(t) {
        wx.navigateTo({
            url: "../allTag/allTag?askpage=2"
        });
    },
    gorecomAnser: function(t) {
        wx.navigateTo({
            url: "../recommAnser/recommAnser"
        });
    },
    callTap: function(t) {
        wx.makePhoneCall({
            phoneNumber: t.currentTarget.dataset.tel
        });
    },
    diyWinColor: function(t) {
        var a = wx.getStorageSync("ptInfo");
        a.pt_name ? wx.setNavigationBarTitle({
            title: a.pt_name
        }) : wx.setNavigationBarTitle({
            title: "美芽"
        });
    },
    goSignIn: function(t) {
        var a = this, e = t.currentTarget.dataset.statu;
        a.util(e), app.util.request({
            url: "entry/wxapp/user/signed",
            cachetime: "0",
            success: function(t) {
                console.log(t), 1 == t.data.status && a.setData({
                    signInfo: t.data.data
                }), -100 == t.data.status && app.removeToken();
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
            a.opacity(1).height("770rpx").step(), this.setData({
                animationData: a
            }), "close" == t && this.setData({
                showModalStatus: !1
            });
        }.bind(this), 200), "open" == t && this.setData({
            showModalStatus: !0
        });
    },
    updateUserInfo: function(t) {
      // t.detail;
      const that = this;
      setTimeout(_ => { that.onQuestionBottom();},0)
      app.util.request({
        url: "entry/wxapp/index/tab",
        cachetime: "0",
        success: function (t) {
          1 == t.data.status && t.data.data.tab_list.forEach(_ => {
            _.child && _.child.forEach(ele => {
              that.data.allTabs.push(ele)
            }), _.child_more && _.child_more.forEach(ele => {
              that.data.allTabs.push(ele)
            })
          }), that.setData({
            allTabs: that.data.allTabs
          }), -100 == t.data.status && app.removeToken();
          console.log(that.data.allTabs)
        }
      })
    },
    onShow: function() {
        var t = wx.getStorageSync("comeIn");
        this.setData({
            comeIn: t
        });
      this.updateUserInfo()

    },
    onShareAppMessage: function() {}
});