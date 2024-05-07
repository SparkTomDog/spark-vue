import { createDataApi, deleteDataApi, getCategoryInfoApi, getDatasInfoApi, getTreeDatasApi, updateDataApi } from '@c/api/dataApi';
import { BaseDataType } from '@t/types';
import { ElNotification } from 'element-plus';
import { defineStore } from "pinia"
import { nextTick } from 'vue';

const useDocumentStore = defineStore("document", {
    state: () => ({
        currentDocument: {} as BaseDataType || undefined,
        currentCategory: {} as BaseDataType,
        editorKey: true,
        editor: {} as any,
        datas: [] as BaseDataType[]
    }),
    getters: {
        categoryList(state) {
            return state.datas.filter(item => {
                return item.type == "folder"
            })
        }
    },
    actions: {
        /**
         * 设置当前编辑文档并刷新编辑器
         * @param data 
         */
        async setCurrentDocument(data: BaseDataType) {
            const res = await this.getDataInfo(data.id as string)
            this.currentDocument = {
                ...res,
                content: JSON.parse(res.content)
            }
            this.editorKey = false
            nextTick(() => {
                this.editorKey = true
            })
        },
        /**
         * 保存文档,并返回更新内容
         */
        async saveDocumentActive() {
            const res = await updateDataApi({
                ...this.currentDocument,
                content: JSON.stringify(this.currentDocument.content)
            })

            return res.data.data
        },
        /**
         * 保存文档
         */
        async saveDocument() {
            const res = await this.saveDocumentActive()
            this.currentDocument = {}
            await this.getTreeData().then(async () => {
                await this.setCurrentDocument(res)
            })
        },
        /**
         * 获取全部树形数据
         */
        async getTreeData() {
            const res = await getTreeDatasApi()
            this.datas = res.data.data
        },
        /**
         * 获取文档信息(包含分类数据)
         * @param id 
         * @returns 
         */
        async getDataInfo(id: string) {
            const res = await getDatasInfoApi(id)
            return res.data.data
        },
        /**
         * 创建文档或者分类
         * @param data 
         */
        async createData(data: BaseDataType) {
            if (data.type == "file" && data.parentId == "") {
                data.parentId = this.currentCategory.id
            }
            const res = await createDataApi(data)
            if (res.data.code == 200) {
                this.setCurrentDocument(res.data.data)
            }
            await this.getTreeData()
        },
        /**
         * 删除数据
         * @param data 
         */
        async deleteData(data: BaseDataType) {
            if (data.documents && data.documents.length > 0) {
                ElNotification({
                    title: 'Error',
                    message: "有文档,无法删除",
                    type: 'error',
                })
            } else {
                const res = await deleteDataApi(data.id as string)
                if (res.data.code == 200) {
                    await this.getTreeData()
                }
                console.log(res.data.data)
            }
        },
        async getCategoryInfo(id: string) {
            const res = await getCategoryInfoApi(id)
            return res.data.data
        }
    },
    persist: true
})

export {
    useDocumentStore
}