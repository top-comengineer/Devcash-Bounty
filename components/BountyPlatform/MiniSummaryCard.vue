<template>
  <div
    :class="[bg?bg:'bg-c-background-sec', border?border:'border-c-text-10']"
    class="flex flex-col px-3 py-2 border shadow-xl rounded-lg"
  >
    <p class="opacity-50 text-c-text">{{header}}</p>
    <p class="text-c-secondary text-xl font-bold mt-1">{{text}}</p>
  </div>
</template>
<script>
export default {
    props: {
        header: null,
        text: null,
        bg: String,
        border: String
    }
}
</script>