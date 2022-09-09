# vue-sql-query-builder

![image](assets/img/thumbnail.png)

## For vue-sql-query-builder.

### How to use

```bash
yarn add vue-sql-query-builder
```
OR
```bash
npm install vue-sql-query-builder
```

### Demo
```bash
yarn start
```

### Init
```js
import * as queryBuilder from "vue-sql-query-builder";
const queryBuilder = new QueryBuilder();
const rules = [{
  condition: 'AND',
  id: 0,
  rules: [{
    id: 3,
    operator: 1,
    value: 9
  }, {
    condition: 'OR',
    id: 9,
    rules: [{
      id: 4,
      operator: 2,
      value: 'JAPAN'
    }]
  }]
}];
const fields = [
  { name: "ID", id: 1 },
  { name: "User", id: 2 },
  { name: "Age", id: 3 },
  { name: "Nation", id: 4 },
  { name: "Category", id: 8, type: "Category", categoryList: [1, 2, 3, 4, 5] },
  { name: "Rate", id: 9, type: "Rate" },
  { name: "Date Picker", id: 5, type: "DatePicker" },
  { name: "Month Picker", id: 6, type: "MonthPicker" },
  { name: "Range Picker", id: 7, type: "RangePicker" }
];
const operators = [
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
];
queryBuilder.init({
  rules,
  fields,
  operators,
  id: "wrap",
  handleChange: (rules) => {
    // console.log(rules)
  }
})
```