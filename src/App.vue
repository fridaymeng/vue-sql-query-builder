<template>
  <div>
    <div class="wrap">
      <!--<div>
        <a-button @click="handleAdd">Add Rule</a-button>
        <a-button style="margin: 0 0 0 5px;">Add Group</a-button>
      </div>-->
      <rule-list
        :rules="rules"
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
        rules: [{
          id: 3,
          operator: 1,
          value: 10.25
        }, {
          condition: 'or',
          rules: [{
            id: 4,
            operator: 2,
            value: 2
          }, {
            id: 5,
            operator: 3,
            value: 1
          }]
        }]
      }]
    }
  },
  mounted () {
  },
  methods: {
    handleAdd () {
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