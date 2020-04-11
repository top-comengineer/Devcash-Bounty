<template>
  <div
    :class="[$store.state.theme.dt ? 'shadow-lgDSS' : 'shadow-lgD']"
    class="w-full flex flex-row flex-wrap justify-center rounded-xl px-4 pb-2 pt-1"
  >
    <div class="flex flex-col justify-center items-center mr-6">
      <!-- Bounty Address Text and Copy Button  -->
      <div class="flex flex-row flex-wrap items-center">
        <h5 class="font-bold mr-2">
          {{ $t("bountyPlatform.singleBounty.contribute.bountyAddress") }}
        </h5>
        <button class="w-6 h-6">
          <Icon
            :colorClass="$store.state.theme.dt ? 'text-dtText' : 'text-ltText'"
            class="w-full h-full"
            type="copy"
          />
        </button>
      </div>
      <!-- Avatar and Address -->
      <div class="flex flex-row items-center mt-3">
        <Jazzicon class="flex" :diameter="48" :address="address" />
        <h6
          v-html="threeLineAddress(bountyAddress)"
          class="font-mono-jet text-sm ml-3"
        ></h6>
      </div>
    </div>
    <!-- QR Code -->
    <div
      class="flex flex-row justify-center h-32 w-32 rounded-lg overflow-hidden border-3 border-dtPrimary my-4"
    >
      <vue-qr
        :text="bountyAddress"
        :size="400"
        :logoScale="0.3"
        :logoSize="40"
        :correctLevel="2"
        :logoMargin="0"
        :logoBackgroundColor="'rgba(255, 255, 255, 0)'"
        :logoSrc="require('~/assets/images/icons/eth-avatar.svg')"
      ></vue-qr>
    </div>
  </div>
</template>
<script>
import Jazzicon from "~/components/Jazzicon.vue";
import Icon from "~/components/Icon.vue";
import VueQr from "vue-qr";
export default {
  components: {
    Jazzicon,
    Icon,
    VueQr
  },
  props: {
    address: null,
    bountyAddress: null
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
