<template>
  <div
    :class="type=='feedback'?'bg-c-text-05':'bg-c-background-ter'"
    class="w-full relative mt-3 rounded-lg"
  >
    <client-only>
      <div class="bg-c-background-ter rounded-tl-lg rounded-tr-lg">
        <editor-menu-bar
          v-if="type!='feedback'"
          class="bg-c-text-10 rounded-tl-lg rounded-tr-lg px-2"
          :editor="editor"
          v-slot="{ commands, isActive, getMarkAttrs }"
        >
          <div class="w-full flex flex-row flex-wrap items-center">
            <button
              :class="{ 'bg-c-text-15': isActive.bold()}"
              class="p-1 m-1 rounded-lg hover:bg-c-text-15 transition-colors duration-200 ease-out"
              @click="commands.bold()"
            >
              <icon class="w-7 h-7" type="bold" colorClass="text-c-text" />
            </button>
            <button
              :class="{ 'bg-c-text-15': isActive.italic()}"
              class="p-1 m-1 rounded-lg hover:bg-c-text-15 transition-colors duration-200 ease-out"
              @click="commands.italic()"
            >
              <icon class="w-7 h-7" type="italic" colorClass="text-c-text" />
            </button>
            <div class="w-px h-7 bg-c-text-15 rounded-full mx-3"></div>
            <button
              :class="{ 'bg-c-text-15': isActive.heading({ level: 1 }) }"
              class="p-1 m-1 rounded-lg hover:bg-c-text-15 transition-colors duration-200 ease-out"
              @click="commands.heading({ level: 1 })"
            >
              <icon class="w-7 h-7" type="h1" colorClass="text-c-text" />
            </button>
            <button
              :class="{ 'bg-c-text-15': isActive.heading({ level: 2 }) }"
              class="p-1 m-1 rounded-lg hover:bg-c-text-15 transition-colors duration-200 ease-out"
              @click="commands.heading({ level: 2 })"
            >
              <icon class="w-7 h-7" type="h2" colorClass="text-c-text" />
            </button>
            <button
              :class="{ 'bg-c-text-15': isActive.heading({ level: 3 }) }"
              class="p-1 m-1 rounded-lg hover:bg-c-text-15 transition-colors duration-200 ease-out"
              @click="commands.heading({ level: 3 })"
            >
              <icon class="w-7 h-7" type="h3" colorClass="text-c-text" />
            </button>
            <div class="w-px h-7 bg-c-text-15 rounded-full mx-3"></div>
            <button
              :class="{ 'bg-c-text-15': isActive.bullet_list()}"
              class="p-1 m-1 rounded-lg hover:bg-c-text-15 transition-colors duration-200 ease-out"
              @click="commands.bullet_list()"
            >
              <icon class="w-7 h-7" type="u-list" colorClass="text-c-text" />
            </button>
            <button
              :class="{ 'bg-c-text-15': isActive.ordered_list()}"
              class="p-1 m-1 rounded-lg hover:bg-c-text-15 transition-colors duration-200 ease-out"
              @click="commands.ordered_list()"
            >
              <icon class="w-7 h-7" type="o-list" colorClass="text-c-text" />
            </button>
            <div class="w-px h-7 bg-c-text-15 rounded-full mx-3"></div>
            <button
              :class="{ 'bg-c-text-15': isActive.link() }"
              class="p-1 m-1 rounded-lg hover:bg-c-text-15 transition-colors duration-200 ease-out"
              @click="showLinkMenu(getMarkAttrs('link'))"
            >
              <icon class="w-7 h-7" type="link" colorClass="text-c-text" />
            </button>
            <button
              :class="{ 'bg-c-text-15': isActive.code() }"
              class="p-1 m-1 rounded-lg hover:bg-c-text-15 transition-colors duration-200 ease-out"
              @click="commands.code()"
            >
              <icon class="w-7 h-7" type="code" colorClass="text-c-text" />
            </button>
            <div class="w-px h-7 bg-c-text-15 rounded-full mx-3"></div>
            <button
              class="p-1 m-1 rounded-lg hover:bg-c-text-15 transition-colors duration-200 ease-out"
              @click="commands.undo()"
            >
              <icon class="w-7 h-7" type="undo" colorClass="text-c-text" />
            </button>
            <button
              class="p-1 m-1 rounded-lg hover:bg-c-text-15 transition-colors duration-200 ease-out"
              @click="commands.redo()"
            >
              <icon class="w-7 h-7" type="redo" colorClass="text-c-text" />
            </button>
          </div>
        </editor-menu-bar>
      </div>
      <editor-menu-bubble
        class="menububble shadow-xl transform"
        :class="linkMenuIsActive?'-translate-x-1/2':'-translate-x-1/2'"
        :editor="editor"
        @hide="hideLinkMenu"
        v-slot="{ commands, isActive, getMarkAttrs, menu }"
      >
        <div
          class="menububble"
          :class="{ 'is-active': menu.isActive }"
          :style="`left: ${menu.left}px; bottom: ${menu.bottom}px;`"
        >
          <form
            class="menububble__form"
            v-if="linkMenuIsActive"
            @submit.prevent="setLinkUrl(commands.link, linkUrl)"
          >
            <!-- Link Input -->
            <input
              class="menububble__input"
              type="text"
              v-model="linkUrl"
              placeholder="https://"
              ref="linkInput"
              @keydown.esc="hideLinkMenu"
            />
            <!-- Close Button -->
            <button
              class="menububble__button"
              @click="setLinkUrl(commands.link, null)"
              type="button"
            >
              <icon type="cancel" class="w-5 h-5" colorClass="text-c-light" />
            </button>
          </form>
          <template v-else>
            <!-- Bold -->
            <button
              :class="{ 'bg-c-light-25': isActive.bold()}"
              class="p-0_5 mx-0_5 rounded-lg hover:bg-c-light-15 transition-colors duration-200 ease-out"
              @click="commands.bold()"
            >
              <icon class="w-6 h-6" type="bold" colorClass="text-c-light" />
            </button>
            <!-- Italic -->
            <button
              :class="{ 'bg-c-light-25': isActive.italic()}"
              class="p-0_5 mx-0_5 rounded-lg hover:bg-c-light-15 transition-colors duration-200 ease-out"
              @click="commands.italic()"
            >
              <icon class="w-6 h-6" type="italic" colorClass="text-c-light" />
            </button>
            <!-- Heading 2 -->
            <button
              v-if="type!='feedback'"
              :class="{ 'bg-c-light-25': isActive.heading({ level: 2 }) }"
              class="p-0_5 mx-0_5 rounded-lg hover:bg-c-light-15 transition-colors duration-200 ease-out"
              @click="commands.heading({ level: 2 })"
            >
              <icon class="w-6 h-6" type="h2" colorClass="text-c-light" />
            </button>
            <!-- Link -->
            <button
              :class="{ 'bg-c-light-25': isActive.link()}"
              class="p-0_5 mx-0_5 rounded-lg hover:bg-c-light-15 transition-colors duration-200 ease-out"
              @click="showLinkMenu(getMarkAttrs('link'))"
            >
              <icon class="w-6 h-6" type="link" colorClass="text-c-light" />
            </button>
            <!-- Code -->
            <button
              v-if="type!='feedback'"
              :class="{ 'bg-c-light-25': isActive.code() }"
              class="p-0_5 mx-0_5 rounded-lg hover:bg-c-light-15 transition-colors duration-200 ease-out"
              @click="commands.code()"
            >
              <icon class="w-6 h-6" type="code" colorClass="text-c-light" />
            </button>
          </template>
        </div>
      </editor-menu-bubble>
      <editor-content
        :class="[type=='feedback'?'editor-content editor-content-feedback':'editor-content', isPlaceholderVisible?'opacity-50':'']"
        :editor="editor"
      />
    </client-only>
  </div>
</template>
<script>
import Icon from "~/components/Icon.vue";
import { EditorContent, EditorMenuBubble } from 'tiptap'
import { EditorMenuBar } from 'tiptap'
export default {
  props: {
    editor: null,
    placeholder: null,
    type: null,
    isPlaceholderVisible: null
  },
  components: {
    EditorContent,
    EditorMenuBar,
    EditorMenuBubble,
    Icon,
  },
  data(){
return {
  linkUrl: null,
  linkMenuIsActive: false,
}
  },
  methods: {
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
  }
}
</script>