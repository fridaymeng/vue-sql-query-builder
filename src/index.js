import 'ant-design-vue/dist/antd.less'
import "./less/index.less";

import { createApp } from 'vue'
// 从一个单文件组件中导入根组件
import App from './App.vue'

const app = createApp(App);

import { DatePicker, Button, Input, Row, Col, Select, Radio } from 'ant-design-vue';
app.use(DatePicker);
app.use(Button);
app.use(Input);
app.use(Row);
app.use(Col);
app.use(Select);
app.use(Radio);

class QueryBuilder {
  constructor (params = {}) {
    // this.handleDeleteNode = this.handleDeleteNode.bind(this);
  }
  init(params = {}) {
    app.mount(`#${params.id}`)
  }
  reset () {}
}
export {
  QueryBuilder
}