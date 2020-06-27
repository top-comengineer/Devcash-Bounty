<template>
  <div class="w-full flex flex-col justify-center items-center px-1 md:px-4">
    <div v-if="isLoggedIn" class="w-full flex-col justify-center items-center">
      <!-- Greeting Card -->
      <GreetingCard
        :header="$t('bountyPlatform.post.cardHeader')"
        :paragraph="$t('bountyPlatform.post.cardParagraph')"
        type="post"
        class="mb-1 md:mb-2"
      />
      <!-- Card for Bounty Title and Description -->
      <div
        class="bg-c-background-sec shadow-lg w-full flex flex-row flex-wrap relative rounded-tl-3xl rounded-tr-lg pt-4 pb-6 px-3 md:pt-6 md:pb-8 md:px-10 xl:px-24 mt-1 md:mt-2"
      >
        <!-- Bounty Title -->
        <div class="w-full md:w-1/2 flex flex-col mt-3">
          <label
            for="bountyTitle"
            class="text-2xl font-bold px-3"
          >{{$t('bountyPlatform.post.bountyTitle')}}</label>
          <div class="w-full flex flex-row">
            <input
              id="bountyTitle"
              v-model="title"
              class="bg-c-background-ter border-c-background-ter text-c-text flex-1 text-lg font-bold border focus:border-c-primary rounded-lg transition-all duration-200 ease-out px-4 py-2 mt-2"
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
            class="text-c-danger text-xs px-3 mt-2"
          >{{ titleError?$t('bountyPlatform.post.titleLengthError').replace("%1", minTitleLength).replace("%2", maxTitleLength):'&nbsp;' }}</p>
        </div>
        <!-- Bounty Description -->
        <div class="w-full flex flex-col my-3">
          <h4
            for="bountyDescription"
            class="text-2xl font-bold px-3"
          >{{$t('bountyPlatform.post.bountyDescription')}}</h4>
          <!-- Text editor for the description -->
          <client-only>
            <text-editor :editor="editor" />
          </client-only>
        </div>
        <!-- Error Field -->
        <div class="w-full flex flex-col">
          <p
            :class="[(mdDescriptionLength > maxDescriptionCount || mdDescriptionLength < minDescriptionCount) ?'text-c-danger':'']"
            class="text-sm px-3 opacity-75"
          >{{ mdDescriptionLength>0?`${mdDescriptionLength}/${maxDescriptionCount}`:'&nbsp;' }}</p>
        </div>
      </div>
      <!-- Card for Bounty Type -->
      <div
        class="bg-c-background-sec shadow-lg w-full flex flex-row flex-wrap relative py-4 px-3 md:pt-6 md:pb-5 md:px-10 xl:px-24 mt-1 md:mt-2"
      >
        <!-- Bounty Type -->
        <div class="w-full md:flex-1 flex flex-col my-3">
          <h4 class="text-xl font-bold px-3">{{$t('bountyPlatform.post.bountyType')}}</h4>
          <!-- Public and Private Switch -->
          <div
            class="bg-c-background-ter border-c-text-10 max-w-full w-64 lg:w-84 flex flex-row p-1 rounded-full border mt-2"
          >
            <div class="w-full flex flex-row relative">
              <div
                :class="{'left-0':openBounty, 'left-full -translate-x-full': !openBounty}"
                class="shadow-lg absolute w-1/2 h-full bg-c-primary left-0 rounded-full transform transition-all duration-200 ease-out"
              ></div>
              <button
                :class="[openBounty?'text-c-light':'font-medium hover:bg-c-text-15 focus:bg-c-text-15']"
                @click.prevent="openBounty=true"
                class="w-1/2 text-sm font-bold md:text-lg leading-tight py-2 px-2 md:px-4 relative truncate rounded-full transition-all duration-300 ease-out"
              >{{$t('bountyPlatform.post.bountyTypePublic')}}</button>
              <button
                :class="[!openBounty?'text-c-light':'font-medium hover:bg-c-text-15 focus:bg-c-text-15']"
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
            <label
              for="hunterAddress"
              class="text-xl font-bold px-3"
            >{{$t('bountyPlatform.post.bountyTypeHunterAddress')}}</label>
            <input
              id="hunterAddress"
              v-model="hunter"
              class="bg-c-background-ter border-c-background-ter text-c-text w-full text-lg font-bold border focus:border-c-primary rounded-lg transition-all duration-200 ease-out px-4 py-2 mt-2"
              type="text"
              :placeholder="$t('bountyPlatform.post.bountyTypeHunterAddressPlaceholder')"
              @focus="invalidHunterAddress?invalidHunterAddress=false:null"
              @blur="validateHunterAddress"
            />
            <p
              class="text-c-danger text-xs px-3 mt-2"
            >{{ invalidHunterAddress?$t('bountyPlatform.post.invalidAddress'):'&nbsp;' }}</p>
          </div>
        </transition>
      </div>
      <!-- Card for Number of Bounties and Bounty Amount -->
      <div
        class="bg-c-background-sec shadow-lg w-full flex flex-row flex-wrap items-end relative py-4 px-3 md:pt-6 md:pb-5 md:px-10 xl:px-24 mt-1 md:mt-2"
      >
        <!-- Number of Bounties -->
        <div class="w-full md:flex-1 flex flex-col my-3">
          <label
            for="numberOfBounties"
            class="text-xl font-bold px-3"
          >{{$t('bountyPlatform.post.bountyCount')}}</label>
          <input
            id="numberOfBounties"
            v-model="numBounties"
            class="bg-c-background-ter border-c-background-ter text-c-text w-full text-lg font-bold border focus:border-c-primary rounded-lg transition-all duration-200 ease-out px-4 py-2 mt-3"
            type="number"
            min="1"
            :placeholder="$t('bountyPlatform.post.bountyCountPlaceholder')"
            @focus="numBountiesError?numBountiesError=false:null"
            @blur="validateNumBounties"
          />
          <p
            class="text-c-danger text-xs px-3 mt-2"
          >{{ numBountiesError?$t('bountyPlatform.post.numBountiesError'):'&nbsp;' }}</p>
        </div>
        <!-- Divider -->
        <div class="hidden md:block w-16"></div>
        <!-- Bounty Amount -->
        <div class="w-full md:flex-1 flex flex-col my-3">
          <div class="flex flex-row flex-wrap">
            <label
              for="bountyAmount"
              class="text-xl font-bold px-3"
            >{{$t('bountyPlatform.post.bountyAmount')}}</label>
            <!-- Each & Total Switch -->
            <div
              class="bg-c-background-ter border-c-text-10 max-w-full w-48 flex flex-row p-0_5 rounded-full border"
            >
              <div class="w-full flex flex-row relative">
                <div
                  :class="{'left-0':isBountyAmountEach, 'left-full -translate-x-full': !isBountyAmountEach}"
                  class="shadow-lg absolute w-1/2 h-full bg-c-primary left-0 rounded-full transform transition-all duration-200 ease-out"
                ></div>
                <button
                  :class="[isBountyAmountEach?'text-c-light':'font-medium hover:bg-c-text-15 focus:bg-c-text-15']"
                  @click.prevent="isBountyAmountEach=true"
                  class="w-1/2 text-sm font-bold leading-tight py-1 px-2 md:px-4 relative truncate rounded-full transition-all duration-300 ease-out"
                >{{$t('bountyPlatform.post.bountyAmountEach')}}</button>
                <button
                  :class="[!isBountyAmountEach?'text-c-light':'font-medium hover:bg-c-text-15 focus:bg-c-text-15']"
                  @click.prevent="isBountyAmountEach=false"
                  class="w-1/2 text-sm font-bold leading-tight py-1 px-2 md:px-4 relative truncate rounded-full transition-all duration-300 ease-out"
                >{{$t('bountyPlatform.post.bountyAmountTotal')}}</button>
              </div>
            </div>
          </div>
          <div class="relative mt-3">
            <!-- Amount Symbol -->
            <span class="absolute top-1/2 transform -translate-y-1/2 ml-2 font-bold text-xl">{D}</span>
            <input
              id="bountyAmount"
              v-model="amount"
              class="bg-c-background-ter border-c-background-ter text-c-text w-full text-lg font-bold border focus:border-c-primary rounded-lg transition-all duration-200 ease-out pl-11 pr-4 py-2"
              type="number"
              :placeholder="isBountyAmountEach?$t('bountyPlatform.post.bountyAmountEachPlaceholder'):$t('bountyPlatform.post.bountyAmountTotalPlaceholder')"
              @focus="amountError?amountError=false:null"
              @blur="validateAmount"
            />
          </div>
          <p class="text-c-danger text-xs px-3 mt-2">{{ amountError?amountError:'&nbsp;' }}</p>
        </div>
      </div>
      <!-- Card for Category and Deadline -->
      <div
        class="bg-c-background-sec shadow-lg w-full flex flex-row flex-wrap relative py-4 px-3 md:pt-6 md:pb-5 md:px-10 xl:px-24 mt-1 md:mt-2"
      >
        <!-- Bounty Category -->
        <div class="w-full md:flex-1 flex flex-col my-3">
          <label
            for="bountyCategory"
            class="text-xl font-bold px-3"
          >{{$t('bountyPlatform.post.bountyCategory')}}</label>
          <div v-on-clickaway="closeCategoryPicker" class="flex-1 flex flex-col">
            <!-- Category Input -->
            <input
              id="bountyCategory"
              v-model="categoryValueStr"
              class="bg-c-background-ter border-c-background-ter text-c-text w-full text-lg font-bold border focus:border-c-primary rounded-lg transition-all duration-200 ease-out px-4 py-2 mt-2"
              type="text"
              :placeholder="$t('bountyPlatform.post.bountyCategoryPlaceholder')"
              @focus="showCategoryPicker=true"
              @keydown.esc.exact="closeCategoryPicker"
              readonly="true"
            />
            <!-- Category Picker -->
            <div class="relative">
              <transition name="datePickerTransition">
                <CategoryPicker
                  class="absolute z-40 top-0 mt-2 origin-top-left"
                  v-if="showCategoryPicker"
                  :closePicker="closeCategoryPicker"
                  :categories="Object.values(categories)"
                  :categoryPicked="categoryPicked"
                  :currentCategory="categoryValueStr"
                />
              </transition>
            </div>
          </div>
          <p
            class="text-c-danger text-xs px-3 mt-2"
          >{{ categoryError?$t('bountyPlatform.post.needCategoryError'):'&nbsp;' }}</p>
        </div>
        <!-- Divider -->
        <div class="hidden md:block w-16"></div>
        <!-- Deadline -->
        <div class="w-full md:flex-1 flex flex-col my-3">
          <label for="bountyDeadline" class="text-xl font-bold px-3">
            {{$t('bountyPlatform.post.bountyDeadline')}}
            <span
              class="font-normal text-base opacity-75"
            >{{$t('bountyPlatform.post.optional')}}</span>
          </label>
          <div class="w-full flex flex-row items-center relative mt-2">
            <div v-on-clickaway="closePicker" class="flex-1 flex flex-col">
              <input
                id="bountyDeadline"
                v-model="datePickerValueStr"
                class="bg-c-background-ter border-c-background-ter text-c-text w-full text-lg font-bold border focus:border-c-primary rounded-lg transition-all duration-200 ease-out px-4 py-2"
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
              class="btn-primary transform hover:scale-md focus:scale-md transition-all duration-200 ease-out origin-bottom-left bg-c-primary text-c-light font-extrabold text-lg rounded-tl-2xl rounded-br-2xl rounded-tr-md rounded-bl-md p-2 ml-3"
              @click.prevent="datePickerValueStr=''; datePickerValue=null"
            >
              <Icon class="w-6 h-6" colorClass="text-c-light" type="cancel" />
            </button>
          </div>
          <p
            class="text-c-danger text-sm px-3"
          >{{ deadlineError?$t('bountyPlatform.post.deadlineError'):'&nbsp;' }}</p>
        </div>
      </div>
      <!-- Card for Contact Name and Email -->
      <div
        class="bg-c-background-sec shadow-lg w-full flex flex-row flex-wrap relative py-4 px-3 md:pt-6 md:pb-5 md:px-10 xl:px-24 mt-1 md:mt-2"
      >
        <!-- Contact Name -->
        <div class="w-full md:flex-1 flex flex-col my-3">
          <label
            for="contactName"
            class="text-xl font-bold px-3"
          >{{$t('bountyPlatform.post.contactName')}}</label>
          <input
            id="contactName"
            v-model="contactName"
            class="bg-c-background-ter border-c-background-ter text-c-text w-full text-lg font-bold border focus:border-c-primary rounded-lg transition-all duration-200 ease-out px-4 py-2 mt-2"
            type="text"
            :placeholder="$t('bountyPlatform.post.contactNamePlaceholder')"
            @focus="contactNameError?contactNameError=false:null"
            @blur="validateContactName"
          />
          <p
            class="text-c-danger text-xs px-3 mt-2"
          >{{ contactNameError ? $t('bountyPlatform.post.contactNameLengthError').replace("%1", minContactNameLength).replace("%2", maxContactNameLength):'&nbsp;' }}</p>
        </div>
        <!-- Divider -->
        <div class="hidden md:block w-16"></div>
        <!-- Contact Email -->
        <div class="w-full md:flex-1 flex flex-col my-3">
          <label
            for="contactEmail"
            class="text-xl font-bold px-3"
          >{{$t('bountyPlatform.post.contactEmail')}}</label>
          <input
            id="contactEmail"
            v-model="contactEmail"
            class="bg-c-background-ter border-c-background-ter text-c-text w-full text-lg font-bold border focus:border-c-primary rounded-lg transition-all duration-200 ease-out px-4 py-2 mt-2"
            type="text"
            :placeholder="$t('bountyPlatform.post.contactEmailPlaceholder')"
            @focus="emailError?emailError=false:null"
            @blur="validateEmail"
          />
          <p
            class="text-c-danger text-xs px-3 mt-2"
          >{{ emailError?$t('bountyPlatform.post.invalidEmail'):'&nbsp;' }}</p>
        </div>
      </div>
      <!-- Summary Card -->
      <div
        class="bg-c-background-sec shadow-lg w-full flex flex-row justify-center flex-wrap relative py-6 px-3 md:pt-8 md:pb-10 md:px-10 xl:px-24 mt-1 md:mt-2"
      >
        <div class="w-full flex flex-row justify-center mb-2">
          <p class="text-xl font-bold px-3">{{$t('bountyPlatform.post.summary')}}</p>
        </div>
        <mini-summary-card
          class="mx-2 my-2 w-48"
          :header="$t('bountyPlatform.post.bountyCount')"
          :text="numBounties?numBounties:0"
        />
        <mini-summary-card
          class="mx-2 my-2 w-48"
          :header="$t('bountyPlatform.post.amountForEach')"
          :text="`{D}${singleAmount}`"
        />
        <mini-summary-card
          class="mx-2 my-2 w-48"
          :header="$t('bountyPlatform.post.amountTotal')"
          :text="`{D}${totalAmount}`"
        />
        <mini-summary-card
          class="mx-2 my-2 w-48"
          :header="$t('bountyPlatform.post.fee')"
          :text="`Ξ${curFee}`"
        />
      </div>
      <!-- Call to Action Card -->
      <CTACard
        class="my-1 md:my-2"
        :disabled="submitLoading"
        :buttonAction="submitBounty"
        :buttonText="$t('bountyPlatform.post.buttonPostBounty')"
      />
    </div>
    <sign-in-to-continue-wrapper v-else />
  </div>
