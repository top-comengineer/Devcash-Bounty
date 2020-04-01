<template>
  <div class="w-full flex flex-col justify-center items-center">
    <!-- Greeting Card -->
    <GreetingCard
      :header="$t('bountyPlatform.post.cardHeader')"
      :paragraph="$t('bountyPlatform.post.cardParagraph')"
      type="post"
      class="my-1 md:my-2"
    />
    <!-- Card for Bounty Title and Description -->
    <div
      :class="
      [$store.state.theme.dt?'bg-dtBackgroundSecondary':'bg-ltBackgroundSecondary shadow-lg']
    "
      class="w-full flex flex-row flex-wrap relative rounded-tl-3xl rounded-tr-lg pt-4 pb-8 px-6 md:pt-6 md:pb-10 md:px-10 xl:px-16 mt-1 md:mt-2"
    >
      <!-- Bounty Title -->
      <div class="w-full md:w-1/2 flex flex-col my-3">
        <h3 class="text-2xl font-bold px-3">{{$t('bountyPlatform.post.bountyTitle')}}</h3>
        <div class="w-full flex flex-row">
          <input
            :class="[$store.state.theme.dt?'bg-dtBackgroundTertiary border-dtBackgroundTertiary':'bg-ltBackgroundTertiary border-ltBackgroundTertiary']"
            class="flex-1 text-lg font-bold border focus:border-dtPrimary rounded-lg transition-all duration-200 ease-out px-4 py-2 mt-2"
            type="text"
            :placeholder="$t('bountyPlatform.post.bountyTitlePlaceholder')"
          />
          <!-- Divider -->
          <div class="hidden md:block w-8"></div>
        </div>
      </div>
      <!-- Bounty Description -->
      <div class="w-full flex flex-col my-3">
        <h3 class="text-2xl font-bold px-3">{{$t('bountyPlatform.post.bountyDescription')}}</h3>
        <input
          :class="[$store.state.theme.dt?'bg-dtBackgroundTertiary border-dtBackgroundTertiary':'bg-ltBackgroundTertiary border-ltBackgroundTertiary']"
          class="w-full text-lg font-bold border focus:border-dtPrimary rounded-lg transition-all duration-200 ease-out px-4 py-2 mt-2"
          type="text"
          :placeholder="$t('bountyPlatform.post.bountyDescriptionPlaceholder')"
        />
      </div>
    </div>
    <!-- Card for Number of Bounties and Bounty Amount -->
    <div
      :class="
      [$store.state.theme.dt?'bg-dtBackgroundSecondary':'bg-ltBackgroundSecondary shadow-lg']
    "
      class="w-full flex flex-row flex-wrap relative pt-4 pb-8 px-6 md:pt-6 md:pb-10 md:px-10 xl:px-16 mt-1 md:mt-2"
    >
      <!-- Number of Bounties -->
      <div class="w-full md:flex-1 flex flex-col my-3">
        <h3 class="text-xl font-bold px-3">{{$t('bountyPlatform.post.bountyCount')}}</h3>
        <input
          :class="[$store.state.theme.dt?'bg-dtBackgroundTertiary border-dtBackgroundTertiary':'bg-ltBackgroundTertiary border-ltBackgroundTertiary']"
          class="w-full text-lg font-bold border focus:border-dtPrimary rounded-lg transition-all duration-200 ease-out px-4 py-2 mt-2"
          type="text"
          :placeholder="$t('bountyPlatform.post.bountyCountPlaceholder')"
        />
      </div>
      <!-- Divider -->
      <div class="hidden md:block w-16"></div>
      <!-- Bounty Amount -->
      <div class="w-full md:flex-1 flex flex-col my-3">
        <h3 class="text-xl font-bold px-3">
          {{$t('bountyPlatform.post.bountyAmount')}}
          <span
            class="text-sm font-normal opacity-75"
          >{{$t('bountyPlatform.post.bountyForEach')}}</span>
        </h3>
        <input
          :class="[$store.state.theme.dt?'bg-dtBackgroundTertiary border-dtBackgroundTertiary':'bg-ltBackgroundTertiary border-ltBackgroundTertiary']"
          class="w-full text-lg font-bold border focus:border-dtPrimary rounded-lg transition-all duration-200 ease-out px-4 py-2 mt-2"
          type="text"
          :placeholder="$t('bountyPlatform.post.bountyAmountPlaceholder')"
        />
      </div>
    </div>
    <!-- Card for Deadline -->
    <div
      :class="
      [$store.state.theme.dt?'bg-dtBackgroundSecondary':'bg-ltBackgroundSecondary shadow-lg']
    "
      class="w-full flex flex-row flex-wrap relative pt-4 pb-8 px-6 md:pt-6 md:pb-10 md:px-10 xl:px-16 mt-1 md:mt-2"
    >
      <!-- Deadline -->
      <div class="w-full md:w-1/2 flex flex-col my-3">
        <h3 class="text-xl font-bold px-3">{{$t('bountyPlatform.post.bountyDeadline')}}</h3>

        <div class="w-full flex flex-row">
          <input
            :class="[$store.state.theme.dt?'bg-dtBackgroundTertiary border-dtBackgroundTertiary':'bg-ltBackgroundTertiary border-ltBackgroundTertiary']"
            class="flex-1 text-lg font-bold border focus:border-dtPrimary rounded-lg transition-all duration-200 ease-out px-4 py-2 mt-2"
            type="text"
            :placeholder="$t('bountyPlatform.post.bountyDeadlinePlaceholder')"
          />
          <!-- Divider -->
          <div class="hidden md:block w-8"></div>
        </div>
      </div>
    </div>
    <!-- Card for Contact Name and Email -->
    <div
      :class="
      [$store.state.theme.dt?'bg-dtBackgroundSecondary':'bg-ltBackgroundSecondary shadow-lg']
    "
      class="w-full flex flex-row flex-wrap relative pt-4 pb-8 px-6 md:pt-6 md:pb-10 md:px-10 xl:px-16 mt-1 md:mt-2"
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
      <div class="hidden md:block w-16"></div>
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
    <!-- Call to Action Card -->
    <CTACard
      class="my-1 md:my-2"
      :buttonAction="null"
      :buttonText="$t('bountyPlatform.post.buttonPostBounty')"
    />
  </div>
</template>

<script>
import { SIDEBAR_CONTEXTS } from "~/config"
import GreetingCard from "~/components/BountyPlatform/GreetingCard.vue";
import CTACard from "~/components/BountyPlatform/CTACard.vue";
export default {
  layout: "bountyPlatform",
  components: {
    GreetingCard,
    CTACard
  },
  beforeMount() {
    // Set sidebar context
    this.$store.commit('general/setSidebarContext', SIDEBAR_CONTEXTS.post)
  },
  destroyed() {
    this.$store.commit('general/setSidebarContext', null)
  }
};
</script>
