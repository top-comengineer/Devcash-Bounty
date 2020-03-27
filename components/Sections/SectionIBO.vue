<template>
  <div class="overflow-x-hidden">
    <div class="d-container relative z-10">
      <div
        class="w-full flex flex-row flex-wrap justify-center lg:justify-around items-center pt-12 pb-12 md:pt-16 md:pb-16 lg:pt-24 lg:pb-40"
      >
        <!-- Background Illustration Single D -->
        <IllustrationSingleD
          :sdwColorClass="
            $store.state.theme.dt ? 'text-dtBackground' : 'text-ltBackground'
          "
          class="w-32 md:w-56 lg:w-64 h-auto absolute right-0 top-0 -mr-8 md:-mr-10 lg:-mr-32"
        />
        <!-- Background Illustration Cube -->
        <IllustrationCube
          :sdwColorClass="
            $store.state.theme.dt ? 'text-dtBackground' : 'text-ltBackground'
          "
          class="w-48 md:w-64 lg:w-72 h-auto absolute bottom-0 left-0 -ml-16 md:-ml-10 lg:-ml-24"
        />
        <div class="w-full md:w-4/5 lg:w-2/5 flex flex-col py-8 px-6 relative">
          <!-- Header Text -->
          <h2
            class="font-bold text-2xl md:text-3xl text-center lg:text-left leading-tight text-dtPrimary"
          >
            {{ $t("IBOSection.header") }}
          </h2>
          <!-- Paragraph Text -->
          <p class="text-lg text-center lg:text-left mt-2">
            {{ $t("IBOSection.paragraph") }}
          </p>
        </div>
        <!-- Illustration -->
        <IllustrationIBO
          :sdwColorClass="
            $store.state.theme.dt ? 'text-dtBackground' : 'text-ltBackground'
          "
          class="w-10/12 md:w-2/4 lg:w-1/3 order-first lg:order-last relative"
        />
      </div>
    </div>
  </div>
</template>
<script>
import IllustrationIBO from "~/components/Illustrations/IllustrationIBO.vue";
import IllustrationCube from "~/components/Illustrations/Background/IllustrationCube.vue";
import IllustrationSingleD from "~/components/Illustrations/Background/IllustrationSingleD.vue";
export default {
  components: {
    IllustrationIBO,
    IllustrationCube,
    IllustrationSingleD
  }
};
</script>
<style lang=""></style>
