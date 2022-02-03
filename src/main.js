import { createApp } from 'vue'
import App from './App.vue'
import router from './router/globalRouter'
import store from './store/globalStore'

import TheHeader from './layout/TheHeader'

const app = createApp(App)

app.component('TheHeader', TheHeader)

app
  .use(store)
  .use(router)
  .mount('#app')
