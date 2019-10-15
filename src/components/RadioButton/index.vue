<template>
  <div>
    <ul class="container">
      <li class="item" v-for="option in options" :key="option.label">
        <el-tag
          size="small"
          :type="value === option.value ? '' : 'info'"
          @click="handleClick(option.value)"
        >
          {{option.label}}
        </el-tag>
      </li>
    </ul>
    <!-- 隐藏的el-input 用于触发form的validator -->
    <el-input ref="input" v-show="false" />
  </div>
</template>


<script>
import { emitter } from '@/utils';

export default {
  name: 'RadioButton',
  mixins: [emitter],
  props: {
    value: [String, Number, Array, Object],
    options: [Array],
  },
  methods: {
    handleClick(v) {
      if (v === this.$props.value) {
        return;
      }
      this.$emit('change', v);
      this.$emit('input', v);
      this.$xcDispatch('ElFormItem', 'el.form.change', v);
    },
  },
};
</script>


<style lang="scss" scoped>
  .container {
    list-style: none;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    .item {
      margin-right: 10px;
      cursor: pointer;
    }
  }
</style>
