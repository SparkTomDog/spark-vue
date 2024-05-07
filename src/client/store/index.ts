import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const indexStore = createPinia()
indexStore.use(piniaPluginPersistedstate)

export {
    indexStore
}