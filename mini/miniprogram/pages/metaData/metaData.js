// pages/collection/collection.js
import { ajax, formatTime } from '../../utils/index';
Page({

    /**
     * 页面的初始数据
     */
    data: {
        list: [],
        select: 0
    },

    getUpdate(e) {
        const info = e.detail;
        wx.navigateTo({
          url: `../publish/publish?info=${info}`,
        })
    },

    async getDelete(e) {
        const id = e.detail;
        const params = {
            _id: id
        };
        const { data } = await ajax('/deleteLose', 'POST', params);
        if (data === "success") {
            wx.showToast({
              title: '删除成功!',
              icon: 'none',
              success: () => {
                  this.onLoad();
              }
            })
        } else {
            wx.showToast({
              title: '删除失败!',
              icon: 'none'
            })
        }
    },

    toDetail(e) {
        const { info: { _id } } = e.currentTarget.dataset;
    
        wx.navigateTo({
          url: `../infoDetail/infoDetail?_id=${_id}`,
        })
      },

    /**
     * 生命周期函数--监听页面加载
     */
    async onLoad(options) {
        const { select } = this.data;
        const params = {
            openid: wx.getStorageSync('openid'),
            type: select
        };
        const result = await ajax('/getMyPublish', 'GET', params);
        const { data } = result;
        console.log(data);
        this.setData({
            list: data.map(item => {
                return {
                    ...item,
                    time: formatTime(item.time)
                }
            })
        })
    },
})