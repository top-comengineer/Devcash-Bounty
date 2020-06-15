<template>
  <div class="w-full dt-footer-bg dt-footer-shadow rounded-tl-4xl pt-6 pb-6 lg:pt-4 lg:pb-12 mt-8">
    <div class="d-container">
      <div class="w-full flex flex-row flex-wrap justify-between px-6 lg:px-16">
        <div class="w-full md:w-1/2 lg:w-auto items-center lg:items-start flex flex-col my-3">
          <!-- Navigation Header -->
          <div class="flex flex-row my-3 px-3 py-1 rounded-full">
            <div class="flex flex-col">
              <h4 class="text-xl font-bold my-1">{{ $t("navigation.header") }}</h4>
              <div class="h-px2 bg-dtPrimary rounded-bl-full rounded-tr-full"></div>
            </div>
          </div>
          <!-- Navigation Items -->
          <!-- Home -->
          <nuxt-link
            :class="[$store.state.theme.dt?'hover_bg-dtText-15 focus_bg-dtText-15': 'hover_bg-ltText-15 focus_bg-ltText-15']"
            :to="localePath('index')"
            class="my-1 px-3 py-1 rounded-full transition-colors ease-out duration-200"
          >{{ $t("navigation.home") }}</nuxt-link>
          <!-- IBO -->
          <nuxt-link
            :class="[$store.state.theme.dt?'hover_bg-dtText-15 focus_bg-dtText-15': 'hover_bg-ltText-15 focus_bg-ltText-15']"
            :to="localePath({name: 'index', hash: '#IBO'})"
            class="my-1 px-3 py-1 rounded-full transition-colors ease-out duration-200"
          >{{ $t("navigation.ibo") }}</nuxt-link>
          <!-- Bounty Platform-->
          <nuxt-link
            :class="[$store.state.theme.dt?'hover_bg-dtText-15 focus_bg-dtText-15': 'hover_bg-ltText-15 focus_bg-ltText-15']"
            :to="localePath('bountyplatform')"
            class="my-1 px-3 py-1 rounded-full transition-colors ease-out duration-200"
          >{{ $t("navigation.bountyPlatform") }}</nuxt-link>
          <!-- DEX -->
          <nuxt-link
            :to="localePath({name: 'index', hash: '#DEX'})"
            :class="[$store.state.theme.dt?'hover_bg-dtText-15 focus_bg-dtText-15': 'hover_bg-ltText-15 focus_bg-ltText-15']"
            class="my-1 px-3 py-1 rounded-full transition-colors ease-out duration-200"
          >{{ $t("navigation.dex") }}</nuxt-link>
        </div>
        <div class="w-full md:w-1/2 lg:w-auto items-center lg:items-start flex flex-col my-3">
          <!-- Bounty Platform Header -->
          <div class="flex flex-row my-3 px-3 py-1 rounded-full">
            <div class="flex flex-col">
              <h4 class="text-xl font-bold my-1">{{ $t("bountyPlatform.header") }}</h4>
              <div class="h-px2 bg-dtPrimary rounded-bl-full rounded-tr-full"></div>
            </div>
          </div>
          <!-- Bounty Platform Items -->
          <!-- Bounty Platform / Explore -->
          <nuxt-link
            :class="[$store.state.theme.dt?'hover_bg-dtText-15 focus_bg-dtText-15': 'hover_bg-ltText-15 focus_bg-ltText-15']"
            :to="localePath('bountyplatform')"
            class="my-1 px-3 py-1 rounded-full transition-colors ease-out duration-200"
          >{{ $t("bountyPlatform.exploreBounties") }}</nuxt-link>
          <!-- Bounty Platform / Post -->
          <nuxt-link
            v-if="isLoggedIn"
            :class="[$store.state.theme.dt?'hover_bg-dtText-15 focus_bg-dtText-15': 'hover_bg-ltText-15 focus_bg-ltText-15']"
            :to="localePath('bountyplatform-post')"
            class="my-1 px-3 py-1 rounded-full transition-colors ease-out duration-200"
          >{{ $t("bountyPlatform.postABounty") }}</nuxt-link>
          <!-- Bounty Platform / Overview -->
          <nuxt-link
            v-if="isLoggedIn"
            :class="[$store.state.theme.dt?'hover_bg-dtText-15 focus_bg-dtText-15': 'hover_bg-ltText-15 focus_bg-ltText-15']"
            :to="localePath('bountyplatform-overview')"
            class="my-1 px-3 py-1 rounded-full transition-colors ease-out duration-200"
          >{{ $t("bountyPlatform.overview.header") }}</nuxt-link>
          <!-- Bounty Platform / Bounty Hunter -->
          <nuxt-link
            v-if="isLoggedIn"
            :class="[$store.state.theme.dt?'hover_bg-dtText-15 focus_bg-dtText-15': 'hover_bg-ltText-15 focus_bg-ltText-15']"
            :to="localePath('bountyplatform-bountyhunter')"
            class="my-1 px-3 py-1 rounded-full transition-colors ease-out duration-200"
          >{{ $t("bountyPlatform.bountyHunter.header") }}</nuxt-link>
          <!-- Bounty Platform / Bounty Manager -->
          <nuxt-link
            v-if="isLoggedIn"
            :class="[$store.state.theme.dt?'hover_bg-dtText-15 focus_bg-dtText-15': 'hover_bg-ltText-15 focus_bg-ltText-15']"
            :to="localePath('bountyplatform-bountymanager')"
            class="my-1 px-3 py-1 rounded-full transition-colors ease-out duration-200"
          >{{ $t("bountyPlatform.bountyManager.header") }}</nuxt-link>
        </div>
        <!-- DEX -->
        <!-- <div class="w-full md:w-1/2 lg:w-auto items-center lg:items-start flex flex-col my-3">
          <div class="flex flex-row my-3 px-3 py-1 rounded-full">
            <div class="flex flex-col">
              <h4 class="text-xl font-bold my-1">{{ $t("dex.header") }}</h4>
              <div class="h-px2 bg-dtPrimary rounded-bl-full rounded-tr-full"></div>
            </div>
          </div>
          <a
            href="/"
            :class="[$store.state.theme.dt?'hover_bg-dtText-15 focus_bg-dtText-15': 'hover_bg-ltText-15 focus_bg-ltText-15']"
            class="my-1 px-3 py-1 rounded-full transition-colors ease-out duration-200"
          >{{ $t("dex.buyDevcash") }}</a>
          <a
            href="/"
            :class="[$store.state.theme.dt?'hover_bg-dtText-15 focus_bg-dtText-15': 'hover_bg-ltText-15 focus_bg-ltText-15']"
            class="my-1 px-3 py-1 rounded-full transition-colors ease-out duration-200"
          >{{ $t("dex.sellDevcash") }}</a>
        </div>-->
        <div class="w-full md:w-1/2 lg:w-auto items-center lg:items-start flex flex-col my-3">
          <!-- Social Header -->
          <div class="flex flex-row my-3 px-3 py-1 rounded-full">
            <div class="flex flex-col">
              <h4 class="text-xl font-bold my-1">{{ $t("social.header") }}</h4>
              <div class="h-px2 bg-dtPrimary rounded-bl-full rounded-tr-full"></div>
            </div>
          </div>
          <!-- Social Items -->
          <!-- Discord -->
          <a
            :class="[$store.state.theme.dt?'hover_bg-dtText-15 focus_bg-dtText-15': 'hover_bg-ltText-15 focus_bg-ltText-15']"
            class="my-1 px-3 py-1 rounded-full transition-colors ease-out duration-200"
            target="_blank"
            href
          >
            <div class="flex flex-row items-center">
              <Icon
                :colorClass="
                  $store.state.theme.dt ? 'text-dtText' : 'text-ltText'
                "
                class="w-5 h-5"
                type="discord"
              />
              <p class="ml-2 md:ml-3">{{ $t("social.discord") }}</p>
            </div>
          </a>
          <!-- Facebook -->
          <a
            :class="[$store.state.theme.dt?'hover_bg-dtText-15 focus_bg-dtText-15': 'hover_bg-ltText-15 focus_bg-ltText-15']"
            class="my-1 px-3 py-1 rounded-full transition-colors ease-out duration-200"
            target="_blank"
            href
          >
            <div class="flex flex-row items-center">
              <Icon
                :colorClass="
                  $store.state.theme.dt ? 'text-dtText' : 'text-ltText'
                "
                class="w-5 h-5"
                type="facebook"
              />
              <p class="ml-2 md:ml-3">{{ $t("social.facebook") }}</p>
            </div>
          </a>
          <!-- Twitter -->
          <a
            :class="[$store.state.theme.dt?'hover_bg-dtText-15 focus_bg-dtText-15': 'hover_bg-ltText-15 focus_bg-ltText-15']"
            class="my-1 px-3 py-1 rounded-full transition-colors ease-out duration-200"
            target="_blank"
            href
          >
            <div class="flex flex-row items-center">
              <Icon
                :colorClass="
                  $store.state.theme.dt ? 'text-dtText' : 'text-ltText'
                "
                class="w-5 h-5"
                type="twitter"
              />
              <p class="ml-2 md:ml-3">{{ $t("social.twitter") }}</p>
            </div>
          </a>
          <!-- Medium -->
          <a
            :class="[$store.state.theme.dt?'hover_bg-dtText-15 focus_bg-dtText-15': 'hover_bg-ltText-15 focus_bg-ltText-15']"
            class="my-1 px-3 py-1 rounded-full transition-colors ease-out duration-200"
            target="_blank"
            href
          >
            <div class="flex flex-row items-center">
              <Icon
                :colorClass="
                  $store.state.theme.dt ? 'text-dtText' : 'text-ltText'
                "
                class="w-5 h-5"
                type="medium"
              />
              <p class="ml-2 md:ml-3">{{ $t("social.medium") }}</p>
            </div>
          </a>
          <!-- GitHub -->
          <a
            :class="[$store.state.theme.dt?'hover_bg-dtText-15 focus_bg-dtText-15': 'hover_bg-ltText-15 focus_bg-ltText-15']"
            class="my-1 px-3 py-1 rounded-full transition-colors ease-out duration-200"
            target="_blank"
            href
          >
            <div class="flex flex-row items-center">
              <Icon
                :colorClass="
                  $store.state.theme.dt ? 'text-dtText' : 'text-ltText'
                "
                class="w-5 h-5"
                type="github"
              />
              <p class="ml-2 md:ml-3">{{ $t("social.github") }}</p>
            </div>
          </a>
        </div>
        <!-- Logo and Credits -->
        <div class="w-full lg:w-auto self-center flex flex-col items-center my-8">
          <Logo
            :type="$store.state.theme.dt ? 'monoLight' : 'monoDark'"
            class="w-32 md:w-40 h-auto my-2"
          />
          <p class="my-2">{{ $t("footer.credits").replace("%1", currentYear) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Logo from "~/components/Logo.vue";
import Icon from "~/components/Icon.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    Logo,
    Icon
  },
  computed: {
    // mix the getters into computed with object spread operator
    ...mapGetters({
      isLoggedIn: "devcashData/isLoggedIn",
      loggedInAccount: "devcashData/loggedInAccount"
    })
  },
  data: function() {
    return {
      currentYear: new Date().getFullYear()
    };
  }
};
</script>
<style>
.dt-footer-shadow {
  box-shadow: 0 -2px 0 0 rgba(103, 92, 255, 1);
}
.dt-footer-bg {
  background-color: rgba(103, 92, 255, 0.04);
}
</style>
