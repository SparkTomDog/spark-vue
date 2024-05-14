import { BaseDataType } from "@t/types"
import { instance } from "./http"

const createDataApi = async(data: BaseDataType) => {
    return await instance.post("/data/create", data)
}

const updateDataApi = async(data: BaseDataType) => {
    return await instance.post("/data/update", data)
}

const deleteDataApi = async(id: string) => {
    return await instance.post("/data/delete", { id })
}

const getDocumentsApi = async() => {
    return await instance.post("/data/get")
}

export {
    createDataApi,
    updateDataApi,
    deleteDataApi,
    getDocumentsApi
}