import { createApp } from 'vue'
import Antd from 'ant-design-vue';
import JsonViewer from 'vue-json-viewer'
import 'vue-json-viewer/style.css'
import './style.css'
import 'ant-design-vue/dist/reset.css';
import App from './App.vue'
import router from './router'

const app = createApp(App);

app.use(JsonViewer)
app.use(Antd)
app.use(router)

app.mount('#app')
