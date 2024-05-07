<template>
    <el-container id="Contriner">
        <el-aside :width="`${webStore.contrinerPageAsideWidth}px`" id="ContrinerAside" v-show="webStore.contrinerPageAsideShow">
            <Aside />
        </el-aside>
        <el-container id="ContrinerMain">
            <el-header>
                <Header />
            </el-header>
            <el-main>
                <Editor v-if="documentStore.editorKey" />
            </el-main>
        </el-container>
    </el-container>
</template>

<script setup lang="ts">
import Editor from '@c/components/Editor/index.vue'
import { useDocumentStore } from '@c/store/document';
import Header from './header.vue'
import { useWebStore } from '@c/store/web';
import { onMounted } from 'vue';
import Aside from './aside.vue'

const documentStore = useDocumentStore()
const webStore = useWebStore()

const shortcutKey = () => {
    const contriner = document.getElementById("Contriner")
    contriner?.addEventListener("keydown", async (e) => {
        if(e.altKey && e.key == "s") {
            await documentStore.saveDocument()
        }
        if(e.altKey && e.key == "b") {
            webStore.toggleContrinerPageAsideShow()
        }
    })
}

onMounted(async () => {
    await documentStore.getTreeData()
    shortcutKey()
})
</script>