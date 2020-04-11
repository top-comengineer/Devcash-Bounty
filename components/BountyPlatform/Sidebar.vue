<template>
  <div
    :class="[
      $store.state.theme.dt
        ? 'bg-dtBackgroundSecondary shadow-nlgS md:shadow-none'
        : 'bg-ltBackgroundSecondary shadow-nlg md:shadow-lg'
    ]"
    class="w-full h-full rounded-tl-xl rounded-tr-xl md:rounded-tr-3xl md:rounded-bl-sm md:rounded-tl-sm md:rounded-br-3xl lg:rounded-tl-xl lg:rounded-bl-xl transition-all ease-out duration-200"
  >
    <!-- Sidebar Content -->
    <div class="w-full flex flex-row md:flex-col justify-center py-0 md:py-8">
      <!-- Explore -->
      <nuxt-link
        :to="getLocalizedRoute('bountyplatform')"
        class="flex flex-row justify-center lg:justify-start items-center px-4 py-3 lg:px-6 xl:pl-8 transition-colors ease-out duration-200"
        :class="[{
            'bg-dtPrimary text-dtText': $store.state.general.sidebarContext == sidebarContexts.explore || $store.state.general.sidebarContext == sidebarContexts.singleBounty,
            'hover_bg-dtPrimary-25 focus_bg-dtPrimary-25':  !($store.state.general.sidebarContext == sidebarContexts.explore || $store.state.general.sidebarContext == sidebarContexts.singleBounty)
          }] "
      >
        <Icon
          :colorClass="$store.state.general.sidebarContext == sidebarContexts.explore?'text-dtText':$store.state.theme.dt?'text-dtText':'text-ltText'"
          type="explore"
          class="w-8 h-8 lg:w-7 lg:h-7"
        />
        <h3 class="text-lg font-bold hidden lg:block ml-2">{{ $t("bountyPlatform.explore.header") }}</h3>
      </nuxt-link>
      <!-- Post -->
      <nuxt-link
        :to="getLocalizedRoute('bountyplatform-post')"
        class="flex flex-row justify-center lg:justify-start items-center px-4 py-3 lg:px-6 xl:pl-8 transition-colors ease-out duration-200"
        :class="[{
            'bg-dtPrimary hover:bg-dtPrimary text-dtText': $store.state.general.sidebarContext == sidebarContexts.post,
            'hover_bg-dtPrimary-25 focus_bg-dtPrimary-25':  !($store.state.general.sidebarContext == sidebarContexts.post)
          }] "
      >
        <Icon
          type="post"
          :colorClass="$store.state.general.sidebarContext == sidebarContexts.post?'text-dtText':$store.state.theme.dt?'text-dtText':'text-ltText'"
          class="w-8 h-8 lg:w-7 lg:h-7"
        />
        <h3 class="text-lg font-bold hidden lg:block ml-2">{{ $t("bountyPlatform.post.header") }}</h3>
      </nuxt-link>
      <!-- Overview -->
      <nuxt-link
        :to="getLocalizedRoute('bountyplatform-overview')"
        class="flex flex-row justify-center lg:justify-start items-center px-4 py-3 lg:px-6 xl:pl-8 transition-colors ease-out duration-200"
        :class="[{
            'bg-dtPrimary hover:bg-dtPrimary text-dtText': $store.state.general.sidebarContext == sidebarContexts.overview,
            'hover_bg-dtPrimary-25 focus_bg-dtPrimary-25':  !($store.state.general.sidebarContext == sidebarContexts.overview)
          }]"
      >
        <Icon
          type="overview"
          :colorClass="$store.state.general.sidebarContext == sidebarContexts.overview?'text-dtText':$store.state.theme.dt?'text-dtText':'text-ltText'"
          class="w-8 h-8 lg:w-7 lg:h-7"
        />
        <h3
          class="text-lg font-bold hidden lg:block ml-2"
        >{{ $t("bountyPlatform.overview.header") }}</h3>
      </nuxt-link>
      <!-- Bounty Hunter-->
      <nuxt-link
        :to="getLocalizedRoute('bountyplatform-bountyhunter')"
        class="flex flex-row justify-center lg:justify-start items-center px-4 py-3 lg:px-6 xl:pl-8 transition-colors ease-out duration-200"
        :class="[{
            'bg-dtPrimary hover:bg-dtPrimary text-dtText': $store.state.general.sidebarContext == sidebarContexts.bountyHunter,
            'hover_bg-dtPrimary-25 focus_bg-dtPrimary-25':  !($store.state.general.sidebarContext == sidebarContexts.bountyHunter)
          }] "
      >
        <Icon
          type="bounty-hunter"
          :colorClass="$store.state.general.sidebarContext == sidebarContexts.bountyHunter?'text-dtText':$store.state.theme.dt?'text-dtText':'text-ltText'"
          class="w-8 h-8 lg:w-7 lg:h-7"
        />
        <h3
          class="text-lg font-bold hidden lg:block ml-2"
        >{{ $t("bountyPlatform.bountyHunter.header") }}</h3>
      </nuxt-link>
      <!-- Bounty Manager -->
      <nuxt-link
        :to="getLocalizedRoute('bountyplatform-bountymanager')"
        class="flex flex-row justify-center lg:justify-start items-center px-4 py-3 lg:px-6 xl:pl-8 transition-colors ease-out duration-200"
        :class="[{
            'bg-dtPrimary hover:bg-dtPrimary text-dtText': $store.state.general.sidebarContext == sidebarContexts.bountyManager,
            'hover_bg-dtPrimary-25 focus_bg-dtPrimary-25':  !($store.state.general.sidebarContext == sidebarContexts.bountyManager)
          }] "
      >
        <Icon
          type="bounty-manager"
          :colorClass="$store.state.general.sidebarContext == sidebarContexts.bountyManager?'text-dtText':$store.state.theme.dt?'text-dtText':'text-ltText'"
          class="w-8 h-8 lg:w-7 lg:h-7"
        />
        <h3
          class="text-lg font-bold hidden lg:block ml-2"
        >{{ $t("bountyPlatform.bountyManager.header") }}</h3>
      </nuxt-link>
      <!-- Divider -->
      <div class="px-4 lg:px-6 mt-4 mb-5 hidden lg:block">
        <div
          :class="$store.state.theme.dt?'bg-dtText':'bg-ltText'"
          class="w-full h-px2 rounded-full opacity-10"
        ></div>
      </div>
      <!-- Context aware options -->
      <div class="px-4 lg:px-6 xl:pl-8 hidden lg:block">
        <!-- If context is Null -->
        <div v-if="$store.state.general.sidebarContext == null" class="flex flex-col"></div>
        <!-- If context is Explore -->
        <div
          v-if="$store.state.general.sidebarContext == sidebarContexts.explore"
          class="flex flex-col"
        >
          <!-- Search Text and Search Bar -->
          <h4 class="text-lg font-bold">Search</h4>
          <div class="flex flex-row relative mt-2">
            <Icon
              :colorClass="{'text-dtPrimary': isSearchFocused,'text-dtText': $store.state.theme.dt && !isSearchFocused, 'text-ltText': !$store.state.theme.dt && !isSearchFocused}"
              class="absolute h-5 w-5 searchIcon ml-3"
              type="search"
            />
            <input
              @focus="isSearchFocused=true"
              @blur="isSearchFocused=false"
              :class="[$store.state.theme.dt?'bg-dtBackgroundSecondary border-dtText':'bg-ltBackgroundSecondary border-ltText']"
              class="w-full font-bold border-2 focus:border-dtPrimary rounded-full transition-all duration-200 ease-out pl-10 pr-4 py-1_5"
              type="text"
              placeholder="Bounty name"
            />
          </div>
          <!-- Sort Text and Sort Options -->
          <h4 class="text-lg font-bold mt-8">Sort</h4>
          <RadioButton checked="checked" class="mt-3" name="exploreRadioGroup" text="Most Recent" />
          <RadioButton class="mt-3" name="exploreRadioGroup" text="Highest Value" />
          <RadioButton class="mt-3" name="exploreRadioGroup" text="Expiry" />
          <!-- Status Text and Status Options -->
          <h4 class="text-lg font-bold mt-8">Status</h4>
          <CheckmarkButton checked="checked" class="mt-3" text="Active" />
          <CheckmarkButton class="mt-3" text="Completed" />
          <CheckmarkButton class="mt-3" text="Expired" />
        </div>
        <!-- If context is Post, Overview, Bounty Hunter or Bounty Manager -->
        <div
          v-else-if="$store.state.general.sidebarContext == sidebarContexts.post || $store.state.general.sidebarContext == sidebarContexts.overview || $store.state.general.sidebarContext == sidebarContexts.bountyHunter ||  $store.state.general.sidebarContext == sidebarContexts.bountyManager"
          class="flex flex-col"
        >
          <!-- Balance Text -->
          <h5 class="text-sm opacity-75">Balance</h5>
          <h4 class="font-extrabold text-lg mt-1 break-all">{D}12,700,000</h4>
          <!-- Balance in Devcash -->
          <h5 class="text-sm mt-6 opacity-75">Approved Balance</h5>
          <h4 class="font-extrabold text-dtPrimary text-xl mt-1 break-all">{D}2,650,000</h4>
          <!-- Amount to Approve  -->
          <h5 class="font-bold mt-6">Amount to Approve</h5>
          <!-- Amount Input -->
          <input
            :class="[$store.state.theme.dt?'bg-dtBackgroundTertiary border-dtBackgroundTertiary':'bg-ltBackgroundTertiary border-ltBackgroundTertiary']"
            class="w-full font-bold border focus:border-dtPrimary rounded-lg transition-all duration-200 ease-out px-4 py-2 mt-2"
            type="text"
            placeholder="Enter an amount"
          />
          <!-- Approve Button -->
          <button
            :class="$store.state.theme.dt?'btn-dtPrimary':'btn-ltPrimary'"
            class="hover_scale-md focus_scale-md bg-dtPrimary text-dtText font-extrabold text-lg rounded-tl-2xl rounded-br-2xl rounded-tr-md rounded-bl-md px-6 py-1_5 mt-3"
          >Approve</button>
        </div>
        <!-- If context is Single Bounty -->
        <div
          v-else-if="$store.state.general.sidebarContext == sidebarContexts.singleBounty"
          class="flex flex-col"
        >
          <nuxt-link
            :to="getLocalizedRoute('bountyplatform')"
            :class="[
          $store.state.theme.dt
            ? 'bg-dtBackgroundSecondary text-dtText border-2 border-dtText btn-dtText'
            : ' bg-ltBackgroundSecondary text-ltText border-2 border-ltText btn-ltText'
        ]"
            class="flex flex-row justify-center items-center text-lg hover_scale-md focus_scale-md font-extrabold transition-all ease-out duration-200 rounded-tl-xl rounded-br-xl rounded-tr rounded-bl pr-6 pl-4 py-1"
          >
            <Icon
              type="back"
              :colorClass="$store.state.theme.dt?'text-dtText':'text-ltText'"
              class="h-5 w-5"
            />
            <h5 class="ml-1">Go Back</h5>
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { SIDEBAR_CONTEXTS } from "~/config";
import Icon from "~/components/Icon.vue";
import RadioButton from "~/components/RadioButton.vue";
import CheckmarkButton from "~/components/CheckmarkButton.vue";
export default {
  components: {
    Icon,
    RadioButton,
    CheckmarkButton
  },
  props: {
    bountyName: null
  },
  data: function() {
    return {
      sidebarContexts: SIDEBAR_CONTEXTS,
      isSearchFocused: false
    };
  }
};
</script>
<style>
.searchIcon {
  top: 50%;
  transform: translateY(-50%);
}
</style>
