<template>
  <div class="w-full dt-footer-bg dt-footer-shadow rounded-tl-xl4 pt-10 pb-12">
    <div class="d-container">
      <div class="w-full flex flex-row flex-wrap justify-between px-10">
        <div class="flex flex-col w-1/5">
          <p class="my-2">{{ $t("navigation.home") }}</p>
          <p class="my-2">{{ $t("navigation.ibo") }}</p>
          <p class="my-2">{{ $t("navigation.bountyPlatform") }}</p>
          <p class="my-2">{{ $t("navigation.dex") }}</p>
        </div>
        <div class="flex flex-col w-1/5">
          <p class="my-2">{{ $t("bountyPlatform.exploreBounties") }}</p>
          <p class="my-2">{{ $t("bountyPlatform.createABounty") }}</p>
          <p class="my-2">{{ $t("bountyPlatform.visitDashboard") }}</p>
        </div>
        <div class="flex flex-col w-1/5">
          <p class="my-2">{{ $t("dex.buyDevcash") }}</p>
          <p class="my-2">{{ $t("dex.sellDevcash") }}</p>
        </div>
        <div class="flex flex-col w-1/5">
          <p class="my-2">{{ $t("social.discord") }}</p>
          <p class="my-2">{{ $t("social.facebook") }}</p>
          <p class="my-2">{{ $t("social.twitter") }}</p>
          <p class="my-2">{{ $t("social.medium") }}</p>
          <p class="my-2">{{ $t("social.github") }}</p>
        </div>
        <div class="self-center flex flex-col items-center">
          <Logo class="my-2" type="monoLight" />
          <p class="my-2">
            {{ $t("footer.credits").replace("%1", currentYear) }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Logo from "~/components/Logo.vue";
export default {
  components: {
    Logo
  },
  data: function() {
    return {
      currentYear: new Date().getFullYear()
    };
  }
};
</script>
<style></style>
