export interface BaseDataType {
    id?: string
    label: string
    content: string | undefined
    [x: string]: any
}