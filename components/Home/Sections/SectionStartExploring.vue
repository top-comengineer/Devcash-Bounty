<template>
  <div class="overflow-x-hidden">
    <div class="d-container pt-20 pb-32 md:pt-24 md:pb-40 lg:pb-48">
      <div class="w-full flex flex-row flex-wrap justify-center items-center">
        <!-- Start Exploring Card Container -->
        <div class="w-full md:w-4/5 lg:w-3/5 items-center relative px-4">
          <!-- Background Illustration Compass -->
          <IllustrationCompass
            class="w-64 md:w-56 lg:w-64 h-auto absolute top-0 right-0 -mr-16 -mt-20 md:-mr-40 md:-mt-20 lg:-mr-36 lg:-mt-20"
          />
          <!-- Background Illustration Search -->
          <IllustrationSearch
            class="w-64 md:w-64 lg:w-72 h-auto absolute left-0 bottom-0 -ml-24 -mb-24 md:-ml-32 md:-mb-24 lg:-ml-32 lg:-mb-32"
          />
          <!-- Start Exploring Card -->
          <div
            v-bind:class="[
              $store.state.theme.dt ? 'bg-dtBackground' : 'bg-ltBackground'
            ]"
            class="w-full flex flex-col items-center rounded-tl-4xl rounded-br-4xl rounded-tr-xl rounded-bl-xl border-2 border-dtPrimary px-2 md:px-4 py-10 relative"
          >
            <!-- Header Text -->
            <h2
              class="font-bold text-2xl md:text-3xl text-center leading-tight text-dtPrimary px-6 mt-2"
            >{{ $t("startExploringSection.header") }}</h2>
            <!-- Paragraph Text -->
            <div class="w-full flex flex-row justify-center px-4 mt-4 mb-2">
              <p class="text-lg text-center">{{ $t("startExploringSection.paragraph") }}</p>
            </div>
            <!-- Call to Action -->
            <div class="flex flex-row justify-center">
              <nuxt-link
                :class="$store.state.theme.dt?'btn-dt-primary':'btn-lt-primary'"
                :to="getLocalizedRoute('bountyplatform')"
                class="bg-dtPrimary text-dtText font-extrabold text-xl rounded-tl-2xl rounded-br-2xl rounded-tr-md rounded-bl-md px-6 md:px-12 py-2 my-4"
              >{{ $t("startExploringSection.ctaButton") }}</nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import IllustrationSearch from "~/components/Illustrations/Background/IllustrationSearch.vue";
import IllustrationCompass from "~/components/Illustrations/Background/IllustrationCompass.vue";
export default {
  components: {
    IllustrationSearch,
    IllustrationCompass
  }
};
</script>
