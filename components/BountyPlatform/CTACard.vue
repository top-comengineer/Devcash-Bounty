<template>
  <div
    :class="
      [!$store.state.theme.dt?'shadow-lgS':'']
    "
    class="w-full flex flex-row relative overflow-hidden flex-wrap justify-center items-center bg-dtSecondary py-6 md:py-10 px-6 md:px-8 rounded-b-3xl"
  >
    <!-- Left Background Illustration -->
    <img
      class="hidden md:block h-full w-auto absolute left-0"
      :src="require('~/assets/images/illustrations/background/arrows-left.svg')"
      alt="Arrows Left Illustration"
    />
    <!-- Header and Paragraph -->
    <button
      @click="buttonAction!=null?buttonAction:null"
      class="hover_scale-md bg-dtText text-dtSecondary btn-textSecondary font-extrabold text-xl rounded-tl-2xl rounded-br-2xl rounded-tr-md rounded-bl-md px-8 py-2 z-10"
    >{{ buttonText!=null?buttonText:"Button" }}</button>
    <!-- Right Background Illustration -->
    <img
      class="h-full w-auto absolute right-0"
      :src="require('~/assets/images/illustrations/background/arrows-right.svg')"
      alt="Arrows Right Illustration"
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
  },
  props: {
    buttonText: null,
    buttonAction: null
  }
};
</script>