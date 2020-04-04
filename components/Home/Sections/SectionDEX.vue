<template>
  <div class="overflow-x-hidden">
    <div class="d-container pt-12 pb-12 md:pt-20 md:pb-14 lg:pt-32 lg:pb-36">
      <div class="w-full flex flex-row flex-wrap justify-center items-center">
        <div class="w-11/12 md:w-3/4 flex flex-col items-center">
          <div class="w-full relative">
            <!-- Background Illustration Right Window -->
            <IllustrationWindowRight
              class="w-64 md:w-56 lg:w-64 h-auto absolute top-0 right-0 -mr-48 -mt-8 md:-mr-48 md:-mt-12 lg:-mr-36 lg:-mt-8"
            />
            <!-- Background Illustration Left Window -->
            <IllustrationWindowLeft
              class="w-64 md:w-56 lg:w-64 h-auto absolute top-0 md:bottom-0 left-0 -mt-8 -ml-48 md:-ml-48 md:-mb-24 lg:-ml-36 lg:-mb-20"
            />
            <!-- Illustration -->
            <IllustrationDEX class="w-full relative" />
          </div>
          <!-- Header Text -->
          <h2
            class="font-bold text-2xl md:text-3xl text-center leading-tight text-dtPrimary px-6 mt-6 md:mt-8 relative"
          >{{ $t("dexSection.header") }}</h2>
          <!-- Paragraph Text -->
          <div
            class="w-full md:w-2/3 xl:w-7/12 flex flex-row justify-center px-4 mt-4 mb-2 relative"
          >
            <p class="text-lg text-center">{{ $t("dexSection.paragraph") }}</p>
          </div>
          <!-- Call to Action -->
          <div class="flex flex-row justify-center relative">
            <button
              :class="$store.state.theme.dt?'btn-dtPrimary':'btn-ltPrimary'"
              class="hover_scale-md focus_scale-md bg-dtPrimary text-dtText font-extrabold text-xl rounded-tl-2xl rounded-br-2xl rounded-tr-md rounded-bl-md px-12 py-2 my-4"
            >{{ $t("dexSection.ctaButton") }}</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import IllustrationDEX from "~/components/Illustrations/IllustrationDEX.vue";
import IllustrationWindowLeft from "~/components/Illustrations/Background/IllustrationWindowLeft.vue";
import IllustrationWindowRight from "~/components/Illustrations/Background/IllustrationWindowRight.vue";
export default {
  components: {
    IllustrationDEX,
    IllustrationWindowLeft,
    IllustrationWindowRight
  }
};
</script>
