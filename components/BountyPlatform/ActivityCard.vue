<template>
  <div class="flex">
    <div
      :class="[
      $store.state.theme.dt
        ? 'bg-dtBackgroundTertiary'
        : 'bg-ltBackgroundSecondary shadow-lg'
    ]"
      class="w-full flex flex-row flex-wrap justify-between items-center rounded-lg px-6 py-4"
    >
      <!-- Icon and Message -->
      <div class="w-full md:w-6/12 lg:w-7/12 flex flex-row justify-start items-center my-2">
        <!-- Icon -->
        <Icon
          :colorClass="$store.state.theme.dt ? 'text-dtText' : 'text-ltText'"
          class="w-10 h-10"
          :type="pickIcon()"
        />
        <!-- Message -->
        <p v-html="formattedMessage()" class="text-left px-4"></p>
      </div>
      <!-- Address and Date -->
      <div class="w-full md:w-5/12 lg:w-4/12 flex flex-col justify-end my-2">
        <!-- If there is an address -->
        <div v-if="address" class="flex flex-row justify-start md:justify-end">
          <div
            :class="$store.state.theme.dt?'bg-dtBackgroundSecondary':'bg-ltTextLight'"
            class="flex flex-row justify-start md:justify-end items-center rounded-full mb-2"
          >
            <Jazzicon class="flex m-1" :diameter="20" :address="address" />
            <h5 class="font-mono-jet font-bold text-left ml-2 mr-3 break-all">
              {{
              address.substring(0, 6) +
              "..." +
              address.substring(address.length - 4)
              }}
            </h5>
          </div>
        </div>
        <!-- Date -->
        <p class="text-left md:text-right opacity-75">{{date}}</p>
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
    messageType: null,
    perspective: null,
    date: null,
    bountyName: null,
    address: null
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