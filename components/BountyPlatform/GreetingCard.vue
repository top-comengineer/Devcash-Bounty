<template>
  <div
    :class="
      [!$store.state.theme.dt?'shadow-lgS':'']
    "
    class="w-full flex flex-col relative overflow-hidden flex-wrap justify-center items-center bg-dtPrimary py-6 md:py-10 px-6 md:px-8 fill-current rounded-tl-3xl rounded-br-3xl rounded-tr-lg rounded-bl-lg"
  >
    <img
      class="hidden md:block h-full w-auto absolute left-0 ml-4 md:ml-8"
      :src="require('~/assets/images/illustrations/background/explore-left.svg')"
      alt="Left Illustration"
    />
    <div
      class="w-full md:w-3/4 xl:w-7/12 flex flex-col flex-wrap justify-center items-center mb-2 md:mb-4"
    >
      <h1
        class="text-3xl font-extrabold text-center text-dtText"
      >{{$t("bountyPlatform.explore.cardHeader")}}</h1>
      <h2
        class="text-md md:text-xl text-center mt-1 text-dtText"
      >{{$t("bountyPlatform.explore.cardParagraph")}}</h2>
    </div>
    <img
      class="h-full w-auto absolute right-0 mr-4 md:mr-8"
      :src="require('~/assets/images/illustrations/background/explore-right.svg')"
      alt="Right Illustration"
    />
  </div>
</template>
<script>
import IllustrationExploreLeft from "~/components/Illustrations/Background/IllustrationExploreLeft.vue";
import IllustrationExploreRight from "~/components/Illustrations/Background/IllustrationExploreRight.vue";
export default {
  components: {
    IllustrationExploreLeft,
    IllustrationExploreRight
  }
};
</script>