<template>
  <div class="flex flex-row">
    <div
      class="w-4 md:w-12 h-12 border-l-2 border-b-2 border-c-text border-dashed ml-1 mr-2 md:ml-4 md:mr-3 opacity-25"
    ></div>
    <div
      class="bg-c-background-sec border-c-text-10 shadow-lg w-full flex flex-col flex-wrap justify-between items-center border rounded-lg overflow-hidden"
    >
      <!-- Top Part -->
      <div
        class="bg-c-text-05 w-full flex flex-row flex-wrap justify-between items-center py-2 px-4"
      >
        <!-- Feedback Owners Address -->
        <div class="w-full md:w-auto flex flex-row md:items-center py-2">
          <Jazzicon class="flex m-1" :diameter="20" :address="address" />
          <h5
            class="text-left ml-2 mr-3 font-mono-jet font-bold"
          >{{address.substring(0, 6) + "..." + address.substring(address.length - 4)}}</h5>
        </div>
        <!-- Status Tag -->
        <div class="w-full md:w-auto flex flex-row flex-wrap items-center">
          <!-- Status Tag -->
          <div class="flex flex-col">
            <StatusTag status="feedback" />
          </div>
        </div>
      </div>
      <!-- Thin Status Bar -->
      <StatusDivider status="feedback" />
      <!-- Bottom Part -->
      <div class="w-full flex flex-col px-4 md:px-6 py-6">
        <!-- Message -->
        <p class="break-all" v-html="feedbackMessage"></p>
      </div>
    </div>
  </div>
</template>
<script>
import Icon from "~/components/Icon.vue";
import Jazzicon from "~/components/Jazzicon.vue";
import StatusTag from "~/components/BountyPlatform/StatusTag.vue";
import StatusDivider from "~/components/BountyPlatform/StatusDivider.vue";
export default {
  components: {
    Icon,
    Jazzicon,
    StatusTag,
    StatusDivider
  },
  props: {
    address: String,
    feedbackMessage: null
  } 
};
</script>