</template>

<script>
import { SIDEBAR_CONTEXTS } from "~/config";
import { DevcashBounty } from "~/plugins/devcash/devcashBounty.client"
import GreetingCard from "~/components/BountyPlatform/GreetingCard.vue";
import CTACard from "~/components/BountyPlatform/CTACard.vue";
import Icon from "~/components/Icon.vue";
import DatePicker from "~/components/DatePicker.vue";
import CategoryPicker from "~/components/BountyPlatform/CategoryPicker.vue";
import SignInToContinueWrapper from "~/components/BountyPlatform/SignInToContinueWrapper.vue";
import MiniSummaryCard from "~/components/BountyPlatform/MiniSummaryCard.vue";
import { utils } from "ethers"
import { mapGetters } from "vuex";
import { mixin as clickaway } from "vue-clickaway";
import TextEditor from "~/components/BountyPlatform/TextEditor.vue";
import TurndownService from 'turndown'
import marked from 'marked'
// Import the editor
import { Editor, EditorContent, EditorMenuBar } from 'tiptap'
import {
  Bold,
  Italic,
  Heading,
  BulletList,
  OrderedList,
  ListItem,
  Code,
  History,
  HorizontalRule,
  Link,
  TrailingNode
} from 'tiptap-extensions'
import { CustomHardBreak } from '~/plugins/tiptap/CustomHardBreak'
import { CustomCodeBlock } from '~/plugins/tiptap/CustomCodeBlock'
import * as Cookies from "js-cookie"

