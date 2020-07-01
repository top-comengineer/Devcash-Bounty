<template>
  <div
    class="max-w-full md:max-w-md h-auto flex flex-col items-center bg-c-background-sec border-2 border-c-text-05 shadow-4xl rounded-tl-3xl rounded-br-3xl rounded-tr-lg rounded-bl-lg overflow-y-scroll"
  >
    <!-- Confirm to Approve or Reject Modal-->
    <transition name="modalBgTransition">
      <div
        v-if="loading"
        class="bg-c-background-75 w-full h-screen fixed flex flex-row justify-center items-center left-0 top-0 modal"
      >
        <div
          class="max-w-xl h-full flex flex-row justify-center items-center px-2 pt-24 pb-12 md:pt-36"
        >
          <multi-purpose-modal
            :header="type == 'reject'?$t('bountyPlatform.multiPurposeModal.confirmToReject.header'):type=='approve'?$t('bountyPlatform.multiPurposeModal.confirmToApprove.header'):''"
            :paragraph="type =='reject'?$t('bountyPlatform.multiPurposeModal.confirmToReject.paragraph'):type=='approve'?$t('bountyPlatform.multiPurposeModal.confirmToApprove.paragraph'):''"
            :imgSrc="require('~/assets/images/illustrations/foreground/submission-received.svg')"
          />
        </div>
      </div>
    </transition>
    <!-- Header -->
    <div
      :class="{'bg-c-danger': type == 'reject', 'bg-c-success': type == 'approve' }"
      class="w-full flex flex-row justify-center px-4 py-3"
    >
      <h5
        class="text-center text-c-background text-2xl font-bold"
      >{{ type == 'reject' ? $t("bountyPlatform.confirmModal.confirmToReject.header") : $t("bountyPlatform.confirmModal.confirmToApprove.header") }}</h5>
    </div>
    <!-- Paragraph -->
    <p
      class="text-center px-3 md:px-8 mt-4 mb-2"
    >{{ type == 'reject' ? $t("bountyPlatform.confirmModal.confirmToReject.paragraph") : $t("bountyPlatform.confirmModal.confirmToApprove.paragraph") }}</p>
    <!-- Amount & Address Part -->
    <div class="w-full flex flex-col items-center my-4 px-2">
      <div
        class="flex flex-col flex-wrap justify-center rounded-xl px-4 py-2 shadow-xl border border-c-text-10"
      >
        <!-- DEV Amount -->
        <p
          :class="{'text-c-danger': type == 'reject', 'text-c-success': type == 'approve' }"
          class="text-xl font-bold text-center"
        >{D}{{ amount }}</p>
        <!-- ETH & USD Amount -->
        <p class="text-center opacity-75 mt-1">{{`(Ξ${ethAmount}`}}</p>
      </div>
      <!-- Indicator Icon -->
      <Icon
        class="my-3 w-8 h-8"
        :colorClass="type == 'reject'?'text-c-danger':'text-c-success'"
        :type="type == 'reject'? 'cancel':'arrow-down'"
      />
      <!-- Avatar & Address -->
      <div
        class="flex flex-row flex-wrap justify-center rounded-xl px-4 py-2 shadow-xl border border-c-text-10"
      >
        <Jazzicon class="flex" :diameter="20" :address="item.creator" />
        <p class="font-mono-jet text-left ml-2">
          {{
          item.creator.substring(0, 6) +
          "..." +
          item.creator.substring(item.creator.length - 4)
          }}
        </p>
      </div>
    </div>
    <!-- Feedback Area -->
    <div class="w-full flex flex-col bg-c-text-05 px-2 md:px-4 pt-6 pb-8 my-5">
      <p class="text-center text-xl font-bold px-3">
        {{$t("bountyPlatform.confirmModal.inputFeedback.header")}}
        <span
          class="text-normal font-normal text-sm opacity-75"
        >{{$t("bountyPlatform.confirmModal.inputFeedback.optional") }}</span>
      </p>
      <client-only>
        <text-editor
          :editor="editor"
          :placeholder="editorFeedbackPlaceholder"
          type="feedback"
          :isPlaceholderVisible="isPlaceholderVisible"
        />
      </client-only>
    </div>
    <!-- Cancel & Confirm Buttons -->
    <div class="w-full flex flex-row flex-wrap pt-2 pb-4 px-4">
      <!-- Cancel Button -->
      <div class="w-full md:w-1/2 flex flex-row p-2">
        <button
          @click.prevent="cancelCallback"
          class="w-full text-lg font-bold bg-c-background-sec text-c-text border-2 border-c-text btn-text-qua px-4 py-1_5 transform transition-all hover:scale-md focus:scale-md duration-300 ease-out origin-bottom-left rounded-tl-2xl rounded-br-2xl rounded-bl-md rounded-tr-md"
        >{{ type == 'reject'?$t("bountyPlatform.confirmModal.confirmToReject.buttonCancel"): $t("bountyPlatform.confirmModal.confirmToApprove.buttonCancel")}}</button>
      </div>
      <!-- Confirm Button -->
      <div class="w-full md:w-1/2 flex flex-row p-2 order-first md:order-last">
        <button
          :disabled="loading"
          @click.prevent="confirmClicked"
          :class="{'bg-c-danger border-c-danger': type == 'reject', 'bg-c-success border-c-success': type == 'approve' }"
          class="w-full text-lg font-bold text-c-background border-2 btn-text-qua px-4 py-1_5 transform transition-all hover:scale-md focus:scale-md duration-300 ease-out origin-bottom-left rounded-tl-2xl rounded-br-2xl rounded-bl-md rounded-tr-md"
        >{{ type == 'reject'?$t("bountyPlatform.confirmModal.confirmToReject.buttonConfirm"): $t("bountyPlatform.confirmModal.confirmToApprove.buttonConfirm")}}</button>
      </div>
    </div>
  </div>
