<template>
  <div class="w-full relative mt-3 rounded-lg bg-c-background-ter">
    <client-only>
      <div class="bg-c-background-ter sticky top-0 z-20 rounded-tl-lg rounded-tr-lg">
        <editor-menu-bar
          class="bg-c-text-10 rounded-tl-lg rounded-tr-lg px-2"
          :editor="editor"
          v-slot="{ commands, isActive }"
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
        class="menububble shadow-xl"
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
            <input
              class="menububble__input"
              type="text"
              v-model="linkUrl"
              placeholder="https://"
              ref="linkInput"
              @keydown.esc="hideLinkMenu"
            />
            <button
              class="menububble__button"
              @click="setLinkUrl(commands.link, null)"
              type="button"
            >
              <icon type="cancel" class="w-5 h-5 ml-1" colorClass="text-c-light" />
            </button>
          </form>
          <template v-else>
            <button
              class="menububble__button"
              @click="showLinkMenu(getMarkAttrs('link'))"
              :class="{ 'is-active': isActive.link() }"
            >
              <span>{{ isActive.link() ? 'Update Link' : 'Add Link'}}</span>
              <icon type="link" class="w-5 h-5 ml-1" colorClass="text-c-light" />
            </button>
          </template>
        </div>
      </editor-menu-bubble>
      <editor-content class="editor-content" :editor="editor" />
    </client-only>
  </div>
</template>
<script>
import Icon from "~/components/Icon.vue";
import { EditorContent, EditorMenuBar, EditorMenuBubble } from 'tiptap'
export default {
  props: {
    editor: null
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
<style lang="scss">
.editor-content a {
  margin-top: 0.75rem;
  line-height: 1.9;
  font-weight: 600;
  color: var(--c-secondary);
  text-decoration: underline var(--c-secondary);
}
.editor-content h1 {
  font-size: 1.6rem;
  margin-top: 0.75rem;
  margin-bottom: 0.4rem;
  font-weight: 800;
}
.editor-content h2 {
  font-size: 1.45rem;
  margin-top: 0.75rem;
  margin-bottom: 0.3rem;
  font-weight: 700;
}
.editor-content h3 {
  font-size: 1.3rem;
  margin-top: 0.75rem;
  margin-bottom: 0.2rem;
  font-weight: 700;
}
.editor-content p {
  margin-top: 0.75rem;
  line-height: 1.9;
}

.editor-content ul,
.editor-content ol {
  margin-left: 1.5rem;
}
@media only screen and (min-width: 768px) {
  .editor-content ul,
  .editor-content ol {
    margin-left: 2.25rem;
  }
}

.editor-content li > p,
.editor-content li > ol,
.editor-content li > ul {
  margin: 0;
}

.editor-content ul {
  list-style: disc;
  margin-top: 0.35rem;
}

.editor-content ol {
  list-style: decimal;
  margin-top: 0.35rem;
}

.editor-content p code {
  font-family: "JetBrainsMono", monospace;
  padding: 0.15rem 0.35rem;
  line-height: 2.25;
  border-radius: 0.25rem;
  background-color: var(--c-text-10);
  border: 1px solid var(--c-text-10);
}

.editor-content pre {
  font-family: "JetBrainsMono", monospace;
  line-height: 2;
  border-radius: 0.25rem;
  padding: 0.25rem 0.75rem;
  background-color: transparent;
  border: 1px solid var(--c-secondary-15);
  background-color: var(--c-secondary-10);
  margin-top: 0.75rem;
}

.ProseMirror {
  padding: 0.25rem 1rem 1rem 1rem;
  border: 1px solid var(--c-background-ter);
  transition: border 0.2s ease-out;
  border-radius: 0rem 0rem 0.5rem 0.5rem;
  background-color: var(--c-background-ter);
  min-height: 24rem;
}
@media only screen and (min-width: 768px) {
  .ProseMirror {
    padding: 0.25rem 1.5rem 1rem 1.5rem;
  }
}
.ProseMirror-focused {
  outline: none;
  border: 1px solid var(--c-primary);
}
// Editor related things
.menububble {
  position: absolute;
  display: flex;
  align-items: center;
  z-index: 20;
  background: var(--c-secondary);
  border-radius: 5px;
  padding: 0.3rem;
  margin-bottom: 0.5rem;
  transform: translateX(-50%);
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.2s, visibility 0.2s;

  &.is-active {
    opacity: 1;
    visibility: visible;
  }

  &__button {
    display: inline-flex;
    align-items: center;
    background: transparent;
    border: 0;
    color: var(--c-light);
    padding: 0.2rem 0.5rem;
    margin-right: 0.2rem;
    border-radius: 3px;
    font-weight: 700;
    transition: all 0.2s ease-out;
    cursor: pointer;

    &:last-child {
      margin-right: 0;
    }

    &:hover {
      background-color: var(--c-light-25);
    }

    &.is-active {
      background-color: var(--c-light-15);
    }
  }

  &__form {
    display: flex;
    align-items: center;
  }

  &__input {
    font: inherit;
    font-weight: 700;
    border: none;
    background: transparent;
    color: var(--c-light);
    padding: 0rem 0.35rem;
  }
  &__input::placeholder {
    opacity: 0.5;
    color: var(--c-light);
  }
}
</style>