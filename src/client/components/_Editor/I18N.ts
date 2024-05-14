import { I18nConfig } from "@editorjs/editorjs";

export default {
    messages: {
        ui: {
            blockTunes: {
                toggler: {
                    "Click to tune": "点击调整",
                    "or drag to move": "拖拽移动"
                }
            },
            inlineToolbar: {
                converter: {
                    "Convert to": "转换为"
                }
            },
            toolbar: {
                toolbox: {
                    "Add": "添加",
                }
            }
        },
        toolNames: {
            "Text": "文本",
            "Heading": "标题",
            "List": "列表",
            "Quote": "引用",
            "Delimiter": "分隔符",
            "Checklist": "任务",
            "Table": "表格",
            "CodeMirror": "代码块",
            "Tooltip": "提示",
            "Underline": "删除线",
            "Color": "前景色",
            "Marker": "背景色",
            "Bold": "加粗",
            "InlineCode": "行内代码",
            "Italic": "斜体",
            "Link": "链接",
        },
        blockTunes: {
            delete: {
                "Delete": "删除",
                "Click to delete": "点击确认删除"
            },
            moveUp: {
                "Move up": "向上移动"
            },
            moveDown: {
                "Move down": "向下移动"
            }
        },
        tools: {
            "quote": {
                "Align Left": "左对齐",
                "Align Center": "中心对齐",
                "Enter a quote": "输入引用文本"
            },
            "list": {
                "Ordered": "有序列表",
                "Unordered": "无序列表"
            },
            "table": {
                "With headings": "包含标题",
                "Without headings": "不含标题",
                "Add column to left": "在左侧添加列",
                "Add column to right": "在右侧添加列",
                "Delete column": "删除此列",
                "Add row above": "在上方添加行",
                "Add row below": "在下方添加行",
                "Delete row": "删除行"
            }
        }
    }
} as I18nConfig 