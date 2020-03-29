<template>
  <div class="w-full flex flex-row justify-between items-center px-4 py-4 lg:px-8 lg:py-6">
    <nuxt-link :to="getLocalizedRoute('index')">
      <Logo class="md:mb-0 w-36 md:w-40 h-auto" :type="$store.state.theme.dt ? 'light' : 'dark'" />
    </nuxt-link>
    <!-- Menu icon shown on small screens -->
    <MobileDropdown />
    <!-- Navbar items shown on non-small screens -->
    <div class="hidden md:flex flex-row justify-end items-center">
      <!-- Home -->
      <nuxt-link :to="getLocalizedRoute('index')" v-slot="{  navigate, href, isExactActive  }">
        <a
          :class="[$store.state.theme.dt?'hover_bg-dtText-15 focus_bg-dtText-15': 'hover_bg-ltText-15 focus_bg-ltText-15']"
          @click="navigate"
          :href="href"
          class="flex flex-col font-bold transition-all ease-out duration-200 pt-1 px-4 lg:ml-2 rounded-full"
        >
          <div>
            {{
            $t("navigation.home")
            }}
          </div>
          <div
            v-bind:class="[isExactActive?'transform scale-x-100':'transform scale-x-0', $store.state.theme.dt?'bg-dtText':'bg-ltText']"
            class="h-px2 w-full rounded-tl-full rounded-br-full transition-all ease-out duration-200"
          ></div>
        </a>
      </nuxt-link>
      <!-- Bounty Platform -->
      <nuxt-link :to="getLocalizedRoute('bountyplatform')" v-slot="{  navigate, href, isActive  }">
        <a
          :class="[$store.state.theme.dt?'hover_bg-dtText-15 focus_bg-dtText-15': 'hover_bg-ltText-15 focus_bg-ltText-15']"
          @click="navigate"
          :href="href"
          class="flex flex-col font-bold transition-all ease-out duration-200 pt-1 px-4 lg:ml-2 rounded-full"
        >
          <div>
            {{
            $t("navigation.bountyPlatform")
            }}
          </div>
          <div
            v-bind:class="[isActive?'transform scale-x-100':'transform scale-x-0', $store.state.theme.dt?'bg-dtText':'bg-ltText']"
            class="h-px2 w-full rounded-tl-full rounded-br-full transition-all ease-out duration-200"
          ></div>
        </a>
      </nuxt-link>
      <!-- DEX -->
      <a
        :class="[$store.state.theme.dt?'hover_bg-dtText-15 focus_bg-dtText-15': 'hover_bg-ltText-15 focus_bg-ltText-15']"
        href="/"
        class="flex flex-col font-bold transition-all ease-out duration-200 pt-1 px-4 lg:ml-2 rounded-full"
      >
        <div>{{ $t("navigation.dex") }}</div>
        <div class="h-px2 w-full"></div>
      </a>
      <!-- Language -->
      <button
        :class="[$store.state.theme.dt?'hover_bg-dtText-15 focus_bg-dtText-15': 'hover_bg-ltText-15 focus_bg-ltText-15']"
        href="/"
        class="flex flex-col font-bold transition-all ease-out duration-200 pt-1 px-4 lg:ml-2 rounded-full"
      >
        <div>{{ $t("navigation.english") }}</div>
        <div class="h-px2 w-full"></div>
      </button>
      <!-- Theme Switcher Button -->
      <button
        :class="[$store.state.theme.dt?'hover_bg-dtText-15 focus_bg-dtText-15': 'hover_bg-ltText-15 focus_bg-ltText-15']"
        @click="$store.commit('theme/change')"
        class="rounded-full lg:ml-2 p-1"
      >
        <Icon
          class="w-8 h-8"
          :colorClass="$store.state.theme.dt ? 'text-dtText' : 'text-ltText'"
          :type="$store.state.theme.dt ? 'dark' : 'light'"
        />
      </button>
      <!-- Sign In Button -->
      <button
        v-bind:class="[
          $store.state.theme.dt
            ? 'bg-dtText text-dtBackground btn-dtText'
            : ' bg-ltText text-ltBackground btn-ltText'
        ]"
        class="hover_scale-lg md:ml-4 lg:ml-6 font-bold transition-all ease-out duration-200 rounded-tl-xl rounded-br-xl rounded-tr rounded-bl px-5 py-1"
      >{{ $t("navigation.signIn") }}</button>
    </div>
  </div>
</template>
<script>
import Logo from "~/components/Logo.vue";
import Icon from "~/components/Icon.vue";
import MobileDropdown from "~/components/MobileDropdown.vue";
export default {
  components: {
    Logo,
    Icon,
    MobileDropdown
  }
};
</script>
