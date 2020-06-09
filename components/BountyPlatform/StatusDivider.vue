<template>
  <div
    :class="{
        'bg-dtPending': status=='pending' && $store.state.theme.dt,
        'bg-ltPending': status=='pending' && !$store.state.theme.dt,
        'bg-dtSuccess': status=='approved' && $store.state.theme.dt,
        'bg-ltSuccess': status=='approved' && !$store.state.theme.dt,
        'bg-dtDanger': status=='rejected' && $store.state.theme.dt,
        'bg-ltDanger': status=='rejected' && !$store.state.theme.dt}"
    class="w-full h-px opacity-50"
  ></div>
</template>
<script>
export default {
  props: {
    status: null
  }
};
</script>