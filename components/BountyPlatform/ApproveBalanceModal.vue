<template>
  <div
    @keydown.esc.exact="hideModal"
    class="w-full max-h-full flex flex-col items-center shadow-4xl overflow-auto bg-c-background-sec rounded-xl border-2 border-c-text-10 px-6 pt-4 pb-8 md:px-24 md:pt-8 md:pb-16 whitespace-initial"
  >
    <!-- Header -->
    <h5
      class="text-center font-bold text-2xl text-c-primary"
    >{{$t('bountyPlatform.sidebarContextual.headerApproveBalance')}}</h5>
    <!-- Paragraph -->
    <p class="text-center mt-1">{{$t('bountyPlatform.sidebarContextual.paragraphApproveBalance')}}</p>
    <!-- Divider -->
    <div class="w-full h-px2 rounded-full bg-c-text-10 mt-6 mb-7"></div>
    <!-- Amount to Approve  -->
    <label
      for="amountToApprove"
      class="text-c-text font-bold text-lg"
    >{{$t('bountyPlatform.sidebarContextual.amountToApprove')}}</label>
    <!-- Amount Input -->
    <div class="w-full max-w-xxs flex flex-row items-center relative mt-2 text-c-text">
      <!-- Amount Symbol -->
      <span class="absolute top-1/2 transform -translate-y-1/2 ml-2 font-bold">{D}</span>
      <input
        name="amountToApprove"
        class="bg-c-background-ter border-c-background-ter w-full font-bold border focus:border-c-primary rounded-lg transition-all duration-200 ease-out pr-4 pl-9 py-2"
        type="number"
        min="1"
        :placeholder="$t('bountyPlatform.sidebarContextual.amountToApprovePlaceholder')"
      />
    </div>
    <!-- Approve Button -->
    <button
      class="w-full max-w-xxs btn-primary bg-c-primary transform hover:scale-md focus:scale-md duration-200 ease-out transition-all origin-bottom-left text-c-light font-extrabold text-lg rounded-tl-2xl rounded-br-2xl rounded-tr-md rounded-bl-md px-6 py-1_5 mt-3"
    >{{$t('bountyPlatform.sidebarContextual.buttonApprove')}}</button>
    <p class="text-c-danger text-xs px-3"></p>
  </div>
</template>
<script>
export default {
  props: {
    hideModal: Function
  }
}
</script>
<style>
.whitespace-initial {
  white-space: initial;
}
</style>