<template>
  <div
    class="bg-c-background-sec shadow-4xl overflow-auto w-full max-h-full justify-center rounded-tl-4xl rounded-br-4xl rounded-tr-2xl rounded-bl-2xl px-4 py-3 md:px-5 md:py-4 relative"
  >
    <!-- Confirm to Submit Modal -->
    <transition name="modalBgTransition">
      <div
        v-if="submissionLoading"
        class="bg-c-background-75 w-full h-screen fixed flex flex-row justify-center items-center left-0 top-0 modal"
      >
        <div
          class="max-w-xl h-full flex flex-row justify-center items-center px-2 pt-24 pb-12 md:pt-36"
        >
          <multi-purpose-modal
            :header="$t('bountyPlatform.multiPurposeModal.createSubmission.header')"
            :paragraph="$t('bountyPlatform.multiPurposeModal.createSubmission.paragraph')"
            :imgSrc="require('~/assets/images/illustrations/foreground/submission-sent.svg')"
          />
        </div>
      </div>
    </transition>
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
        class="bg-c-background-sec shadow-xl w-full flex flex-row flex-wrap relative rounded-tl-3xl rounded-tr-lg pt-4 pb-8 px-6 md:px-10 mt-1 md:mt-2"
      >
        <!-- Submission Description -->
        <div class="w-full flex flex-col my-3">
          <h3
            class="text-2xl font-bold px-3"
          >{{$t('bountyPlatform.singleBounty.submission.descriptionHeader')}}</h3>
          <!-- Text editor for the description -->
          <client-only>
            <text-editor
              :editor="editor"
              :placeholder="submissionEditorPlaceholder"
              :isPlaceholderVisible="isPlaceholderVisible"
            />
          </client-only>
        </div>
        <div class="w-full flex flex-col">
          <p
            :class="{'text-c-danger':(mdDescriptionLength > maxDescriptionCount || mdDescriptionLength < minDescriptionCount)} "
            class="text-sm px-3 opacity-75"
          >{{ mdDescriptionLength>0?`${mdDescriptionLength}/${maxDescriptionCount}`:'&nbsp;' }}</p>
        </div>
      </div>
      <!-- Card for Contact Name and Email -->
      <div
        class="bg-c-background-sec shadow-xl w-full flex flex-row flex-wrap relative py-4 px-6 md:pt-6 md:pb-5 md:px-10 mt-1 md:mt-2"
      >
        <!-- Contact Name -->
        <div class="w-full md:flex-1 flex flex-col mt-3">
          <label for="submissionContactName" class="text-xl font-bold px-3">
            {{$t('bountyPlatform.post.contactName')}}
            <span
              class="font-normal text-base opacity-75"
            >{{$t('bountyPlatform.post.optional')}}</span>
          </label>
          <input
            id="submissionContactName"
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
          <label for="submissionContactEmail" class="text-xl font-bold px-3">
            {{$t('bountyPlatform.post.contactEmail')}}
            <span
              class="font-normal text-base opacity-75"
            >{{$t('bountyPlatform.post.optional')}}</span>
          </label>
          <input
            id="submissionContactEmail"
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
import TextEditor from "~/components/BountyPlatform/TextEditor.vue";
import MultiPurposeModal from "~/components/BountyPlatform/MultiPurposeModal.vue";
import TurndownService from 'turndown'
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
  layout: "bountyPlatform",
  components: {
    GreetingCard,
    CTACard,
    Icon,
    TextEditor,
    MultiPurposeModal
  },
  props: {
    closeModal: Function,
    bounty: Object
  },
  beforeMount() {
    // Restore cached date
    if (this.bounty.id in this.$store.state.devcashData.submissionFormData) {
      let desc = this.$store.state.devcashData.submissionFormData[this.bounty.id].description
      if (desc && desc.trim().length > 0 && desc.trim() != "<p></p>") {
        this.description = desc
      }
      this.contactName = this.$store.state.devcashData.submissionFormData[this.bounty.id].contactName
      this.contactEmail = this.$store.state.devcashData.submissionFormData[this.bounty.id].contactEmail
    }
  },
  mounted() {
    if (this.isLoggedIn) {
      DevcashBounty.updateBalances(this)
    }
    this.editor =  new Editor({
        onFocus: (e) => {
          if (this.isPlaceholderVisible) {
            this.editor.clearContent()
          }
        },
        onBlur: (e) => {
          if (this.editor.getHTML().trim() == "" || this.editor.getHTML().trim() == "<p></p>") {
            this.editor.setContent(this.submissionEditorPlaceholder)
          }
        },
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
        content: this.description ? this.description : this.submissionEditorPlaceholder,
      });
  },
  computed: {
    // mix the getters into computed with object spread operator
    ...mapGetters({
      isLoggedIn: "devcashData/isLoggedIn",
      loggedInAccount: "devcashData/loggedInAccount"
    }),
    mdDescriptionLength() {
      if (!this.editor) {
        return 0
      }
      if (this.isPlaceholderVisible) {
        return 0
      }
      return this.turnDownSvc.turndown(this.editor.getHTML()).length
    },    
    isPlaceholderVisible() {
      if (this.editor) {
        return this.editor.getHTML().trim() == this.submissionEditorPlaceholder.trim()
      }
      return true
    }
  },
  methods: {
    cacheAndClose() {
      // Cache form data so it auto fills in when modal is re-opened
      this.$store.state.devcashData.submissionFormData[this.bounty.id] = {
        description: this.editor.getHTML(),
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
      if (this.mdDescriptionLength < minDescriptionCount || this.mdDescriptionLength > maxDescriptionCount) {
        isValid = false
      }
      if (this.isPlaceholderVisible) {
        isValid = false
      }
      return isValid
    },
    validateContactName(){
      let isValid = true
      if (this.contactName.length == 0) {
        return true
      } else if (this.contactName.length < this.minContactNameLength || this.contactName.length > this.maxContactNameLength) {
        isValid = false
        this.contactNameError = true 
      } else {
        this.contactNameError = false
      }
      return isValid
    },
    validateEmail(){
      let isValid = true
      if (this.contactEmail.length == 0) {
        return true      
      } else if (!this.emailRegex.test(this.contactEmail)) {
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
          let sub = DevcashBounty.createSubmission(this.loggedInAccount, this.turnDownSvc.turndown(this.editor.getHTML()), this.bounty.id, this.contactName, this.contactEmail)
          // Save off chain
          try {
            // Post to backend
            let res = await this.$axios.post('/submission/post', sub)
            if (res.status == 200) {
              await DevcashBounty.initEthConnector(this)
              this.confirmWindowOpen = true
              await this.$store.state.devcash.connector.postSubmission(
                this.bounty,
                sub.hash
              )
              this.clearCache()
              this.closeModal()
              this.$notify({
                group: 'main',
                title: this.$t('notification.submissionCreatedTitle'),
                text: this.$t('notification.submissionCreatedDescription'),
                data: {},
                duration: -1
              });              
            }
          } catch (e) {
            if ('code' in e && e.code == 4001) {
              console.log(e)
            } else {
              this.$notify({
                group: 'main',
                title: this.$t('errors.errorTitle'),
                text: this.$t('errors.failedCreateSubmission'),
                data: {}
              })
              console.log(e)
            }
          }          
        } finally {
          this.confirmWindowOpen = false
          this.submissionLoading = false
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
  data() {
    return {
      turnDownSvc: new TurndownService({
        headingStyle: 'atx',
        codeBlockStyle: 'fenced'
      }),      
      submissionLoading: false,
      isCloseHovered: false,
      isCloseFocused: false,
      minDescriptionCount: minDescriptionCount,
      maxDescriptionCount: maxDescriptionCount,
      contactName: "",
      contactEmail: "", 
      minContactNameLength: 2,
      maxContactNameLength: 50,
      contactNameError: false,
      emailError: false,
      confirmWindowOpen: false,
      emailRegex: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,
      editor: null,
      submissionEditorPlaceholder: `<h1>${this.$t('bountyPlatform.multiPurposeModal.createSubmission.placeholderTitle')}</h1><p>${this.$t('bountyPlatform.multiPurposeModal.createSubmission.placeholderParagraph1')}</p><p>${this.$t('bountyPlatform.multiPurposeModal.createSubmission.placeholderParagraph2')}</p>`,
      linkUrl: null,
      linkMenuIsActive: false
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
