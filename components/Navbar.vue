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
            <div class="mx-1 hidden lg:block">{{ currentLocaleName }}</div>
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
                v-for="locale in supportedLocales"
                :key="locale.code"
                @click="changeLang(locale)"
                :class="locale.code == $store.state.i18n.currentLocale ? 'bg-dtPrimary text-dtText': 'hover_bg-dtPrimary-35 focus_bg-dtPrimary-35'"
                class="flex flex-row items-center py-3 transition-colors duration-200 ease-out"
              >
                <div class="mx-4">
                  <Icon v-if="locale.code == $store.state.i18n.currentLocale" colorClass="text-dtText" type="done" class="w-6 h-6" />
                  <div v-else class="w-6 h-6"></div>
                </div>
                <div class="flex flex-row">
                  <h3 class="font-bold">{{ locale.name }}</h3>
                  <h4 class="ml-1 text-sm">({{ locale.iso }})</h4>
                </div>
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
      <!-- Sign In/Out Button -->
      <div v-if="!isLoggedIn" class="relative">
        <button
          @click="isSignInModalOpen=!isSignInModalOpen && !loggingInLoading"
          @blur="signInBlur"
          :class="[
          $store.state.theme.dt
            ? 'bg-dtText text-dtBackground btn-dtText'
            : ' bg-ltText text-ltBackground btn-ltText'
        ]"
          class="hover_scale-lg focus_scale-lg md:ml-4 lg:ml-6 font-bold transition-all ease-out duration-200 rounded-tl-xl rounded-br-xl rounded-tr rounded-bl px-5 py-1"
        >{{ loggingInLoading ? "Signing in..." : $t("navigation.signIn") }}</button>
        <!-- Sign In Modal -->
        <transition name="signInModalTransition">
          <!-- Modal Wrapper -->
          <div class="origin-top-right absolute right-0 pt-3" v-if="isSignInModalOpen && !loggingInLoading">
            <div
              :class="$store.state.theme.dt ? 'bg-dtText text-dtBackground' : 'bg-ltText text-ltBackground'"
              class="flex flex-col relative origin-top-right shadow-2xlS rounded-tl-3xl rounded-br-3xl rounded-bl-lg rounded-tr-lg overflow-hidden px-6 py-5"
            >
              <!-- MetaMask Button -->
              <button
                :class="$store.state.theme.dt?'btn-dtTextTertiary':'btn-ltTextTertiary'"
                class="flex flex-row items-center bg-dtOrange border-2 border-dtOrange hover_scale-md focus_scale-md rounded-tl-2xl rounded-br-2xl rounded-bl-md rounded-tr-md transition-all duration-200 ease-out overflow-hidden my-1.5"
                @click="signIn(walletProviders.metamask)"
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
                  <h4 class="text-dtBackground text-lg font-extrabold ml-8 mr-10">{{ hasMetamask ? 'MetaMask' : 'Get MetaMask' }}</h4>
                </div>
              </button>
              <!-- Authereum Button -->
              <button
                :class="$store.state.theme.dt?'btn-dtTextTertiary':'btn-ltTextTertiary'"
                class="flex flex-row items-center bg-dtRed border-2 border-dtRed hover_scale-md focus_scale-md rounded-tl-2xl rounded-br-2xl rounded-bl-md rounded-tr-md transition-all duration-200 ease-out overflow-hidden my-1.5"
                @click="signIn(walletProviders.authereum)"
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
                  <h4 class="text-dtBackground text-lg font-extrabold ml-8 mr-10">{{ 'Authereum' }}</h4>
                </div>
              </button>
              <!-- Portis Button -->
              <button
                :class="$store.state.theme.dt?'btn-dtTextTertiary':'btn-ltTextTertiary'"
                class="flex flex-row items-center bg-dtBlue border-2 border-dtBlue hover_scale-md focus_scale-md rounded-tl-2xl rounded-br-2xl rounded-bl-md rounded-tr-md transition-all duration-200 ease-out overflow-hidden my-1.5"
                @click="signIn(walletProviders.portis)"
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
                  <h4 class="text-dtBackground text-lg font-extrabold ml-8 mr-10">{{ 'Portis' }}</h4>
                </div>
              </button>
            </div>
          </div>
        </transition>
      </div>
      <div v-else class="relative">
        <button
          @click="signOut()"
          :class="[
          $store.state.theme.dt
            ? 'bg-dtText text-dtBackground btn-dtText'
            : ' bg-ltText text-ltBackground btn-ltText'
        ]"
          class="hover_scale-lg focus_scale-lg md:ml-4 lg:ml-6 font-bold transition-all ease-out duration-200 rounded-tl-xl rounded-br-xl rounded-tr rounded-bl px-5 py-1"
        >{{ $t("navigation.signOut") }}</button>
      </div>
    </div>
  </div>
</template>
<script>
import Logo from "~/components/Logo.vue";
import Icon from "~/components/Icon.vue";
import MobileDropdown from "~/components/MobileDropdown.vue";
import { LOCALES } from "~/config"
import { mapGetters } from 'vuex';
import { WalletProviders, DevcashBounty, NoAccountsFoundError } from "~/plugins/devcash/devcashBounty.client";


export default {
  components: {
    Logo,
    Icon,
    MobileDropdown
  },
  methods: {
    changeLang(locale) {
      this.$router.push(this.getSwitchLocaleRoute(locale.code))
    },
    signInBlur() {
      // Delay blur to avoid interfering with button presses
      setTimeout(() => {
        this.isSignInModalOpen = false
      }, 50)
    },
    async signIn(provider) {
      if (provider == this.walletProviders.metamask && !this.hasMetamask) {
        window.open('https://metamask.io/download.html', '_blank')
        return
      }
      // Sign in flow
      this.isSignInModalOpen = false
      this.loggingInLoading = true
      try {
        // Initialize connector to ethereum
        let connector = await DevcashBounty.init(
          null,
          provider
        );
        // Set state
        this.$store.commit("devcash/setConnector", connector);
        // Set persistent state for logged in account
        this.$store.commit("devcashData/setProvider", provider)
        this.$store.commit("devcashData/setLoggedInAccount", await connector.signer.getAddress())
      } catch (e) {
        if (e instanceof NoAccountsFoundError) {
          // NO accounts found in provider
          if (provider == this.walletProviders.metamask) {
            window.open('https://metamask.io/download.html', '_blank')
          } else if (provider == this.walletProviders.authereum) {
            window.open('https://authereum.com/welcome', '_blank')
          } else if (provider == this.walletProviders.portis) {
            window.open('https://wallet.portis.io/', '_blank')
          }
        } else {
          // TODO - handle this correctly
          alert(`Unknown error ${e}`);
        }
      } finally {
        this.loggingInLoading = false
      }
    },
    signOut() {
      this.$store.commit("devcashData/setProvider", null)
      this.$store.commit("devcashData/setLoggedInAccount", null)
      this.$store.commit("devcash/setConnector", null)
    }
  },
  computed: {
    // mix the getters into computed with object spread operator
    ...mapGetters({
      isLoggedIn: 'devcashData/isLoggedIn',
      currentLocaleName: 'i18n/currentLocaleName'
    })
  },  
  data() {
    return {
      isLangModalOpen: false,
      isSignInModalOpen: false,
      hasMetamask: false,
      walletProviders: WalletProviders,
      loggingInLoading: false,
      supportedLocales: LOCALES
    };
  },
  mounted() {
    // Initialize these here since it's client side
    this.hasMetamask = DevcashBounty.hasMetamask()
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
