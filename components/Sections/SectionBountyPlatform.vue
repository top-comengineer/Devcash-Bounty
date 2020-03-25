<template>
  <div class="d-container">
    <div class="w-full flex flex-row flex-wrap justify-center items-center pt-8 pb-12 lg:py-12">
      <div class="w-full flex flex-col items-center">
        <!-- Header Text -->
        <h2
          class="font-bold text-2xl md:text-3xl text-center leading-tight text-dtPrimary px-6"
        >{{$t('bountyPlatformSection.header')}}</h2>
        <!-- Paragraph Text -->
        <div class="w-full md:w-2/3 xl:w-7/12 flex flex-row justify-center px-4 mt-4 mb-2">
          <p class="text-lg text-dtText text-center">{{$t('bountyPlatformSection.paragraph')}}</p>
        </div>
      </div>
      <!-- Cards -->
      <div class="w-full flex flex-row flex-wrap justify-center">
        <!-- Indicator -->
        <div class="w-full hidden md:flex flex-col items-center mt-2 px-6">
          <IllustrationIndicator class="md:w-1/2 lg:w-2/5" />
        </div>
        <!-- Post Bounties Card -->
        <div class="w-full md:w-1/2 lg:w-2/5 px-4 py-2 md:pl-6 md:pr-3 mt-3">
          <div
            class="w-full flex flex-col items-center rounded-tl-xl4 rounded-br-xl4 rounded-tr-xl rounded-bl-xl border-2 border-dtPrimary px-4 py-6"
          >
            <!-- Post Bounties Header -->
            <h3
              class="font-bold text-xl md:text-2xl text-center leading-tight text-dtPrimary px-6"
            >{{$t('bountyPlatformSection.postBountyHeader')}}</h3>
            <!-- Post Bounties Paragraph -->
            <p
              class="text-lg text-dtText text-center mt-2 px-4"
            >{{$t('bountyPlatformSection.postBountyParagraph')}}</p>
            <!-- Post Bounties Illustration -->
            <IllustrationPostBounty class="w-3/4 h-auto mt-4" />
            <!-- Post Bounties Call to Action -->
            <div class="flex flex-row justify-center">
              <button
                class="bg-dtPrimary text-dtText font-extrabold text-xl rounded-tl-xl2 rounded-br-xl2 rounded-tr-md rounded-bl-md px-12 py-2 my-4"
              >{{ $t("bountyPlatformSection.postBountyButton") }}</button>
            </div>
          </div>
        </div>
        <!-- Hunt Bounties Card -->
        <div class="w-full md:w-1/2 lg:w-2/5 px-4 py-2 md:pr-6 md:pl-3 mt-3">
          <div
            class="w-full flex flex-col items-center rounded-tl-xl4 rounded-br-xl4 rounded-tr-xl rounded-bl-xl border-2 border-dtPrimary px-4 py-6"
          >
            <!-- Hunt Bounties Header -->
            <h3
              class="font-bold text-xl md:text-2xl text-center leading-tight text-dtPrimary px-6"
            >{{$t('bountyPlatformSection.huntBountyHeader')}}</h3>
            <!-- Hunt Bounties Paragraph -->
            <p
              class="text-lg text-dtText text-center mt-2 px-4"
            >{{$t('bountyPlatformSection.huntBountyParagraph')}}</p>
            <!-- Hunt Bounties Illustration -->
            <IllustrationHuntBounty class="w-3/4 h-auto mt-4" />
            <!-- Hunt Bounties Call to Action -->
            <div class="flex flex-row justify-center">
              <button
                class="bg-dtPrimary text-dtText font-extrabold text-xl rounded-tl-xl2 rounded-br-xl2 rounded-tr-md rounded-bl-md px-12 py-2 my-4"
              >{{ $t("bountyPlatformSection.huntBountyButton") }}</button>
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
export default {
  components: {
    IllustrationPostBounty,
    IllustrationHuntBounty,
    IllustrationIndicator
  }
};
</script>
