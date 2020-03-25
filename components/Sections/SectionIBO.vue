<template>
  <div class="d-container">
    <div
      class="w-full flex flex-row flex-wrap justify-center lg:justify-around items-center pt-10 pb-10 lg:pt-16 lg:pb-24"
    >
      <div class="w-full md:w-4/5 lg:w-2/5 flex flex-col py-8 px-6">
        <!-- Header Text -->
        <h2
          class="font-bold text-2xl md:text-3xl text-center lg:text-left leading-tight text-dtPrimary"
        >{{$t('IBOSection.header')}}</h2>
        <!-- Paragraph Text -->
        <p class="text-lg text-dtText text-center lg:text-left mt-2">{{$t('IBOSection.paragraph')}}</p>
      </div>
      <!-- Illustration -->
      <IllustrationIBO class="w-10/12 md:w-2/4 lg:w-1/3 order-first lg:order-last" />
    </div>
  </div>
</template>
<script>
import IllustrationIBO from "~/components/Illustrations/IllustrationIBO.vue";
export default {
  components: {
    IllustrationIBO
  }
};
</script>
