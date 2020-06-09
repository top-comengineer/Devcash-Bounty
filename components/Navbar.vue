<template>
  <div class="w-full flex flex-row justify-between items-center px-4 py-3 md:py-4 lg:px-8 lg:py-6">
    <nuxt-link
      :to="localePath('index')"
      class="focus:scale-110 hover:scale-110 transform transition-transform duration-200"
      @keydown.esc.exact="hideSignOutModal"
      v-on:click.native="hideSignOutModal"
    >
      <Logo class="w-36 md:w-40 h-auto" :type="$store.state.theme.dt ? 'light' : 'dark'" />
    </nuxt-link>
    <!-- Navbar items -->
    <div class="flex flex-row justify-end items-center">
      <!-- Home -->
      <nuxt-link
        class="hidden md:block"
        :to="localePath('index')"
        v-slot="{  navigate, href, isExactActive  }"
      >
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
      <nuxt-link
        class="hidden md:block"
        :to="localePath('bountyplatform')"
        v-slot="{  navigate, href, isActive  }"
      >
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
        class="hidden md:flex flex-col font-bold transition-all ease-out duration-200 pt-1 px-4 lg:ml-2 rounded-full"
      >
        <div>{{ $t("navigation.dex") }}</div>
        <div class="h-px2 w-full"></div>
      </a>
      <!-- Language -->
      <div class="relative">
        <!-- Language Button -->
        <button
          @click="toggleLangModal"
          @keydown.esc.exact="hideLangModal"
          :class="[$store.state.theme.dt?'hover_bg-dtText-15 focus_bg-dtText-15': 'hover_bg-ltText-15 focus_bg-ltText-15']"
          class="flex flex-col font-bold lg:pt-1 lg:px-4 lg:ml-2 md:mr-1 lg:mr-0 rounded-full transition-all ease-out duration-200"
        >
          <div class="flex flex-row items-center p-1">
            <Icon
              class="w-8 h-8 lg:w-6 lg:h-6 transition-all ease-out duration-200"
              :colorClass="$store.state.theme.dt ? 'text-dtText' : 'text-ltText'"
              type="language"
            />
            <div class="mx-1 hidden lg:block">{{ currentLocale.name }}</div>
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
          <div class="origin-top-right absolute right-0 pt-2" v-if="isLangModalOpen">
            <div
              :class="$store.state.theme.dt ? 'bg-dtText text-dtBackground' : 'bg-ltText text-ltBackground'"
              class="w-56 flex flex-col relative shadow-2xlS rounded-tl-2xl rounded-br-2xl rounded-bl-md rounded-tr-md overflow-hidden"
            >
              <button
                v-for="(locale, index) in availableLocales"
                :key="locale.code"
                v-on-clickaway="hideLangModal"
                @click="changeLang(locale); hideLangModal()"
                @keydown.tab.exact="index+1 == availableLocales.length?hideLangModal():null"
                @keydown.esc.exact="hideLangModal"
                :class="locale.code == currentLocale.code ? 'bg-dtPrimary text-dtText': 'hover_bg-dtPrimary-35 focus_bg-dtPrimary-35'"
                class="flex flex-row items-center py-3 transition-colors duration-200 ease-out"
              >
                <div class="mx-4">
                  <Icon
                    v-if="locale.code == currentLocale.code"
                    colorClass="text-dtText"
                    type="done"
                    class="w-6 h-6"
                  />
                  <div v-else class="w-6 h-6"></div>
                </div>
                <h3 class="whitespace-no-wrap">
                  <span class="font-bold">{{ locale.name }}</span>
                  <span class="font-light">({{ locale.iso }})</span>
                </h3>
              </button>
            </div>
          </div>
        </transition>
      </div>
      <!-- Notifications New -->
      <!-- 
        <button
        :class="[$store.state.theme.dt?'hover_bg-dtText-15 focus_bg-dtText-15': 'hover_bg-ltText-15 focus_bg-ltText-15']"
        class="hidden md:block rounded-full lg:ml-2 p-1 transition-all ease-out duration-200"
      >
        <Icon
          class="w-8 h-8"
          :colorClass="$store.state.theme.dt ? 'text-dtText' : 'text-ltText'"
          :secondaryColorClass="$store.state.theme.dt ? 'text-dtDanger' : 'text-ltDanger'"
          type="notification-new"
        />
      </button>
      -->
      <!-- Theme Switcher Button -->
      <button
        :class="[$store.state.theme.dt?'hover_bg-dtText-15 focus_bg-dtText-15': 'hover_bg-ltText-15 focus_bg-ltText-15']"
        @click="$store.commit('theme/change')"
        class="hidden md:block rounded-full lg:ml-2 p-1 transition-all ease-out duration-200"
      >
        <Icon
          class="w-8 h-8"
          :colorClass="$store.state.theme.dt ? 'text-dtText' : 'text-ltText'"
          :type="$store.state.theme.dt ? 'light' : 'dark'"
        />
      </button>
      <!-- Sign In/Out Button -->
      <div v-if="!isLoggedIn" class="hidden md:block relative">
        <!-- Sign In Button -->
        <button
          @click="toggleSignInModal"
          @keydown.esc.exact="hideSignInModal"
          :class="[
          $store.state.theme.dt
            ? 'bg-dtText text-dtBackground btn-dtText'
            : ' bg-ltText text-ltBackground btn-ltText'
        ]"
          class="flex flex-row items-center hover_scale-lg focus_scale-lg ml-4 lg:ml-6 font-bold transition-all ease-out duration-200 rounded-tl-xl rounded-br-xl rounded-tr rounded-bl px-5 py-1"
        >
          <Spinner v-if="loggingInLoading" class="mr-1" />
          <h4>{{ loggingInLoading ? $t("navigation.signingIn") : $t("navigation.signIn") }}</h4>
        </button>
        <!-- Sign In Modal -->
        <transition name="signInModalTransition">
          <!-- Modal Wrapper -->
          <div
            v-on-clickaway="hideSignInModal"
            class="origin-top-right absolute right-0 pt-3"
            v-if="isSignInModalOpen && !loggingInLoading"
          >
            <div
              :class="$store.state.theme.dt ? 'bg-dtText text-dtBackground' : 'bg-ltText text-ltBackground'"
              class="flex flex-col relative origin-top-right shadow-2xlS rounded-tl-3xl rounded-br-3xl rounded-bl-lg rounded-tr-lg overflow-hidden px-6 py-5"
            >
              <!-- MetaMask Button -->
              <button
                :class="$store.state.theme.dt?'btn-dtTextTertiary':'btn-ltTextTertiary'"
                class="flex flex-row items-center bg-dtOrange border-2 border-dtOrange hover_scale-md focus_scale-md rounded-tl-2xl rounded-br-2xl rounded-bl-md rounded-tr-md transition-all duration-200 ease-out overflow-hidden my-1_5"
                @click="signIn(walletProviders.metamask)"
                @keydown.esc.exact="hideSignInModal"
              >
                <div
                  :class="$store.state.theme.dt?'bg-dtBackgroundTertiary':'bg-ltBackgroundSecondary'"
                  class="h-12 w-12 p-2"
                >
                  <img
                    class="w-full h-full"
                    :src="require('~/assets/images/wallet-logos/MetaMask.svg')"
                    alt="MetaMask"
                  />
                </div>
                <div class="flex flex-row flex-1 justify-center">
                  <h4
                    class="whitespace-no-wrap text-dtBackground text-lg font-extrabold ml-8 mr-10"
                  >{{ hasMetamask ? $t("wallet.metamask") : $t("wallet.getMetamask") }}</h4>
                </div>
              </button>
              <!-- Portis Button -->
              <button
                :class="$store.state.theme.dt?'btn-dtTextTertiary':'btn-ltTextTertiary'"
                class="flex flex-row items-center bg-dtBlue border-2 border-dtBlue hover_scale-md focus_scale-md rounded-tl-2xl rounded-br-2xl rounded-bl-md rounded-tr-md transition-all duration-200 ease-out overflow-hidden my-1_5"
                @click="signIn(walletProviders.portis)"
                @keydown.esc.exact="hideSignInModal"
              >
                <div
                  :class="$store.state.theme.dt?'bg-dtBackgroundTertiary':'bg-ltBackgroundSecondary'"
                  class="h-12 w-12 p-2"
                >
                  <img
                    class="w-full h-full"
                    :src="require('~/assets/images/wallet-logos/Portis.svg')"
                    alt="Portis"
                  />
                </div>
                <div class="flex flex-row flex-1 justify-center">
                  <h4
                    class="whitespace-no-wrap text-dtBackground text-lg font-extrabold ml-8 mr-10"
                  >{{ $t("wallet.portis") }}</h4>
                </div>
              </button>
              <!-- Authereum Button -->
              <button
                :class="$store.state.theme.dt?'btn-dtTextTertiary':'btn-ltTextTertiary'"
                class="flex flex-row items-center bg-dtRed border-2 border-dtRed hover_scale-md focus_scale-md rounded-tl-2xl rounded-br-2xl rounded-bl-md rounded-tr-md transition-all duration-200 ease-out overflow-hidden my-1_5"
                @click="signIn(walletProviders.authereum)"
                @keydown.esc.exact="hideSignInModal"
                @keydown.tab.exact="hideSignInModal"
              >
                <div
                  :class="$store.state.theme.dt?'bg-dtBackgroundTertiary':'bg-ltBackgroundSecondary'"
                  class="h-12 w-12 p-2"
                >
                  <img
                    class="w-full h-full"
                    :src="require('~/assets/images/wallet-logos/Authereum.svg')"
                    alt="Authereum"
                  />
                </div>
                <div class="flex flex-row flex-1 justify-center">
                  <h4
                    class="whitespace-no-wrap text-dtBackground text-lg font-extrabold ml-8 mr-10"
                  >{{ $t("wallet.authereum") }}</h4>
                </div>
              </button>
            </div>
          </div>
        </transition>
      </div>
      <div v-else class="hidden md:block relative">
        <!-- Avatar -->
        <button
          @click="toggleSignOutModal"
          @keydown.esc.exact="hideSignOutModal"
          :class="[
          $store.state.theme.dt
            ? 'bg-dtText text-dtBackground btn-dtText'
            : ' bg-ltText text-ltBackground btn-ltText']"
          class="flex flex-row items-center hover_scale-lg focus_scale-lg ml-4 lg:ml-6 font-bold transition-all ease-out duration-200 rounded-full p-0_5"
        >
          <Jazzicon
            class="flex"
            :diameter="32"
            :address="$store.state.devcashData.loggedInAccount"
          />
        </button>
        <!-- Sign Out Modal -->
        <transition name="signInModalTransition">
          <!-- Modal Wrapper -->
          <div
            v-on-clickaway="hideSignOutModal"
            class="origin-top-right absolute right-0 pt-2"
            v-if="isSignOutModalOpen && !loggingInLoading"
          >
            <div
              :class="$store.state.theme.dt ? 'bg-dtText text-dtBackground' : 'bg-ltText text-ltBackground'"
              class="flex flex-col relative origin-top-right shadow-2xlS rounded-tl-2xl rounded-br-2xl rounded-bl-md rounded-tr-md overflow-hidden"
            >
              <!-- Overview Button -->
              <nuxt-link
                :to="localePath('bountyplatform-overview')"
                @keydown.esc.exact="hideSignOutModal"
                @click="hideSignOutModal"
                class="flex flex-row items-center hover_bg-dtPrimary-35 focus_bg-dtPrimary-35 transition-colors duration-200 ease-out py-3"
              >
                <div class="pl-6 pr-1">
                  <Icon
                    :colorClass="$store.state.theme.dt?'text-dtBackground':'text-ltBackground'"
                    type="overview"
                    class="w-6 h-6"
                  />
                </div>
                <div class="flex flex-row pr-6 pl-1">
                  <h3 class="whitespace-no-wrap font-bold">{{$t("bountyPlatform.overview.header")}}</h3>
                </div>
              </nuxt-link>
              <!-- Sign Out Button -->
              <button
                @click="signOut()"
                @keydown.esc.exact="hideSignOutModal"
                @keydown.tab.exact="hideSignOutModal"
                class="flex flex-row items-center hover_bg-dtPrimary-35 focus_bg-dtPrimary-35 transition-colors duration-200 ease-out py-3"
              >
                <div class="pl-6 pr-1">
                  <Icon
                    :colorClass="$store.state.theme.dt?'text-dtBackground':'text-ltBackground'"
                    type="sign-out"
                    class="w-6 h-6"
                  />
                </div>
                <div class="flex flex-row pr-6 pl-1">
                  <h3 class="whitespace-no-wrap font-bold">{{$t("navigation.signOut")}}</h3>
                </div>
              </button>
            </div>
          </div>
        </transition>
      </div>
      <!-- Menu icon shown on small screens -->
      <MobileDropdown class="ml-2" />
    </div>
  </div>
