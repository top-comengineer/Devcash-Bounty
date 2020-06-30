<template>
  <div class="w-full flex flex-row justify-between items-center px-4 py-3 md:py-4 lg:px-8 lg:py-6">
    <nuxt-link
      :to="localePath('index')"
      class="focus:scale-110 hover:scale-110 transform transition-transform duration-300"
    >
      <Logo class="w-36 md:w-40 h-8" />
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
          @click="navigate"
          :href="href"
          class="text-c-text hover:bg-c-text-15 focus:bg-c-text-15 flex flex-col font-bold transition-all ease-out duration-200 pt-1 px-4 lg:ml-2 rounded-full"
        >
          {{
          $t("navigation.home")
          }}
          <div
            :class="[isExactActive?'transform scale-x-100':'transform scale-x-0']"
            class="bg-c-text h-px2 w-full rounded-tl-full rounded-br-full transition-all ease-out duration-200"
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
          @click="navigate"
          :href="href"
          class="text-c-text hover:bg-c-text-15 focus:bg-c-text-15 flex flex-col font-bold transition-all ease-out duration-200 pt-1 px-4 lg:ml-2 rounded-full"
        >
          {{
          $t("navigation.bountyPlatform")
          }}
          <div
            :class="[isActive?'transform scale-x-100':'transform scale-x-0']"
            class="bg-c-text h-px2 w-full rounded-tl-full rounded-br-full transition-all ease-out duration-200"
          ></div>
        </a>
      </nuxt-link>
      <!-- DEX -->
      <!-- <a
        href="/"
        class="hover:bg-c-text-15 focus:bg-c-text-15 hidden md:flex flex-col font-bold transition-all ease-out duration-200 pt-1 px-4 lg:ml-2 rounded-full"
      >
        <div>{{ $t("navigation.dex") }}</div>
        <div class="h-px2 w-full"></div>
      </a>-->
      <!-- Language -->
      <div class="relative">
        <!-- Language Button -->
        <button
          @click="toggleLangModal"
          @keydown.esc.exact="hideLangModal"
          class="hover:bg-c-text-15 focus:bg-c-text-15 flex flex-col font-bold lg:pt-1 lg:px-4 lg:ml-2 md:mr-1 lg:mr-0 rounded-full transition-all ease-out duration-200"
        >
          <div class="flex flex-row items-center p-1">
            <Icon
              class="w-8 h-8 lg:w-6 lg:h-6 transition-all ease-out duration-200"
              colorClass="text-c-text"
              type="language"
            />
            <div class="mx-1 hidden lg:block text-c-text">{{ currentLocale.name }}</div>
            <Icon
              class="hidden lg:block w-4 h-4 transition-all ease-out duration-200"
              colorClass="text-c-text"
              type="arrow-down"
            />
          </div>
          <div class="hidden lg:block h-px2 w-full"></div>
        </button>
        <!-- Language Modal -->
        <transition name="langModalTransition">
          <!-- Modal Wrapper -->
          <div
            v-on-clickaway="hideLangModal"
            class="origin-top-right absolute right-0 pt-2"
            v-if="isLangModalOpen"
          >
            <div
              class="bg-c-text text-c-background w-56 flex flex-col relative shadow-2xl rounded-tl-2xl rounded-br-2xl rounded-bl-md rounded-tr-md overflow-hidden"
            >
              <button
                v-for="(locale, index) in availableLocales"
                :key="locale.code"
                @click="changeLang(locale); hideLangModal()"
                @keydown.tab.exact="index+1 == availableLocales.length?hideLangModal():null"
                @keydown.esc.exact="hideLangModal"
                :class="locale.code == currentLocale.code ? 'bg-c-primary text-c-light': 'hover:bg-c-primary-35 focus:bg-c-primary-35'"
                class="flex flex-row items-center py-3 transition-colors duration-200 ease-out"
              >
                <div class="mx-4">
                  <Icon
                    v-if="locale.code == currentLocale.code"
                    colorClass="text-c-light"
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
        class="hover:bg-c-text-15 focus:bg-c-text-15 hidden md:block rounded-full lg:ml-2 p-1 transition-all ease-out duration-200"
      >
        <Icon
          class="w-8 h-8"
          colorClass="text-c-text"
          :secondaryColorClass="text-c-danger"
          type="notification-new"
        />
      </button>
      -->
      <!-- Theme Switcher Button -->
      <button
        @click="changeTheme"
        class="hover:bg-c-text-15 focus:bg-c-text-15 hidden md:block rounded-full lg:ml-2 p-1 transition-all ease-out duration-200"
      >
        <Icon
          class="w-8 h-8"
          colorClass="text-c-text"
          :type="$store.state.theme == 'dark' ? 'light' : 'dark'"
        />
      </button>
      <!-- Sign In/Out Button -->
      <div v-if="!isLoggedIn" class="hidden md:block relative">
        <!-- Sign In Button -->
        <button
          @click="toggleSignInModal"
          @keydown.esc.exact="hideSignInModal"
          class="btn-text bg-c-text text-c-background flex flex-row items-center hover_scale-lg focus_scale-lg ml-4 lg:ml-6 font-bold transition-all ease-out duration-200 rounded-tl-xl rounded-br-xl rounded-tr rounded-bl px-5 py-1"
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
              class="bg-c-text text-c-background flex flex-col relative origin-top-right shadow-2xl rounded-tl-3xl rounded-br-3xl rounded-bl-lg rounded-tr-lg overflow-hidden px-6 py-5"
            >
              <!-- MetaMask Button -->
              <button
                class="btn-text-ter flex flex-row items-center bg-c-metamask border-2 border-c-metamask transform hover:scale-md focus:scale-md duration-200 ease-out origin-bottom-left rounded-tl-2xl rounded-br-2xl rounded-bl-md rounded-tr-md transition-all duration-200 ease-out overflow-hidden my-2"
                @click="signIn(walletProviders.metamask)"
                @keydown.esc.exact="hideSignInModal"
              >
                <div class="bg-c-background-ter h-12 w-12 p-2">
                  <img
                    class="w-full h-full"
                    :src="require('~/assets/images/wallet-logos/MetaMask.svg')"
                    alt="MetaMask"
                  />
                </div>
                <div class="flex flex-row flex-1 justify-center">
                  <h4
                    class="whitespace-no-wrap text-c-dark text-lg font-extrabold ml-8 mr-10"
                  >{{ hasMetamask ? $t("wallet.metamask") : $t("wallet.getMetamask") }}</h4>
                </div>
              </button>
              <!-- Portis Button -->
              <button
                class="btn-text-ter flex flex-row items-center bg-c-portis border-2 border-c-portis transform hover:scale-md focus:scale-md duration-200 ease-out origin-bottom-left rounded-tl-2xl rounded-br-2xl rounded-bl-md rounded-tr-md transition-all duration-200 ease-out overflow-hidden my-2"
                @click="signIn(walletProviders.portis)"
                @keydown.esc.exact="hideSignInModal"
              >
                <div class="bg-c-background-ter h-12 w-12 p-2">
                  <img
                    class="w-full h-full"
                    :src="require('~/assets/images/wallet-logos/Portis.svg')"
                    alt="Portis"
                  />
                </div>
                <div class="flex flex-row flex-1 justify-center">
                  <h4
                    class="whitespace-no-wrap text-c-dark text-lg font-extrabold ml-8 mr-10"
                  >{{ $t("wallet.portis") }}</h4>
                </div>
              </button>
              <!-- Authereum Button -->
              <button
                class="btn-text-ter flex flex-row items-center bg-c-authereum border-2 border-c-authereum transform hover:scale-md focus:scale-md duration-200 ease-out origin-bottom-left rounded-tl-2xl rounded-br-2xl rounded-bl-md rounded-tr-md transition-all duration-200 ease-out overflow-hidden my-2"
                @click="signIn(walletProviders.authereum)"
                @keydown.esc.exact="hideSignInModal"
                @keydown.tab.exact="hideSignInModal"
              >
                <div class="bg-c-background-ter h-12 w-12 p-2">
                  <img
                    class="w-full h-full"
                    :src="require('~/assets/images/wallet-logos/Authereum.svg')"
                    alt="Authereum"
                  />
                </div>
                <div class="flex flex-row flex-1 justify-center">
                  <h4
                    class="whitespace-no-wrap text-c-dark text-lg font-extrabold ml-8 mr-10"
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
          class="btn-text bg-c-text text-c-background flex flex-row items-center transform hover:scale-lg focus:scale-lg ml-4 lg:ml-6 font-bold transition-all ease-out duration-200 rounded-full p-0_5"
        >
          <Jazzicon class="flex" :diameter="32" :address="loggedInAccount" />
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
              class="bg-c-text text-c-background max-w-full min-w-xxxs flex flex-col relative origin-top-right shadow-2xl rounded-tl-2xl rounded-br-2xl rounded-bl-md rounded-tr-md overflow-hidden"
            >
              <!-- Balance Text -->
              <div class="flex flex-col px-6 mt-4">
                <p
                  class="text-xs opacity-75 whitespace-no-wrap"
                >{{$t('bountyPlatform.sidebarContextual.balance')}}</p>
                <h6 class="text-lg font-bold">{{balance.primary.amount}}</h6>
                <p
                  v-if="balance.primary.hasApproved"
                  class="text-xs opacity-75 mt-3 whitespace-no-wrap"
                >{{$t('bountyPlatform.sidebarContextual.approvedBalance')}}</p>
                <h5 class="text-c-primary font-bold text-xl">{{balance.primary.approved}}</h5>
              </div>
              <!-- Divider -->
              <div class="bg-c-background w-full h-px2 rounded-full mt-3 mb-1 opacity-10"></div>
              <!-- Overview Button -->
              <nuxt-link
                :to="localePath('bountyplatform-overview')"
                @keydown.esc.exact="hideSignOutModal"
                @click.native="hideSignOutModal"
                class="flex flex-row items-center hover:bg-c-primary-35 focus:bg-c-primary-35 transition-colors duration-200 ease-out py-3"
              >
                <div class="pl-6 pr-1">
                  <Icon colorClass="text-c-background" type="overview" class="w-6 h-6" />
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
                class="flex flex-row items-center hover:bg-c-primary-35 focus:bg-c-primary-35 transition-colors duration-200 ease-out py-3"
              >
                <div class="pl-6 pr-1">
                  <Icon colorClass="text-c-background" type="sign-out" class="w-6 h-6" />
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
    changeTheme() {
      this.$store.commit('changeTheme', this.$store.state.theme == 'dark' ? 'light' : 'dark');
      this.$root.$emit('themeChanged')
    },
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
      this.$root.$emit('changeLanguage')
    },
    async signIn(provider) {
      // Sign in flow
      this.isSignInModalOpen = false;
      this.loggingInLoading = true;
      try {
        await DevcashBounty.signIn(this, provider)
      } catch (e) {
        console.log(e)
      } finally {
        this.loggingInLoading = false;
      }
    },
    signOut() {
      DevcashBounty.signOut(this)
    },
    async updateBalance() {
      if (this.isLoggedIn) {
        await DevcashBounty.updateBalances(this)
        await DevcashBounty.updateFees(this)
      }
    }    
  },
  computed: {
    // mix the getters into computed with object spread operator
    ...mapGetters({
      isLoggedIn: "devcashData/isLoggedIn",
      loggedInAccount: "devcashData/loggedInAccount",
      balance: "devcashData/getBalance"
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
      loggingInLoading: false,
      ethersListeners: {},
      historicalCreated: []
    };
  },
  cron: {
    time: 60000,
    method: 'updateBalance'
  },
  mounted() {
    // Initialize these here since it's client side
    this.hasMetamask = DevcashBounty.hasMetamask();
    this.updateBalance();
    let ref = this
    this.$root.$on('connectorSet', (connector) => {
      if (connector) {
        connector.uBCContract.on("created", async (uBountyIndex, event) => {
          if (!ref.historicalCreated.includes(uBountyIndex)) {
            ref.historicalCreated.push(uBountyIndex)
            setTimeout(async () => {
              try {
                let onChain = await ref.$axios.get(`/bounty/one?id=${uBountyIndex}`)
                if (onChain.data.hunter) {
                  if (onChain.data.hunter.toLowerCase() == this.loggedInAccount.toLowerCase()) {
                    ref.$notify({
                      group: 'main',
                      title: this.$t('notification.personalBountyTitle').replace("%1", onChain.data.title),
                      text: this.$t('notification.bountyDescription'),
                      data: {
                        href: ref.localePath({name: 'bountyplatform-bounty-id', params: {id: uBountyIndex}})
                      }
                    });
                    ref.$root.$emit('bountyCreated', onChain.data)
                  }
                } else {
                  ref.$notify({
                    group: 'main',
                    title: this.$t('notification.bountyTitle').replace("%1", onChain.data.title),
                    text: this.$t('notification.bountyDescription'),
                    data: {
                      href: ref.localePath({name: 'bountyplatform-bounty-id', params: {id: uBountyIndex}})
                    }
                  });
                  ref.$root.$emit('bountyCreated', onChain.data)
                }
              } catch (e) {
                console.log(e)
              }
            }, 10000)
          }
        });
        connector.uBCContract.on("rejected", async (uBountyIndex, submissionIndex, feedback) => {
          let asObj = JSON.stringify({
            rejected: true,
            bounty: uBountyIndex,
            sub: submissionIndex,
            feedback: feedback
          })      
          if (!ref.historicalCreated.includes(asObj)) {
            ref.historicalCreated.push(asObj)
            if (ref.isLoggedIn) {
              try {
                let onChain = await ref.$axios.get(`/submission/one?bounty_id=${uBountyIndex}&submission_id=${submissionIndex}`)
                if (onChain.data.creator == ref.loggedInAccount) {
                  ref.$notify({
                    group: 'main',
                    title: this.$t('notification.yourSubmissionRejectedTitle').replace('%1', onChain.data.ubounty.title),
                    text: this.$t('notification.submissionReceivedDescription'),
                    data: {
                      href: ref.localePath('bountyplatform-bountyhunter')
                    },
                    duration: -1
                  });                  
                }
                ref.$root.$emit("subRejected", {bounty: uBountyIndex, submission: submissionIndex, feedback: feedback})
              } catch (e) {
                console.log(e)
              }
            }
          }    
        });
        connector.uBCContract.on("approved", async (uBountyIndex, submissionIndex, feedback) => {
          let asObj = JSON.stringify({
            approved: true,
            bounty: uBountyIndex,
            sub: submissionIndex,
            feedback: feedback
          })      
          if (!ref.historicalCreated.includes(asObj)) {
            ref.historicalCreated.push(asObj)
            if (ref.isLoggedIn) {
              try {
                let onChain = await ref.$axios.get(`/submission/one?bounty_id=${uBountyIndex}&submission_id=${submissionIndex}`)
                if (onChain.data.creator == ref.loggedInAccount) {
                  ref.$notify({
                    group: 'main',
                    title: this.$t('notification.yourSubmissionApprovedTitle').replace('%1', onChain.data.ubounty.title),
                    text: this.$t('notification.submissionReceivedDescription'),
                    data: {
                      href: ref.localePath('bountyplatform-bountyhunter')
                    },
                    duration: -1
                  });                
                }
                ref.$root.$emit("subApproved", {bounty: uBountyIndex, submission: submissionIndex, feedback: feedback})
              } catch (e) {
                console.log(e)
              }
            }
          }    
        });
        connector.uBCContract.on("submitted", async (uBountyIndex, submissionIndex, event) => {
          let asObj = JSON.stringify({
            bounty: uBountyIndex,
            sub: submissionIndex
          })
          if (!ref.historicalCreated.includes(asObj)) {
            ref.historicalCreated.push(asObj)
            if (ref.isLoggedIn) {
              try {
                let onChain = await ref.$axios.get(`/bounty/one?id=${uBountyIndex}`)
                if (onChain.data.creator == ref.loggedInAccount) {
                  setTimeout(async () => {
                    try {
                      let onChainSub = await ref.$axios.get(`/submission/one?bounty_id=${uBountyIndex}&submission_id=${submissionIndex}`)
                      ref.$notify({
                        group: 'main',
                        title: this.$t('notification.submissionReceivedTitle').replace('%1', onChain.data.title),
                        text: this.$t('notification.submissionReceivedDescription'),
                        data: {
                          href: ref.localePath('bountyplatform-bountymanager')
                        }
                      });
                      this.$root.$emit("managerSubmitted", onChainSub.data)
                    } catch (e) {
                      console.log(e)
                    }    
                  }, 10000)        
                }
              } catch (e) {
                console.log(e)
              }
            }
          }
        })
      } else {
        this.ethersListeners = {}
      }
    })     
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