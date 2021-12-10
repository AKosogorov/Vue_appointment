<template>
  <th class="text-center">
    <span class="table__header table__header-weekday">
      {{ header.weekDay }}
    </span>
    <span class="table__header table__header-date">
      {{ header.date.toLocaleDateString() }}
    </span>
  </th>
</template>

<script>
export default {
  props: {
    header: {
      type: Object,
      require: true,
      default: Function
    }
  }
}
</script>

<style>
  .table__header {
    display: block;
    font-weight: 600;
    font-size: 18px;
  }

  @media (max-width: 1270px) {
    .table__header {
      font-size: 12px;
    }
  }
</style>
