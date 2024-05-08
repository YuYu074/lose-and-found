import { formatTime } from '../../utils/index'

Component({
    properties: {
        data: Object,
        handle: Boolean,
        similar: Number,
        showsimilar: Boolean
    },
    data: {
        time: '',
    },
    methods: {
        toDelete(e) {
            const { id } = e.currentTarget.dataset;
            this.triggerEvent('getdelete', id);
        },
        toUpdate(e) {
            const { info } = e.currentTarget.dataset;
            this.triggerEvent('getupdate', JSON.stringify(info));
        },
    },
    lifetimes: {
        ready() {
            let atime = this.properties.data.time
            this.setData({
                time: typeof atime === 'number' ? formatTime(atime) : atime,            })
        }
    }
})