import { createDataApi, getDocumentsApi, updateDataApi } from '@c/api/dataApi';
import { BaseDataType } from '@t/types';
import { defineStore } from "pinia"
import Vditor from 'vditor';

const useDocumentStore = defineStore("document", {
    state: () => ({
        datas: [] as BaseDataType[],
        currentData: {} as BaseDataType,
        editor: {} as Vditor
    }),
    getters: {},
    actions: {
        /**
         * 设置当前编辑的文档
         * @param data 
         */
        setCurrentData(data: BaseDataType) {
            this.currentData = data
            this.editor.setValue(this.currentData.content as string)
        },
        /**
         * 获取树形数据
         */
        async getDocuments() {
            const res = await getDocumentsApi()
            this.datas = res.data.data
        },
        /**
         * 创建文档
         * @param data 
         */
        async createDocument(data: BaseDataType) {
            const res = await createDataApi(data)
            if(res.data.code === 200) {
                this.setCurrentData(res.data.data)
                await this.getDocuments()
            }
        },
        /**
         * 更新文档
         * @param data 
         */
        async updateDocument(data: BaseDataType) {
            await updateDataApi(data)
            await this.getDocuments()
        }
    },
    persist: true
})

export {
    useDocumentStore
}