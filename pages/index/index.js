Page({
  canvasIdErrorCallback: function (e) {
    console.error(e.detail.errMsg)
  },
  data: {
    context: null,
    pixelRatio: null,
    winWidth: null,
    winHeight: null,
    f: 90,
    q: '',
    r: 0
  },
  onReady: function (e) {
    this.init()
  },

  init() {
    // 使用 wx.createContext 获取绘图上下文 context
    const context = wx.createCanvasContext('firstCanvas');
    this.setData({
      context
    });
    const that = this;
    // 获取设备信息
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          pixelRatio: res.pixelRatio,
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
        // context.width = res.windowWidth * res.pixelRatio;
        // context.height = res.windowHeight * res.pixelRatio;
        // context.scale(res.pixelRatio, res.pixelRatio);
        context.globalAlpha = 0.6

        that.tapFn();
      }
    });

  },

  tapFn(e) {
    let context = this.data.context,
      w = this.data.winWidth,
      h = this.data.winHeight,
      q = this.data.q,
      f = this.data.f;
    context.clearRect(0, 0, w, h);
    q = [{ x: 0, y: h * .7 + f }, { x: 0, y: h * .7 - f }]
    this.setData({
      q
    })
    if (q[1].x < w + f) {
      this.d(q[0], q[1]);      
    }
    console.log('完成');
  },

  d(i, j) {
    let x = this.data.context,
      w = this.data.winWidth,
      f = this.data.f,
      u = Math.PI * 2,
      r = this.data.r,
      v = Math.cos,
      q = this.data.q;

    x.beginPath()
    x.moveTo(i.x, i.y)
    x.lineTo(j.x, j.y)
    var k = j.x + (Math.random() * 2 - 0.25) * f,
      n = this.y(j.y)
    x.lineTo(k, n)
    x.closePath();
    r -= u / -50
    x.setFillStyle('#' + (v(r) * 127 + 128 << 16 | v(r + u / 3) * 127 + 128 << 8 | v(r + u / 3 * 2) * 127 + 128).toString(16));

    console.log('#' + (v(r) * 127 + 128 << 16 | v(r + u / 3) * 127 + 128 << 8 | v(r + u / 3 * 2) * 127 + 128).toString(16));
    x.fill()
    x.draw(true);
    q[0] = q[1]
    q[1] = { x: k, y: n };
    this.setData({
      q: q,
      r
    })
    if (q[1].x < w + f) {
      this.d(q[0], q[1]);
    }
  },

  y(p) {
    let 
      f = this.data.f,
      h = this.data.winHeight;
    var t = p + (Math.random() * 2 - 1.1) * f;
    return (t > h || t < 0) ? this.y(p) : t
  }
})