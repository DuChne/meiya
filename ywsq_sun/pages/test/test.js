var animationShowHeight = 300;

Page({
    data: {
        animation: ""
    },
    btnClick: function() {
        var t = wx.createAnimation({
            transformOrigin: "50% 50%",
            duration: 1e3,
            timingFunction: "ease",
            delay: 0
        });
        (this.animation = t).translateY(animationShowHeight).step(), this.setData({
            animation: t.export()
        });
    },
    btnClickTo: function() {
        var t = wx.createAnimation({
            transformOrigin: "50% 50%",
            duration: 1e3,
            timingFunction: "ease",
            delay: 0
        });
        (this.animation = t).translateY(0).step(), this.setData({
            animation: t.export()
        });
    }
});