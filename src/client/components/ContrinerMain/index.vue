<template>
    <el-container id="ContrinerMain">
        <el-header id="ContrinerMainHeader">
            <span class="icon_btn_30" @click="webStore.toggleContrinerPageAsideShow()">
                <font-awesome-icon icon="bars" />
            </span>
            <span class="icon_btn_30">
                <font-awesome-icon icon="magnifying-glass" />
            </span>
            <span id="ContrinerMainHeaderLabel">
                <input type="text" placeholder="在此键入标题" v-model="documentStore.currentData.label">
            </span>
        </el-header>
        <el-main id="ContrinerMainBox">
            <Editor />
        </el-main>
    </el-container>
</template>

<script setup lang="ts">
import { useDocumentStore } from '@c/store/document';
import { useWebStore } from '@c/store/web';
import Editor from '@c/components/Vditor/index.vue'

const webStore = useWebStore()
const documentStore = useDocumentStore()
</script>