const minDescriptionCount = 50;
const maxDescriptionCount = 1000;

export default {
  mixins: [clickaway],
  layout: "bountyPlatform",
  components: {
    GreetingCard,
    CTACard,
    Icon,
    DatePicker,
    CategoryPicker,
    SignInToContinueWrapper,
    TextEditor,
    MiniSummaryCard
  },
  data() {
    return {
      waitingConfirmation: false,
      confirmWindowOpen: false,
      editor: null,
      openBounty: true,
      // For meta tags
      pageTitle: this.$t("meta.bountyPlatform.post.pageTitle"),
      pageDescription: this.$t("meta.bountyPlatform.post.pageDescription"),
      pagePreview: `${process.env.BASE_URL}/previews/bountyplatform.png`,
      pageThemeColor: "#675CFF",
      canonicalURL: process.env.CANONICAL_URL,
      // Form fields
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
      showCategoryPicker: false,
      datePickerValue: null,
      datePickerValueStr: "",
      categoryValueStr:"",
      categoryValue: null,
      submitLoading: false,
      categories: {},
      // Form validation
      minTitleLength: 10,
      maxTitleLength: 50,
      minContactNameLength: 2,
      maxContactNameLength: 50,
      titleError: false,
      contactNameError: false,
      emailError: false,
      numBountiesError: false,
      invalidHunterAddress: false,
      deadlineError: false,
      categoryError: false,
      amountError: "",
      emailRegex: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,
      linkUrl: null,
      linkMenuIsActive: false,
      turnDownSvc: new TurndownService({
        headingStyle: 'atx',
        codeBlockStyle: 'fenced'
      }),
      backupInterval: null,
      isBountyAmountEach: true,
    };
  },
  watch: {
    isBountyAmountEach: function() {
      if (!this.isBountyAmountEach) {
       if (this.$store.state.devcashData.ethPrimary && this.amount && this.numBounties) {
         let amountBigNum = utils.parseEther(this.amount.toString())
         amountBigNum = amountBigNum.mul(utils.bigNumberify(this.numBounties))
         this.amount = utils.formatEther(amountBigNum)
       } else if (this.amount && this.numBounties) {
         let amountBigNum = utils.parseUnits(this.amount.toString(), 8)
         amountBigNum = amountBigNum.mul(utils.bigNumberify(this.numBounties))
         this.amount = utils.formatUnits(amountBigNum, 8)     
       }
      } else {
       if (this.$store.state.devcashData.ethPrimary && this.amount && this.numBounties) {
         let amountBigNum = utils.parseEther(this.amount.toString())
         amountBigNum = amountBigNum.div(utils.bigNumberify(this.numBounties))
         this.amount = utils.formatEther(amountBigNum)
       } else if (this.amount && this.numBounties) {
         let amountBigNum = utils.parseUnits(this.amount.toString(), 8)
         amountBigNum = amountBigNum.div(utils.bigNumberify(this.numBounties))
         this.amount = utils.formatUnits(amountBigNum, 8)     
       }        
      }
    }
  },
  computed: {
    // mix the getters into computed with object spread operator
    ...mapGetters({
      isLoggedIn: "devcashData/isLoggedIn",
      loggedInAccount: "devcashData/loggedInAccount",
      curFee: "devcashData/getCurFee",
      balance: "devcashData/getBalance"
    }),
    currentLocale() {
      for (let locale of this.$i18n.locales) {
        if (locale.code == this.$i18n.locale) {
          return locale;
        }
      }
    },
    mdDescriptionLength() {
      if (!this.editor) {
        return 0
      }
      return this.turnDownSvc.turndown(this.editor.getHTML()).length
    },
    singleAmount() {
      if (!this.isBountyAmountEach && this.amount && this.numBounties) {
       if (this.$store.state.devcashData.ethPrimary) {
         let amountBigNum = utils.parseEther(this.amount.toString())
         amountBigNum = amountBigNum.div(utils.bigNumberify(this.numBounties))
         return  utils.formatEther(amountBigNum)
       } else {
         let amountBigNum = utils.parseUnits(this.amount.toString(), 8)
         amountBigNum = amountBigNum.div(utils.bigNumberify(this.numBounties))
         return utils.formatUnits(amountBigNum, 8)     
       }        
      }
      return this.amount || "0"
    },
    totalAmount() {
      if (this.isBountyAmountEach && this.amount && this.numBounties) {
        if (this.$store.state.devcashData.ethPrimary) {
          let amountBigNum = utils.parseEther(this.amount.toString())
          amountBigNum = amountBigNum.mul(utils.bigNumberify(this.numBounties))
          return utils.formatEther(amountBigNum)
        } else {
          let amountBigNum = utils.parseUnits(this.amount.toString(), 8)
          amountBigNum = amountBigNum.mul(utils.bigNumberify(this.numBounties))
          return utils.formatUnits(amountBigNum, 8)     
        }
      }
      return this.amount || "0"
    }    
  },  
  methods: {
   closePicker() {
     this.showDatePicker = false
   },
   closeCategoryPicker(){
     this.showCategoryPicker = false
   },
   categoryPicked(category){
     this.categoryValue = Object.keys(this.categories).find(key => this.categories[key] === category)
     this.categoryValueStr = category
     this.showCategoryPicker = false
     this.categoryError = false
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
  validateCategory() {
    let isValid = Object.keys(this.categories).indexOf(this.categoryValue) > -1
    if (!isValid) {
      this.categoryError = true
    } else {
      this.categoryError = false
    }
    return isValid
  },
  validateTitle(){
    let isValid = true
    if (this.title.length < this.minTitleLength || this.title.length > this.maxTitleLength) {
       this.titleError = true 
       return false
     } else {
       this.titleError = false
     }
     return isValid
  },
  validateDescription(){
    let isValid = true
    if (this.mdDescriptionLength < minDescriptionCount || this.mdDescriptionLength > maxDescriptionCount) {
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
      let amountBigNum, balanceBigNum
       if (this.$store.state.devcashData.ethPrimary) {
         amountBigNum = utils.parseEther(this.amount.toString())
         if (this.isBountyAmountEach) {
           amountBigNum = amountBigNum.mul(this.numBounties)
         }
         balanceBigNum = utils.bigNumberify(this.balance.primary.raw)
       } else {
         amountBigNum = utils.parseUnits(this.amount.toString(), 8)
         if (this.isBountyAmountEach) {
           amountBigNum = amountBigNum.mul(this.numBounties)
         }
         balanceBigNum = utils.bigNumberify(this.balance.primary.approvedRaw)       
       }
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
     let isValid = true
     isValid = this.validateTitle() && isValid
     isValid = this.validateDescription() && isValid
     isValid = this.validateHunterAddress() && isValid
     isValid = this.validateNumBounties() && isValid
     isValid = this.validateAmount() && isValid
     isValid = this.validateContactName() && isValid
     isValid = this.validateEmail() && isValid
     isValid = this.validateDeadline() && isValid
     isValid = this.validateCategory() && isValid
     return isValid
   },
   getDeadlineS() {
     if (this.datePickerValue) {
       return parseInt(this.datePickerValue.getTime() / 1000)
     }
     return 0
   },
   async submitBounty() {
     if (this.validateForm() && !this.submitLoading) {
       try {
         this.submitLoading = true
          // Post bounty
          let bounty = DevcashBounty.createUBounty(
            this.loggedInAccount,
            this.title,
            this.turnDownSvc.turndown(this.editor.getHTML()),
            this.contactName,
            this.contactEmail,
            this.categoryValue,
            this.openBounty ? null : this.hunter
          )
          try {
            // Post to backend
            let res = await this.$axios.post('/bounty/post', bounty)
            if (res.status == 200) {
              await DevcashBounty.initEthConnector(this)
              this.confirmWindowOpen = true
              await this.$store.state.devcash.connector.postBounty(
                bounty,
                this.numBounties,
                this.amount,
                this.getDeadlineS(),
                this.curFee,
                this.isBountyAmountEach
              )
              this.confirmWindowOpen = false
              this.waitingConfirmation = true
              clearInterval(this.backupInterval)
              Cookies.remove('devcash_postcache')
              this.title = ""
              this.editor.setContent("")
              this.hutner = ""
              this.numBounties = null
              this.amount = null
              this.contactName = ""
              this.contactEmail = ""
              this.datePickerValue = null
              this.datePickerValueStr = ""
              this.categoryValueStr = ""
              this.categoryValue = null              
            }
          } catch (e) {
            if ('code' in e && e.code == 4001) {
              console.log(e)
            } else {
              this.$notify({
                group: 'main',
                title: this.$t('errors.errorTitle'),
                text: this.$t('errors.bountyCreateFailed'),
                data: {}
              })
              console.log(e)
            }
          }
       } finally {
         this.confirmWindowOpen = false
         this.submitLoading = false;
       }
     }
   },
   showLinkMenu(attrs) {
      this.linkUrl = attrs.href
      this.linkMenuIsActive = true
      this.$nextTick(() => {
        this.$refs.linkInput.focus()
      })
    },
    hideLinkMenu() {
      this.linkUrl = null
      this.linkMenuIsActive = false
    },
    setLinkUrl(command, url) {
      command({ href: url })
      this.hideLinkMenu()
    },
  },
  mounted() {  
    if (this.isLoggedIn) {
      DevcashBounty.updateBalances(this)
      DevcashBounty.updateFees(this)
    }
    this.editor =  new Editor({
        extensions: [
          new Bold(),
          new Italic(),
          new Heading({ levels: [1, 2, 3] }),
          new BulletList(),
          new OrderedList(),
          new ListItem(),
          new Link({
            openOnClick: false
          }),
          new Code(),
          new History(),
          new CustomCodeBlock(),
          new CustomHardBreak(),        
          new HorizontalRule(),   
          new TrailingNode({
            node: 'paragraph',
            notAfter: ['paragraph'],
          }),
        ],
        content: `
          <h2>
            Trailing Paragraph
          </h2>
          <p>
            In this demo we force to render a paragraph at the end of the document. This can be useful in some situations, for example after adding images.
          </p>
          <pre><code>Also, sometimes it's hard to remember to type \`cmd/ctrl + enter\` to leave a code block.</code></pre>
        `,
      });
  },
  activated() {
    // Set sidebar context
    this.$store.commit("setSidebarContext", SIDEBAR_CONTEXTS.post);
    // Set categories based on locale
    for (const [key, category] of Object.entries(this.$t('bountyPlatform.explore.categories'))) {
      if (key != "header" && key != 'category') {
        this.categories[key.replace("Tag", "")] = category
      }
    }
    // Interval
    this.backupInterval = setInterval(() => {
      if (this.editor) {
        if (this.isLoggedIn) {
          // Backup object
          let cookie = {
            loggedInAccount: this.loggedInAccount,
            description: this.editor.getHTML(),
            title: this.title,
            openBounty: this.openBounty,
            hunter: this.hunter,
            numBounties: this.numBounties,
            amount: this.amount,
            categoryValue: this.categoryValue,
            category: this.categoryValueStr,
            deadline: this.datePickerValue ? this.datePickerValue.getTime() : null,
            name: this.contactName,
            email: this.contactEmail
          }
          let serialized = JSON.stringify(cookie)
          Cookies.set(`devcash_postcache`, serialized, { secure: process.env.NODE_ENV === 'production' })
        }      
      }
    }, 5000)
    // Restore data
    if (this.waitingConfirmation) {
      this.waitingConfirmation = false
    } else {
      let cached = Cookies.get('devcash_postcache')
      if (cached) {
        cached = JSON.parse(cached)
        if (cached.loggedInAccount == this.loggedInAccount) {
          this.editor.setContent(cached.description)
          this.title = cached.title
          this.openBounty = cached.openBounty
          this.hunter = cached.hunter,
          this.numBounties = cached.numBounties
          this.amount = cached.amount
          this.categoryValue = cached.categoryValue
          this.categoryValueStr = cached.category
          if (cached.deadline) {
            this.datePickerSet(new Date(cached.deadline))
          }
          this.contactName = cached.name
          this.contactEmail = cached.email
        } else {
          Cookies.remove('devcash_postcache')
        }
      }
    }
  },
  beforeDestroy() {
    if (this.editor) {
      this.editor.destroy()
    }
  },  
  deactivated() {
    if (this.backupInterval) {
      clearInterval(this.backupInterval)
    }
    this.$store.commit("setSidebarContext", null);
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