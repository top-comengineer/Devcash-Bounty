<template>
  <div class="d-container pt-12 pb-12 md:pt-20 md:pb-14 lg:pt-32 lg:pb-36">
    <div class="w-full flex flex-row flex-wrap justify-center items-center">
      <div class="w-full flex flex-col items-center">
        <!-- Illustration -->
        <IllustrationDEX class="w-11/12 md:w-3/4" />
        <!-- Header Text -->
        <h2
          class="font-bold text-2xl md:text-3xl text-center leading-tight text-dtPrimary px-6 mt-6 md:mt-8"
        >{{$t('dexSection.header')}}</h2>
        <!-- Paragraph Text -->
        <div class="w-full md:w-2/3 xl:w-7/12 flex flex-row justify-center px-4 mt-4 mb-2">
          <p class="text-lg text-dtText text-center">{{$t('dexSection.paragraph')}}</p>
        </div>
        <!-- Call to Action -->
        <div class="flex flex-row justify-center">
          <button
            class="bg-dtPrimary text-dtText font-extrabold text-xl rounded-tl-xl2 rounded-br-xl2 rounded-tr-md rounded-bl-md px-12 py-2 my-4"
          >{{ $t("dexSection.ctaButton") }}</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import IllustrationDEX from "~/components/Illustrations/IllustrationDEX.vue";
export default {
  components: {
    IllustrationDEX
  }
};
</script>
