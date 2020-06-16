<template>
  <!-- Modal Wrapper -->
  <div
    :class="$store.state.theme.dt ? 'bg-dtText text-dtBackground' : 'bg-ltText text-ltBackground'"
    class="max-w-full max-h-xs flex flex-col shadow-2xlS rounded-tl-2xl rounded-br-2xl rounded-bl-md rounded-tr-md overflow-x-hidden overflow-y-scroll"
  >
    <button
      v-for="(category, index) in categories"
      :key="category+index"
      @click="categoryPicked(category)"
      @keydown.tab.exact="index+1 == categories.length?closePicker():null"
      @keydown.esc.exact="closePicker"
      :class="category == currentCategory ? 'bg-dtPrimary text-dtText': 'hover_bg-dtPrimary-35 focus_bg-dtPrimary-35'"
      class="flex flex-row items-center py-3 transition-colors duration-200 ease-out pl-3 pr-8"
    >
      <div class="mr-2">
        <Icon
          v-if="category == currentCategory"
          colorClass="text-dtText"
          type="done"
          class="w-6 h-6"
        />
        <div v-else class="w-6 h-6"></div>
      </div>
      <h3 class="font-bold text-left">{{ category }}</h3>
    </button>
  </div>
</template>
<script>
import Icon from "~/components/Icon.vue";
export default {
    components: {
        Icon
    },
    props: {
        closePicker: Function,
        categoryPicked: Function,
        currentCategory: String,
        categories: null
  },
}
</script>