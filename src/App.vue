<template>
  <div>
    <div class="wrap">
      <rule-list
        :rules="rules"
        :fields="fields"
        :operators="operators"
        :valueVisible="valueVisible"
        @handleAddRule="handleAddRule"
        @handleIdChange="handleIdChange"
        @handleOperatorChange="handleOperatorChange"
        @handleAddGroup="handleAddGroup"
        @handleDelete="handleDelete"
      ></rule-list>
      <!--<pre>
        <code>
          {{ rules }}
        </code>
      </pre>-->
    </div>
  </div>
</template>
<script>
import RuleList from './components/ruleList.vue'
import uuid from './utils/uuid'
import random from './utils/random'
export default {
  data () {
    return {
      count: 0,
      valueVisible: {},
      rules: [{
        condition: 'AND',
        id: 0,
        key: uuid(),
        rules: [{
          id: 3,
          key: uuid(),
          operator: 1,
          value: 9
        }]
      }],
      fields: [
        { name: "ID", id: 119 },
        { name: "User", id: 2 },
        { name: "Age", id: 3 },
        { name: "Nation", id: 4 },
        { name: "Category", id: 8, type: "Category", categoryList: [1, 2, 3, 4, 5] },
        { name: "Rate", id: 9, type: "Rate" },
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
    this.init()
    this.operators.forEach(item => {
      this.valueVisible[item.id] = ![3, 4].includes(item.id)  
    })
  },
  watch: {
    rules: {
      handler (newV, oldV) {
        if (this.params.handleChange && this.count > 0) {
          this.params.handleChange(JSON.parse(JSON.stringify(this.rules)))
        }
        this.count++
      },
      deep: true
    }
  },
  methods: {
    init () {
      const { operators, fields, rules } = this.params
      if (operators) {
        this.operators = this.params.operators
      }
      if (fields) {
        this.fields = fields
      }
      if (rules) {
        this.rules = rules
        this.generateKey(this.rules)
      }
    },
    generateKey (rules) {
      rules.forEach(item => {
        item.key = uuid()
        if (item.rules) this.generateKey(item.rules)
      })
    },
    deleteRulesById (rules, key) {
      rules.forEach((item, itemIndex) => {
        if (item.key === key) {
          rules.splice(itemIndex, 1)
        }
        if (item.rules) this.deleteRulesById(item.rules, key)
      })
    },
    handleDelete (val) {
      this.deleteRulesById(this.rules, val)
    },
    addRulesById (rules, id) {
      rules.forEach(item => {
        if (item.id === id) {
          item.rules.push({
            id: this.fields[0].id,
            operator: this.operators[0].id,
            value: '',
            key: uuid()
          })
        }
        if (item.rules) this.addRulesById(item.rules, id)
      })
    },
    addGroupById (rules, id) {
      rules.forEach(item => {
        if (item.id === id) {
          item.rules.push({
            condition: 'OR',
            id: random(),
            key: uuid(),
            rules: [{
              id: this.fields[0].id,
              key: uuid(),
              operator: this.operators[0].id,
              value: ''
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
          if (['RangePicker'].includes(type)) {
            item.value = [undefined, undefined]
          } else if (['Category'].includes(type)) {
            item.value = ''
            item.categoryList = this.fields.find(item => item.type === 'Category')['categoryList']
          } else {
            item.value = ''
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
      this.operatorChange(this.rules, key, rst.id)
    },
    handleAddRule (id) {
      this.addRulesById(this.rules, id)
    }
  },
  props: {
    params: {
      type: Object,
      default: () => {
        return {}
      }
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