<template>
    <span id="CategoryInfo">
        <el-space wrap :size="30">
            <el-card style="width: 480px" v-if="currentData?.label" v-for="item in currentData.documents">
                <h1 @click="toDataInfo(item)" style="text-align: center;cursor: pointer;">
                    {{  item.label  }}
                </h1>
            </el-card>
        </el-space>
    </span>
</template>

<script setup lang="ts">
import { useDocumentStore } from '@c/store/document';
import { BaseDataType } from '@t/types';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute()
const router = useRouter()
const documentStore = useDocumentStore()
const currentData = ref<BaseDataType>()

const toDataInfo = (data: BaseDataType) => {
    documentStore.setCurrentDocument(data)
    router.push({
        name: "Contriner"
    })
}

onMounted(async () => {
    currentData.value = await documentStore.getCategoryInfo(route.params.id as string)
})
</script>