<template>
  <div
    class="w-full flex flex-row flex-wrap items-center bg-c-primary shadow-lg px-4 md:px-6 pt-1 pb-2 md:pb-1 rounded-tl-2xl rounded-br-2xl rounded-tr-lg rounded-bl-lg"
  >
    <h5
      class="w-full md:w-auto mx-2 md:mx-3 my-2 text-lg font-bold text-c-light p-1"
    >{{$t('bountyPlatform.explore.categories.header')}}</h5>
    <div class="w-full h-px2 md:h-8 md:w-px2 rounded-full bg-c-light mx-3 my-2"></div>
    <checkmark-button
      :checked="categories.create"
      :callback="(checked) => categoryChanged(checked, 'create')"
      type="light"
      class="mx-2 md:mx-3 my-2"
      :text="$t('bountyPlatform.explore.categories.createTag')"
    />
    <checkmark-button
      :checked="categories.enhance"
      :callback="(checked) => categoryChanged(checked, 'enhance')"
      type="light"
      class="mx-2 md:mx-3 my-2"
      :text="$t('bountyPlatform.explore.categories.enhanceTag')"
    />
    <checkmark-button
      :checked="categories.bug"
      :callback="(checked) => categoryChanged(checked, 'bug')"
      type="light"
      class="mx-2 md:mx-3 my-2"
      :text="$t('bountyPlatform.explore.categories.bugTag')"
    />
    <checkmark-button
      :checked="categories.support"
      :callback="(checked) => categoryChanged(checked, 'support')"
      type="light"
      class="mx-2 md:mx-3 my-2"
      :text="$t('bountyPlatform.explore.categories.supportTag')"
    />
    <checkmark-button
      :checked="categories.prototype"
      :callback="(checked) => categoryChanged(checked, 'prototype')"
      type="light"
      class="mx-2 md:mx-3 my-2"
      :text="$t('bountyPlatform.explore.categories.prototypeTag')"
    />
    <checkmark-button
      :checked="categories.other"
      :callback="(checked) => categoryChanged(checked, 'other')"
      type="light"
      class="mx-2 md:mx-3 my-2"
      :text="$t('bountyPlatform.explore.categories.otherTag')"
    />
  </div>
</template>
<script>
import CheckmarkButton from "~/components/CheckmarkButton.vue";
import { mapGetters } from "vuex";
export default {
  components: {
      CheckmarkButton
  },
  computed: {
    // mix the getters into computed with object spread operator
    ...mapGetters({
      categories: "devcashData/exploreCategories"
    })
  },
  methods: {
    categoryChanged(checked, type) {
      let newState = this.categories
      switch (type) {
        case 'create':
          newState.create = checked
          break;
        case 'enhance':
          newState.enhance = checked
          break;
        case 'bug':
          newState.bug = checked
          break;
        case 'support':
          newState.support = checked
          break;
        case 'prototype':
          newState.prototype = checked
          break;
        case 'other':
          newState.other = checked
          break;
        default:
          break;
      }
      this.$store.commit('devcashData/setCategories', newState)
      this.$root.$emit('filtersChanged')
    }
  }
}
</script>