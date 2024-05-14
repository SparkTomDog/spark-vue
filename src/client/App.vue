<template>
    <el-container id="Contriner">
        <ContrinerAside />
        <el-main>
            <ContrinerMain />
        </el-main>
    </el-container>
</template>

<script setup lang="ts">
import ContrinerAside from '@c/components/ContrinerAside/index.vue'
import ContrinerMain from '@c/components/ContrinerMain/index.vue'
import { onMounted } from 'vue';
import { useDocumentStore } from './store/document';

const documentStore = useDocumentStore()

onMounted(async () => {
    await documentStore.getDocuments()
})
</script>