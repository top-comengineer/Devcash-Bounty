<template>
  <div class="flex">
    <div
      :class="[
      $store.state.theme.dt
        ? 'bg-dtBackgroundTertiary'
        : 'bg-ltBackgroundSecondary shadow-lgD']"
      class="w-full flex flex-col flex-wrap justify-between items-center rounded-lg overflow-hidden"
    >
      <!-- Top Part -->
      <div
        :class="[
      $store.state.theme.dt
        ? 'bg-dtBackgroundQuaternary'
        : 'bg-ltBackgroundSecondary']"
        class="w-full flex flex-row flex-wrap justify-between items-center py-2 md:py-0"
      >
        <!-- Senders Address and Project Name -->
        <div class="w-full md:w-auto flex flex-row md:items-center px-4 py-2">
          <Jazzicon class="flex m-1" :diameter="20" :address="address" />
          <h5 class="text-left ml-2 mr-3">
            <span class="font-mono-jet font-bold">
              {{
              address.substring(0, 6) +
              "..." +
              address.substring(address.length - 4)
              }}
            </span>
            <span
              class="font-mono-jet text-sm opacity-75"
            >({{$t('bountyPlatform.bountyHunter.you')}})</span>
            <span>-></span>
            <span class="font-extrabold">{{bountyName}}</span>
          </h5>
        </div>
        <!-- Bounty Amount and Status Tag -->
        <div class="w-full md:w-auto flex flex-row px-4 py-2">
          <!-- Bounty Amount in DEV, ETH and USD -->
          <div class="flex flex-col md:items-end">
            <h5
              :class="$store.state.theme.dt?'text-dtPending':'text-ltPending'"
              class="font-extrabold text-left md:text-right"
            >{D}{{amountDEV}}</h5>
            <h6 class="text-sm text-left">(Ξ{{amountETH}} / ${{amountUSD}})</h6>
          </div>
          <!-- Status Tag -->
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
        'bg-ltDanger': status=='rejected' && !$store.state.theme.dt,
      } "
        class="w-full h-px opacity-50"
      ></div>
      <!-- Bottom Part -->
      <div class="w-full flex flex-col px-4 md:px-6 py-4">
        <!-- Message -->
        <p>{{message}}</p>
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
    message: null,
    address: null,
    amountDEV: null,
    amountETH: null,
    amountUSD: null,
    date: null
  },
  methods: {
    formattedMessage() {
      // Bounty Created
      if (this.messageType == "bountyCreated") {
        let message = this.$t(
          "bountyPlatform.overview.activityCard.manager.bountyCreated"
        ).replace(
          "1%",
          `"<span class="font-extrabold">${this.bountyName}</span>"`
        );
        return message;
      }
      // Submission Received
      else if (this.messageType == "submissionReceived") {
        let message = this.$t(
          "bountyPlatform.overview.activityCard.manager.submissionReceived"
        ).replace(
          "1%",
          `"<span class="font-extrabold">${this.bountyName}</span>"`
        );
        return message;
      }
      // Submission Sent
      else if (this.messageType == "submissionSent") {
        let message = this.$t(
          "bountyPlatform.overview.activityCard.hunter.submissionSent"
        ).replace(
          "1%",
          `"<span class="font-extrabold">${this.bountyName}</span>"`
        );
        return message;
      }
      // Submission Approved
      else if (this.messageType == "submissionApproved") {
        let message = this.$t(
          this.perspective == "manager"
            ? "bountyPlatform.overview.activityCard.manager.submissionApproved"
            : "bountyPlatform.overview.activityCard.hunter.submissionApproved"
        ).replace(
          "1%",
          `"<span class="font-extrabold">${this.bountyName}</span>"`
        );
        return message;
      }
      // Submission Rejected
      else if (this.messageType == "submissionRejected") {
        let message = this.$t(
          this.perspective == "manager"
            ? "bountyPlatform.overview.activityCard.manager.submissionRejected"
            : "bountyPlatform.overview.activityCard.hunter.submissionRejected"
        ).replace(
          "1%",
          `"<span class="font-extrabold">${this.bountyName}</span>"`
        );
        return message;
      }
      // Bounty Awarded
      else if (this.messageType == "bountyAwarded") {
        let message = this.$t(
          this.perspective == "manager"
            ? "bountyPlatform.overview.activityCard.manager.bountyAwarded"
            : "bountyPlatform.overview.activityCard.hunter.bountyAwarded"
        ).replace(
          "1%",
          `"<span class="font-extrabold">${this.bountyName}</span>"`
        );
        return message;
      }
      // Fee Changed
      else if (this.messageType == "feeChanged") {
        let message = this.$t(
          "bountyPlatform.overview.activityCard.manager.feeChanged"
        ).replace(
          "1%",
          `"<span class="font-extrabold">${this.bountyName}</span>"`
        );
        return message;
      }
      // Bounty Completed
      else if (this.messageType == "bountyCompleted") {
        let message = this.$t(
          "bountyPlatform.overview.activityCard.manager.bountyCompleted"
        ).replace(
          "1%",
          `"<span class="font-extrabold">${this.bountyName}</span>"`
        );
        return message;
      }
      // Bounty Reclaimed
      else if (this.messageType == "bountyReclaimed") {
        let message = this.$t(
          "bountyPlatform.overview.activityCard.manager.bountyReclaimed"
        ).replace(
          "1%",
          `"<span class="font-extrabold">${this.bountyName}</span>"`
        );
        return message;
      }
    },
    // Pick the right icon for the card
    pickIcon() {
      // Bounty Created
      if (this.messageType == "bountyCreated") {
        return "new-bounty";
      }
      // Personal Bounty Created
      else if (this.messageType == "personalBountyCreated") {
        return "personal-bounty";
      }
      // Submission Received
      else if (this.messageType == "submissionReceived") {
        return "receive";
      }
      // Submission Sent
      else if (this.messageType == "submissionSent") {
        return "send";
      }
      // Submission Approved
      else if (this.messageType == "submissionApproved") {
        return "done";
      }
      // Submission Rejected
      else if (this.messageType == "submissionRejected") {
        return "cancel";
      }
      // Bounty Awarded
      else if (this.messageType == "bountyAwarded") {
        return "award";
      }
      // Fee Changed
      else if (this.messageType == "feeChanged") {
        return "fee";
      }
      // Bounty Completed
      else if (this.messageType == "bountyCompleted") {
        return "bounty-complete";
      }
      // Bounty Reclaimed
      else if (this.messageType == "bountyReclaimed") {
        return "reclaim";
      }
    }
  }
};
</script>