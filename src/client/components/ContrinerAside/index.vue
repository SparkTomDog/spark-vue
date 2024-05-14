<template>
    <el-aside id="ContrinerAside" :width="`${webStore.contrinerPageAsideWidth}px`" v-show="webStore.contrinerPageAsideShow">
        <DocumentList />
        <span id="ContrinerAsideSop"></span>
        <span id="ContrinerAsideAdd">
            <el-button plain @click="toCreateDocument">Add</el-button>
        </span>
    </el-aside>
</template>

<script setup lang="ts">
import { useWebStore } from '@c/store/web';
import DocumentList from './DocumentList.vue'
import { useDocumentStore } from '@c/store/document';

const webStore = useWebStore()
const documentStore = useDocumentStore()

const toCreateDocument = async () => {
    await documentStore.createDocument({
        label: "未命名1",
        content: "# 这是未命名文档1"
    })
}
</script>