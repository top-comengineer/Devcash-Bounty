<template>
  <div
    class="border-3 rounded-tl-2xl rounded-br-2xl rounded-tr-md rounded-bl-md px-6 py-0_5"
    :class="{'bg-c-success border-c-background': type=='active'}"
  >
    <h5
      class="text-c-background font-extrabold text-sm md:text-base"
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
