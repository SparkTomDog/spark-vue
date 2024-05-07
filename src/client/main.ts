import { createApp } from "vue";
import App from "./App.vue";
import { router } from './router/index'
import '@imengyu/vue3-context-menu/lib/vue3-context-menu.css'
import 'element-plus/dist/index.css'
import "./assets/index.scss"
import { indexStore } from "./store";
import { FontAwesomeIcon } from "./plugins/fortawesome";
import ContextMenu from '@imengyu/vue3-context-menu'

const app = createApp(App)
app.component("font-awesome-icon", FontAwesomeIcon)
app.use(indexStore)
app.use(router)
app.use(ContextMenu)  
app.mount("#app");
