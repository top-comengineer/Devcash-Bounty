<template>
  <div class="overflow-x-hidden">
    <div class="d-container">
      <div
        class="w-full flex flex-row flex-wrap justify-center items-center pt-8 pb-12 lg:pt-12 md:pb-24"
      >
        <div class="w-full flex flex-col items-center">
          <!-- Header Text -->
          <h2
            class="font-bold text-2xl md:text-3xl text-center leading-tight text-dtPrimary px-6"
          >{{ $t("home.bountyPlatformSection.header") }}</h2>
          <!-- Paragraph Text -->
          <div class="w-full md:w-2/3 xl:w-7/12 flex flex-row justify-center px-4 mt-4 mb-2">
            <p class="text-lg text-center">{{ $t("home.bountyPlatformSection.paragraph") }}</p>
          </div>
        </div>
        <!-- Cards -->
        <div class="w-full flex flex-row flex-wrap justify-center">
          <!-- Indicator -->
          <div class="w-full hidden md:flex flex-col items-center mt-2 px-6">
            <IllustrationIndicator class="md:w-1/2 lg:w-2/5" />
          </div>
          <!-- Post Bounties Card Container -->
          <div class="w-full md:w-1/2 lg:w-2/5 px-4 py-2 md:pl-6 md:pr-3 mt-3 relative">
            <!-- Background Illustration Brackets -->
            <IllustrationBrackets
              class="hidden md:block md:w-64 lg:w-72 h-auto absolute left-0 bottom-0 md:-ml-24 lg:-ml-32 md:-mb-20 lg:-mb-20"
            />
            <!-- Post Bounties Card -->
            <div
              :class="[
                $store.state.theme.dt ? 'bg-dtBackground' : 'bg-ltBackground'
              ]"
              class="w-full flex flex-col items-center rounded-tl-4xl rounded-br-4xl rounded-tr-xl rounded-bl-xl border-2 border-dtPrimary px-4 py-6 relative"
            >
              <!-- Post Bounties Header -->
              <h3
                class="font-bold text-xl md:text-2xl text-center leading-tight text-dtPrimary px-6"
              >{{ $t("home.bountyPlatformSection.postBountyHeader") }}</h3>
              <!-- Post Bounties Paragraph -->
              <p
                class="text-lg text-center mt-2 px-4"
              >{{ $t("home.bountyPlatformSection.postBountyParagraph") }}</p>
              <!-- Post Bounties Illustration -->
              <IllustrationPostBounty class="w-3/4 h-auto mt-4" />
              <!-- Post Bounties Call to Action -->
              <div class="flex flex-row justify-center">
                <nuxt-link
                  :class="$store.state.theme.dt?'btn-dtPrimary':'btn-ltPrimary'"
                  :to="getLocalizedRoute('bountyplatform-post')"
                  class="hover_scale-md focus_scale-md bg-dtPrimary text-dtText font-extrabold text-xl rounded-tl-2xl rounded-br-2xl rounded-tr-md rounded-bl-md px-12 py-2 my-4"
                >{{ $t("home.bountyPlatformSection.postBountyButton") }}</nuxt-link>
              </div>
            </div>
          </div>
          <!-- Hunt Bounties Card Container -->
          <div class="w-full md:w-1/2 lg:w-2/5 px-4 py-2 md:pr-6 md:pl-3 mt-3 relative">
            <!-- Background Illustration Code -->
            <IllustrationCode
              class="hidden md:block md:w-56 lg:w-64 h-auto absolute top-0 right-0 md:-mr-32 lg:-mr-40 md:-mt-24 lg:-mt-36"
            />
            <!-- Hunt Bounties Card -->
            <div
              :class="[
                $store.state.theme.dt ? 'bg-dtBackground' : 'bg-ltBackground'
              ]"
              class="w-full flex flex-col items-center rounded-tl-4xl rounded-br-4xl rounded-tr-xl rounded-bl-xl border-2 border-dtPrimary px-4 py-6 relative"
            >
              <!-- Hunt Bounties Header -->
              <h3
                class="font-bold text-xl md:text-2xl text-center leading-tight text-dtPrimary px-6"
              >{{ $t("home.bountyPlatformSection.huntBountyHeader") }}</h3>
              <!-- Hunt Bounties Paragraph -->
              <p
                class="text-lg text-center mt-2 px-4"
              >{{ $t("home.bountyPlatformSection.huntBountyParagraph") }}</p>
              <!-- Hunt Bounties Illustration -->
              <IllustrationHuntBounty class="w-3/4 h-auto mt-4" />
              <!-- Hunt Bounties Call to Action -->
              <div class="flex flex-row justify-center">
                <nuxt-link
                  :class="$store.state.theme.dt?'btn-dtPrimary':'btn-ltPrimary'"
                  :to="getLocalizedRoute('bountyplatform')"
                  class="hover_scale-md focus_scale-md bg-dtPrimary text-dtText font-extrabold text-xl rounded-tl-2xl rounded-br-2xl rounded-tr-md rounded-bl-md px-12 py-2 my-4"
                >{{ $t("home.bountyPlatformSection.huntBountyButton") }}</nuxt-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import IllustrationPostBounty from "~/components/Illustrations/IllustrationPostBounty.vue";
import IllustrationHuntBounty from "~/components/Illustrations/IllustrationHuntBounty.vue";
import IllustrationIndicator from "~/components/Illustrations/IllustrationIndicator.vue";
import IllustrationBrackets from "~/components/Illustrations/Background/IllustrationBrackets.vue";
import IllustrationCode from "~/components/Illustrations/Background/IllustrationCode.vue";
export default {
  components: {
    IllustrationPostBounty,
    IllustrationHuntBounty,
    IllustrationIndicator,
    IllustrationBrackets,
    IllustrationCode
  }
};
</script>
