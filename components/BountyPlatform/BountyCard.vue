<template>
  <nuxt-link
    :to="getLocalizedRoute('bountyplatform')"
    :class="[
      $store.state.theme.dt
        ? 'bg-dtBackgroundSecondary'
        : 'bg-ltBackgroundSecondary shadow-lg'
    ]"
    class="w-full flex flex-row flex-wrap justify-between items-center pt-4 pb-5 px-6 md:px-8 fill-current rounded-tl-3xl rounded-br-3xl rounded-tr-lg rounded-bl-lg"
  >
    <!-- Bounty Name and Address -->
    <div class="w-full md:w-3/7 flex flex-col flex-wrap justify-center items-start">
      <h4 class="font-extrabold text-xl text-left">{{ bounty.name }}</h4>
      <div class="flex flex-row items-center mt-1">
        <Jazzicon class="flex" :diameter="20" :address="bounty.hunter" />
        <h5 class="font-mono-jet font-medium text-md text-left ml-2 opacity-75">
          {{
          bounty.hunter.substring(0, 6) +
          "..." +
          bounty.hunter.substring(bounty.hunter.length - 4)
          }}
        </h5>
      </div>
    </div>
    <!-- Divider -->
    <div
      :class="[$store.state.theme.dt ? 'bg-dtText' : 'bg-ltText']"
      class="md:hidden w-full h-px rounded-full opacity-5 my-3"
    ></div>
    <!-- Submissions Left and Remaining Time -->
    <div
      class="w-full md:w-2/7 flex flex-col justify-center order-last md:order-none items-start md:items-end"
    >
      <!-- Submissions Left -->
      <div class="flex flex-row justify-end items-center">
        <Icon
          class="w-4 h-4 mr-1"
          :colorClass="$store.state.theme.dt ? 'text-dtText' : 'text-ltText'"
          type="award"
        />
        <h6 class="text-right text-sm">
          <span class="font-bold">{{ `${bounty.numSubmissions} of ${bounty.numLeft}` }}</span>
          <span class="opacity-75">
            {{
            $t("bountyPlatform.bountyCard.bountiesLeft")
            }}
          </span>
        </h6>
      </div>
      <!-- Remaining Time -->
      <div class="flex flex-row justify-end items-center mt-1">
        <Icon
          class="w-4 h-4 mr-1"
          :colorClass="$store.state.theme.dt ? 'text-dtText' : 'text-ltText'"
          type="clock"
        />
        <h6 class="text-right text-sm">
          <span class="font-bold">{{ formatTimeLeft() }}</span>
          <span class="opacity-75">
            {{
            $t("bountyPlatform.bountyCard.remaining")
            }}
          </span>
        </h6>
      </div>
    </div>
    <!-- Price in Devcash, Ethereum and Dollars -->
    <div class="w-full md:w-2/7 flex flex-col justify-center items-start md:items-end">
      <h4 class="text-dtPrimary font-extrabold text-xl text-right">{{ "{D}" + '1,000' }}</h4>
      <h5 class="text-lg text-right mt-1">{{ "Ξ" + '1' + " / " + "$" + '1' }}</h5>
    </div>
    <!-- Divider -->
    <div
      :class="[$store.state.theme.dt ? 'bg-dtText' : 'bg-ltText']"
      class="md:hidden w-full h-px rounded-full bg-dtText opacity-5 my-3"
    ></div>
  </nuxt-link>
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
    bounty: null
  },
  data: function() {
    return {};
  },
  methods: {
    formatTimeLeft() {
      if (this.bounty.deadline >= 281474976710655 || this.bounty.deadline <= 0) {
        return "∞"
      }

      const currentDate = new Date()
      const deadlineDate = new Date(this.bounty.deadline * 1000)

      const delta = deadlineDate.getTime() - currentDate.getTime()
      
      if (delta>= 2629746) {
        let monthsLeft = Math.floor(delta / 2629746)
        return `${monthsLeft} months`
      } else if (delta >= 86400) {
        let daysLeft = Math.floor(delta / 86400);
        return `${daysLeft} days`;
      } else if (delta >= 3600) {
        let hoursLeft = Math.floor(delta / 3600);
        return `${hoursLeft} hours`;
      }
      let minutesLeft = Math.floor(delta / 60);
      return `${minutesLeft} minutes`;
    }
  }
};
</script>
