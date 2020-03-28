<template>
  <div class="w-full dt-footer-bg dt-footer-shadow rounded-tl-4xl pt-6 pb-6 lg:pt-4 lg:pb-12 mt-8">
    <div class="d-container">
      <div class="w-full flex flex-row flex-wrap justify-between px-6 lg:px-16">
        <div class="w-full md:w-1/2 lg:w-auto items-center lg:items-start flex flex-col my-3">
          <!-- Navigation Header -->
          <div class="flex flex-row my-3">
            <div class="flex flex-col">
              <h4 class="text-xl font-bold my-1">{{ $t("navigation.header") }}</h4>
              <div class="h-2px bg-dtPrimary rounded-bl-full rounded-tr-full"></div>
            </div>
          </div>
          <!-- Navigation Items -->
          <p class="my-2">{{ $t("navigation.home") }}</p>
          <p class="my-2">{{ $t("navigation.ibo") }}</p>
          <p class="my-2">{{ $t("navigation.bountyPlatform") }}</p>
          <p class="my-2">{{ $t("navigation.dex") }}</p>
        </div>
        <div class="w-full md:w-1/2 lg:w-auto items-center lg:items-start flex flex-col my-3">
          <!-- Bounty Platform Header -->
          <div class="flex flex-row my-3">
            <div class="flex flex-col">
              <h4 class="text-xl font-bold my-1">{{ $t("bountyPlatform.header") }}</h4>
              <div class="h-2px bg-dtPrimary rounded-bl-full rounded-tr-full"></div>
            </div>
          </div>
          <!-- Bounty Platform Items -->
          <p class="my-2">{{ $t("bountyPlatform.exploreBounties") }}</p>
          <p class="my-2">{{ $t("bountyPlatform.postABounty") }}</p>
          <p class="my-2">{{ $t("bountyPlatform.visitDashboard") }}</p>
        </div>
        <div class="w-full md:w-1/2 lg:w-auto items-center lg:items-start flex flex-col my-3">
          <!-- DEX Header -->
          <div class="flex flex-row my-3">
            <div class="flex flex-col">
              <h4 class="text-xl font-bold my-1">{{ $t("dex.header") }}</h4>
              <div class="h-2px bg-dtPrimary rounded-bl-full rounded-tr-full"></div>
            </div>
          </div>
          <!-- DEX Items -->
          <p class="my-2">{{ $t("dex.buyDevcash") }}</p>
          <p class="my-2">{{ $t("dex.sellDevcash") }}</p>
        </div>
        <div class="w-full md:w-1/2 lg:w-auto items-center lg:items-start flex flex-col my-3">
          <!-- Social Header -->
          <div class="flex flex-row my-3">
            <div class="flex flex-col">
              <h4 class="text-xl font-bold my-1">{{ $t("social.header") }}</h4>
              <div class="h-2px bg-dtPrimary rounded-bl-full rounded-tr-full"></div>
            </div>
          </div>
          <!-- Social Items -->
          <a class="py-2 px-3 md:px-0" target="_blank" href>
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
          <a class="py-2 px-3 md:px-0" target="_blank" href>
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
          <a class="py-2 px-3 md:px-0" target="_blank" href>
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
          <a class="py-2 px-3 md:px-0" target="_blank" href>
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
          <a class="py-2 px-3 md:px-0" target="_blank" href>
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
        <!-- Logo -->
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
export default {
  components: {
    Logo,
    Icon
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
