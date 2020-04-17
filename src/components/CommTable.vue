<template>
  <el-table
    :data="tableData"
    :size="size"
    :stripe="stripe"
    :border="border"
    v-loading="showLoading"
    element-loading-background="rgba(0,0,0,0.7)"
    element-loading-text="拼命加载中"
  >
    <el-table-column type="index" label="#" width="80" align="center" v-if="showOrder">
      <template slot-scope="scope">
        {{ pagination ? scope.$index + 1 + (pagination.currentPage - 1) * pagination.pageSize : scope.$index + 1 }}
      </template>
    </el-table-column>
    <el-table-column
      v-for="(item, index) of columns"
      :key="index"
      :label="item.label"
      :prop="item.prop"
      :width="item.width"
      :fixed="item.fixed"
      :render="item.render"
      :show-overflow-tooltip="item.showOverflowTooltip"
      :align="center ? 'center' : ''"
    >
      <template slot-scope="scope">
        <ex-slot v-if="item.render" :render="item.render" :row="scope.row" :index="scope.$index" :vm="$parent.$parent" />
        <span v-else>{{ scope.row[item.prop] }}</span>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
const exSlot = {
  functional: true,
  props: {
    row: Object,
    index: Number,
    render: Function,
    vm: Object
  },
  render: (h, data) => {
    return data.props.render(h, {
      row: data.props.row,
      index: data.props.index,
      vm: data.props.vm
    });
  }
};
export default {
  props: {
    showLoading: {
      type: Boolean,
      default: false
    },
    showOrder: {
      type: Boolean,
      default: true
    },
    tableData: {
      type: Array,
      default: () => []
    },
    columns: {
      type: Array,
      default: () => []
    },
    size: {
      type: String,
      default: ""
    },
    stripe: {
      type: Boolean,
      default: true
    },
    border: {
      type: Boolean,
      default: false
    },
    center: {
      type: Boolean,
      default: true
    },
    pagination: {
      type: Object,
      default: null
    }
  },
  components: { exSlot }
};
</script>
