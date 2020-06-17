var _Page;

function _defineProperty(t, e, a) {
    return e in t ? Object.defineProperty(t, e, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = a, t;
}

var app = getApp();

Page((_defineProperty(_Page = {
    data: {
        showGraph: !0,
        p: 1,
        scrHeight: 600,
        currentIdx: 2
    },
    goHisHome: function(t) {
        var e = t.currentTarget.dataset.userid;
        app.goHisHome(e);
    },
    onLoad: function(t) {
      this.diyWinColor();
      this.getScreenHeight()
    },
    nweF:function(){
      
        var t = wx.getStorageSync("users"), e = this;
        app.util.request({
          url: "entry/wxapp/user/myHome",
          cachetime: "0",
          success: function (t) {
            1 == t.data.status && e.setData({
              userInfo: t.data.data
            }), -100 == t.data.status && app.removeToken();
          }
        }), app.util.request({
          url: "entry/wxapp/question/userAnswer",
          cachetime: "0",
          data: {
            user_id: t.user_id
          },
          success: function (t) {
            1 == t.data.status && e.setData({
              userAnswer: t.data.data
            }), -100 == t.data.status && app.removeToken();
          }
        }), app.util.request({
          url: "entry/wxapp/question/userQuestion",
          cachetime: "0",
          data: {
            user_id: t.user_id
          },
          success: function (t) {
            1 == t.data.status && e.setData({
              userQuestion: t.data.data
            }), -100 == t.data.status && app.removeToken();
          }
        }), app.util.request({
          url: "entry/wxapp/dynamic/userCollection",
          cachetime: "0",
          data: {
            user_id: t.user_id
          },
          success: function (t) {
            console.log(t.data.data, 59)
            if (1 == t.data.status) {
              t.data.data.forEach((element, index) => {
                t.data.data[index].title = unescape(escape(element.title.replace(/\[(.+?)\]/g, "")).replace("%20", ""))
                t.data.data[index].description = element.description.replace(t.data.data[index].title, "").replace(/\[(.+?)\]/g, "")
              })
              e.setData({
                userCollection: t.data.data
              })
            }
            -100 == t.data.status && app.removeToken();
          }
        }), app.util.request({
          url: "entry/wxapp/heart/userHeart",
          cachetime: "0",
          data: {
            user_id: t.user_id,
            cut: 0
          },
          success: function (t) {
            1 == t.data.status && e.setData({
              userHeart: t.data.data
            }), -100 == t.data.status && app.removeToken();
          }
        });
    },
    getScreenHeight () {
      const that = this;
      wx.getSystemInfo({
        success (res) {
          console.log(res)
          that.setData({
            scrHeight: res.windowHeight / res.windowWidth*750 - 375 - 79- 120
          })
        }
      })
    },
    changeGraph: function(t) {
        var e = JSON.stringify(this.data.userInfo);
        wx.navigateTo({
            url: "../editData/editData?userInfoStr=" + e
        });
    },
    exchangeCoupon: function(t) {
        wx.navigateTo({
            url: "../signForYhq/signForYhq"
        });
    },
    mineOrder: function(t) {
        wx.navigateTo({
            url: "../mineOrder/mineOrder"
        });
    },
    mineFocus: function(t) {
        wx.navigateTo({
            url: "../mineFocus/mineFocus"
        });
    },
    mineFans: function(t) {
        wx.navigateTo({
            url: "../mineFans/mineFans"
        });
    },
    onReady: function() {},
    tabClick: function(t) {
        this.setData({
            currentIdx: t.currentTarget.dataset.index,
            p: 1
        });
    },
    delAnswer: function(t) {
        var e = this, a = t.currentTarget.dataset.answerid, s = t.currentTarget.dataset.index, n = e.data.userAnswer, r = e.data.userInfo.answer;
        wx.showModal({
            title: "提示",
            content: "确认删除？",
            success: function(t) {
                t.confirm ? app.util.request({
                    url: "entry/wxapp/user/del_answer",
                    cachetime: "0",
                    data: {
                        answer_id: a
                    },
                    success: function(t) {
                        n.splice(s, 1), r--, e.setData(_defineProperty({
                            userAnswer: n
                        }, "userInfo.answer", r)), wx.showToast({
                            title: t.data.msg,
                            icon: "none"
                        });
                    }
                }) : t.cancel;
            }
        });
    },
    delQues: function(t) {
        var e = this, a = t.currentTarget.dataset.quesid, s = t.currentTarget.dataset.index, n = e.data.userQuestion, r = e.data.userInfo.question;
        wx.showModal({
            title: "提示",
            content: "确认删除？",
            success: function(t) {
                t.confirm ? app.util.request({
                    url: "entry/wxapp/user/del_question",
                    cachetime: "0",
                    data: {
                        question_id: a
                    },
                    success: function(t) {
                        n.splice(s, 1), r--, e.setData(_defineProperty({
                            userQuestion: n
                        }, "userInfo.question", r)), wx.showToast({
                            title: t.data.msg,
                            icon: "none"
                        });
                    }
                }) : t.cancel;
            }
        });
    },
    delTip: function(t) {
        var e = this, a = t.currentTarget.dataset.tipid, s = t.currentTarget.dataset.index, n = e.data.userHeart, r = e.data.userInfo.heart;
        wx.showModal({
            title: "提示",
            content: "确认删除？",
            success: function(t) {
                t.confirm ? app.util.request({
                    url: "entry/wxapp/user/del_heart",
                    cachetime: "0",
                    data: {
                        heart_id: a
                    },
                    success: function(t) {
                        n.splice(s, 1), r--, e.setData(_defineProperty({
                            userHeart: n
                        }, "userInfo.heart", r)), wx.showToast({
                            title: t.data.msg,
                            icon: "none"
                        });
                    }
                }) : t.cancel;
            }
        });
    },
    lower: function() {
        var t = wx.getStorageSync("users"), e = this, a = e.data.p + 1;
        e.setData({
            p: a
        }), 0 == e.data.currentIdx ? app.util.request({
            url: "entry/wxapp/question/userAnswer",
            cachetime: "0",
            data: {
                p: a,
                user_id: t.user_id
            },
            success: function(t) {
              console.log(t,0);
                e.setData({
                    userAnswer: e.data.userAnswer.concat(t.data.data)
                }), -100 == t.data.status && app.removeToken();
            }
        }) : 1 == e.data.currentIdx ? app.util.request({
            url: "entry/wxapp/question/userQuestion",
            cachetime: "0",
            data: {
                p: a,
                user_id: t.user_id
            },
            success: function(t) {
              console.log(t, 1);
                e.setData({
                    userQuestion: e.data.userQuestion.concat(t.data.data)
                }), -100 == t.data.status && app.removeToken();
            }
        }) : 2 == e.data.currentIdx ? app.util.request({
            url: "entry/wxapp/heart/userHeart",
            cachetime: "0",
            data: {
                p: a,
                user_id: t.user_id
            },
            success: function(t) {
              console.log(t, 2);
                e.setData({
                    userHeart: e.data.userHeart.concat(t.data.data)
                }), -100 == t.data.status && app.removeToken();
            }
        }) : 3 == e.data.currentIdx && app.util.request({
            url: "entry/wxapp/dynamic/userCollection",
            cachetime: "0",
            data: {
                p: a,
                user_id: t.user_id
            },
            success: function(t) {
              console.log(t, 3);
                e.setData({
                    userCollection: e.data.userCollection.concat(t.data.data)
                }), -100 == t.data.status && app.removeToken();
            }
        });
    },
    answDetails: function(t) {
        var e = t.currentTarget.dataset.answerid;
        wx.navigateTo({
            url: "../answerDeta/answerDeta?answerId=" + e
        });
    },
    askDetails: function(t) {
      var e = t.currentTarget.dataset.tipid;
        wx.navigateTo({
          url: "../tipDetails/tipDetails?tipId=" + e
        });
    },
  updateUserInfo: function (t) {
    t.detail;
    const that = this;
    setTimeout(_ => { that.nweF() }, 0)

    // app.util.request({
    //   url: "entry/wxapp/index/tab",
    //   cachetime: "0",
    //   success: function (t) {
    //     1 == t.data.status && t.data.data.tab_list.forEach(_ => {
    //       _.child && _.child.forEach(ele => {
    //         that.data.allTabs.push(ele)
    //       }), _.child_more && _.child_more.forEach(ele => {
    //         that.data.allTabs.push(ele)
    //       })
    //     }), that.setData({
    //       allTabs: that.data.allTabs
    //     }), -100 == t.data.status && app.removeToken();
    //     console.log(that.data.allTabs)
    //   }
    // })
  },
    tipDetails: function(t) {
        var e = t.currentTarget.dataset.tipid;
        wx.navigateTo({
            url: "../tipDetails/tipDetails?tipId=" + e
        });
    }
}, "onReady", function() {}), _defineProperty(_Page, "onShow", 
function() {
    var t = wx.getStorageSync("users"), e = this;
  e.nweF()
//     app.util.request({
//         url: "entry/wxapp/user/myHome",
//         cachetime: "0",
//         success: function(t) {
//             1 == t.data.status && e.setData({
//                 userInfo: t.data.data
//             }), -100 == t.data.status && app.removeToken();
//         }
//     }), app.util.request({
//         url: "entry/wxapp/question/userAnswer",
//         cachetime: "0",
//         data: {
//             user_id: t.user_id
//         },
//         success: function(t) {
//             1 == t.data.status && e.setData({
//                 userAnswer: t.data.data
//             }), -100 == t.data.status && app.removeToken();
//         }
//     }), app.util.request({
//         url: "entry/wxapp/question/userQuestion",
//         cachetime: "0",
//         data: {
//             user_id: t.user_id
//         },
//         success: function(t) {
//             1 == t.data.status && e.setData({
//                 userQuestion: t.data.data
//             }), -100 == t.data.status && app.removeToken();
//         }
//     }), app.util.request({
//         url: "entry/wxapp/dynamic/userCollection",
//         cachetime: "0",
//         data: {
//             user_id: t.user_id
//         },
//         success: function(t) {
//           console.log(t.data.data,59)
//           if (1 == t.data.status) {
//             t.data.data.forEach( (element,index) => {
//               t.data.data[index].title = unescape(escape(element.title.replace(/\[(.+?)\]/g, "")).replace("%20", ""))
//               t.data.data[index].description = element.description.replace(t.data.data[index].title, "").replace(/\[(.+?)\]/g, "")
//             })
//             e.setData({
//               userCollection: t.data.data
//             })
//           }
//           -100 == t.data.status && app.removeToken();
//         }
//     }), app.util.request({
//         url: "entry/wxapp/heart/userHeart",
//         cachetime: "0",
//         data: {
//             user_id: t.user_id,
//             cut: 0
//         },
//         success: function(t) {
//             1 == t.data.status && e.setData({
//                 userHeart: t.data.data
//             }), -100 == t.data.status && app.removeToken();
//         }
//     });
}
), _defineProperty(_Page, "diyWinColor", function(t) {
    this.data.system ? wx.setNavigationBarTitle({
        title: this.data.system.link_name
    }) : wx.setNavigationBarTitle({
        title: "个人中心"
    });
}), _defineProperty(_Page, "getHeaderImg", function() {
    var e = this;
    app.globalData.userInfo ? this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: !0
    }) : this.data.canIUse ? app.userInfoReadyCallback = function(t) {
        e.setData({
            userInfo: t.userInfo,
            hasUserInfo: !0
        });
    } : wx.getUserInfo({
        success: function(t) {
            app.globalData.userInfo = t.userInfo, e.setData({
                userInfo: t.userInfo,
                hasUserInfo: !0
            });
        }
    });
}), _defineProperty(_Page, "toFocusOn", function(t) {
    var e = t.currentTarget.dataset.statu;
    this.util(e);
}), _defineProperty(_Page, "close", function(t) {
    var e = t.currentTarget.dataset.statu;
    this.util(e);
}), _defineProperty(_Page, "util", function(t) {
    var e = wx.createAnimation({
        duration: 200,
        timingFunction: "linear",
        delay: 0
    });
    (this.animation = e).opacity(0).height(0).step(), this.setData({
        animationData: e.export()
    }), setTimeout(function() {
        e.opacity(1).height("480rpx").step(), this.setData({
            animationData: e
        }), "close" == t && this.setData({
            showModalStatus: !1
        });
    }.bind(this), 200), "open" == t && this.setData({
        showModalStatus: !0
    });
}), _Page));


