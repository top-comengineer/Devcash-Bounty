<template>
  <div class="w-full flex flex-col shadow-xl rounded-lg px-4 py-4 mt-2 border border-c-text-10">
    <div class="flex flex-row md:justify-center items-center">
      <Jazzicon class="flex" :diameter="48" :address="address" />
      <h6 v-html="threeLineAddress(address)" class="font-mono-jet text-sm ml-3"></h6>
    </div>
    <h5 v-if="name!=null" class="font-bold mt-3">{{name}}</h5>
    <div v-if="email!=null" class="flex flex-row items-center">
      <Icon colorClass="text-c-text" class="w-5 h-5" type="email" />
      <h6 class="ml-2 text-sm break-all">{{email}}</h6>
    </div>
  </div>
</template>
<script>
import Jazzicon from "~/components/Jazzicon.vue";
import Icon from "~/components/Icon.vue";
export default {
  components: {
    Jazzicon,
    Icon
  },
  props: {
    address: null,
    name: null,
    email: null
  },
  methods: {
    threeLineAddress: function(address) {
      return (
        address.substring(0, 14) +
        "<br>" +
        address.substring(14, 28) +
        "<br>" +
        address.substring(28, 42)
      );
    }
  }
};
</script>