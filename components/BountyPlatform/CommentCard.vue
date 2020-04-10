<template>
  <div class="flex">
    <div
      :class="[
      $store.state.theme.dt
        ? 'bg-dtBackgroundTertiary'
        : 'bg-ltBackgroundSecondary shadow-lgDL']"
      class="w-full flex flex-col flex-wrap justify-between items-center rounded-lg overflow-hidden"
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
            <span
              v-if="perspective=='hunter' && address==selfAddress"
              class="font-mono-jet text-sm opacity-75"
            >({{$t('bountyPlatform.bountyHunter.you')}})</span>
          </h5>
        </div>
      </div>
      <!-- Thin Bar -->
      <div :class="$store.state.theme.dt?'bg-dtText':'bg-ltText'" class="w-full h-px opacity-15"></div>
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
  },
  methods: {
    // Pick the right icon for status tag
    pickIcon() {
      // Pending
      if (this.status == "pending") {
        return "clock";
      }
      // Approved
      else if (this.status == "approved") {
        return "done";
      }
      // Rejected
      else if (this.status == "rejected") {
        return "cancel";
      }
    },
    // Pick the right color class for the icon on status tag
    pickIconColorClass() {
      // Pending
      if (this.status == "pending") {
        return this.$store.state.theme.dt ? "text-dtPending" : "text-ltPending";
      }
      // Approved
      else if (this.status == "approved") {
        return this.$store.state.theme.dt ? "text-dtSuccess" : "text-ltSuccess";
      }
      // Rejected
      else if (this.status == "rejected") {
        return this.$store.state.theme.dt ? "text-dtDanger" : "text-ltDanger";
      }
    },
    // Pick the right text for the status tag
    pickStatusTagText() {
      // Pending
      if (this.status == "pending") {
        return this.$t("bountyPlatform.statusTag.pending");
      }
      // Approved
      else if (this.status == "approved") {
        return this.$t("bountyPlatform.statusTag.approved");
      }
      // Rejected
      else if (this.status == "rejected") {
        return this.$t("bountyPlatform.statusTag.rejected");
      }
    }
  }
};
</script>