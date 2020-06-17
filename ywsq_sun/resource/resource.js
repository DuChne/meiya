Object.defineProperty(exports, "__esModule", {
    value: !0
});

var _util = require("../../we7/js/util.js"), _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

exports.default = {
    fetchCategory: function(e, t) {
        return _util2.default.request({
            url: "entry/wxapp/goods/category",
            cachetime: "0",
            success: e,
            fail: t
        });
    },
    fetchGoodsList: function(e, t, u) {
        return _util2.default.request({
            url: "entry/wxapp/goods/list",
            cachetime: "0",
            data: e,
            success: t,
            fail: u
        });
    },
    fetchGoodsInfo: function(e, t, u) {
        return _util2.default.request({
            url: "entry/wxapp/goods/detail",
            cachetime: "0",
            data: e,
            success: t,
            fail: u
        });
    },
    fetchAddCart: function(e, t, u) {
        return _util2.default.request({
            url: "entry/wxapp/cart/addCart",
            cachetime: "0",
            data: e,
            success: t,
            fail: u
        });
    },
    fetchCartList: function(e, t) {
        return _util2.default.request({
            url: "entry/wxapp/cart/cartList",
            cachetime: "0",
            success: e,
            fail: t
        });
    },
    updCartNumber: function(e, t, u) {
        return _util2.default.request({
            url: "entry/wxapp/cart/changeNum",
            cachetime: "0",
            data: e,
            success: t,
            fail: u
        });
    },
    updCartStatus: function(e, t, u) {
        return _util2.default.request({
            url: "entry/wxapp/cart/changeStatus",
            cachetime: "0",
            data: e,
            success: t,
            fail: u
        });
    },
    delCartProduct: function(e, t, u) {
        return _util2.default.request({
            url: "entry/wxapp/cart/delCart",
            cachetime: "0",
            data: e,
            success: t,
            fail: u
        });
    },
    postOrder: function(e, t, u) {
        return _util2.default.request({
            url: "entry/wxapp/cart/submitOrder",
            cachetime: "0",
            data: e,
            success: t,
            fail: u
        });
    },
    getPaySign: function(e, t, u) {
        return _util2.default.request({
            url: "entry/wxapp/order/wxpay",
            cachetime: "0",
            data: e,
            success: t,
            fail: u
        });
    },
    fetchOrderList: function(e, t, u) {
        return _util2.default.request({
            url: "entry/wxapp/user/order_list",
            cachetime: "0",
            data: e,
            success: t,
            fail: u
        });
    },
    cancalOrder: function(e, t, u) {
        return _util2.default.request({
            url: "entry/wxapp/user/cancel_order",
            cachetime: "0",
            data: e,
            success: t,
            fail: u
        });
    },
    delOrder: function(e, t, u) {
        return _util2.default.request({
            url: "entry/wxapp/user/del_order",
            cachetime: "0",
            data: e,
            success: t,
            fail: u
        });
    },
    confirmOrder: function(e, t, u) {
        return _util2.default.request({
            url: "entry/wxapp/user/confirm_order",
            cachetime: "0",
            data: e,
            success: t,
            fail: u
        });
    },
    orderDetail: function(e, t, u) {
        return _util2.default.request({
            url: "entry/wxapp/user/order_detail",
            cachetime: "0",
            data: e,
            success: t,
            fail: u
        });
    },
    userCoupon: function(e, t, u) {
        return _util2.default.request({
            url: "entry/wxapp/cart/coupon",
            cachetime: "0",
            data: e,
            success: t,
            fail: u
        });
    },
    getad: function(e, t, u) {
        return _util2.default.request({
            url: "entry/wxapp/index/ad",
            cachetime: "0",
            data: e,
            success: t,
            fail: u
        });
    },
    uploadimg: function(e, u) {
        var t = this, a = _util2.default.url("entry/wxapp/public/upload") + "&m=ywsq_sun", r = {}, c = wx.getStorageSync("token");
        c && (r.authorization = "Bearer {" + c + "}");
        var s = e.i ? e.i : 0, i = e.success ? e.success : 0, l = e.fail ? e.fail : 0;
        wx.uploadFile({
            url: a,
            filePath: e.path[s],
            name: "upfile",
            header: r,
            success: function(e) {
                if (i++, 200 == e.statusCode) {
                    var t = JSON.parse(e.data);
                    u(t);
                }
            },
            fail: function(e) {
                l++;
            },
            complete: function() {
                ++s == e.path.length ? (console.log("执行完毕"), console.log("成功：" + i + " 失败：" + l)) : (console.log(s), 
                e.i = s, e.success = i, e.fail = l, t.uploadimg(e, u));
            }
        });
    },
    successToast: function(e) {
        e = e || "成功", wx.showToast({
            title: e,
            icon: "success",
            duration: 2e3,
            mask: !0
        });
    },
    errorToast: function(e) {
        e = e || "请求超时", wx.showToast({
            title: e,
            icon: "none",
            duration: 2e3,
            mask: !0
        });
    }
};