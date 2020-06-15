<template>
  <div
    :class="
      [!$store.state.theme.dt?'shadow-lgS':'']
    "
    class="w-full flex flex-row flex-wrap items-center bg-dtPrimary px-4 md:px-6 pt-1 pb-2 md:pb-1 rounded-tl-2xl rounded-br-2xl rounded-tr-lg rounded-bl-lg"
  >
    <h5
      class="w-full md:w-auto mx-2 md:mx-3 my-2 text-lg font-bold text-dtText p-1"
    >{{$t('bountyPlatform.explore.categories.header')}}</h5>
    <div class="w-full h-px2 md:h-8 md:w-px2 rounded-full bg-dtText mx-3 my-2"></div>
    <checkmark-button
      checked="checked"
      type="white"
      class="mx-2 md:mx-3 my-2"
      :text="$t('bountyPlatform.explore.categories.createTag')"
    />
    <checkmark-button
      checked="checked"
      type="white"
      class="mx-2 md:mx-3 my-2"
      :text="$t('bountyPlatform.explore.categories.enhanceTag')"
    />
    <checkmark-button
      checked="checked"
      type="white"
      class="mx-2 md:mx-3 my-2"
      :text="$t('bountyPlatform.explore.categories.bugTag')"
    />
    <checkmark-button
      checked="checked"
      type="white"
      class="mx-2 md:mx-3 my-2"
      :text="$t('bountyPlatform.explore.categories.supportTag')"
    />
    <checkmark-button
      checked="checked"
      type="white"
      class="mx-2 md:mx-3 my-1"
      :text="$t('bountyPlatform.explore.categories.prototypeTag')"
    />
    <checkmark-button
      checked="checked"
      type="white"
      class="mx-2 md:mx-3 my-1"
      :text="$t('bountyPlatform.explore.categories.otherTag')"
    />
  </div>
</template>
<script>
import CheckmarkButton from "~/components/CheckmarkButton.vue";
export default {
    components: {
        CheckmarkButton
    }
}
</script>