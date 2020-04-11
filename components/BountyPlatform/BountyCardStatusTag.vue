<template>
  <div
    class="border-3 rounded-tl-2xl rounded-br-2xl rounded-tr-md rounded-bl-md px-6 py-0.5 md:py-1"
    :class="{'bg-dtSuccess border-dtBackground': $store.state.theme.dt && type=='active', 'bg-ltSuccess border-ltBackground': !$store.state.theme.dt && type=='active'}"
  >
    <h5
      class="font-extrabold text-sm md:text-base"
      :class="{'text-dtBackground': $store.state.theme.dt, 'text-ltBackgroundSecondary': !$store.state.theme.dt}"
    >{{ type=='active'?$t("bountyPlatform.bountyCard.tag.active"):'' }}</h5>
  </div>
</template>
<script>
export default {
  props: {
    type: null
  }
};
</script>
