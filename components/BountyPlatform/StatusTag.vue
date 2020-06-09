<template>
  <div
    :class="{
            'bg-dtPending-10 border-dtPending-40': status=='pending' && $store.state.theme.dt,
            'bg-ltPending-10 border-ltPending-40': status=='pending' && !$store.state.theme.dt,
            'bg-dtSuccess-10 border-dtSuccess-40': status=='approved' && $store.state.theme.dt,
            'bg-ltSuccess-10 border-ltSuccess-40': status=='approved' && !$store.state.theme.dt,
            'bg-dtDanger-10 border-dtDanger-40': status=='rejected' && $store.state.theme.dt,
            'bg-ltDanger-10 border-ltDanger-40': status=='rejected' && !$store.state.theme.dt}"
    class="flex flex-row items-center px-2 py-1 border rounded-md my-2 mx-3 md:mr-2"
  >
    <Icon class="w-4 h-4" :type="pickIcon()" :colorClass="pickIconColorClass()" />
    <h6
      :class="{
                'text-dtPending': status=='pending' && $store.state.theme.dt,
                'text-ltPending': status=='pending' && !$store.state.theme.dt,
                'text-dtSuccess': status=='approved' && $store.state.theme.dt,
                'text-ltSuccess': status=='approved' && !$store.state.theme.dt,
                'text-dtDanger': status=='rejected' && $store.state.theme.dt,
                'text-ltDanger': status=='rejected' && !$store.state.theme.dt}"
      class="font-bold mx-1 text-sm"
    >{{pickStatusTagText()}}</h6>
  </div>
</template>
<script>
import Icon from "~/components/Icon.vue";
export default {
  props: {
    perspective: null,
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
    },
    // Pick the right color class for the icon on status tag
    pickIconColorClass() {
      // Pending
      if (this.status == "pending") {
        return this.$store.state.theme.dt ? "text-dtPending" : "text-ltPending";
      }
      // Approved
      else if (this.status == "approved") {
        return this.$store.state.theme.dt ? "text-dtSuccess" : "text-ltSuccess";
      }
      // Rejected
      else if (this.status == "rejected") {
        return this.$store.state.theme.dt ? "text-dtDanger" : "text-ltDanger";
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
    }
  }
};
</script>