<template>
  <div
    :class="{
            'bg-c-pending-10 border-c-pending-40': status=='pending',
            'bg-c-success-10 border-c-success-40': status=='approved',
            'bg-c-danger-10 border-c-danger-40': status=='rejected',
            'bg-c-text-10 border-c-text-40': status=='feedback',
            }"
    class="flex flex-row items-center px-2 py-1 border rounded-md my-2 mx-3 md:mr-2"
  >
    <Icon class="w-4 h-4" :type="pickIcon()" :colorClass="pickIconColorClass()" />
    <h6
      :class="{
                'text-c-pending': status=='pending',
                'text-c-success': status=='approved',
                'text-c-danger': status=='rejected',
                'text-c-text': status=='feedback'}"
      class="font-bold mx-1 text-sm"
    >{{pickStatusTagText()}}</h6>
  </div>
</template>
<script>
import Icon from "~/components/Icon.vue";
export default {
  props: {
    status: null
  },
  components: {
    Icon
  },
  methods: {
    // Pick the right icon for status tag
    pickIcon() {
      // Pending
      if (this.status == "pending") {
        return "clock";
      }
      // Approved
      else if (this.status == "approved") {
        return "done";
      }
      // Rejected
      else if (this.status == "rejected") {
        return "cancel";
      }
      // Feedback
      else if (this.status == "feedback") {
        return "feedback";
      }
    },
    // Pick the right color class for the icon on status tag
    pickIconColorClass() {
      // Pending
      if (this.status == "pending") {
        return "text-c-pending";
      }
      // Approved
      else if (this.status == "approved") {
        return "text-c-success";
      }
      // Rejected
      else if (this.status == "rejected") {
        return "text-c-danger";
      }
      // Feedback
      else if (this.status == "feedback") {
        return "text-c-text";
      }
    },
    // Pick the right text for the status tag
    pickStatusTagText() {
      // Pending
      if (this.status == "pending") {
        return this.$t("bountyPlatform.statusTag.pending");
      }
      // Approved
      else if (this.status == "approved") {
        return this.$t("bountyPlatform.statusTag.approved");
      }
      // Rejected
      else if (this.status == "rejected") {
        return this.$t("bountyPlatform.statusTag.rejected");
      }
      // Feedback
      else if (this.status == "feedback") {
        return this.$t("bountyPlatform.statusTag.feedback");
      }
    }
  }
};
</script>