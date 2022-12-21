import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'

// import getAntd from '@/plugins/index'
import {
  Avatar,
  Button,
  Card,
  Tabs,
  List,
  Input,
  Checkbox,
  // CheckboxGroup,
  Slider,
  Divider,
  Form,
  Space,
  Select,
  Spin,
  Menu,
  Dropdown,
  Rate,
  Progress,
  Drawer
} from 'ant-design-vue'

// 引入公共样式
// import '../public/assets/css/base.css'
// import '../public/assets/css/normalize.css'
import '@/assets/base.css'
import '@/assets/normalize.css'

const app = createApp(App)
// getAntd(app)

app
  .use(Avatar)
  .use(Button)
  .use(Card)
  .use(Drawer)
  .use(Dropdown)
  .use(Menu)
  .use(Form)
  .use(Tabs)
  .use(List)
  .use(Input)
  .use(Checkbox)
  .use(Rate)
  .use(Select)
  .use(Spin)
  .use(Slider)
  .use(Space)
  .use(Divider)
  .use(Progress)
  .use(createPinia())
  .use(router)
  .mount('#app')
