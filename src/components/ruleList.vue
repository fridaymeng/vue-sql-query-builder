<template>
  <template v-for="item in rules" :key="item.key">
    <div class="rules-wrap" v-if="item.condition">
      <div class="rules-header">
        <a-row type="flex">
          <a-col :span="12">
            <a-radio-group
              v-model:value="item['condition']"
              button-style="solid"
              @change="() => handleCondition(item['condition'])"
            >
              <a-radio-button value="and">And</a-radio-button>
              <a-radio-button value="or">Or</a-radio-button>
            </a-radio-group>
          </a-col>
          <a-col :span="12">
            <div class="ctl-wrap">
              <a-button type="primary" @click="() => handleAddRule(item.id)">Add Rule</a-button>
              <a-button type="primary" @click="() => handleAddGroup(item.id)">Add Group</a-button>
            </div>
          </a-col>
        </a-row>
      </div>
      <div class="rules-body">
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
                  <a-col :span="3">
                    <a-select
                      @change="() => handleIdChange(ruleItem.id, ruleItem.key)"
                      v-model:value="ruleItem.id"
                      class="select"
                    >
                      <a-select-option v-for="idItem in fields" :key="idItem.id">{{ idItem.name }}</a-select-option>
                    </a-select>
                  </a-col>
                  <a-col :span="2">
                    <a-select
                      @change="() => handleOperatorChange(ruleItem.operator, ruleItem.key)"
                      v-model:value="ruleItem.operator"
                      class="select"
                    >
                      <a-select-option v-for="operatorItem in operators" :key="operatorItem.id">{{ operatorItem.symbol }}</a-select-option>
                    </a-select>
                  </a-col>
                  <a-col :span="6" v-if="valueVisible[ruleItem.operator]">
                    <a-date-picker v-if="ruleItem.operateType === 'DatePicker'" v-model:value="ruleItem.value" />
                    <a-date-picker v-else-if="ruleItem.operateType === 'MonthPicker'" picker="month" v-model:value="ruleItem.value" />
                    <a-range-picker v-else-if="ruleItem.operateType === 'RangePicker'" v-model:value="ruleItem.value" />
                    <a-input-group compact v-else-if="ruleItem.operateType === 'Between'">
                      <a-input
                        v-model:value="ruleItem.value1"
                        style="width: 100px; text-align: center"
                        placeholder="Minimum"
                      />
                      <a-input
                        style="width: 30px; border-left: 0; pointer-events: none; background-color: #fff"
                        placeholder="~"
                        disabled
                      />
                      <a-input
                        v-model:value="ruleItem.value2"
                        style="width: 100px; text-align: center; border-left: 0"
                        placeholder="Maximum"
                      />
                    </a-input-group>
                    <a-input placeholder="" v-else v-model:value="ruleItem.value" />
                  </a-col>
                </a-row>
              </div>
            </template>
          </template>
          <rule-list
            :rules="item.rules"
            :fields="fields"
            :operators="operators"
            :valueVisible="valueVisible"
            @handleAddRule="handleAddRule"
            @handleIdChange="handleIdChange"
            @handleOperatorChange="handleOperatorChange"
            @handleAddGroup="handleAddGroup"
          >
          </rule-list>
        </div>
      </div>
    </div>
  </template>
</template>
<script>
export default {
  name: 'RuleList',
  data () {
    return {}
  },
  mounted () {
  },
  emits: ['handleAddRule', 'handleIdChange', 'handleOperatorChange', 'handleAddGroup'],
  methods: {
    handleAddRule (val) {
      this.$emit('handleAddRule', val)
    },
    handleAddGroup (val) {
      this.$emit('handleAddGroup', val)
    },
    handleCondition (val) {
      console.log(val)
    },
    handleIdChange (id, key) {
      this.$emit('handleIdChange', id, key)
    },
    handleOperatorChange (id, key) {
      this.$emit('handleOperatorChange', id, key)
    }
  },
  props: {
    valueVisible: {
      type: Object,
      default: () => {
        return {}
      }
    },
    rules: {
      type: Array,
      default: () => {
        return []
      }
    },
    fields: {
      type: Array,
      default: () => {
        return []
      }
    },
    operators: {
      type: Array,
      default: () => {
        return []
      }
    }
  }
}
</script>
<style lang="less" scoped>
.rules-wrap {
  position: relative;
  padding: 10px;
  padding-bottom: 6px;
  border: 1px solid #ddd;
  background: #f3f4f5;
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
      left: -16px;
      width: 15px;
      height: calc(50% + 4px);
      border-color: #d9d9d9;
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
  .rules-header {
    margin-bottom: 10px;
    overflow: hidden;
  }
  .select  {
    width: 100%;
  }
  .ctl-wrap {
    text-align: right;
    button {
      margin: 0 0 0 5px;
    }
  }
}
</style>
