<template>
  <div class="w-full flex flex-col justify-center items-center">
    <GreetingCard
      :header="$t('bountyPlatform.post.cardHeader')"
      :paragraph="$t('bountyPlatform.post.cardParagraph')"
      type="post"
      class="my-1 md:my-2"
    />
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