</template>
<script>
import Logo from "~/components/Logo.vue";
import Jazzicon from "~/components/Jazzicon.vue";
import Icon from "~/components/Icon.vue";
import Spinner from "~/components/Spinner.vue";
import MobileDropdown from "~/components/MobileDropdown.vue";
import { mapGetters } from "vuex";
import {
  WalletProviders,
  DevcashBounty,
  NoAccountsFoundError
} from "~/plugins/devcash/devcashBounty.client";
import { mixin as clickaway } from "vue-clickaway";

export default {
  mixins: [clickaway],
  components: {
    Logo,
    Icon,
    Jazzicon,
    Spinner,
    MobileDropdown
  },
  methods: {
    toggleLangModal() {
      this.isLangModalOpen = !this.isLangModalOpen;
    },
    hideLangModal() {
      this.isLangModalOpen = false;
    },
    toggleSignInModal() {
      this.isSignInModalOpen = !this.isSignInModalOpen;
    },
    hideSignInModal() {
      this.isSignInModalOpen = false;
    },
    toggleSignOutModal() {
      this.isSignOutModalOpen = !this.isSignOutModalOpen;
    },
    hideSignOutModal() {
      this.isSignOutModalOpen = false;
    },
    changeLang(locale) {
      this.$i18n.setLocaleCookie(locale);
      this.$router.replace(this.switchLocalePath(locale.code));
    },
    async signIn(provider) {
      if (provider == this.walletProviders.metamask && !this.hasMetamask) {
        window.open("https://metamask.io/download.html", "_blank");
        return;
      }
      // Sign in flow
      this.isSignInModalOpen = false;
      this.loggingInLoading = true;
      try {
        // Initialize connector to ethereum
        let connector = await DevcashBounty.init(null, provider);
        // Set state
        this.$store.commit("devcash/setConnector", connector);
        // Set persistent state for logged in account
        this.$store.commit("devcashData/setProvider", provider);
        this.$store.commit(
          "devcashData/setLoggedInAccount",
          await connector.signer.getAddress()
        );
      } catch (e) {
        if (e instanceof NoAccountsFoundError) {
          // NO accounts found in provider
          if (provider == this.walletProviders.metamask) {
            window.open("https://metamask.io/download.html", "_blank");
          } else if (provider == this.walletProviders.authereum) {
            window.open("https://authereum.com/welcome", "_blank");
          } else if (provider == this.walletProviders.portis) {
            window.open("https://wallet.portis.io/", "_blank");
          }
        } else {
          // TODO - handle this correctly
          alert(`Unknown error ${e}`);
        }
      } finally {
        this.loggingInLoading = false;
      }
    },
    signOut() {
      this.$store.commit("devcashData/setProvider", null);
      this.$store.commit("devcashData/setLoggedInAccount", null);
      this.$store.commit("devcash/setConnector", null);
<<<<<<< HEAD
      this.$router.replace("/");
=======
      this.$router.replace(this.localePath('/'));
>>>>>>> ed1d91d103e13dc5d1079a1c303cc3b577638081
    }
  },
  computed: {
    // mix the getters into computed with object spread operator
    ...mapGetters({
      isLoggedIn: "devcashData/isLoggedIn"
    }),
    availableLocales() {
      return this.$i18n.locales;
    },
    currentLocale() {
      for (let locale of this.$i18n.locales) {
        if (locale.code == this.$i18n.locale) {
          return locale;
        }
      }
    }
  },
  data() {
    return {
      isLangModalOpen: false,
      isSignInModalOpen: false,
      isSignOutModalOpen: false,
      hasMetamask: false,
      walletProviders: WalletProviders,
      loggingInLoading: false
    };
  },
  mounted() {
    // Initialize these here since it's client side
    this.hasMetamask = DevcashBounty.hasMetamask();
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
  transform: scaleX(0.75) scaleY(0.25) translateY(-1rem);
}
.langModalTransition-leave-to {
  opacity: 0;
  transform: scaleX(0.75) scaleY(0.25) translateY(-1rem);
}
.signInModalTransition-enter-active {
  transition: all 0.2s ease-out;
}
.signInModalTransition-leave-active {
  transition: all 0.2s ease-out;
}
.signInModalTransition-enter {
  opacity: 0.25;
  transform: scaleX(0.75) scaleY(0.25) translateY(-1rem);
}
.signInModalTransition-leave-to {
  opacity: 0;
  transform: scaleX(0.75) scaleY(0.25) translateY(-1rem);
}
</style>