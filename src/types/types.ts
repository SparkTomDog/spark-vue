import { OutputData } from "@editorjs/editorjs"

export interface BaseDataType {
    id?: string
    label?: string
    content?: OutputData | null | string
    type?: string
    [x: string]: any
}