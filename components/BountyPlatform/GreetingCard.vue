<template>
  <div
    :class="
      [!$store.state.theme.dt?'shadow-lgS':'']
    "
    class="w-full flex flex-col relative overflow-hidden flex-wrap justify-center items-center bg-dtPrimary py-6 md:py-10 px-6 md:px-6 lg:px-8 rounded-tl-3xl rounded-br-3xl rounded-tr-lg rounded-bl-lg"
  >
    <!-- Left Background Illustration -->
    <img
      v-if="type=='post'"
      class="hidden md:block h-full w-auto absolute left-0"
      :src="require('~/assets/images/illustrations/background/plus-left.svg')"
      alt="Post Left Illustration"
    />
    <img
      v-else-if="type=='submission'"
      class="hidden md:block h-full w-auto absolute left-0"
      :src="require('~/assets/images/illustrations/background/submission-left.svg')"
      alt="Submission Left Illustration"
    />
    <img
      v-else-if="type=='contribute'"
      class="hidden md:block h-full w-auto absolute left-0"
      :src="require('~/assets/images/illustrations/background/contribute-left.svg')"
      alt="Contribute Left Illustration"
    />
    <img
      v-else
      class="hidden md:block h-full w-auto absolute left-0 ml-4 md:ml-8"
      :src="require('~/assets/images/illustrations/background/explore-left.svg')"
      alt="Explore Left Illustration"
    />
    <!-- Header and Paragraph -->
    <div
      class="w-full md:w-3/4 xl:w-7/12 flex flex-col flex-wrap justify-center items-center mb-2 md:mb-4"
    >
      <h1
        class="text-3xl font-extrabold text-center text-dtText"
      >{{header != null ? header : $t("bountyPlatform.explore.cardHeader")}}</h1>
      <h2
        class="text-md md:text-xl text-center mt-1 text-dtText"
      >{{paragraph != null ? paragraph : $t("bountyPlatform.explore.cardParagraph")}}</h2>
    </div>
    <!-- Right Background Illustration -->
    <img
      v-if="type == 'post'"
      class="h-full w-auto absolute right-0"
      :src="require('~/assets/images/illustrations/background/plus-right.svg')"
      alt="Post Right Illustration"
    />
    <img
      v-else-if="type=='submission'"
      class="h-full w-auto absolute right-0"
      :src="require('~/assets/images/illustrations/background/submission-right.svg')"
      alt="Submission Right Illustration"
    />
    <img
      v-else-if="type=='contribute'"
      class="h-full w-auto absolute right-0"
      :src="require('~/assets/images/illustrations/background/contribute-right.svg')"
      alt="Contribute Right Illustration"
    />
    <img
      v-else
      class="h-full w-auto absolute right-0 mr-4 md:mr-8"
      :src="require('~/assets/images/illustrations/background/explore-right.svg')"
      alt="Explore Right Illustration"
    />
  </div>
</template>
<script>
export default {
  props: {
    type: null,
    header: null,
    paragraph: null
  }
};
</script>