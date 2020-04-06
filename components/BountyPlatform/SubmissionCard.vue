<template>
  <div class="flex">
    <div
      :class="[
      $store.state.theme.dt
        ? 'bg-dtBackgroundTertiary border-dtText-10'
        : 'bg-ltBackgroundSecondary border-ltText-10 shadow-lgDL']"
      class="w-full flex flex-col flex-wrap justify-between items-center border rounded-lg overflow-hidden"
    >
      <!-- Top Part -->
      <div
        :class="[
      $store.state.theme.dt
        ? 'bg-dtText-5'
        : 'bg-ltText-5']"
        class="w-full flex flex-row flex-wrap justify-between items-center py-2"
      >
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
            <span>-></span>
            <span class="font-extrabold">{{bountyName}}</span>
          </h5>
        </div>
        <!-- Bounty Amount and Status Tag or Approve Decline Options -->
        <div class="w-full md:w-auto flex flex-row flex-wrap items-center px-4 md:pr-0">
          <!-- Bounty Amount in DEV, ETH and USD -->
          <div class="flex flex-col my-2">
            <h5
              :class="{
              'text-dtPending': status=='pending' && $store.state.theme.dt,
              'text-ltPending': status=='pending' && !$store.state.theme.dt,
              'text-dtSuccess': status=='approved' && $store.state.theme.dt,
              'text-ltSuccess': status=='approved' && !$store.state.theme.dt,
              'text-dtDanger': status=='rejected' && $store.state.theme.dt,
              'text-ltDanger': status=='rejected' && !$store.state.theme.dt}"
              class="font-bold text-left"
            >{D}{{amountDEV}}</h5>
            <h6 class="text-sm text-left">(Ξ{{amountETH}} / ${{amountUSD}})</h6>
          </div>
          <!-- Status Tag or Approve and Reject Buttons -->
          <div class="flex flex-col md:mx-4 my-2">
            <!-- If Perspective is Manager -->
            <div
              v-if="perspective=='manager' && status=='pending'"
              class="flex flex-row flex-wrap items-center"
            >
              <!-- Approve Button -->
              <button
                :class="[$store.state.theme.dt?'hover_bg-dtSuccess-15 focus_bg-dtSuccess-15': 'hover_bg-ltSuccess-15 focus_bg-ltSuccess-15']"
                class="flex flex-row items-center transition-all rounded-full duration-200 ease-out px-3 py-1 mx-1 my-1"
              >
                <Icon
                  class="w-5 h-5"
                  type="done"
                  :colorClass="$store.state.theme.dt?'text-dtSuccess':'text-ltSuccess'"
                />
                <h5
                  :class="$store.state.theme.dt?'text-dtSuccess':'text-ltSuccess'"
                  class="font-extrabold mx-1"
                >{{$t('bountyPlatform.bountyManager.approve')}}</h5>
              </button>
              <!-- Reject Button -->
              <button
                :class="[$store.state.theme.dt?'hover_bg-dtDanger-15 focus_bg-dtDanger-15': 'hover_bg-ltDanger-15 focus_bg-ltDanger-15']"
                class="flex flex-row items-center transition-all rounded-full duration-200 ease-out px-3 py-1 mx-1 my-1"
              >
                <Icon
                  class="w-5 h-5"
                  type="cancel"
                  :colorClass="$store.state.theme.dt?'text-dtDanger':'text-ltDanger'"
                />
                <h5
                  :class="$store.state.theme.dt?'text-dtDanger':'text-ltDanger'"
                  class="font-extrabold mx-1"
                >{{$t('bountyPlatform.bountyManager.reject')}}</h5>
              </button>
            </div>
            <!-- If Perspective is Hunter -->
            <div
              v-if="perspective=='hunter' || status=='approved' || status=='rejected'"
              :class="{
            'bg-dtPending-10 border-dtPending-40': status=='pending' && $store.state.theme.dt,
            'bg-ltPending-10 border-ltPending-40': status=='pending' && !$store.state.theme.dt,
            'bg-dtSuccess-10 border-dtSuccess-40': status=='approved' && $store.state.theme.dt,
            'bg-ltSuccess-10 border-ltSuccess-40': status=='approved' && !$store.state.theme.dt,
            'bg-dtDanger-10 border-dtDanger-40': status=='rejected' && $store.state.theme.dt,
            'bg-ltDanger-10 border-ltDanger-40': status=='rejected' && !$store.state.theme.dt}"
              class="flex flex-row items-center px-2 py-1 border rounded-md my-2 mx-3 md:mr-2"
            >
              <Icon class="w-4 h-4" :type="pickIcon()" :colorClass="pickIconColorClass()" />
              <h6
                :class="{
                'text-dtPending': status=='pending' && $store.state.theme.dt,
                'text-ltPending': status=='pending' && !$store.state.theme.dt,
                'text-dtSuccess': status=='approved' && $store.state.theme.dt,
                'text-ltSuccess': status=='approved' && !$store.state.theme.dt,
                'text-dtDanger': status=='rejected' && $store.state.theme.dt,
                'text-ltDanger': status=='rejected' && !$store.state.theme.dt}"
                class="font-bold mx-1 text-sm"
              >{{pickStatusTagText()}}</h6>
            </div>
          </div>
        </div>
      </div>
      <!-- Thin Status Bar -->
      <div
        :class="{
        'bg-dtPending': status=='pending' && $store.state.theme.dt,
        'bg-ltPending': status=='pending' && !$store.state.theme.dt,
        'bg-dtSuccess': status=='approved' && $store.state.theme.dt,
        'bg-ltSuccess': status=='approved' && !$store.state.theme.dt,
        'bg-dtDanger': status=='rejected' && $store.state.theme.dt,
        'bg-ltDanger': status=='rejected' && !$store.state.theme.dt}"
        class="w-full h-px opacity-50"
      ></div>
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
    message: null,
    address: null,
    amountDEV: null,
    amountETH: null,
    amountUSD: null,
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