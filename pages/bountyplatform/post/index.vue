<template>
  <div class="w-full flex flex-col justify-center items-center px-1 md:px-4">
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
              v-model="title"
              :class="[$store.state.theme.dt?'bg-dtBackgroundTertiary border-dtBackgroundTertiary':'bg-ltBackgroundTertiary border-ltBackgroundTertiary']"
              class="flex-1 text-lg font-bold border focus:border-dtPrimary rounded-lg transition-all duration-200 ease-out px-4 py-2 mt-2"
              type="text"
              :placeholder="$t('bountyPlatform.post.bountyTitlePlaceholder')"
            />
            <!-- Divider -->
            <div class="hidden md:block w-8"></div>
          </div>
          <p v-if="titleError" :class="[$store.state.theme.dt?'text-dtDanger':'text-ltDanger']" class="text-xs px-3">{{ $t('bountyPlatform.post.titleLengthError').replace("%1", minTitleLength).replace("%2", maxTitleLength) }}</p>
        </div>
        <!-- Bounty Description -->
        <div class="w-full flex flex-col my-3">
          <h3 class="text-2xl font-bold px-3">{{$t('bountyPlatform.post.bountyDescription')}}</h3>
            <textarea
              v-model="description"
              :class="[$store.state.theme.dt?'bg-dtBackgroundTertiary border-dtBackgroundTertiary':'bg-ltBackgroundTertiary border-ltBackgroundTertiary']"
              class="bountyDescArea w-full leading-loose text-lg font-bold border focus:border-dtPrimary rounded-lg transition-all duration-200 ease-out px-4 py-2 md:py-4 md:px-6 mt-2"
              type="text"
              :placeholder="$t('bountyPlatform.post.bountyDescriptionPlaceholder')"
            />
        </div>
        <div class="w-full flex flex-col">
          <p :class="[$store.state.theme.dt && (description.length > maxDescriptionCount || description.length < minDescriptionCount) ?'text-dtDanger':description.length > maxDescriptionCount || description.length < minDescriptionCount ?'text-ltDanger':'']" class="text-xs px-3">{{ `${description.length}/${maxDescriptionCount}` }}</p>
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
                :class="{'left-0':openBounty, 'left-full -translate-x-full': !openBounty, 'shadow-lgSS': $store.state.theme.dt, 'shadow-lgS': !$store.state.theme.dt}"
                class="absolute w-1/2 h-full w-24 bg-dtPrimary left-0 rounded-full transform transition-all duration-200 ease-out"
              ></div>
              <button
                :class="[openBounty?'text-dtText':'font-medium', {'hover_bg-dtText-15 focus_bg-dtText-15': $store.state.theme.dt && !openBounty, 'hover_bg-ltText-15 focus_bg-ltText-15': !$store.state.theme.dt && !openBounty }]"
                @click.prevent="openBounty=true"
                class="w-1/2 text-sm font-bold md:text-lg leading-tight py-2 px-2 md:px-4 relative truncate rounded-full transition-all duration-300 ease-out"
              >{{$t('bountyPlatform.post.bountyTypePublic')}}</button>
              <button
                :class="[!openBounty?'text-dtText':'font-medium', {'hover_bg-dtText-15 focus_bg-dtText-15': $store.state.theme.dt && openBounty, 'hover_bg-ltText-15 focus_bg-ltText-15': !$store.state.theme.dt && activeTab !='private' }]"
                @click.prevent="openBounty=false"
                class="w-1/2 text-sm font-bold md:text-lg leading-tight py-2 px-2 md:px-4 relative truncate rounded-full transition-all duration-300 ease-out"
              >{{$t('bountyPlatform.post.bountyTypePrivate')}}</button>
            </div>
          </div>
        </div>
        <!-- Divider -->
        <div class="hidden md:block w-16"></div>
        <!-- Hunter's Address -->
        <div v-if="!openBounty" class="w-full md:flex-1 flex flex-col my-3">
          <h3 class="text-xl font-bold px-3">{{$t('bountyPlatform.post.bountyTypeHunterAddress')}}</h3>
          <input
            v-model="hunter"
            :class="[$store.state.theme.dt?'bg-dtBackgroundTertiary border-dtBackgroundTertiary':'bg-ltBackgroundTertiary border-ltBackgroundTertiary']"
            class="w-full text-lg font-bold border focus:border-dtPrimary rounded-lg transition-all duration-200 ease-out px-4 py-2 mt-2"
            type="text"
            :placeholder="$t('bountyPlatform.post.bountyTypeHunterAddressPlaceholder')"
          />
          <p v-if="invalidHunterAddress" :class="[$store.state.theme.dt?'text-dtDanger':'text-ltDanger']" class="text-xs px-3">{{ $t('bountyPlatform.post.invalidAddress') }}</p>
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
            v-model="numBounties"
            :class="[$store.state.theme.dt?'bg-dtBackgroundTertiary border-dtBackgroundTertiary':'bg-ltBackgroundTertiary border-ltBackgroundTertiary']"
            class="w-full text-lg font-bold border focus:border-dtPrimary rounded-lg transition-all duration-200 ease-out px-4 py-2 mt-2"
            type="number"
            min="1"
            :placeholder="$t('bountyPlatform.post.bountyCountPlaceholder')"
          />
          <p v-if="numBountiesError" :class="[$store.state.theme.dt?'text-dtDanger':'text-ltDanger']" class="text-xs px-3">{{ $t('bountyPlatform.post.numBountiesError') }}</p>
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
            v-model="amount"
            :class="[$store.state.theme.dt?'bg-dtBackgroundTertiary border-dtBackgroundTertiary':'bg-ltBackgroundTertiary border-ltBackgroundTertiary']"
            class="w-full text-lg font-bold border focus:border-dtPrimary rounded-lg transition-all duration-200 ease-out px-4 py-2 mt-2"
            type="number"
            @keypress="onlyForCurrency"
            :placeholder="$t('bountyPlatform.post.bountyAmountPlaceholder')"
          />
          <p v-if="amountError" :class="[$store.state.theme.dt?'text-dtDanger':'text-ltDanger']" class="text-xs px-3">{{ amountError }}</p>
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
      :buttonAction="submitBounty"
      :buttonText="$t('bountyPlatform.post.buttonPostBounty')"
    />
  </div>
