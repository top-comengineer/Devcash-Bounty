<template>
  <div
    class="bg-c-background-sec shadow-4xl overflow-auto w-full max-h-full justify-center rounded-tl-4xl rounded-br-4xl rounded-tr-2xl rounded-bl-2xl px-4 py-3 md:px-5 md:py-4 relative"
  >
    <!-- Close Button -->
    <div class="absolute top-0 right-0 z-40">
      <button
        @mouseover="isCloseHovered=true"
        @mouseleave="isCloseHovered=false"
        @focus="isCloseFocused=true"
        @blur="isCloseFocused=false"
        @click="cacheAndClose()"
        class="bg-c-background-sec fixed closeButton p-3 md:p-4 transform -translate-x-full z-40"
      >
        <Icon
          :class="isCloseHovered || isCloseFocused? 'scale-120':'scale-100'"
          colorClass="text-c-text"
          class="w-6 h-6 md:w-8 md:h-8 transition-all duration-200 ease-out transform"
          type="cancel"
        />
      </button>
    </div>
    <!-- Greeting Card -->
    <GreetingCard
      :header="$t('bountyPlatform.singleBounty.submission.cardHeader')"
      :paragraph="$t('bountyPlatform.singleBounty.submission.cardParagraph')"
      type="submission"
      class="my-1 md:my-2"
    />
    <!-- Submit Form -->
    <div class="w-full" action>
      <!-- Card for Description -->
      <div
        class="bg-c-background-sec shadow-xl w-full flex flex-row flex-wrap relative rounded-tl-3xl rounded-tr-lg pt-4 pb-8 px-6 md:pt-6 md:pb-10 md:px-10 mt-1 md:mt-2"
      >
        <!-- Submission Description -->
        <div class="w-full flex flex-col my-3">
          <h3
            class="text-2xl font-bold px-3"
          >{{$t('bountyPlatform.singleBounty.submission.descriptionHeader')}}</h3>
          <textarea
            v-model="description"
            class="bg-c-background-ter border-c-background-ter submissionDescArea w-full leading-loose text-lg font-bold border focus:border-c-primary rounded-lg transition-all duration-200 ease-out px-4 py-2 md:py-4 md:px-6 mt-2"
            type="text"
            :placeholder="$t('bountyPlatform.singleBounty.submission.descriptionPlaceholder')"
            @blur="validateDescription"
          />
        </div>
        <div class="w-full flex flex-col">
          <p
            :class="{'text-c-danger':(description.length > maxDescriptionCount || description.length < minDescriptionCount)} "
            class="text-sm px-3 opacity-75"
          >{{ description.length>0?`${description.length}/${maxDescriptionCount}`:'&nbsp;' }}</p>
        </div>
      </div>
      <!-- Card for Contact Name and Email -->
      <div
        class="bg-c-background-sec shadow-xl w-full flex flex-row flex-wrap relative py-4 px-6 md:pt-6 md:pb-5 md:px-10 mt-1 md:mt-2"
      >
        <!-- Contact Name -->
        <div class="w-full md:flex-1 flex flex-col mt-3">
          <h3 class="text-xl font-bold px-3">{{$t('bountyPlatform.post.contactName')}}</h3>
          <input
            v-model="contactName"
            class="bg-c-background-ter border-c-background-ter w-full text-lg font-bold border focus:border-c-primary rounded-lg transition-all duration-200 ease-out px-4 py-2 mt-2"
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
        <div class="hidden md:block w-12"></div>
        <!-- Contact Email -->
        <div class="w-full md:flex-1 flex flex-col mt-3">
          <h3 class="text-xl font-bold px-3">{{$t('bountyPlatform.post.contactEmail')}}</h3>
          <input
            v-model="contactEmail"
            class="bg-c-background-ter border-c-background-ter w-full text-lg font-bold border focus:border-c-primary rounded-lg transition-all duration-200 ease-out px-4 py-2 mt-2"
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
    </div>
    <!-- Call to Action Card -->
    <CTACard
      class="my-1 md:my-2"
      :buttonAction="submitSubmission"
      :buttonText="$t('bountyPlatform.singleBounty.submission.buttonSubmit')"
      :disabled="submissionLoading"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { DevcashBounty } from "~/plugins/devcash/devcashBounty.client"
