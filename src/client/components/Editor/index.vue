<template>
    <el-container class="editor">
        <el-header class="editor_label">
            <input type="text" v-model="documentStore.currentDocument.label" placeholder="在此键入标题">
        </el-header>
        <el-main class="editor_content">
            <div :id="editorId"></div>
        </el-main>
    </el-container>
</template>

<script setup lang="ts">
import "./index.scss"
import EditorJS, { OutputData } from '@editorjs/editorjs';
import Toolbar from './toolbar'
import Undo from 'editorjs-undo';
import DragDrop from 'editorjs-drag-drop';
import I18N from './I18N';
import { useDocumentStore } from '@c/store/document';
import { onMounted, ref } from "vue";

const documentStore = useDocumentStore()
const editorId = ref<string>("SparkEditor")
const editor = new EditorJS({
    holder: editorId.value,
    tools: Toolbar(editorId.value),
    i18n: I18N,
    placeholder: "在此键入内容...",
    autofocus: true,
    onReady: () => {
        new Undo({ editor });
        new DragDrop(editor);
    },
    async onChange(api, event) {
        documentStore.currentDocument.content = await api.saver.save()
    },
    data: documentStore.currentDocument.content as OutputData || undefined
});

onMounted(() => {
    documentStore.editor = editor
})
</script>