</template>

<script>
import { SIDEBAR_CONTEXTS } from "~/config";
import { DevcashBounty } from "~/plugins/devcash/devcashBounty.client"
import GreetingCard from "~/components/BountyPlatform/GreetingCard.vue";
import CTACard from "~/components/BountyPlatform/CTACard.vue";
import Icon from "~/components/Icon.vue";
import { utils } from "ethers"
import { mapGetters } from "vuex";

const minDescriptionCount = 50;
const maxDescriptionCount = 1000;

export default {
  layout: "bountyPlatform",
  components: {
    GreetingCard,
    CTACard,
    Icon
  },
  data() {
    return {
      openBounty: true,
      // For meta tags
      pageTitle: this.$t("meta.bountyPlatform.post.pageTitle"),
      pageDescription: this.$t("meta.bountyPlatform.post.pageDescription"),
      pagePreview: `${process.env.BASE_URL}/previews/bountyplatform.png`,
      pageThemeColor: "#675CFF",
      canonicalURL: process.env.CANONICAL_URL,
      minDescriptionCount: minDescriptionCount,
      maxDescriptionCount: maxDescriptionCount,
      title: "",
      description: "",
      hunter: "",
      numBounties: null,
      amount: null,
      contactName: "",
      contactEmail: "",
      // Form validation
      minTitleLength: 10,
      maxTitleLength: 50,
      titleError: false,
      numBountiesError: false,
      invalidHunterAddress: false,
      amountError: ""
    };
  },
  computed: {
    // mix the getters into computed with object spread operator
    ...mapGetters({
      isLoggedIn: "devcashData/isLoggedIn",
      loggedInAccount: "devcashData/loggedInAccount"
    })
  },  
  methods: {
   validateForm() {
     let isValid = true
     // Check title length
     if (this.title.length < this.minTitleLength || this.title.length > this.maxTitleLength) {
       isValid = false
       this.titleError = true 
     } else {
       this.titleError = false
     }
     // Check description
     if (this.description.length < minDescriptionCount || this.description.length > maxDescriptionCount) {
       isValid = false
     }
     // Check hunter address
     if (!this.openBounty) {
      try {
        utils.getAddress(this.hunter)
        this.invalidHunterAddress = false
      } catch (e) {
        isValid = false
        this.invalidHunterAddress = true
      }
     } else {
       this.invalidHunterAddress = false
     }
     // Check num bounties
     if (this.numBounties < 1) {
       this.numBountiesError = true
       isValid = false
     } else {
       this.numBountiesError = false
       isValid = true
     }
     // Check amount
     try {
       let amountBigNum = utils.bigNumberify(this.amount)
       let balanceBigNum = utils.bigNumberify(this.$store.state.devcashData.balance.approvedRaw)
       if (amountBigNum.gt(balanceBigNum) || amountBigNum.eq(utils.bigNumberify(0))) {
         this.amountError = this.$t('bountyPlatform.post.insufficientBalance')
         isValid = false
       } else {
         this.amountError = ""
       }
     } catch (e) {
       this.amountError = this.$t('bountyPlatform.post.invalidAmount')
       isValid = false
     }
     // TODO - validate deadline, name, email

     return isValid
   },
   onlyForCurrency(e) {
     let keyCode = (e.keyCode ? e.keyCode : e.which);

     // only allow number and one dot
     if ((keyCode < 48 || keyCode > 57) && (keyCode !== 46 || this.amount.indexOf('.') != -1)) { // 46 is dot
      e.preventDefault();
     }

     // restrict to 8 decimal places
     if(this.amount!=null && this.amount.indexOf(".")>-1 && (this.amount.split('.')[1].length > 7)){
      e.preventDefault();
     }
   },
   submitBounty() {
     console.log("SUBMITTING")
     // TODO - remove always true condition
     if (this.validateForm() || true) {
       // Post bounty
       let bounty = DevcashBounty.createUBounty(
        this.loggedInAccount,
        this.title,
        this.description,
        "jeff@replaceme.com",
        "jeff@replaceme.com",
        this.openBounty ? null : hunter
      )
      console.log(bounty)
     }
   }
  },
  mounted() {
    DevcashBounty.updateBalances(this)
  },
  beforeMount() {
    // Set sidebar context
    this.$store.commit("general/setSidebarContext", SIDEBAR_CONTEXTS.post);
  },
  beforeDestroy() {
    if (this.editor) {
      this.editor.destroy()
    }
  },  
  destroyed() {
    this.$store.commit("general/setSidebarContext", null);
  },
  head() {
    return {
      title: this.pageTitle,
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: "description",
          name: "description",
          content: this.pageDescription
        },
        // Google / Search Engine Tags
        {
          itemprop: "name",
          content: this.pageTitle
        },
        {
          itemprop: "description",
          content: this.pageDescription
        },
        {
          itemprop: "image",
          content: this.pagePreview
        },
        // Facebook Meta Tags
        {
          property: "og:url",
          content: this.canonicalURL
        },
        {
          property: "og:type",
          content: "website"
        },
        {
          property: "og:title",
          content: this.pageTitle
        },
        {
          property: "og:description",
          content: this.pageDescription
        },
        {
          property: "og:image",
          content: this.pagePreview
        },
        // Twitter Meta Tags
        {
          name: "twitter:card",
          content: "summary_large_image"
        },
        {
          name: "twitter:title",
          content: this.pageTitle
        },
        {
          name: "twitter:description",
          content: this.pageDescription
        },
        {
          name: "twitter:image",
          content: this.pagePreview
        },
        // Theme
        {
          name: "theme-color",
          content: this.pageThemeColor
        },
        // Windows 8 IE 10
        {
          name: "msapplication-TileColor",
          content: this.pageThemeColor
        },
        // Windows 8.1 + IE11 and above
        {
          name: "apple-mobile-web-app-status-bar-style",
          content: this.pageThemeColor
        }
      ],
      link: [
        // Canonical
        {
          rel: "canonical",
          href: this.canonicalURL
        },
        // Generic Icons
        {
          rel: "icon",
          sizes: "180x180",
          href: "/apple-touch-icon.png"
        },
        {
          rel: "icon",
          sizes: "32x32",
          href: "/favicon-32x32.png"
        },
        {
          rel: "icon",
          sizes: "16x16",
          href: "/favicon-16x16.png"
        },
        { rel: "manifest", href: "/site.webmanifest" }
      ]
    };
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

<style>
p.is-empty:first-child::before {
  content: attr(data-empty-text);
  float: left;
  color: black;
  pointer-events: none;
  height: 0;
}
</style>