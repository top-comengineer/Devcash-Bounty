<template>
  <div
    class="border-3 rounded-tl-2xl rounded-br-2xl rounded-tr-md rounded-bl-md px-6 py-0_5"
    :class="{'bg-c-secondary border-c-background': type=='open', 'bg-c-pending border-c-pending': type=='expired', 'bg-c-success border-c-background': type=='completed'}"
  >
    <h5
      class="text-c-background font-extrabold text-sm md:text-base"
    >{{type=="finished"?$t("bountyPlatform.bountyCard.tag.completed"):type=="expired" ?$t("bountyPlatform.bountyCard.tag.active"):type=='open'?$t("bountyPlatform.bountyCard.tag.active"):'' }}</h5>
  </div>
</template>
<script>
export default {
  props: {
    type: null
  }
};
</script>
