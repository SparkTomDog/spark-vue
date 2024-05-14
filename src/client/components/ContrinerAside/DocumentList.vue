<template>
    <ul id="DocumentList">
        <li v-for="item in documentStore.datas">
            <span class="icon_btn_30 list_icon">
                <font-awesome-icon icon="file" />
            </span>
            <span class="list_label" @click="toCurrentData(item)">
                {{ item.label }}
            </span>
        </li>
    </ul>
</template>

<script setup lang="ts">
import { useDocumentStore } from '@c/store/document';
import { BaseDataType } from '@t/types';

const documentStore = useDocumentStore()

const toCurrentData = async (item: BaseDataType) => {
    if(documentStore.currentData.id) {
        await documentStore.updateDocument(documentStore.currentData)
    }
    documentStore.setCurrentData(item)
}
</script>