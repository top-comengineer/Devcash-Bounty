<template>
  <label class="checkbox-container flex flex-row items-center">
    <input :checked="checked" type="checkbox" :name="name" />
    <span
      v-if="$store.state.theme.dt"
      class="rounded-tl-md rounded-br-md rounded-tr-sm rounded-bl-sm border-dtText normal-checkmark-dt"
    ></span>
    <span
      v-else
      class="rounded-tl-md rounded-br-md rounded-tr-sm rounded-bl-sm border-ltText normal-checkmark-lt"
    ></span>
    <h5 class="leading-tight font-bold">{{text}}</h5>
  </label>
</template>
<script>
import Icon from "~/components/Icon.vue";
export default {
  components: {
    Icon
  },
  props: {
    name: null,
    text: null,
    checked: null
  }
};
</script>
<style>
/* Customize the label (the container) */
.checkbox-container {
  position: relative;
  padding-left: 1.8rem;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/* Hide the browser's default checkbox */
.checkbox-container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

/* Create a custom checkbox */
.normal-checkmark-dt,
.normal-checkmark-lt {
  position: absolute;
  top: 0;
  left: 0;
  height: 1.2rem;
  width: 1.2rem;
  border-width: 0.1rem;
  border-style: solid;
}

/* On mouse-over, add a grey background color */
/* .checkbox-container:hover input ~ .normal-checkmark-dt {}

/* When the checkbox is checked, add a blue background */
.checkbox-container input:checked ~ .normal-checkmark-dt,
.checkbox-container input:checked ~ .normal-checkmark-lt {
  background-color: #675cff;
  border-color: #675cff;
}

/* Create the checkmark/indicator (hidden when not checked) */
.normal-checkmark-dt:after,
.normal-checkmark-lt:after {
  content: "";
  position: absolute;
  display: none;
}

.checkbox-container input:checked ~ h5 {
  color: #675cff;
}

/* Show the checkmark when checked */
.checkbox-container input:checked ~ .normal-checkmark-dt:after,
.checkbox-container input:checked ~ .normal-checkmark-lt:after {
  display: block;
}

/* Style the checkmark/indicator */
.checkbox-container .normal-checkmark-dt:after {
  top: 0.05rem;
  left: 0.35rem;
  width: 0.4rem;
  height: 0.8rem;
  border: solid #181726;
  border-width: 0 2px 2px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}
/* Style the checkmark/indicator */
.checkbox-container .normal-checkmark-lt:after {
  top: 0.05rem;
  left: 0.35rem;
  width: 0.4rem;
  height: 0.8rem;
  border: solid #ffffff;
  border-width: 0 2px 2px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}
</style>