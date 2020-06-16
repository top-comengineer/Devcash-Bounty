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
    <!-- Card for Bounty Title and Description -->
    <div
      :class="
      [$store.state.theme.dt?'bg-dtBackgroundSecondary':'bg-ltBackgroundSecondary shadow-lg']
    "
      class="w-full flex flex-row flex-wrap relative rounded-tl-3xl rounded-tr-lg py-4 px-6 md:pt-6 md:pb-5 md:px-10 xl:px-24 mt-1 md:mt-2"
    >
      <!-- Bounty Title -->
      <div class="w-full md:w-1/2 flex flex-col mt-3">
        <h3 class="text-2xl font-bold px-3">{{$t('bountyPlatform.post.bountyTitle')}}</h3>
        <div class="w-full flex flex-row">
          <input
            v-model="title"
            :class="[$store.state.theme.dt?'bg-dtBackgroundTertiary border-dtBackgroundTertiary':'bg-ltBackgroundTertiary border-ltBackgroundTertiary']"
            class="flex-1 text-lg font-bold border focus:border-dtPrimary rounded-lg transition-all duration-200 ease-out px-4 py-2 mt-2"
            type="text"
            :placeholder="$t('bountyPlatform.post.bountyTitlePlaceholder')"
            @focus="titleError?titleError=false:null"
            @keyup.enter="$event.target.nextElementSibling.focus()"
            @blur="validateTitle"
          />
          <!-- Divider -->
          <div class="hidden md:block w-8"></div>
        </div>
        <p
          :class="[$store.state.theme.dt?'text-dtDanger':'text-ltDanger']"
          class="text-xs px-3 mt-2"
        >{{ titleError?$t('bountyPlatform.post.titleLengthError').replace("%1", minTitleLength).replace("%2", maxTitleLength):'&nbsp;' }}</p>
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
          @blur="validateDescription"
        />
      </div>
      <div class="w-full flex flex-col">
        <p
          :class="[$store.state.theme.dt && (description.length > maxDescriptionCount || description.length < minDescriptionCount) ?'text-dtDanger':description.length > maxDescriptionCount || description.length < minDescriptionCount ?'text-ltDanger':'']"
          class="text-sm px-3 opacity-75"
        >{{ description.length>0?`${description.length}/${maxDescriptionCount}`:'&nbsp;' }}</p>
      </div>
    </div>
    <!-- Card for Bounty Type -->
    <div
      :class="[$store.state.theme.dt?'bg-dtBackgroundSecondary':'bg-ltBackgroundSecondary shadow-lg']"
      class="w-full flex flex-row flex-wrap relative py-4 px-6 md:pt-6 md:pb-5 md:px-10 xl:px-24 mt-1 md:mt-2"
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
              :class="[!openBounty?'text-dtText':'font-medium', {'hover_bg-dtText-15 focus_bg-dtText-15': $store.state.theme.dt && openBounty, 'hover_bg-ltText-15 focus_bg-ltText-15': !$store.state.theme.dt && openBounty }]"
              @click.prevent="openBounty=false"
              class="w-1/2 text-sm font-bold md:text-lg leading-tight py-2 px-2 md:px-4 relative truncate rounded-full transition-all duration-300 ease-out"
            >{{$t('bountyPlatform.post.bountyTypePrivate')}}</button>
          </div>
        </div>
        <!-- Spacer -->
        <p class="text-xs px-3 mt-2">{{'&nbsp;'}}</p>
      </div>

      <!-- Divider -->
      <div class="hidden md:block w-16"></div>
      <!-- Hunter's Address -->
      <transition name="hunterAddressTransition">
        <div v-if="!openBounty" class="w-full md:flex-1 flex flex-col my-3">
          <h3 class="text-xl font-bold px-3">{{$t('bountyPlatform.post.bountyTypeHunterAddress')}}</h3>
          <input
            v-model="hunter"
            :class="[$store.state.theme.dt?'bg-dtBackgroundTertiary border-dtBackgroundTertiary':'bg-ltBackgroundTertiary border-ltBackgroundTertiary']"
            class="w-full text-lg font-bold border focus:border-dtPrimary rounded-lg transition-all duration-200 ease-out px-4 py-2 mt-2"
            type="text"
            :placeholder="$t('bountyPlatform.post.bountyTypeHunterAddressPlaceholder')"
            @focus="invalidHunterAddress?invalidHunterAddress=false:null"
            @blur="validateHunterAddress"
          />
          <p
            :class="[$store.state.theme.dt?'text-dtDanger':'text-ltDanger']"
            class="text-xs px-3 mt-2"
          >{{ invalidHunterAddress?$t('bountyPlatform.post.invalidAddress'):'&nbsp;' }}</p>
        </div>
      </transition>
    </div>
    <!-- Card for Number of Bounties and Bounty Amount -->
    <div
      :class="[$store.state.theme.dt?'bg-dtBackgroundSecondary':'bg-ltBackgroundSecondary shadow-lg']"
      class="w-full flex flex-row flex-wrap relative py-4 px-6 md:pt-6 md:pb-5 md:px-10 xl:px-24 mt-1 md:mt-2"
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
          @focus="numBountiesError?numBountiesError=false:null"
          @blur="validateNumBounties"
        />
        <p
          :class="[$store.state.theme.dt?'text-dtDanger':'text-ltDanger']"
          class="text-xs px-3 mt-2"
        >{{ numBountiesError?$t('bountyPlatform.post.numBountiesError'):'&nbsp;' }}</p>
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
          @focus="amountError?amountError=false:null"
          @blur="validateAmount"
        />
        <p
          :class="[$store.state.theme.dt?'text-dtDanger':'text-ltDanger']"
          class="text-xs px-3 mt-2"
        >{{ amountError?amountError:'&nbsp;' }}</p>
      </div>
    </div>
    <!-- Card for Deadline -->
    <div
      :class="
      [$store.state.theme.dt?'bg-dtBackgroundSecondary':'bg-ltBackgroundSecondary shadow-lg']
    "
      class="w-full flex flex-row flex-wrap relative py-4 px-6 md:pt-6 md:pb-5 md:px-10 xl:px-24 mt-1 md:mt-2"
    >
      <!-- Deadline -->
      <div class="w-full md:w-1/2 flex flex-col my-3">
        <h3 class="text-xl font-bold px-3">
          {{$t('bountyPlatform.post.bountyDeadline')}}
          <span
            class="font-normal text-base opacity-75"
          >{{$t('bountyPlatform.post.optional')}}</span>
        </h3>
        <div class="w-full flex flex-row items-center relative mt-2">
          <div v-on-clickaway="closePicker" class="flex-1 flex flex-col">
            <input
              v-model="datePickerValueStr"
              :class="[$store.state.theme.dt?'bg-dtBackgroundTertiary border-dtBackgroundTertiary':'bg-ltBackgroundTertiary border-ltBackgroundTertiary']"
              class="w-full text-lg font-bold border focus:border-dtPrimary rounded-lg transition-all duration-200 ease-out px-4 py-2"
              type="text"
              @focus="showDatePicker=true"
              @keydown.esc.exact="closePicker"
              @keydown.tab.exact="closePicker"
              readonly="true"
              :placeholder="$t('bountyPlatform.post.bountyDeadlinePlaceholder')"
              @blur="validateDeadline"
            />
            <div class="relative">
              <transition name="datePickerTransition">
                <DatePicker
                  class="absolute z-50 top-0 mt-2 origin-top-left"
                  v-if="showDatePicker"
                  :closePicker="closePicker"
                  :value="datePickerValue"
                  :datePicked="datePickerSet"
                  :futureOnly="true"
                />
              </transition>
            </div>
          </div>
          <!-- Clear button -->
          <button
            v-if="datePickerValue!=null || datePickerValueStr != ''"
            :class="$store.state.theme.dt?'btn-dtPrimary':'btn-ltPrimary'"
            class="hover_scale-md bg-dtPrimary text-dtText font-extrabold text-lg rounded-tl-2xl rounded-br-2xl rounded-tr-md rounded-bl-md p-2 ml-3"
            @click.prevent="datePickerValueStr=''; datePickerValue=null"
          >
            <Icon class="w-6 h-6" colorClass="text-dtText" type="cancel" />
          </button>
          <!-- Divider -->
          <div class="hidden md:block w-8"></div>
        </div>
        <p
          :class="[$store.state.theme.dt?'text-dtDanger':'text-ltDanger']"
          class="text-sm px-3"
        >{{ deadlineError?$t('bountyPlatform.post.deadlineError'):'&nbsp;' }}</p>
      </div>
    </div>
    <!-- Card for Contact Name and Email -->
    <div
      :class="
      [$store.state.theme.dt?'bg-dtBackgroundSecondary':'bg-ltBackgroundSecondary shadow-lg']
    "
      class="w-full flex flex-row flex-wrap relative py-4 px-6 md:pt-6 md:pb-5 md:px-10 xl:px-24 mt-1 md:mt-2"
    >
      <!-- Contact Name -->
      <div class="w-full md:flex-1 flex flex-col my-3">
        <h3 class="text-xl font-bold px-3">{{$t('bountyPlatform.post.contactName')}}</h3>
        <input
          v-model="contactName"
          :class="[$store.state.theme.dt?'bg-dtBackgroundTertiary border-dtBackgroundTertiary':'bg-ltBackgroundTertiary border-ltBackgroundTertiary']"
          class="w-full text-lg font-bold border focus:border-dtPrimary rounded-lg transition-all duration-200 ease-out px-4 py-2 mt-2"
          type="text"
          :placeholder="$t('bountyPlatform.post.contactNamePlaceholder')"
          @focus="contactNameError?contactNameError=false:null"
          @blur="validateContactName"
        />
        <p
          :class="[$store.state.theme.dt?'text-dtDanger':'text-ltDanger']"
          class="text-xs px-3 mt-2"
        >{{ contactNameError ? $t('bountyPlatform.post.contactNameLengthError').replace("%1", minContactNameLength).replace("%2", maxContactNameLength):'&nbsp;' }}</p>
      </div>
      <!-- Divider -->
      <div class="hidden md:block w-16"></div>
      <!-- Contact Email -->
      <div class="w-full md:flex-1 flex flex-col my-3">
        <h3 class="text-xl font-bold px-3">{{$t('bountyPlatform.post.contactEmail')}}</h3>
        <input
          v-model="contactEmail"
          :class="[$store.state.theme.dt?'bg-dtBackgroundTertiary border-dtBackgroundTertiary':'bg-ltBackgroundTertiary border-ltBackgroundTertiary']"
          class="w-full text-lg font-bold border focus:border-dtPrimary rounded-lg transition-all duration-200 ease-out px-4 py-2 mt-2"
          type="text"
          :placeholder="$t('bountyPlatform.post.contactEmailPlaceholder')"
          @focus="emailError?emailError=false:null"
          @blur="validateEmail"
        />
        <p
          :class="[$store.state.theme.dt?'text-dtDanger':'text-ltDanger']"
          class="text-xs px-3 mt-2"
        >{{ emailError?$t('bountyPlatform.post.invalidEmail'):'&nbsp;' }}</p>
      </div>
    </div>
    <!-- Call to Action Card -->
    <CTACard
      class="my-1 md:my-2"
      :disabled="submitLoading"
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
import DatePicker from "~/components/DatePicker";
import { utils } from "ethers"
import { mapGetters } from "vuex";
import { mixin as clickaway } from "vue-clickaway";

