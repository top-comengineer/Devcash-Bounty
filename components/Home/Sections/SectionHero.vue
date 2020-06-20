<template>
  <div
    class="w-full flex flex-row flex-wrap justify-center items-center overflow-hidden pt-16 pb-8 lg:pt-24 lg:pb:12"
  >
    <!-- Illustration -->
    <div class="w-full lg:w-1/2 flex flex-col order-first lg:order-last">
      <div class="hero-illustration">
        <img
          class="w-full h-auto"
          :src="require('~/assets/images/illustrations/foreground/hero.svg')"
          alt="Hero Illustration"
        />
      </div>
    </div>
    <!-- Header, Paragraph and CTA Button -->
    <div class="w-full md:w-3/4 lg:w-1/2 flex flex-col py-4">
      <div class="flex flex-row justify-center lg:justify-start">
        <div class="spacer"></div>
        <div
          class="flex flex-1 flex-col items-center lg:items-start hero-text px-4 py-4 md:px-16 md:py-6"
        >
          <h1
            class="text-c-primary font-extrabold text-3xl md:text-4xl text-center lg:text-left leading-tight"
            v-html="$t('home.heroSection.header')"
          ></h1>
          <div class="w-full xl:w-10/12 flex flex-row">
            <p class="text-xl text-center lg:text-left mt-2">{{ $t("home.heroSection.paragraph") }}</p>
          </div>
          <div class="flex flex-row my-4">
            <nuxt-link
              class="btn-primary bg-c-primary text-c-light transform hover:scale-md focus:scale-md transition-all duration-200 ease-out origin-bottom-left font-extrabold text-xl rounded-tl-2xl rounded-br-2xl rounded-tr-md rounded-bl-md px-8 py-2"
              :to="localePath('bountyplatform')"
            >{{ $t("home.heroSection.ctaButton") }}</nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.spacer {
  width: calc((100vw - 1280px) / 2);
}
.hero-illustration {
  margin-right: -95%;
  margin-top: -53%;
  margin-left: 5%;
}
@media only screen and (min-width: 640px) {
  .hero-illustration {
    margin-right: -70%;
    margin-top: -40%;
    margin-left: 10%;
  }
}
@media only screen and (min-width: 1024px) {
  .hero-illustration {
    margin-right: -60%;
    margin-left: 3%;
    margin-top: -40%;
  }
}
</style>