</template>
<script>
import Jazzicon from "~/components/Jazzicon.vue";
import Icon from "~/components/Icon.vue";
import { DevcashBounty } from "~/plugins/devcash/devcashBounty.client"
import TextEditor from "~/components/BountyPlatform/TextEditor.vue";
import MultiPurposeModal from "~/components/BountyPlatform/MultiPurposeModal.vue";
import TurndownService from 'turndown'
// Import the editor
import { Editor, EditorContent, EditorMenuBar } from 'tiptap'
import {
  Bold,
  Italic,
  History,
  Link,
} from 'tiptap-extensions'
export default {
    props: {
        type: String,
        item: Object,
        confirmCallback: Function,
        cancelCallback: Function
    },
    data() {
      return {
        turnDownSvc: new TurndownService({
          headingStyle: 'atx',
          codeBlockStyle: 'fenced'
        }),        
        loading: false,
        linkUrl: null,
        linkMenuIsActive: false,
        editor:null,
        editorFeedbackPlaceholder: `<p>${this.$t('bountyPlatform.confirmModal.inputFeedback.placeholder')}</p>`,
      }
    },
    components: {
        Jazzicon,
        Icon,
        TextEditor,
        MultiPurposeModal
    },
    computed: {
      amount() {
          let tokenDecimals = 8
          if (this.$store.state.devcash.connector) {
              tokenDecimals = this.$store.state.devcash.connector.tokenDecimals
          }   
          return DevcashBounty.formatAmountSingleSubmission(this.item.ubounty, tokenDecimals)        
      },
      ethAmount() {
        return DevcashBounty.formatAmountSingleSubmissionEth(this.item.ubounty)
      },
      isPlaceholderVisible() {
        if (this.editor) {
          return this.editor.getHTML().trim() == this.editorFeedbackPlaceholder.trim() 
        }
        return true
      }
    },
    methods: {
        confirmClicked() {
          this.loading = true
          let feedback = ""
          if (!this.isPlaceholderVisible) {
            feedback = this.turnDownSvc.turndown(this.editor.getHTML())
          }
          this.confirmCallback(feedback, this.item, this.type)
        },
        validateFeedback(){
            return null
        },   
    },
    mounted(){
      this.editor =  new Editor({
        onFocus: (e) => {
          if (this.editor.getHTML().trim() == this.editorFeedbackPlaceholder.trim()) {
            this.editor.clearContent()
          }
        },
        onBlur: (e) => {
          if (this.editor.getHTML().trim() == "" || this.editor.getHTML().trim() == "<p></p>") {
            this.editor.setContent(this.editorFeedbackPlaceholder)
          }
        },
        extensions: [
          new Bold(),
          new Italic(),
          new Link({
            openOnClick: false
          }),
          new History(),        
        ],
        content: this.editorFeedbackPlaceholder,
      });
    }
}
</script>