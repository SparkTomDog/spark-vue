import { defineStore } from 'pinia'

const useWebStore = defineStore("web", {
    state: () => ({
        contrinerPageAsideShow: true,
        contrinerPageAsideWidth: 300,
        createDataInputBoxShow: false
    }),
    actions: {
        /**
         * 切换内容页的侧边栏显示与隐藏
         */
        toggleContrinerPageAsideShow() {
            this.contrinerPageAsideShow = !this.contrinerPageAsideShow
        },
        /**
         * 设置内容页侧边栏的宽度
         * @param width number default 300
         * @param width default 300
         * @param width min 200
         */
        setContrinerPageAsideWidth(width: number) {
            this.contrinerPageAsideWidth = width
        },
        /**
         * 切换创建数据弹窗的显示或者隐藏
         */
        toggleCreateDataInputBoxShow() {
            this.createDataInputBoxShow = !this.createDataInputBoxShow
        }
    },
    persist: true
})

export {
    useWebStore
}