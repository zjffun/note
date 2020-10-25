---
updated: 'Wed, 10 Apr 2019 10:50:42 GMT'
date: 'Wed, 10 Apr 2019 10:50:42 GMT'
---

# 原则

受控组件（用户输入 ---> state 更新 ---> 组件更新）的消耗明显比非受控组件大的多，但非受控组件只能在需求非常简单的情况下的使用。

| 特性                                                                                 | uncontrolled | 受控组件 |
| ---------------------------------------------------------------------------------- | ------------ | ---- |
| 只用一次（例如：只在提交时使用）                                                                   | ✅            | ✅    |
| [提交时验证](https://goshakkk.name/submit-time-validation-react/)                       | ✅            | ✅    |
| [立即验证](https://goshakkk.name/instant-form-fields-validation-react/)                | ❌            | ✅    |
| [根据表单填写情况动态禁用提交按钮](https://goshakkk.name/form-recipe-disable-submit-button-react/) | ❌            | ✅    |
| 固定输入格式                                                                             | ❌            | ✅    |
| 多个输入确定一个值                                                                          | ❌            | ✅    |
| [动态的输入框（例如：小组成员）](https://goshakkk.name/array-form-inputs/)                        | ❌            | ✅    |

注意：在 React 中，`<input type="file" />`始终是一个不受控制的组件，因为它的值只能由用户设置，而不是以编程方式设置。（参见：[Uncontrolled Components – React](https://reactjs.org/docs/uncontrolled-components.html)）

# 参考

[Controlled and uncontrolled form inputs in React don't have to be complicated - Gosha Arinich](https://goshakkk.name/controlled-vs-uncontrolled-inputs-react/)
