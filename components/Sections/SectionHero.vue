<template>
  <div
    class="w-full flex flex-row flex-wrap justify-center items-center overflow-hidden pt-16 pb-8 lg:pt-24 lg:pb:12"
  >
    <!-- Illustration -->
    <div class="w-full lg:w-1/2 flex flex-col pl-8 order-first lg:order-last">
      <IllustrationHero />
    </div>
    <!-- Header, Paragraph and CTA Button -->
    <div class="w-full md:w-3/4 lg:w-1/2 flex flex-col py-4">
      <div class="flex flex-row justify-center lg:justify-start">
        <div class="spacer"></div>
        <div
          class="flex flex-col items-center lg:items-start hero-text px-4 py-4 md:px-16 md:py-6"
        >
          <h1
            class="font-extrabold text-3xl md:text-4xl text-center lg:text-left leading-tight text-dtPrimary"
            v-html="$t('heroSection.header')"
          ></h1>
          <p class="text-xl text-dtText text-center lg:text-left mt-2">
            {{ $t("heroSection.paragraph") }}
          </p>
          <div class="flex flex-row">
            <button
              @click="changeTheme"
              class="bg-dtPrimary text-dtText font-extrabold text-xl rounded-tl-xl2 rounded-br-xl2 rounded-tr-md rounded-bl-md px-8 py-2 my-4"
            >
              {{ $t("heroSection.ctaButton") }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import IllustrationHero from "~/components/Illustrations/IllustrationHero.vue";
export default {
  components: {
    IllustrationHero
  },
  methods: {
    changeTheme() {
      this.$store.commit("theme/change");
    }
  }
};
</script>
<style scoped>
.spacer {
  width: calc((100vw - 1280px) / 1.5);
}
</style>
