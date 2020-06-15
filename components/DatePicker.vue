<template>
  <div ref="datepicker">
    <transition name="datepickerTransition">
      <div
        class="mt-12 rounded-lg shadow p-4 absolute top-0 left-0 z-50"
        :class="{'bg-ltBackground':!$store.state.theme.dt, 'bg-dtBackground': $store.state.theme.dt}"
        style="width: 17rem"
        v-on-clickaway="closePicker"
      >
        <div class="flex justify-between items-center mb-2">
          <div>
            <span class="text-lg font-bold">{{ monthNames[month] }}</span>
            <span class="ml-1 text-lg font-normal">{{ year }}</span>
          </div>
          <div>
            <button
              type="button"
              class="transition ease-in-out duration-100 inline-flex cursor-pointer p-1 rounded-full hover_bg-dtPrimary-35"
              @click="previousClick"
            >
              <svg
                class="h-6 w-6 inline-flex"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              type="button"
              class="transition ease-in-out duration-100 inline-flex cursor-pointer p-1 rounded-full hover_bg-dtPrimary-35"
              @click="nextClick"
            >
              <svg
                class="h-6 w-6 inline-flex"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
        <div class="flex flex-wrap mb-3 -mx-1">
          <div v-for="(day, index) in days" :key="index" style="width: 14.26%" class="px-1">
            <div class="font-medium text-center text-xs">{{ day }}</div>
          </div>
        </div>
        <div class="flex flex-wrap -mx-1">
          <div
            v-for="(blankday, index) in blankdays"
            :key="'blank' + index"
            style="width: 14.28%"
            class="text-center border p-1 border-transparent text-sm"
          ></div>
          <div
            v-for="(date, dateIndex) in no_of_days"
            :key="dateIndex"
            style="width: 14.28%"
            class="px-1 mb-1"
          >
            <div
              @click="getDateValue(date)"
              class="cursor-pointer text-center text-sm leading-none rounded-full leading-loose transition ease-in-out duration-100"
              :class="{'bg-dtPrimary': isToday(date), 'hover_bg-dtPrimary-35': !isToday(date)}"
            >{{ date }}</div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mixin as clickaway } from "vue-clickaway";

export default {
  mixins: [clickaway],
  data() {
    return {
      showDatepicker: false,
      datepickerValue: '',
      month: '',
      year: '',
      no_of_days: [],
      blankdays: [],
      days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],      
      monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    }
  },
  props: {
    closePicker: Function,
    datePicked: Function,
    value: Date
  },
  methods: {
    initDate() {
      let today = this.value == null || this.value == "" ? new Date() : this.value;
      this.month = today.getMonth();
      this.year = today.getFullYear();
      this.datepickerValue = new Date(this.year, this.month, today.getDate()).toDateString();
      this.getNoOfDays()
    },
    isToday(date) {
        const today = new Date();
        const d = new Date(this.year, this.month, date);

        return today.toDateString() === d.toDateString() ? true : false;
    },
    getDateValue(date) {
        let selectedDate = new Date(this.year, this.month, date);
        this.datePicked(selectedDate)
    },
    getNoOfDays() {
        let daysInMonth = new Date(this.year, this.month + 1, 0).getDate();

        // find where to start calendar day of week
        let dayOfWeek = new Date(this.year, this.month).getDay();
        let blankdaysArray = [];
        for ( var i=1; i <= dayOfWeek; i++) {
            blankdaysArray.push(i);
        }

        let daysArray = [];
        for ( var i=1; i <= daysInMonth; i++) {
            daysArray.push(i);
        }

        this.blankdays = blankdaysArray;
        this.no_of_days = daysArray;
    },
    nextClick() {
      if (this.month == 11) {
        this.month = 0
        this.year++
      } else {
        this.month++
      }
      this.getNoOfDays()
    },
    previousClick() {
      if (this.month == 0) {
        this.month = 11
        this.year--
      } else {
        this.month--
      }
      this.getNoOfDays()
    }
  },
  mounted() {
    this.initDate()
  }
}
</script>

 <style>
.datepickerTransition-enter-active {
  transition: all 0.25s ease-out;
}
.datepickerTransition-leave-active {
  transition: all 0.25s ease-out;
}
.datepickerTransition-enter {
  opacity: 0;
  transform: scaleX(0.25) scaleY(0.5) rotate(2.5deg) translateY(-4rem);
}
.datepickerTransition-leave-to {
  opacity: 0;
  transform: scaleX(0.25) scaleY(0.5) rotate(2.5deg) translateY(-4rem);
}
</style>