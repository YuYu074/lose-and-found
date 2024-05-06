// pages/classify/classify.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    asideBar: ["卡片、证件类", "生活用品", "数码产品", "美妆护肤类", "衣服物品类", "饰品", "文娱", "其它"],
    login: false,
    rightList: [
      [{
          url: "./icon/idcard.png",
          text: "身份证"
        },
        {
          url: "./icon/schoolcard.png",
          text: "校园卡"
        },
        {
          url: "./icon/stucard.png",
          text: "学生证"
        },
        {
          url: "./icon/watercard.png",
          text: "水卡"
        },
        {
          url: "./icon/buscard.png",
          text: "公交卡"
        },
        {
          url: "./icon/bankcard.png",
          text: "银行卡"
        },
        {
          url: "./icon/other.png",
          text: "其它"
        }
      ],
      [{
          url: "./icon/bottle.png",
          text: "水杯"
        },
        {
          url: "./icon/umbrella.png",
          text: "雨伞"
        },
        {
          url: "./icon/fan.png",
          text: "小风扇"
        },
        {
          url: "./icon/key.png",
          text: "钥匙/钥匙扣"
        },
        {
          url: "./icon/other.png",
          text: "其它"
        }
      ],
      [{
          url: "./icon/phone.png",
          text: "手机"
        },
        {
          url: "./icon/camera.png",
          text: "相机"
        },
        {
          url: "./icon/disk.png",
          text: "U盘/硬盘"
        },
        {
          url: "./icon/elpower.png",
          text: "充电宝"
        },
        {
          url: "./icon/pad.png",
          text: "平板电脑"
        },
        {
          url: "./icon/mouse.png",
          text: "鼠标"
        },
        {
          url: "./icon/elline.png",
          text: "充电线"
        },
        {
          url: "./icon/headset.png",
          text: "耳机"
        },
        {
          url: "./icon/rack.png",
          text: "支架"
        },
        {
          url: "./icon/voicebox.png",
          text: "音箱"
        },
        {
          url: "./icon/mp3.png",
          text: "MP3"
        },
        {
          url: "./icon/other.png",
          text: "其它"
        }
      ],
      [{
          url: "./icon/lipstick.png",
          text: "口红"
        },
        {
          url: "./icon/fendi.png",
          text: "粉底"
        },
        {
          url: "./icon/meibi.png",
          text: "眉笔"
        },
        {
          url: "./icon/saihong.png",
          text: "腮红"
        },
        {
          url: "./icon/yanying.png",
          text: "眼影"
        },
        {
          url: "./icon/fangshai.png",
          text: "防晒"
        },
        {
          url: "./icon/penwu.png",
          text: "喷雾"
        },
        {
          url: "./icon/perfume.png",
          text: "香水"
        },
        {
          url: "./icon/other.png",
          text: "其它"
        }
      ],
      [{
          url: "./icon/clothesman.png",
          text: "男装"
        },
        {
          url: "./icon/clothwoman.png",
          text: "女装"
        },
        {
          url: "./icon/shoesman.png",
          text: "男鞋"
        },
        {
          url: "./icon/shoeswoman.png",
          text: "女鞋"
        },
        {
          url: "./icon/bag.png",
          text: "包包"
        },
        {
          url: "./icon/other.png",
          text: "其它"
        }
      ],
      [{
          url: "./icon/watch.png",
          text: "手表"
        },
        {
          url: "./icon/necklace.png",
          text: "项链"
        },
        {
          url: "./icon/bracelet.png",
          text: "手链"
        },
        {
          url: "./icon/ring.png",
          text: "戒指"
        },
        {
          url: "./icon/earlace.png",
          text: "耳饰"
        },
        {
          url: "./icon/glass.png",
          text: "眼镜"
        },
        {
          url: "./icon/hat.png",
          text: "帽子"
        },
        {
          url: "./icon/hair.png",
          text: "发饰"
        },
        {
          url: "./icon/other.png",
          text: "其它"
        }
      ],
      [{
          url: "./icon/book.png",
          text: "教材"
        },
        {
          url: "./icon/note.png",
          text: "笔记"
        },
        {
          url: "./icon/pen.png",
          text: "文具"
        },
        {
          url: "./icon/ball.png",
          text: "球/球拍"
        },
        {
          url: "./icon/huju.png",
          text: "护具"
        },
        {
          url: "./icon/line.png",
          text: "跳绳"
        },
        {
          url: "./icon/bicycle.png",
          text: "自行车"
        },
        {
          url: "./icon/poke.png",
          text: "棋牌"
        },
        {
          url: "./icon/other.png",
          text: "其它"
        }
      ],
      [{
          url: "./icon/yao.png",
          text: "药品"
        },
        {
          url: "./icon/snake.png",
          text: "零食"
        },
        {
          url: "./icon/other.png",
          text: "其它"
        }
      ]
    ],
    select: 0,
  },

  toSearch() {
    wx.navigateTo({
      url: '../search/search',
    })
  },

  toClassify(e) {
    const {
      text
    } = e.currentTarget.dataset;
    wx.navigateTo({
      url: `../classifyList/classifyList?text=${text}`,
    })
  },

  selectLeft(e) {
    const {
      index
    } = e.currentTarget.dataset;
    this.setData({
      select: index
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      login: wx.getStorageSync('login')
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        select: 1
      })
    }
    this.onLoad();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})