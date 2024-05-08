// pages/collection/collection.js
import {
    ajax,
    formatTime
} from '../../utils/index';

Page({

    /**
     * 页面的初始数据
     */
    data: {
        current: {},
        list: [],
    },

    toDetail(e) {
        const {
            info: {
                _id
            }
        } = e.currentTarget.dataset;

        wx.navigateTo({
            url: `../infoDetail/infoDetail?_id=${_id}`,
        })
    },




    async getSimilar(img1, img2) {
        const base = +((Math.random() * 5).toFixed(1)) + 45 // 基础相似度
        let image = 0
        let str1, str2 // 特征指纹

        // 处理图片1
        let res = await this.compressImage(img1)
        let info = await this.grayImage(res.imageData);
        str1 = this.HashFingerprint(info.imageData)

        // 处理图片2
        let res2 = await this.compressImage(img2)
        let info2 = await this.grayImage(res2.imageData);
        str2 = this.HashFingerprint(info2.imageData)
        // console.log(str1, str2);

        //计算汉明距离与相似度
        let hm = this.getHm(str1,str2);
        image = this.getSimilarity(str1.length,hm);
        console.log(image);
        return base + (image / 2)
    },
    // 1-压缩图片
    compressImage(imgSrc, imgWidth = 50) {
        return new Promise((resolve, reject) => {
            if (!imgSrc) {
                reject('imgSrc can not be empty!')
            }
            const query = wx.createSelectorQuery()
            query.select('#canvas1')
                .fields({
                    node: true,
                    size: true
                })
                .exec((res) => {
                    console.log(res);
                    const canvas = res[0].node
                    const ctx = canvas.getContext('2d')
                    const img = canvas.createImage()
                    img.crossOrigin = 'Anonymous'
                    img.src = imgSrc
                    img.onload = function () {
                        canvas.width = imgWidth
                        canvas.height = imgWidth
                        ctx.drawImage(img, 0, 0, imgWidth, imgWidth)
                        const imageData = ctx.getImageData(0, 0, imgWidth, imgWidth)
                        let info = {
                            dataUrl: canvas.toDataURL(),
                            imageData,
                        }
                        resolve(info)
                    }
                })
        })
    },
    // 2-灰度化
    grayImage(imageData) {
        let data = imageData.data;
        let len = imageData.data.length;
        let newData = new Array(len);
        for (let i = 0; i < len; i += 4) {
            const R = data[i];
            const G = data[i + 1];
            const B = data[i + 2];
            const grey = this.getGrayFromRGB(R, G, B);
            newData[i] = grey;
            newData[i + 1] = grey;
            newData[i + 2] = grey;
            newData[i + 3] = 255;
        }
        return this.createImageData(newData);
    },
    // 3-提取特征指纹
    HashFingerprint(imageData) {
        const grayList = imageData.data.reduce((pre, cur, index) => {
            if ((index + 1) % 4 === 0) {
                pre.push(imageData.data[index - 1])
            }
            return pre
        }, [])
        const length = grayList.length
        const grayAverage = grayList.reduce((pre, next) => (pre + next), 0) / length
        return grayList.map(gray => (gray >= grayAverage ? 1 : 0)).join('')
    },

    // 辅助函数-根据rgb值算出灰度值
    getGrayFromRGB(R, G, B) {
        let a = Math.pow(R, 2.2) + Math.pow(1.5 * G, 2.2) + Math.pow(0.6 * B, 2.2);
        let b = 1 + Math.pow(1.5, 2.2) + Math.pow(0.6, 2.2);
        return parseInt(Math.pow(a / b, 1 / 2.2))
    },
    // 辅助函数-根据rgba数组生成 imageData 和dataUrl
    createImageData(data) {
        return new Promise((resolve, reject) => {
            // console.log('----------', data);
            const query = wx.createSelectorQuery()
            let dataUrl, imageData
            query.select('#canvas2')
                .fields({
                    node: true,
                    size: true
                })
                .exec((res) => {
                    const canvas = res[0].node
                    canvas.width = 50
                    canvas.height = 50
                    const ctx = canvas.getContext('2d')
                    const imgWidth = Math.sqrt(data.length / 4)
                    const newImageData = ctx.createImageData(imgWidth, imgWidth)
                    for (let i = 0; i < data.length; i += 4) {
                        newImageData.data[i] = data[i]
                        newImageData.data[i + 1] = data[i + 1]
                        newImageData.data[i + 2] = data[i + 2]
                        newImageData.data[i + 3] = data[i + 3]
                    }
                    ctx.putImageData(newImageData, 0, 0);
                    dataUrl = canvas.toDataURL()
                    imageData = newImageData
                    resolve({
                        dataUrl,
                        imageData
                    })
                })
        })


    },


    //对比-汉明距离
    getHm(str1, str2) {
        let distance = 0;
        let len = str1.length;
        for (let i = 0; i < len; i++) {
            if (str1[i] != str2[i]) {
                distance++;
            }
        }
        return distance
    },
    //对比-相似度
    getSimilarity(strLen, hm) {
        return parseInt((strLen - hm) / strLen * 100)
    },

    /**
     * 生命周期函数--监听页面加载
     */
    async onLoad(options) {
        console.log(options);
        let curImage = JSON.parse(options.cur).imgList[0]
        let list = JSON.parse(options.list).map(async item => {
            let similar = await this.getSimilar(item.imgList[0], curImage)
            console.log(similar);
            return {
                ...item,
                similar 
            }
        })
        list = await Promise.all(list)
        console.log(list);
        this.setData({
            current: JSON.parse(options.cur),
            list
        })
        console.log(this.list);
    },
})