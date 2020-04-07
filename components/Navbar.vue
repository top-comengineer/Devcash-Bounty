<template>
  <div class="w-full flex flex-row justify-between items-center px-4 py-4 lg:px-8 lg:py-6">
    <nuxt-link :to="getLocalizedRoute('index')">
      <Logo class="w-36 md:w-40 h-auto" :type="$store.state.theme.dt ? 'light' : 'dark'" />
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
            :class="[isExactActive?'transform scale-x-100':'transform scale-x-0', $store.state.theme.dt?'bg-dtText':'bg-ltText']"
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
            :class="[isActive?'transform scale-x-100':'transform scale-x-0', $store.state.theme.dt?'bg-dtText':'bg-ltText']"
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
      <div @mouseover="isLangModalOpen=true" @mouseleave="isLangModalOpen=false" class="relative">
        <!-- Language Button -->
        <button
          @focus="isLangModalOpen=true"
          @blur="isLangModalOpen=false"
          :class="[$store.state.theme.dt?'hover_bg-dtText-15 focus_bg-dtText-15': 'hover_bg-ltText-15 focus_bg-ltText-15']"
          class="flex flex-col font-bold lg:pt-1 lg:px-4 lg:ml-2 rounded-full transition-all ease-out duration-200"
        >
          <div class="flex flex-row items-center p-1">
            <Icon
              class="w-8 h-8 lg:w-6 lg:h-6 transition-all ease-out duration-200"
              :colorClass="$store.state.theme.dt ? 'text-dtText' : 'text-ltText'"
              type="language"
            />
            <div class="mx-1 hidden lg:block">{{ currentLang }}</div>
            <Icon
              class="hidden lg:block w-4 h-4 transition-all ease-out duration-200"
              :colorClass="$store.state.theme.dt ? 'text-dtText' : 'text-ltText'"
              type="arrow-down"
            />
          </div>
          <div class="hidden lg:block h-px2 w-full"></div>
        </button>
        <!-- Language Modal -->
        <transition name="langModalTransition">
          <!-- Modal Wrapper -->
          <div class="flex flex-row absolute right-0 pt-2" v-if="isLangModalOpen">
            <div
              :class="$store.state.theme.dt ? 'bg-dtText text-dtBackground' : 'bg-ltText text-ltBackground'"
              class="w-56 flex flex-col relative origin-top-right shadow-xl rounded-tl-2xl rounded-br-2xl rounded-bl-md rounded-tr-md overflow-hidden"
            >
              <button
                @click="changeLang('en')"
                :class="lang == 'en'?'bg-dtPrimary text-dtText': 'hover_bg-dtPrimary-35 focus_bg-dtPrimary-35'"
                class="flex flex-row items-center py-3 transition-colors duration-200 ease-out"
              >
                <div class="mx-4">
                  <Icon v-if="lang == 'en'" colorClass="text-dtText" type="done" class="w-6 h-6" />
                  <div v-else class="w-6 h-6"></div>
                </div>
                <div class="flex flex-row">
                  <h3 class="font-bold">English</h3>
                  <h4 class="ml-1 text-sm">(en)</h4>
                </div>
              </button>
              <button
                @click="changeLang('zh')"
                :class="lang == 'zh'?'bg-dtPrimary text-dtText': 'hover_bg-dtPrimary-35 focus_bg-dtPrimary-35'"
                class="flex flex-row items-center py-3 transition-colors duration-200 ease-out"
              >
                <div class="mx-4">
                  <Icon v-if="lang == 'zh'" colorClass="text-dtText" type="done" class="w-6 h-6" />
                  <div v-else class="w-6 h-6"></div>
                </div>
                <h3 class="font-bold">简化字</h3>
                <h4 class="ml-1 text-sm">(zh-Hans)</h4>
              </button>
            </div>
          </div>
        </transition>
      </div>
      <!-- Notifications New -->
      <button
        :class="[$store.state.theme.dt?'hover_bg-dtText-15 focus_bg-dtText-15': 'hover_bg-ltText-15 focus_bg-ltText-15']"
        class="rounded-full lg:ml-2 p-1 transition-all ease-out duration-200"
      >
        <Icon
          class="w-8 h-8"
          :colorClass="$store.state.theme.dt ? 'text-dtText' : 'text-ltText'"
          :secondaryColorClass="$store.state.theme.dt ? 'text-dtDanger' : 'text-ltDanger'"
          type="notification-new"
        />
      </button>
      <!-- Theme Switcher Button -->
      <button
        :class="[$store.state.theme.dt?'hover_bg-dtText-15 focus_bg-dtText-15': 'hover_bg-ltText-15 focus_bg-ltText-15']"
        @click="$store.commit('theme/change')"
        class="rounded-full lg:ml-2 p-1 transition-all ease-out duration-200"
      >
        <Icon
          class="w-8 h-8"
          :colorClass="$store.state.theme.dt ? 'text-dtText' : 'text-ltText'"
          :type="$store.state.theme.dt ? 'light' : 'dark'"
        />
      </button>
      <!-- Sign In Button -->
      <button
        :class="[
          $store.state.theme.dt
            ? 'bg-dtText text-dtBackground btn-dtText'
            : ' bg-ltText text-ltBackground btn-ltText'
        ]"
        class="hover_scale-lg focus_scale-lg md:ml-4 lg:ml-6 font-bold transition-all ease-out duration-200 rounded-tl-xl rounded-br-xl rounded-tr rounded-bl px-5 py-1"
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
  },
  methods: {
    changeLang(iso) {
      if (iso == "en") {
        this.lang = "en";
        this.currentLang = this.$t("navigation.english");
      } else if (iso == "zh") {
        this.lang = "zh";
        this.currentLang = this.$t("navigation.chinese");
      }
    }
  },
  data() {
    return {
      isLangModalOpen: false,
      lang: "en",
      currentLang: this.$t("navigation.english")
    };
  }
};
</script>
<style>
.langModalTransition-enter-active {
  transition: all 0.2s ease-out;
}
.langModalTransition-leave-active {
  transition: all 0.2s ease-out;
}
.langModalTransition-enter {
  opacity: 0.25;
  transform: scaleX(0.8) scaleY(0.6) translateY(-2.5rem);
}
.langModalTransition-leave-to {
  opacity: 0;
  transform: scaleX(0.8) scaleY(0.6) translateY(-2.5rem);
}
</style>
