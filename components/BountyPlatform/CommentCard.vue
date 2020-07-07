<template>
  <div class="flex">
    <div
      class="bg-c-background-qua shadow-lg w-full flex flex-col flex-wrap justify-between items-center rounded-lg overflow-hidden"
    >
      <!-- Top Part -->
      <div class="w-full flex flex-row flex-wrap justify-between items-center py-2">
        <!-- Senders Address and Project Name -->
        <div class="w-full md:w-auto flex flex-row md:items-center px-4 py-2">
          <Jazzicon class="flex m-1" :diameter="20" :address="address" />
          <h5 class="text-left ml-2 mr-3">
            <span
              class="font-mono-jet font-bold"
            >{{address.substring(0, 6) + "..." + address.substring(address.length - 4)}}</span>
          </h5>
        </div>
      </div>
      <!-- Thin Bar -->
      <div class="bg-c-text w-full h-px opacity-15"></div>
      <!-- Bottom Part -->
      <div class="w-full flex flex-col px-4 md:px-6 py-6">
        <!-- Message -->
        <p class="break-all" v-html="message"></p>
        <!-- Date -->
        <p class="text-sm opacity-75 mt-6">{{date}}</p>
      </div>
    </div>
  </div>
</template>
<script>
import Icon from "~/components/Icon.vue";
import Jazzicon from "~/components/Jazzicon.vue";
export default {
  components: {
    Icon,
    Jazzicon
  },
  props: {
    bountyName: null,
    status: null,
    perspective: null,
    context: null,
    message: null,
    address: null,
    date: null
  },
  data() {
    return {
      // Address of the signed in account
      selfAddress: "0xFD611e521fcB29fc364037D56B74C49C01f14F2d"
    };
  }
};
</script>