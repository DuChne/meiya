var _resource = require("../../resource/resource.js"), _resource2 = _interopRequireDefault(_resource);
var app = getApp();
function _interopRequireDefault(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

Page({
    data: {
        currentType: 0,
        carDatas: [],
        catIds: [],
        currentPage: 1,
        goodsList: [],
      shopContentImg: [],
        cat_id: 0,
      allTabs: [],

    },
    tabClick: function(t) {
        this.setData({
            currentType: t.currentTarget.dataset.index,
            currentPage: 1
        }), this.fetchGoodsList();
    },
    onLoad: function(e) {
        var r = this, o = [], s = [ 0 ];
        _resource2.default.fetchCategory(function(t) {
            var a = 0;
            1 == t.data.status && (t.data.data.forEach(function(t) {
                o.push(t.name), s.push(t.cat_id), e.cat_id && (a = s.indexOf(e.cat_id), r.setData({
                    currentType: a
                }));
            }), r.setData({
                currentType: a,
                carDatas: o,
                catIds: s
            }));
        }), this.fetchGoodsList();
        this.getBanner();
    },
    onShow:function(){
      // this.onLoad()
    },
    getBanner () {
      const that = this;
      app.util.request({
        url: "entry/wxapp/index/ad_list",
        cachetime: "0",
        data: {
          pos_type: 1,
        },
        success: function (t) {
          console.log(t.data.data.ad, t.data)
          1 == t.data.status&&that.setData({
            shopContentImg: t.data.data.ad
          })
        }
      });
    },
    onReachBottom: function() {
        var t = this;
        wx.showNavigationBarLoading();
        setTimeout(function() {
            wx.hideNavigationBarLoading(), t.fetchGoodsList();
        }, 1e3);
    },
  updateUserInfo: function (t) {
    t.detail;
    const that = this;
    setTimeout(_ => { that.fetchGoodsList() }, 0)
    
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
    fetchGoodsList: function() {
        var e = this, t = {
            cat_id: e.data.catIds[e.data.currentType],
            p: e.data.currentPage
        };
        _resource2.default.fetchGoodsList(t, function(t) {
            var a = 1 == e.data.currentPage ? t.data.data : e.data.goodsList.concat(t.data.data);
            1 == t.data.status && e.setData({
                currentPage: ++e.data.currentPage,
                goodsList: a
            });
        });
    },
    navigateToGoods: function(t) {
        var a = t.currentTarget.dataset.goodsId;
        wx.navigateTo({
            url: "../goodsDetail/goodsDetail?id=" + a
        });
    }
});