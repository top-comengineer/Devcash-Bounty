<template>
  <div class="w-full flex flex-col justify-center items-center">
    <GreetingCard class="my-2" />
    <div v-if="loading" class="w-full flex flex-col justify-center items-center">
      <BountyCardPlaceholder class="my-2" v-for="(n, i ) in 10" :key="i" />
    </div>
    <div v-else class="w-full flex flex-col justify-center items-center">
      <BountyCard v-for="(item, i) in bounties" :key="i" class="my-2" :bounty="item" />
    </div>
  </div>
</template>

<script>
import { SIDEBAR_CONTEXTS } from "~/config";
import { mapGetters } from "vuex";
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
      loading: true
    };
  },
  methods: {
    async initEthConnector() {
      if (this.$store.state.devcash.connector == null) {
        try {
          let connector = await DevcashBounty.init(
            this.$store.state.devcashData.loggedInAccount,
            this.$store.state.devcashData.provider
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
  computed: {
    // mix the getters into computed with object spread operator
    ...mapGetters({
      bounties: "devcashData/getOpenBounties",
      shouldRefresh: "devcashData/shouldRefresh"
    })
  },
  mounted() {
    // Init connector
    this.initEthConnector().then(_ => {
      // Show bounty data immediately if cached
      if (this.bounties != null) {
        this.loading = false;
      }
      // Re-load ubounties if shouldRefresh
      if (this.bounties == null || this.shouldRefresh) {
        this.$store.state.devcash.connector.getUbounties().then(uBounties => {
          this.$store.commit("devcashData/setBounties", uBounties);
          this.$store.commit(
            "devcashData/setLastRefresh",
            new Date().getTime()
          );
          this.loading = false;
        });
      }
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
