<template>
  <div class="w-full flex flex-col justify-center items-center">
    <GreetingCard class="my-2" />
    <div v-if="loading" class="w-full flex flex-col justify-center items-center">
      <BountyCardPlaceholder class="my-2" v-for="(n, i ) in 10" :key="i" />
    </div>
    <div class="w-full flex flex-col justify-center items-center">
      <BountyCard v-for="(item, i) in bounties" :key="i" class="my-2" :bounty="item" />
    </div>
  </div>
</template>

<script>
import { SIDEBAR_CONTEXTS } from "~/config";
import BountyCard from "~/components/BountyPlatform/BountyCard.vue";
import BountyCardPlaceholder from "~/components/BountyPlatform/BountyCardPlaceholder.vue";
import GreetingCard from "~/components/BountyPlatform/GreetingCard.vue";
import {
  DevcashBounty,
  AccountNotFoundError
} from "~/plugins/devcash/devcashBounty.client";
export default {
  layout: "bountyPlatform",
  components: {
    BountyCard,
    BountyCardPlaceholder,
    GreetingCard
  },
  data() {
    return {
      loading: true,
      bounties: []
    };
  },
  methods: {
    async initEthConnector() {
      if (this.$store.state.devcash.connector == null) {
        try {
          let connector = await DevcashBounty.init(
            this.$store.state.devcashData.loggedInAccount
          );
          this.$store.commit("devcash/setConnector", connector);
        } catch (e) {
          // TODO - handle these correctly
          if (e instanceof AccountNotFoundError) {
            alert("account not logged in anymore - do something");
          } else {
            alert(`Unknown error ${e}`);
          }
        }
      }
    }
  },
  mounted() {
    // Load
    this.initEthConnector().then(_ => {
      this.$store.state.devcash.connector.getUbounties().then(bounties => {
        this.bounties = bounties;
        this.loading = false;
      });
    });
  },
  beforeMount() {
    // Set sidebar context
    this.$store.commit("general/setSidebarContext", SIDEBAR_CONTEXTS.explore);
  },
  destroyed() {
    this.$store.commit("general/setSidebarContext", null);
  }
};
</script>
