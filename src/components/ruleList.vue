<template>
  <div class="wrap">
    <div v-for="(item, index) in rules" :key="index">
      <div class="rules-group-container" v-if="item.condition">
        <div class="rules-group-header">
          <a-radio-group
            v-model:value="item['condition']"
            button-style="solid"
          >
            <a-radio-button value="and">And</a-radio-button>
            <a-radio-button value="or">Or</a-radio-button>
          </a-radio-group>
        </div>
        <div class="rules-group-body">
          <div class="rules-list">
            <template v-if="item.rules">
              <template
                class="rule-container"
                v-for="(ruleItem, ruleItemIndex) in item.rules"
                :key="ruleItemIndex"
              >
                <div
                  class="rule-container"
                  v-if="!ruleItem.condition"
                >
                  <a-row type="flex" :gutter="16">
                    <a-col :span="8">
                      <a-select
                        @change="handleChange"
                        v-model:value="ruleItem.id"
                        class="select"
                      >
                        <a-select-option v-for="idItem in fields" :key="idItem.id">{{ idItem.name }}</a-select-option>
                      </a-select>
                    </a-col>
                    <a-col :span="6">
                      <a-select
                        @change="handleOperatorChange"
                        v-model:value="ruleItem.operator"
                        class="select"
                      >
                        <a-select-option v-for="operatorItem in operators" :key="operatorItem.id">{{ operatorItem.symbol }}</a-select-option>
                      </a-select>
                    </a-col>
                    <a-col :span="10">
                      <a-input placeholder="" v-model:value="ruleItem.value" />
                    </a-col>
                  </a-row>
                </div>
              </template>
            </template>
          </div>
        </div>
      </div>
      <rule-list :rules="item.rules">
      </rule-list>
    </div>
  </div>
</template>
<script>
export default {
  name: 'RuleList',
  data () {
    return {
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
        { name: 'greater or equal', id: 10, symbol: 'greater or equal' }
      ]
    }
  },
  mounted () {
  },
  methods: {
    handleChange (val) {
      console.log(val)
    },
    handleOperatorChange (val) {
      console.log(val)
    }
  },
  props: {
    rules: {
      type: Array,
      default: () => {
        return []
      }
    }
  }
}
</script>
<style lang="less" scoped>
.wrap {
  .rules-group-container {
    position: relative;
    padding: 10px;
    padding-bottom: 6px;
    border: 1px solid #dcc896;
    background: rgba(250,240,210,.5);
    margin: 4px 0;
    border-radius: 5px;
    .rules-list {
      list-style: none;
      padding: 0 0 0 15px;
      margin: 0;
      & > :last-child::before {
        border-radius: 0 0 0 4px;
      }
      & > :first-child::before {
        top: -12px;
        height: calc(50% + 14px);
      }
      & > ::before {
        top: -4px;
        border-width: 0 0 2px 2px;
      }
      & > ::before,& > ::after {
        content: '';
        position: absolute;
        left: -10px;
        width: 10px;
        height: calc(50% + 4px);
        border-color: #ccc;
        border-style: solid;
      }
      & > ::after {
        top: 50%;
        border-width: 0 0 0 2px;
      }
      & > :last-child::after {
        display: none;
      }
      .rule-container {
        position: relative;
        margin: 4px 0;
        border-radius: 5px;
        padding: 5px;
        border: 1px solid #eee;
        background: rgba(255,255,255,.9);
      }
    }
    .rules-group-header {
      margin-bottom: 10px;
    }
    .select  {
      width: 100%;
    }
  }
}
</style>
