<template>
  <div class="w-full flex flex-col justify-center items-center">
    <!-- Greeting Card -->
    <GreetingCard
      :header="$t('bountyPlatform.post.cardHeader')"
      :paragraph="$t('bountyPlatform.post.cardParagraph')"
      type="post"
      class="my-1 md:my-2"
    />
    <!-- Bounty Title and Description -->
    <div
      :class="
      [$store.state.theme.dt?'bg-dtBackgroundSecondary':'bg-ltBackgroundSecondary shadow-lg']
    "
      class="w-full flex flex-col flex-wrap relative rounded-tl-3xl rounded-br-3xl rounded-tr-lg rounded-bl-lg py-6 md:py-10 px-6 md:px-8 my-1 md:my-2"
    >Test Test</div>
  </div>
</template>

<script>
import GreetingCard from "~/components/BountyPlatform/GreetingCard.vue";
export default {
  layout: "bountyPlatform",
  components: {
    GreetingCard
  }
};
</script>
