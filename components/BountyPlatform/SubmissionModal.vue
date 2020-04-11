<template>
  <div
    :class="$store.state.theme.dt?'bg-dtBackgroundSecondary shadow-4xlS':'bg-ltBackgroundSecondary shadow-4xl'"
    class="overflow-y-scroll w-full max-h-full justify-center rounded-tl-4xl rounded-br-4xl rounded-tr-2xl rounded-bl-2xl px-4 py-3 md:px-6 md:py-5 relative"
  >
    <!-- Close Button -->
    <div class="absolute top-0 right-0 z-40">
      <button
        @mouseover="isCloseHovered=true"
        @mouseleave="isCloseHovered=false"
        @focus="isCloseFocused=true"
        @blur="isCloseFocused=false"
        @click="$store.commit('general/closeSubmissionModal')"
        :class="$store.state.theme.dt?'bg-dtBackgroundSecondary':'bg-ltBackgroundSecondary'"
        class="fixed closeButton p-3 md:p-4 transform -translate-x-full z-40"
      >
        <Icon
          :class="isCloseHovered || isCloseFocused? 'scale-120':'scale-100'"
          :colorClass="$store.state.theme.dt?'text-dtText':'text-ltText'"
          class="w-6 h-6 md:w-8 md:h-8 transition-all duration-200 ease-out transform"
          type="cancel"
        />
      </button>
    </div>
    <!-- Greeting Card -->
    <GreetingCard
      :header="$t('bountyPlatform.singleBounty.submission.cardHeader')"
      :paragraph="$t('bountyPlatform.singleBounty.submission.cardParagraph')"
      type="submission"
      class="my-1 md:my-2"
    />
    <!-- Submit Form -->
    <form class="w-full" action>
      <!-- Card for Description -->
      <div
        :class="
      [$store.state.theme.dt?'bg-dtBackgroundSecondary shadow-xlDSS':'bg-ltBackgroundSecondary shadow-lg']
    "
        class="w-full flex flex-row flex-wrap relative rounded-tl-3xl rounded-tr-lg pt-4 pb-8 px-6 md:pt-6 md:pb-10 md:px-10 mt-1 md:mt-2"
      >
        <!-- Submission Description -->
        <div class="w-full flex flex-col my-3">
          <h3
            class="text-2xl font-bold px-3"
          >{{$t('bountyPlatform.singleBounty.submission.descriptionHeader')}}</h3>
          <textarea
            :class="[$store.state.theme.dt?'bg-dtBackgroundTertiary border-dtBackgroundTertiary':'bg-ltBackgroundTertiary border-ltBackgroundTertiary']"
            class="submissionDescArea w-full leading-loose text-lg font-bold border focus:border-dtPrimary rounded-lg transition-all duration-200 ease-out px-4 py-2 md:py-4 md:px-6 mt-2"
            type="text"
            :placeholder="$t('bountyPlatform.singleBounty.submission.descriptionPlaceholder')"
          />
        </div>
      </div>
      <!-- Card for Attachments -->
      <div
        :class="[$store.state.theme.dt?'bg-dtBackgroundSecondary shadow-xlDSS':'bg-ltBackgroundSecondary shadow-lg']"
        class="w-full flex flex-row flex-wrap relative pt-4 pb-8 px-6 md:pt-6 md:pb-10 md:px-10 mt-1 md:mt-2"
      >
        <!-- Attachments -->
        <div class="w-full md:flex-1 flex flex-col my-3">
          <h3 class="text-xl font-bold px-3">
            {{$t('bountyPlatform.singleBounty.submission.attachments')}}
            <span
              class="text-sm font-normal opacity-75"
            >{{$t('bountyPlatform.singleBounty.submission.optional')}}</span>
          </h3>
          <div class="flex flex-row flex-wrap items-center">
            <!-- Choose a File Button -->
            <button
              :class="$store.state.theme.dt?'btn-dtPrimary':'btn-ltPrimary'"
              class="hover_scale-md focus_scale-md bg-dtPrimary text-dtText font-extrabold text-xl rounded-tl-2xl rounded-br-2xl rounded-tr-md rounded-bl-md px-8 py-1_5 mt-3 mr-6"
            >{{ $t("bountyPlatform.singleBounty.submission.buttonChooseFile") }}</button>
            <!-- Choosen File Display -->
            <div
              :class="[$store.state.theme.dt?'bg-dtBackgroundTertiary':'bg-ltBackgroundTertiary']"
              class="w-auto text-lg rounded-lg transition-all duration-200 ease-out px-4 py-2 mt-3"
            >
              <p class="opacity-50">{{$t('bountyPlatform.singleBounty.submission.noFile')}}</p>
            </div>
          </div>
        </div>
      </div>
      <!-- Card for Contact Name and Email -->
      <div
        :class="[$store.state.theme.dt?'bg-dtBackgroundSecondary shadow-xlDSS':'bg-ltBackgroundSecondary shadow-lg']"
        class="w-full flex flex-row flex-wrap relative pt-4 pb-8 px-6 md:pt-6 md:pb-10 md:px-10 mt-1 md:mt-2"
      >
        <!-- Contact Name -->
        <div class="w-full md:flex-1 flex flex-col my-3">
          <h3 class="text-xl font-bold px-3">{{$t('bountyPlatform.post.contactName')}}</h3>
          <input
            :class="[$store.state.theme.dt?'bg-dtBackgroundTertiary border-dtBackgroundTertiary':'bg-ltBackgroundTertiary border-ltBackgroundTertiary']"
            class="w-full text-lg font-bold border focus:border-dtPrimary rounded-lg transition-all duration-200 ease-out px-4 py-2 mt-2"
            type="text"
            :placeholder="$t('bountyPlatform.post.contactNamePlaceholder')"
          />
        </div>
        <!-- Divider -->
        <div class="hidden md:block w-12"></div>
        <!-- Contact Email -->
        <div class="w-full md:flex-1 flex flex-col my-3">
          <h3 class="text-xl font-bold px-3">{{$t('bountyPlatform.post.contactEmail')}}</h3>
          <input
            :class="[$store.state.theme.dt?'bg-dtBackgroundTertiary border-dtBackgroundTertiary':'bg-ltBackgroundTertiary border-ltBackgroundTertiary']"
            class="w-full text-lg font-bold border focus:border-dtPrimary rounded-lg transition-all duration-200 ease-out px-4 py-2 mt-2"
            type="text"
            :placeholder="$t('bountyPlatform.post.contactEmailPlaceholder')"
          />
        </div>
      </div>
    </form>
    <!-- Call to Action Card -->
    <CTACard
      class="my-1 md:my-2"
      :buttonAction="null"
      :buttonText="$t('bountyPlatform.singleBounty.submission.buttonSubmit')"
    />
  </div>
</template>

<script>
import GreetingCard from "~/components/BountyPlatform/GreetingCard.vue";
import CTACard from "~/components/BountyPlatform/CTACard.vue";
import Icon from "~/components/Icon.vue";
export default {
  layout: "bountyPlatform",
  components: {
    GreetingCard,
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
.submissionDescArea {
  min-height: 18rem;
  height: 18rem;
  transform-origin: center top;
}
.closeButton {
  border-top-left-radius: 2rem;
  border-top-right-radius: 0.75rem;
  border-bottom-left-radius: 2rem;
  border-bottom-left-radius: 2rem;
}
</style>
