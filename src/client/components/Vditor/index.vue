<template>
    <div id="SparkEditor"></div>
</template>

<script setup lang="ts">
import Vditor from 'vditor'
import "vditor/dist/index.css"
import { onMounted, ref } from 'vue';
import Toolbar from './toolbar'
import { useDocumentStore } from '@c/store/document';

const editor = ref<Vditor>()
const documentStore = useDocumentStore()

onMounted(() => {
    editor.value = new Vditor("SparkEditor", {
        // cdn: "http://localhost:3000/vditor",
        width: "100%",
        height: "100%",
        tab: "\t",
        mode: "ir",
        toolbar: Toolbar,
        toolbarConfig: {
            hide: false,
            pin: true
        },
        counter: {
            enable: true
        },
        outline: {
            enable: false,
            position: "left"
        },
        cache: {
            enable: false
        },
        input(_value) {
            documentStore.currentData.content = _value
        },
        value: documentStore.currentData.content
    })

    documentStore.editor = editor.value
})
</script>