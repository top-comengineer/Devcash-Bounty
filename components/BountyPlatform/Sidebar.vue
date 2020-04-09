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
        v-slot="{  navigate, href, isExactActive  }"
      >
        <a
          @click="navigate"
          :href="href"
          class="flex flex-row justify-center lg:justify-start items-center px-4 py-3 lg:px-6 xl:pl-8 transition-colors ease-out duration-200"
          :class="[{
            'bg-dtPrimary text-dtText': isExactActive,
            'hover_bg-dtPrimary-25 focus_bg-dtPrimary-25':  !isExactActive
          }] "
        >
          <Icon
            :colorClass="isExactActive?'text-dtText':$store.state.theme.dt?'text-dtText':'text-ltText'"
            type="explore"
            class="w-8 h-8 lg:w-7 lg:h-7"
          />
          <h3
            class="text-lg font-bold hidden lg:block ml-2"
          >{{ $t("bountyPlatform.explore.header") }}</h3>
        </a>
      </nuxt-link>
      <!-- Post -->
      <nuxt-link
        :to="getLocalizedRoute('bountyplatform-post')"
        v-slot="{ navigate, href, isExactActive }"
      >
        <a
          @click="navigate"
          :href="href"
          class="flex flex-row justify-center lg:justify-start items-center px-4 py-3 lg:px-6 xl:pl-8 transition-colors ease-out duration-200"
          :class="[{
            'bg-dtPrimary hover:bg-dtPrimary text-dtText': isExactActive,
            'hover_bg-dtPrimary-25 focus_bg-dtPrimary-25':  !isExactActive
          }] "
        >
          <Icon
            type="post"
            :colorClass="isExactActive?'text-dtText':$store.state.theme.dt?'text-dtText':'text-ltText'"
            class="w-8 h-8 lg:w-7 lg:h-7"
          />
          <h3 class="text-lg font-bold hidden lg:block ml-2">{{ $t("bountyPlatform.post.header") }}</h3>
        </a>
      </nuxt-link>
      <!-- Overview -->
      <nuxt-link
        :to="getLocalizedRoute('bountyplatform-overview')"
        v-slot="{ navigate, href, isExactActive }"
      >
        <a
          @click="navigate"
          :href="href"
          class="flex flex-row justify-center lg:justify-start items-center px-4 py-3 lg:px-6 xl:pl-8 transition-colors ease-out duration-200"
          :class="[{
            'bg-dtPrimary hover:bg-dtPrimary text-dtText': isExactActive,
            'hover_bg-dtPrimary-25 focus_bg-dtPrimary-25':  !isExactActive
          }] "
        >
          <Icon
            type="overview"
            :colorClass="isExactActive?'text-dtText':$store.state.theme.dt?'text-dtText':'text-ltText'"
            class="w-8 h-8 lg:w-7 lg:h-7"
          />
          <h3
            class="text-lg font-bold hidden lg:block ml-2"
          >{{ $t("bountyPlatform.overview.header") }}</h3>
        </a>
      </nuxt-link>
      <!-- Bounty Hunter-->
      <nuxt-link
        :to="getLocalizedRoute('bountyplatform-bountyhunter')"
        v-slot="{ navigate, href, isExactActive }"
      >
        <a
          @click="navigate"
          :href="href"
          class="flex flex-row justify-center lg:justify-start items-center px-4 py-3 lg:px-6 xl:pl-8 transition-colors ease-out duration-200"
          :class="[{
            'bg-dtPrimary hover:bg-dtPrimary text-dtText': isExactActive,
            'hover_bg-dtPrimary-25 focus_bg-dtPrimary-25':  !isExactActive
          }] "
        >
          <Icon
            type="bounty-hunter"
            :colorClass="isExactActive?'text-dtText':$store.state.theme.dt?'text-dtText':'text-ltText'"
            class="w-8 h-8 lg:w-7 lg:h-7"
          />
          <h3
            class="text-lg font-bold hidden lg:block ml-2"
          >{{ $t("bountyPlatform.bountyHunter.header") }}</h3>
        </a>
      </nuxt-link>
      <!-- Bounty Manager -->
      <nuxt-link
        :to="getLocalizedRoute('bountyplatform-bountymanager')"
        v-slot="{ navigate, href, isExactActive }"
      >
        <a
          @click="navigate"
          :href="href"
          class="flex flex-row justify-center lg:justify-start items-center px-4 py-3 lg:px-6 xl:pl-8 transition-colors ease-out duration-200"
          :class="[{
            'bg-dtPrimary hover:bg-dtPrimary text-dtText': isExactActive,
            'hover_bg-dtPrimary-25 focus_bg-dtPrimary-25':  !isExactActive
          }] "
        >
          <Icon
            type="bounty-manager"
            :colorClass="isExactActive?'text-dtText':$store.state.theme.dt?'text-dtText':'text-ltText'"
            class="w-8 h-8 lg:w-7 lg:h-7"
          />
          <h3
            class="text-lg font-bold hidden lg:block ml-2"
          >{{ $t("bountyPlatform.bountyManager.header") }}</h3>
        </a>
      </nuxt-link>
      <!-- Divider -->
      <div class="px-4 lg:px-6 xl:pr-8 mt-4 mb-5">
        <div
          :class="$store.state.theme.dt?'bg-dtText':'bg-ltText'"
          class="w-full h-px2 rounded-full opacity-10"
        ></div>
      </div>
      <!-- Context aware options -->
      <div class="px-4 lg:px-6 xl:pl-8 hidden lg:block">
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
              class="w-full font-bold border-2 focus:border-dtPrimary rounded-full transition-all duration-200 ease-out pl-10 pr-4 py-1.5"
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
