<template>
    <el-container>
        <el-header>
            <el-input v-model="filterText" placeholder="在此搜索..." class="tree_search" />
            <span class="icon_btn_30" @click="webStore.toggleCreateDataInputBoxShow">
                <font-awesome-icon icon="file-circle-plus" />
            </span>
        </el-header>
        <el-main>
            <el-tree ref="treeRef" :data="documentStore.datas" :props="defaultProps" :expand-on-click-node="false" :filter-node-method="filterNode" default-expand-all>
                <template #default="{ node, data }">
                    <span class="tree_data" @contextmenu="onContextMenu($event, data)">
                        <span class="tree_data_icon" v-if="data.type == 'folder'">
                            <font-awesome-icon v-if="node.expanded" icon="folder-open" />
                            <font-awesome-icon v-else icon="folder" />
                        </span>
                        <span class="tree_data_icon" v-else>
                            <font-awesome-icon icon="file" />
                        </span>
                        <span class="tree_data_label" @click="setCurrentData(data)">{{ node.label }}</span>
                    </span>
                </template>
            </el-tree>
        </el-main>
    </el-container>

    <el-dialog v-model="webStore.createDataInputBoxShow" title="添加" @close="dialogClose">
        <el-form :model="createData" label-width="auto" label-position="top" :rules="rules" ref="ruleFormRef">
            <el-form-item :label="showLabel" prop="label">
                <el-input v-model="createData.label" placeholder="输入标题" />
            </el-form-item>
            <el-form-item label="创建类型">
                <el-select v-model="createData.type" placeholder="Select">
                    <el-option label="文档" value="file" />
                    <el-option label="分类" value="folder" />
                </el-select>
            </el-form-item>
            <el-form-item label="选择分类" v-if="createData.type == 'file'" prop="parentId">
                <el-select v-model="createData.parentId" placeholder="选择分类">
                    <el-option v-for="item in documentStore.categoryList" :label="item.label"
                        :value="(item.id as string)" />
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button @click="createDocumentOrCategory((ruleFormRef))">
                    创建{{ createData.type == "file" ? "文档" : "分类" }}
                    <el-text type="warning" tag="ins">
                        {{ createData.label }}
                    </el-text>
                </el-button>
            </el-form-item>
        </el-form>
    </el-dialog>

    <el-dialog v-model="deleteDialogVisible" title="删除" width="500">
        <span>是否删除{{ currentData?.type == "file" ? "文档" : "分类" }}{{ currentData?.label }}</span>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="deleteDialogVisible = false">取消</el-button>
                <el-button type="primary" @click="deleteData">
                    删除
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import { computed, reactive, ref, watch } from "vue";
import { ElTree, FormInstance, FormRules } from "element-plus";
import { useDocumentStore } from "@c/store/document";
import { BaseDataType } from "@t/types";
import { useWebStore } from "@c/store/web";
import ContextMenu from '@imengyu/vue3-context-menu'

interface Tree {
    [key: string]: any;
}

interface RuleForm {
    label: string
    parentId: string
}

const documentStore = useDocumentStore();
const webStore = useWebStore();
const filterText = ref("");
const treeRef = ref<InstanceType<typeof ElTree>>();
const showLabel = computed(() => {
    return `${createData.value.type == "file" ? "文档" : "分类"}标题`
})
const createData = ref<{
    label: string
    type: string
    parentId?: string
}>({
    label: "",
    type: "folder",
    parentId: ""
})
const currentData = ref<BaseDataType>()
const ruleFormRef = ref<FormInstance>()
const deleteDialogVisible = ref<boolean>(false)
const defaultProps = {
    children: "documents",
    label: "label",
};

const rules = reactive<FormRules<RuleForm>>({
    label: [
        {
            required: true, message: `请输入${createData.value.type == "file" ? "文档" : "分类"}标题`, trigger: 'blur'
        }
    ],
    parentId: [
        {
            required: true,
            message: '请选择分类',
            trigger: 'blur',
        }
    ]
})

watch(filterText, (val) => {
    treeRef.value!.filter(val);
});

/**
 * 添加数据弹窗关闭事件,init 数据
*/
const dialogClose = () => {
    createData.value.label = ""
    createData.value.type = "folder"
    createData.value.parentId = ""
    webStore.createDataInputBoxShow = false
}

/**
 * 搜索树状数据
*/
const filterNode = (value: string, data: Tree) => {
    if (!value) return true;
    return data.label.includes(value);
};

/**
 * 设置当前编辑的数据
*/
const setCurrentData = async (data: BaseDataType) => {
    if (data.type == "file") {
        await documentStore.saveDocumentActive();
        await documentStore.setCurrentDocument(data);
    } else {
        documentStore.currentCategory = data;
    }
};

/**
 * 创建文档或者分类方法
*/
const createDocumentOrCategory = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate(async (valid, fields) => {
        if (valid) {
            const data = createData.value
            if (data.type == "folder") {
                delete (data.parentId)
            }
            await documentStore.createData(data);
        }
    })
};

/**
 * 删除数据方法
*/
const deleteData = async () => {
    deleteDialogVisible.value = false
    await documentStore.deleteData(currentData.value!)
}

/**
 * 右键菜单
*/
const onContextMenu = (e: MouseEvent, data: BaseDataType) => {
    e.preventDefault();
    currentData.value = data
    ContextMenu.showContextMenu({
        x: e.x + 10,
        y: e.y + 10,
        theme: "flat",
        items: [
            {
                label: "删除",
                onClick() {
                    deleteDialogVisible.value = true
                }
            },
            {
                label: "添加",
                onClick() {
                    if(data.type == "file") {
                        createData.value.parentId = data.parentId
                        createData.value.type = "file"
                    }
                    webStore.toggleCreateDataInputBoxShow()
                }
            }
        ]
    });
}
</script>
