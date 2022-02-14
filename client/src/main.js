import { createApp } from 'vue'
import App from './App.vue'

import '../public/reset.css'
import axios from 'axios'

import router from './router/globalRouter'
import store from './store/globalStore'

import BaseWrapper from './components/UI/BaseWrapper'
import BaseInput from './components/UI/BaseInput'
import BaseButton from './components/UI/BaseButton'
import BaseBadge from './components/UI/BaseBadge'
import TheHeader from './layout/TheHeader'
import Spinner from './components/UI/Spinner'

const app = createApp(App)

app.component('TheHeader', TheHeader)
app.component('BaseWrapper', BaseWrapper)
app.component('BaseButton', BaseButton)
app.component('BaseBadge', BaseBadge)
app.component('BaseInput', BaseInput)
app.component('Spinner', Spinner)

app
  .use(store)
  .use(router)
  .mount('#app')
