<template>
  <div>
    <div class="wrap">
      <!--<div>
        <a-button style="margin: 0 0 0 5px;">Add Group</a-button>
      </div>-->
      <rule-list
        :rules="rules"
        :fields="fields"
        :operators="operators"
        :valueVisible="valueVisible"
        @handleAddRule="handleAddRule"
        @handleIdChange="handleIdChange"
        @handleOperatorChange="handleOperatorChange"
        @handleAddGroup="handleAddGroup"
      ></rule-list>
    </div>
  </div>
</template>
<script>
import RuleList from './components/ruleList.vue'
import uuid from './utils/uuid'
export default {
  data () {
    return {
      valueVisible: {},
      rules: [{
        condition: 'and',
        id: 0,
        key: uuid(),
        rules: [{
          id: 3,
          key: uuid(),
          operator: 1,
          value: 9
        }, {
          condition: 'or',
          id: 9,
          key: uuid(),
          rules: [{
            id: 4,
            key: uuid(),
            operator: 2,
            value: 'USA'
          }, {
            id: 119,
            key: uuid(),
            operator: 3,
            value: '2022-9-5'
          }]
        }]
      }],
      fields: [
        { name: "ID", id: 119 },
        { name: "User", id: 2 },
        {
          name: "Age",
          id: 3,
          type: "SelectList"
        },
        { name: "Nation", id: 4 },
        { name: "Date Picker", id: 5, type: "DatePicker" },
        { name: "Month Picker", id: 6, type: "MonthPicker" },
        { name: "Range Picker", id: 7, type: "RangePicker" }
      ],
      operators: [
        { name: 'equal', id: 1, symbol: '=' },
        { name: 'not equal', id: 2, symbol: '!=' },
        { name: 'is not null', id: 3, symbol: 'is not null' },
        { name: 'is null', id: 4, symbol: 'is null' },
        { name: 'in', id: 5, symbol: 'in' },
        { name: 'not in', id: 6, symbol: 'not in' },
        { name: 'less', id: 7, symbol: 'less' },
        { name: 'less or equal', id: 8, symbol: 'less or equal' },
        { name: 'greater', id: 9, symbol: 'greater' },
        { name: 'greater or equal', id: 10, symbol: 'greater or equal' },
        { name: 'between', id: 11, symbol: 'between' },
        { name: 'not between', id: 12, symbol: 'not between' }
      ]
    }
  },
  mounted () {
    this.operators.forEach(item => {
      this.valueVisible[item.id] = ![3, 4].includes(item.id)  
    })
  },
  methods: {
    addRulesById (rules, id) {
      rules.forEach(item => {
        if (item.id === id) {
          item.rules.push({
            id: 119,
            operator: 1,
            value: uuid()
          })
        }
        if (item.rules) this.addRulesById(item.rules, id)
      })
    },
    addGroupById (rules, id) {
      rules.forEach(item => {
        if (item.id === id) {
          item.rules.push({
            condition: 'or',
            id: Number.parseInt(Math.random() * 100000),
            key: uuid(),
            rules: [{
              id: 4,
              key: uuid(),
              operator: 2,
              value: 'USA'
            }]
          })
        }
        if (item.rules) this.addGroupById(item.rules, id)
      })
    },
    handleAddGroup (id) {
      this.addGroupById(this.rules, id)
    },
    idChange (rules, key, type) {
      rules.forEach(item => {
        if (item.key === key) {
          if (['DatePicker', 'MonthPicker'].includes(type)) {
             item.value = ''
          } else if (['RangePicker'].includes(type)) {
             item.value = ['', '']
          }
          item.operateType = type
        }
        if (item.rules) this.idChange(item.rules, key, type)
      })
    },
    handleIdChange (id, key) {
      const { type } = this.fields.find(item => item.id === id)
      this.idChange(this.rules, key, type)
    },
    operatorChange (rules, key, operatorId) {
      rules.forEach(item => {
        if (item.key === key) {
          if ([11, 12].includes(operatorId)) {
             item.operateType = 'Between'
          }
        }
        if (item.rules) this.operatorChange(item.rules, key, operatorId)
      })
    },
    handleOperatorChange (id, key) {
      const rst = this.operators.find(item => item.id === id)
      console.log(rst)
      this.operatorChange(this.rules, key, rst.id)
    },
    handleAddRule (id) {
      this.addRulesById(this.rules, id)
    }
  },
  components: {
    RuleList
  }
}
</script>
<style lang="less" scoped>
.wrap {
  padding: 15px;
  background: #fff;
}
</style>