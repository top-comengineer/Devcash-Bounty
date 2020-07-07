<template>
  <div class="w-full flex flex-col shadow-xl rounded-lg px-4 pt-2 pb-4 border border-c-text-10">
    <div class="flex flex-row flex-wrap items-center">
      <p class="text-lg font-bold mr-1">{{$t("bountyPlatform.singleBounty.createdBy")}}</p>
      <button
        @click.prevent="copyAddress()"
        class="w-8 h-8 rounded-full hover:bg-c-text-15 focus:bg-c-text-15 p-1 transition-colors duration-200"
      >
        <Icon colorClass="text-c-text" class="w-full h-full" type="copy" />
      </button>
    </div>
    <div class="flex flex-row items-center mt-3">
      <Jazzicon class="flex" :diameter="48" :address="address" />
      <a class="hover:underline" target="_blank" :href="'https://etherscan.io/address/'+address">
        <p v-html="threeLineAddress(address)" class="font-mono-jet text-sm ml-3"></p>
      </a>
    </div>
    <p v-if="name!=null" class="font-bold mt-3">{{name}}</p>
    <div v-if="email!=null" class="flex flex-row items-center">
      <Icon colorClass="text-c-text" class="w-5 h-5" type="email" />
      <p class="ml-2 text-sm break-all">{{email}}</p>
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
    },
    copyAddress() {
      this.$copyText(this.address);
      this.$notify({
          group: 'main',
          title: this.$t("bountyPlatform.singleBounty.contribute.headerAddressCopied"),
          text: this.$t("bountyPlatform.singleBounty.contribute.paragraphAddressCopied"),
          data: {},
          duration: 1500
        });
    }
  }
};
</script>