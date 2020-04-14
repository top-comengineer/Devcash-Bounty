<template>
  <div class="w-full flex flex-col justify-center items-center">
    <!-- Greeting Card -->
    <GreetingCard
      :header="$t('bountyPlatform.post.cardHeader')"
      :paragraph="$t('bountyPlatform.post.cardParagraph')"
      type="post"
      class="my-1 md:my-2"
    />
    <!-- Post Form -->
    <form class="w-full" action>
      <!-- Card for Bounty Title and Description -->
      <div
        :class="
      [$store.state.theme.dt?'bg-dtBackgroundSecondary':'bg-ltBackgroundSecondary shadow-lg']
    "
        class="w-full flex flex-row flex-wrap relative rounded-tl-3xl rounded-tr-lg pt-4 pb-8 px-6 md:pt-6 md:pb-10 md:px-10 xl:px-24 mt-1 md:mt-2"
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
          <textarea
            :class="[$store.state.theme.dt?'bg-dtBackgroundTertiary border-dtBackgroundTertiary':'bg-ltBackgroundTertiary border-ltBackgroundTertiary']"
            class="bountyDescArea w-full leading-loose text-lg font-bold border focus:border-dtPrimary rounded-lg transition-all duration-200 ease-out px-4 py-2 md:py-4 md:px-6 mt-2"
            type="text"
            :placeholder="$t('bountyPlatform.post.bountyDescriptionPlaceholder')"
          />
        </div>
      </div>
      <!-- Card for Bounty Type -->
      <div
        :class="[$store.state.theme.dt?'bg-dtBackgroundSecondary':'bg-ltBackgroundSecondary shadow-lg']"
        class="w-full flex flex-row flex-wrap relative pt-4 pb-8 px-6 md:pt-6 md:pb-10 md:px-10 xl:px-24 mt-1 md:mt-2"
      >
        <!-- Bounty Type -->
        <div class="w-full md:flex-1 flex flex-col my-3">
          <h3 class="text-xl font-bold px-3">{{$t('bountyPlatform.post.bountyType')}}</h3>
          <!-- Public and Private Switch -->
          <div
            :class="$store.state.theme.dt?'bg-dtBackgroundTertiary border-dtText-10':'bg-ltBackground border-ltText-10'"
            class="max-w-full w-84 flex flex-row p-1 rounded-full border mt-2"
          >
            <div class="w-full flex flex-row relative">
              <div
                :class="{'left-0':activeTab=='public', 'left-full -translate-x-full': activeTab=='private', 'shadow-lgSS': $store.state.theme.dt, 'shadow-lgS': !$store.state.theme.dt}"
                class="absolute w-1/2 h-full w-24 bg-dtPrimary left-0 rounded-full transform transition-all duration-200 ease-out"
              ></div>
              <button
                :class="[activeTab=='public'?'text-dtText':'font-medium', {'hover_bg-dtText-15 focus_bg-dtText-15': $store.state.theme.dt && activeTab !='public', 'hover_bg-ltText-15 focus_bg-ltText-15': !$store.state.theme.dt && activeTab !='public' }]"
                @click.prevent="activeTab='public'"
                class="w-1/2 text-sm font-bold md:text-lg leading-tight py-2 px-2 md:px-4 relative truncate rounded-full transition-all duration-300 ease-out"
              >{{$t('bountyPlatform.post.bountyTypePublic')}}</button>
              <button
                :class="[activeTab=='private'?'text-dtText':'font-medium', {'hover_bg-dtText-15 focus_bg-dtText-15': $store.state.theme.dt && activeTab !='private', 'hover_bg-ltText-15 focus_bg-ltText-15': !$store.state.theme.dt && activeTab !='private' }]"
                @click.prevent="activeTab='private'"
                class="w-1/2 text-sm font-bold md:text-lg leading-tight py-2 px-2 md:px-4 relative truncate rounded-full transition-all duration-300 ease-out"
              >{{$t('bountyPlatform.post.bountyTypePrivate')}}</button>
            </div>
          </div>
        </div>
        <!-- Divider -->
        <div class="hidden md:block w-16"></div>
        <!-- Hunter's Address -->
        <div v-if="activeTab=='private'" class="w-full md:flex-1 flex flex-col my-3">
          <h3 class="text-xl font-bold px-3">{{$t('bountyPlatform.post.bountyTypeHunterAddress')}}</h3>
          <input
            :class="[$store.state.theme.dt?'bg-dtBackgroundTertiary border-dtBackgroundTertiary':'bg-ltBackgroundTertiary border-ltBackgroundTertiary']"
            class="w-full text-lg font-bold border focus:border-dtPrimary rounded-lg transition-all duration-200 ease-out px-4 py-2 mt-2"
            type="text"
            :placeholder="$t('bountyPlatform.post.bountyTypeHunterAddressPlaceholder')"
          />
        </div>
      </div>
      <!-- Card for Number of Bounties and Bounty Amount -->
      <div
        :class="[$store.state.theme.dt?'bg-dtBackgroundSecondary':'bg-ltBackgroundSecondary shadow-lg']"
        class="w-full flex flex-row flex-wrap relative pt-4 pb-8 px-6 md:pt-6 md:pb-10 md:px-10 xl:px-24 mt-1 md:mt-2"
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
        class="w-full flex flex-row flex-wrap relative pt-4 pb-8 px-6 md:pt-6 md:pb-10 md:px-10 xl:px-24 mt-1 md:mt-2"
      >
        <!-- Deadline -->
        <div class="w-full md:w-1/2 flex flex-col my-3">
          <h3 class="text-xl font-bold px-3">{{$t('bountyPlatform.post.bountyDeadline')}}</h3>
          <div class="w-full flex flex-row items-center relative mt-2">
            <button class="w-8 h-8 absolute top-1/2 bottom-1/2 transform -translate-y-1/2 mx-2">
              <Icon
                class="w-full h-full"
                :colorClass="$store.state.theme.dt?'text-dtText':'text-ltText'"
                type="calender"
              />
            </button>
            <input
              :class="[$store.state.theme.dt?'bg-dtBackgroundTertiary border-dtBackgroundTertiary':'bg-ltBackgroundTertiary border-ltBackgroundTertiary']"
              class="flex-1 text-lg font-bold border focus:border-dtPrimary rounded-lg transition-all duration-200 ease-out pl-12 py-2"
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
        class="w-full flex flex-row flex-wrap relative pt-4 pb-8 px-6 md:pt-6 md:pb-10 md:px-10 xl:px-24 mt-1 md:mt-2"
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
    </form>
    <!-- Call to Action Card -->
    <CTACard
      class="my-1 md:my-2"
      :buttonAction="null"
      :buttonText="$t('bountyPlatform.post.buttonPostBounty')"
    />
  </div>
</template>

<script>
import { SIDEBAR_CONTEXTS } from "~/config";
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
      activeTab: "public"
    };
  },
  beforeMount() {
    // Set sidebar context
    this.$store.commit("general/setSidebarContext", SIDEBAR_CONTEXTS.post);
  },
  destroyed() {
    this.$store.commit("general/setSidebarContext", null);
  }
};
</script>
<style>
.bountyDescArea {
  min-height: 27rem;
  height: 27rem;
  transform-origin: center top;
}
</style>
