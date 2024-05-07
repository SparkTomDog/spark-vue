<template>
    <span class="aside_btn">
        <span class="icon_btn_30" @click="webStore.toggleContrinerPageAsideShow">
            <font-awesome-icon icon="angles-left" v-if="webStore.contrinerPageAsideShow" />
            <font-awesome-icon icon="angles-right" v-else />
        </span>
    </span>
    <span class="document_path" v-if="documentStore.currentDocument.label">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item v-if="documentStore.currentDocument.parent && documentStore.currentDocument.parent.label" :to="{
                path: `/category_info/${documentStore.currentDocument.parentId}`
            }">
                {{documentStore.currentDocument.parent.label}}
            </el-breadcrumb-item>
            <el-breadcrumb-item>{{documentStore.currentDocument.label}}</el-breadcrumb-item>
        </el-breadcrumb>
    </span>
</template>

<script setup lang="ts">
import { useDocumentStore } from '@c/store/document';
import { useWebStore } from '@c/store/web';

const webStore = useWebStore()
const documentStore = useDocumentStore()
</script>