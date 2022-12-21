import {
  Button,
  Tabs,
  Form,
  Input,
  Checkbox,
  // CheckboxGroup,
  Slider,
  Divider
  // TabPane
} from 'ant-design-vue'

// import {
//   UnorderedListOutlined
// } from '@ant-design/icons-vue'

const plugins = [
  Button,
  Divider,
  Tabs,
  // TabPane,
  Form,
  Input,
  Checkbox,
  // CheckboxGroup,
  Slider,
  Divider
  // UnorderedListOutlined
]

export default function getAntd (app) {
  plugins.forEach(item => {
    return app.use(item)
  })
}
