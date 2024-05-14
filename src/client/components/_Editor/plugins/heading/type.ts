interface HeaderData {
    text: string
    level: number
}

interface HeaderConfig {
    placeholder: string
    levels: number[]
    defaultLevel: number
}

interface level {
    number: number
    tag: string
    svg: string
}

export type {
    HeaderConfig,
    HeaderData,
    level
}