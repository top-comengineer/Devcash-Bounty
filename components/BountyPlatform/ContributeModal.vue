<template>
  <div
    :class="
      $store.state.theme.dt
        ? 'bg-dtBackgroundSecondary shadow-4xlS'
        : 'bg-ltBackgroundSecondary shadow-4xl'
    "
    class="overflow-auto w-full max-h-full justify-center rounded-tl-4xl rounded-br-4xl rounded-tr-2xl rounded-bl-2xl px-4 py-3 md:px-5 md:py-4 relative"
  >
    <!-- Close Button -->
    <div class="absolute top-0 right-0 z-40">
      <button
        @mouseover="isCloseHovered = true"
        @mouseleave="isCloseHovered = false"
        @focus="isCloseFocused = true"
        @blur="isCloseFocused = false"
        @click="$store.commit('general/closeContributeModal')"
        :class="
          $store.state.theme.dt
            ? 'bg-dtBackgroundSecondary'
            : 'bg-ltBackgroundSecondary'
        "
        class="fixed closeButton p-3 md:p-4 transform -translate-x-full z-40"
      >
        <Icon
          :class="isCloseHovered || isCloseFocused ? 'scale-120' : 'scale-100'"
          :colorClass="$store.state.theme.dt ? 'text-dtText' : 'text-ltText'"
          class="w-6 h-6 md:w-8 md:h-8 transition-all duration-200 ease-out transform"
          type="cancel"
        />
      </button>
    </div>
    <!-- Greeting Card -->
    <GreetingCard
      :header="$t('bountyPlatform.singleBounty.contribute.cardHeader')"
      :paragraph="$t('bountyPlatform.singleBounty.contribute.cardParagraph')"
      type="contribute"
      class="my-1 md:my-2"
    />
    <!-- Card for Description -->
    <div
      :class="[
        $store.state.theme.dt
          ? 'bg-dtBackgroundSecondary shadow-xlDSS'
          : 'bg-ltBackgroundSecondary shadow-lg'
      ]"
      class="w-full flex flex-row flex-wrap relative rounded-tl-3xl rounded-br-3xl rounded-tr-lg rounded-bl-lg pt-4 pb-8 px-6 md:pt-6 md:pb-10 md:px-10 mt-1 md:mt-2 mb-2"
    >
      <!-- Pick an amount -->
      <div class="w-full flex flex-row flex-wrap">
        <!-- Header -->
        <div class="w-full flex flex-row justify-center items-center mt-4">
          <!-- Line Left -->
          <div
            :class="$store.state.theme.dt ? 'bg-dtText' : 'bg-ltText'"
            class="flex-1 h-px2 opacity-10 rounded-tl-full rounded-br-full"
          ></div>
          <!-- Header Text -->
          <h5
            class="font-bold text-xl text-center leading-tight px-6"
          >{{ $t("bountyPlatform.singleBounty.contribute.pickAmount") }}</h5>
          <!-- Line Right -->
          <div
            :class="$store.state.theme.dt ? 'bg-dtText' : 'bg-ltText'"
            class="flex-1 h-px2 opacity-10 rounded-bl-full"
          ></div>
        </div>
        <!-- Amount Buttons -->
        <div class="w-full flex flex-row flex-wrap justify-center my-2">
          <!-- {D}10,000 Button -->
          <div class="w-full md:w-48 flex flex-col items-center my-2 mx-3">
            <button
              :class="
                $store.state.theme.dt ? 'btn-dtSecondary' : 'btn-ltSecondary'
              "
              class="w-full hover_scale-md focus_scale-md bg-dtSecondary text-dtText font-extrabold text-xl rounded-tl-2xl rounded-br-2xl rounded-tr-md rounded-bl-md px-8 py-2 my-2 mx-2"
            >{{ "{D}10,000" }}</button>
            <p>{{ "(Ξ0.0378 / $5)" }}</p>
          </div>
          <!-- {D}20,000 Button -->
          <div class="w-full md:w-48 flex flex-col items-center my-2 mx-3">
            <button
              :class="
                $store.state.theme.dt ? 'btn-dtSecondary' : 'btn-ltSecondary'
              "
              class="w-full hover_scale-md focus_scale-md bg-dtSecondary text-dtText font-extrabold text-xl rounded-tl-2xl rounded-br-2xl rounded-tr-md rounded-bl-md px-8 py-2 my-2 mx-2"
            >{{ "{D}20,000" }}</button>
            <p>{{ "(Ξ0.0757 / $10)" }}</p>
          </div>
          <!-- {D}40,000 Button -->
          <div class="w-full md:w-48 flex flex-col items-center my-2 mx-3">
            <button
              :class="
                $store.state.theme.dt ? 'btn-dtSecondary' : 'btn-ltSecondary'
              "
              class="w-full hover_scale-md focus_scale-md bg-dtSecondary text-dtText font-extrabold text-xl rounded-tl-2xl rounded-br-2xl rounded-tr-md rounded-bl-md px-8 py-2 my-2 mx-2"
            >{{ "{D}40,000" }}</button>
            <p>{{ "(Ξ0.1551 / $20)" }}</p>
          </div>
        </div>
      </div>
      <!-- Or enter a custom one-->
      <div class="w-full my-4 flex flex-col items-center">
        <!-- Header -->
        <div class="w-full flex flex-row justify-center items-center mt-6">
          <!-- Line Left -->
          <div
            :class="$store.state.theme.dt ? 'bg-dtText' : 'bg-ltText'"
            class="flex-1 h-px2 opacity-10 rounded-tl-full rounded-br-full"
          ></div>
          <!-- Header Text -->
          <h5 class="font-bold text-xl text-center leading-tight px-6">
            {{
            $t("bountyPlatform.singleBounty.contribute.orEnterCustomAmount")
            }}
          </h5>
          <!-- Line Right -->
          <div
            :class="$store.state.theme.dt ? 'bg-dtText' : 'bg-ltText'"
            class="flex-1 h-px2 opacity-10 rounded-bl-full"
          ></div>
        </div>
        <!-- Custom Amount -->
        <div class="w-full lg:w-2/3 flex flex-row justify-center items-start flex-wrap my-8">
          <!-- Enter Amount -->
          <input
            :class="[
              $store.state.theme.dt
                ? 'bg-dtBackgroundTertiary'
                : 'bg-ltBackgroundTertiary'
            ]"
            class="commentArea w-full md:flex-1 text-lg font-bold border border-dtSecondary rounded-lg px-4 py-2"
            type="text"
            :placeholder="
              $t(
                'bountyPlatform.singleBounty.contribute.customAmountPlaceholder'
              )
            "
          />
          <!-- Contribute Button -->
          <button
            :class="
              $store.state.theme.dt ? 'btn-dtSecondary' : 'btn-ltSecondary'
            "
            class="w-full md:w-auto hover_scale-md focus_scale-md bg-dtSecondary text-dtText font-extrabold text-xl rounded-tl-2xl rounded-br-2xl rounded-tr-md rounded-bl-md px-8 py-2 mt-3 md:mt-0 md:ml-4"
          >{{ $t("bountyPlatform.singleBounty.contribute.buttonContribute") }}</button>
        </div>
      </div>
      <!-- Divider -->
      <div
        :class="$store.state.theme.dt ? 'bg-dtText' : 'bg-ltText'"
        class="w-full h-px2 opacity-10 rounded-tl-full rounded-br-full"
      ></div>
      <!-- Bounty Address & QR Card -->
      <div class="w-full flex flex-row justify-center mt-8">
        <div>
          <BountyAddressCard
            address="0x8a90193c9d3339870dd310b0f6b77c429239340d06f05a4200b3393f242108c2"
            bountyAddress="0x3cd6d449c38238474bc2fa50bb5665786d3f84b3"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GreetingCard from "~/components/BountyPlatform/GreetingCard.vue";
import BountyAddressCard from "~/components/BountyPlatform/BountyAddressCard.vue";
import CTACard from "~/components/BountyPlatform/CTACard.vue";
import Icon from "~/components/Icon.vue";
export default {
  layout: "bountyPlatform",
  components: {
    GreetingCard,
    BountyAddressCard,
    CTACard,
    Icon
  },
  data() {
    return {
      isCloseHovered: false,
      isCloseFocused: false
    };
  }
};
</script>
<style scoped>
.contributeModal {
  overflow-y: scroll;
}
.closeButton {
  border-top-left-radius: 2rem;
  border-top-right-radius: 0.75rem;
  border-bottom-left-radius: 2rem;
  border-bottom-left-radius: 2rem;
}
</style>
