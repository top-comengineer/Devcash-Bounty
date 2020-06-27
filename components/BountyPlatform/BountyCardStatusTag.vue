<template>
  <div
    class="border-3 rounded-tl-2xl rounded-br-2xl rounded-tr-md rounded-bl-md px-6 py-0_5"
    :class="{'bg-c-secondary border-c-background': type=='active', 'bg-c-pending border-c-background': type=='expired', 'bg-c-success border-c-background': type=='completed'}"
  >
    <h5
      :class="type=='active'?'text-c-light':'text-c-background'"
      class="font-bold text-sm md:text-base"
    >{{type=="completed"?$t("bountyPlatform.bountyCard.tag.completed"):type=="expired" ?$t("bountyPlatform.bountyCard.tag.expired"):type=='active'?$t("bountyPlatform.bountyCard.tag.active"):'' }}</h5>
  </div>
</template>
<script>
export default {
  props: {
    type: null
  }
};
</script>