import GreetingCard from "~/components/BountyPlatform/GreetingCard.vue";
import CTACard from "~/components/BountyPlatform/CTACard.vue";
import Icon from "~/components/Icon.vue";

const minDescriptionCount = 50;
const maxDescriptionCount = 1000;

export default {
  layout: "bountyPlatform",
  components: {
    GreetingCard,
    CTACard,
    Icon
  },
  props: {
    closeModal: Function,
    bounty: Object
  },
  beforeMount() {
    // Restore cached date
    if (this.bounty.id in this.$store.state.devcashData.submissionFormData) {
      this.description = this.$store.state.devcashData.submissionFormData[this.bounty.id].description
      this.contactName = this.$store.state.devcashData.submissionFormData[this.bounty.id].contactName
      this.contactEmail = this.$store.state.devcashData.submissionFormData[this.bounty.id].contactEmail
    }
  },
  mounted() {
    if (this.isLoggedIn) {
      DevcashBounty.updateBalances(this)
    }
  },
  computed: {
    // mix the getters into computed with object spread operator
    ...mapGetters({
      isLoggedIn: "devcashData/isLoggedIn",
      loggedInAccount: "devcashData/loggedInAccount"
    }),  
  },
  methods: {
    cacheAndClose() {
      // Cache form data so it auto fills in when modal is re-opened
      this.$store.state.devcashData.submissionFormData[this.bounty.id] = {
        description: this.description,
        contactName: this.contactName,
        contactEmail: this.contactEmail
      }
      this.closeModal()
    },
    clearCache() {
      delete this.$store.state.devcashData.submissionFormData[this.bounty.id]
    },
    validateDescription(){
      let isValid = true
      if (this.description.length < minDescriptionCount || this.description.length > maxDescriptionCount) {
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
    validateForm() {
      let isValid = true
      isValid = this.validateDescription() && isValid
      isValid = this.validateContactName() && isValid
      isValid = this.validateEmail() && isValid
      return isValid
    },
    async submitSubmission() {
      if (this.validateForm() && !this.submissionLoading) {
        try {
          this.submissionLoading = true
          // Create submission with hash
          let sub = DevcashBounty.createSubmission(this.loggedInAccount, this.description, this.bounty.id)
          // Save off chain
          try {
            // Post to backend
            let res = await this.$axios.post('/submission/post', sub)
            if (res.status == 200) {
              await DevcashBounty.initEthConnector(this)
              await this.$store.state.devcash.connector.postSubmission(
                this.bounty,
                sub.hash
              )
              this.clearCache()
              this.closeModal()
            }
          } catch (e) {
            // TODO - better error handling
            alert('failed to create submission')
            console.log(e)
          }          
        } finally {
          this.submissionLoading = false
        }
      }
    }
  },
  data() {
    return {
      submissionLoading: false,
      isCloseHovered: false,
      isCloseFocused: false,
      minDescriptionCount: minDescriptionCount,
      maxDescriptionCount: maxDescriptionCount,
      description: "",
      contactName: "",
      contactEmail: "", 
      minContactNameLength: 2,
      maxContactNameLength: 50,
      contactNameError: false,
      emailError: false,
      emailRegex: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/
    };
  }
};
</script>
<style scoped>
.submissionDescArea {
  min-height: 18rem;
  height: 18rem;
  transform-origin: center top;
}
.closeButton {
  border-top-left-radius: 2rem;
  border-top-right-radius: 0.75rem;
  border-bottom-left-radius: 2rem;
  border-bottom-left-radius: 2rem;
}
</style>
