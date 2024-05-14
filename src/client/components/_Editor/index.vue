<template>
    <el-container class="editor">
        <el-header class="editor_label">
            <input type="text" v-model="data.label" placeholder="在此键入标题">
        </el-header>
        <el-main class="editor_content">
            <div :id="data.id"></div>
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
import { BaseDataType } from "@t/types";

const props = defineProps<{
    data: BaseDataType
}>()
const data = ref<BaseDataType>(props.data)
const documentStore = useDocumentStore()
const editor = new EditorJS({
    holder: data.value.id,
    tools: Toolbar(data.value.id as string),
    i18n: I18N,
    placeholder: "在此键入内容...",
    autofocus: true,
    onReady: () => {
        new Undo({ editor });
        new DragDrop(editor);
    },
    async onChange(api, event) {
        data.value.content = await api.saver.save()
    },
    data: data.value.content as OutputData || null
});
</script>