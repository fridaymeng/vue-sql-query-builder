<template>
  <div>
    <div class="wrap">
      <!--<div>
        <a-button style="margin: 0 0 0 5px;">Add Group</a-button>
      </div>-->
      <rule-list
        :rules="rules"
        @handleAddRule="handleAddRule"
      ></rule-list>
    </div>
  </div>
</template>
<script>
import RuleList from './components/ruleList.vue'
export default {
  data () {
    return {
      rules: [{
        condition: 'and',
        id: 0,
        rules: [{
          id: 3,
          operator: 1,
          value: 9
        }, {
          condition: 'or',
          id: 9,
          rules: [{
            id: 4,
            operator: 2,
            value: 'USA'
          }, {
            id: 5,
            operator: 3,
            value: '2022-9-5'
          }]
        }]
      }]
    }
  },
  mounted () {},
  methods: {
    findId (rules, id) {
      rules.forEach(item => {
        if (item.id === id) {
          item.rules.push({
            id: 3,
            operator: 1,
            value: Math.random() * 10000
          })
        }
        if (item.rules) this.findId(item.rules, id)
      })
    },
    handleAddRule (id) {
      this.findId(this.rules, id)
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