const minDescriptionCount = 50;
const maxDescriptionCount = 1000;

export default {
  mixins: [clickaway],
  layout: "bountyPlatform",
  components: {
    GreetingCard,
    CTACard,
    Icon,
    DatePicker
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
      showDatePicker: false,
      datePickerValue: null,
      datePickerValueStr: "",
      submitLoading: false,
      // Form validation
      minTitleLength: 10,
      maxTitleLength: 50,
      minContactNameLength: 2,
      maxContactNameLength: 25,
      titleError: false,
      contactNameError: false,
      emailError: false,
      numBountiesError: false,
      invalidHunterAddress: false,
      deadlineError: false,
      amountError: "",
      emailRegex: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/
    };
  },
  computed: {
    // mix the getters into computed with object spread operator
    ...mapGetters({
      isLoggedIn: "devcashData/isLoggedIn",
      loggedInAccount: "devcashData/loggedInAccount"
    }),
    currentLocale() {
      for (let locale of this.$i18n.locales) {
        if (locale.code == this.$i18n.locale) {
          return locale;
        }
      }
    }    
  },  
  methods: {
   closePicker() {
     this.showDatePicker = false
   },
   datePickerSet(date) {
     const utcDate = new Date(Date.UTC(
       date.getFullYear(),
       date.getMonth(),
       date.getDate(),
       23,
       59,
       59
     ))
     let dtOptions = {
       timeZone: 'UTC',
       timeZoneName: 'short',
       timeStyle: 'short',
       dateStyle: 'short',
       year: 'numeric',
       month: 'numeric',
       day: 'numeric'
     }
     this.datePickerValue = utcDate
     this.datePickerValueStr = utcDate.toLocaleString(this.currentLocale.iso == 'en' ? undefined : this.currentLocale.iso, dtOptions)
     this.showDatePicker = false
   },
  
  validateTitle(){
    let isValid = true
    if (this.title.length < this.minTitleLength || this.title.length > this.maxTitleLength) {
       isValid = false
       this.titleError = true 
     } else {
       this.titleError = false
     }
     return isValid
  },
  validateDescription(){
    let isValid = true
if (this.description.length < minDescriptionCount || this.description.length > maxDescriptionCount) {
       isValid = false
     }
     return isValid
  },
  validateHunterAddress(){
    let isValid = true
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
     return isValid
  },
  validateNumBounties(){
    let isValid = true
if (this.numBounties < 1) {
       this.numBountiesError = true
       isValid = false
     } else {
       this.numBountiesError = false
       isValid = true
     }
     return isValid
  },
  validateAmount(){
    let isValid = true
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
     return isValid
  },
  validateContactName(){
    let isValid = true
if (this.contactName.length < this.minContactNameLength || this.contactName.length > this.maxContactNameLength) {
       isValid = false
       this.contactNameError = true 
     } else {
       this.contactNameError = false
     }
     return isValid
  },
  validateEmail(){
    let isValid = true
    if (!this.emailRegex.test(this.contactEmail)) {
       isValid = false
       this.emailError = true
     } else {
       this.emailError = false
     }
     return isValid
  },
  validateDeadline(){
    let isValid = true
    if (this.datePickerValue != null) {
       let curDate = new Date()
       if (curDate > this.datePickerValue) {
         this.deadlineError = true
         isValid = false
       } else {
         this.deadlineError = false
       }
     } else {
       this.deadlineError = false
     }
     return isValid
  },
   validateForm() {
     return
    ( this.validateTitle() && 
     // Check description
     this.validateDescription() &&
     // Check hunter address
     this.validateHunterAddress() &&
     // Check num bounties
     this.validateNumBounties() &&
     // Check amount
     this.validateAmount() &&
     // Check contact name length
     this.validateContactName() &&
     // Check email
     this.validateEmail() &&
     // Check deadline
     this.validateDeadline())
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
   getDeadlineS() {
     if (this.datePickerValue) {
       return this.datePickerValue.getTime()
     }
     return 0
   },
   async submitBounty() {
     // TODO - add category
     let category = 'other'
     if (this.validateForm() && !this.submitLoading) {
       try {
         this.submitLoading = true
          // Post bounty
          let bounty = DevcashBounty.createUBounty(
            this.loggedInAccount,
            this.title,
            this.description,
            this.contactName,
            this.contactEmail,
            category,
            this.openBounty ? null : this.hunter
          )
          try {
            // Post to backend
            let res = await this.$axios.post('/bounty/post', bounty)
            if (res.status == 200) {
              await DevcashBounty.initEthConnector(this)
              // TODO - eth amount
              await this.$store.state.devcash.connector.postBounty(
                bounty,
                this.numBounties,
                this.amount,
                this.getDeadlineS()
              )
            }
          } catch (e) {
            // TODO - better error handling
            alert('failed to create bounty')
            console.log(e)
          }
       } finally {
         this.submitLoading = false;
       }
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
.datePickerTransition-enter-active {
  transition: all 0.25s ease-out;
}
.datePickerTransition-leave-active {
  transition: all 0.25s ease-out;
}
.datePickerTransition-enter {
  opacity: 0;
  transform: scaleX(0.5) scaleY(0.5) rotate(2.5deg);
}
.datePickerTransition-leave-to {
  opacity: 0;
  transform: scaleX(0.5) scaleY(0.5) rotate(2.5deg);
}
.hunterAddressTransition-enter-active {
  transition: all 0.2s ease-out;
}
.hunterAddressTransition-leave-active {
  transition: all 0.2s;
}
.hunterAddressTransition-enter {
  opacity: 0;
  transform: translateX(-1rem);
}
.hunterAddressTransition-leave-to {
  opacity: 0;
  transform: translateX(-1rem);
}
</style>