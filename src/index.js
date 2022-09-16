import 'ant-design-vue/dist/antd.less'
import "./less/index.less";
import { createApp } from 'vue'
// 从一个单文件组件中导入根组件
import App from './App.vue'
import { DatePicker, Button, Input, Row, Col, Select, Radio, Rate } from 'ant-design-vue';


class QueryBuilder {
  constructor (params = {}) {
    // this.handleDeleteNode = this.handleDeleteNode.bind(this);
  }
  init(params = {}) {
    const app = createApp(App, { params: params });
    app.use(DatePicker);
    app.use(Button);
    app.use(Input);
    app.use(Row);
    app.use(Col);
    app.use(Select);
    app.use(Radio);
    app.use(Rate);
    app.mount(`#${params.id}`)
  }
  reset () {}
}
export default QueryBuilder;