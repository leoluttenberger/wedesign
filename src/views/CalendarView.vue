<template>
  <div class="calendar-parent">
    <calendar-view
      :items="items"
      :show-date="showDate"
      :time-format-options="{ hour: 'numeric', minute: '2-digit' }"
      :enable-drag-drop="true"
      :disable-past="disablePast"
      :disable-future="disableFuture"
      :show-times="showTimes"
      :date-classes="myDateClasses"
      :display-period-uom="displayPeriodUom"
      :display-period-count="displayPeriodCount"
      :starting-day-of-week="startingDayOfWeek"
      :class="themeClasses"
      :period-changed-callback="periodChanged"
      :current-period-label="useTodayIcons ? 'icons' : ''"
      :displayWeekNumbers="displayWeekNumbers"
      :enable-date-selection="true"
      :selection-start="selectionStart"
      :selection-end="selectionEnd"
      @date-selection-start="setSelection"
      @date-selection="setSelection"
      @date-selection-finish="finishSelection"
      @drop-on-date="onDrop"
      @click-date="onClickDay"
      @click-item="onClickItem"
    >
      <template #header="{ headerProps }">
        <calendar-view-header
          :header-props="headerProps"
          :header="header"
          @input="setShowDate"
        />
      </template>
    </calendar-view>
  </div>

  <div class="calendar-controls">
    <div v-if="message" class="notification is-success">{{ message }}</div>

    <div class="box">
      <h4 class="title is-5">Play with the options!</h4>

      <div class="field">
        <label class="label">Period UOM</label>
        <div class="control">
          <div class="select">
            <select v-model="displayPeriodUom">
              <option>month</option>
              <option>week</option>
              <option>year</option>
            </select>
          </div>
        </div>
      </div>

      <div class="field">
        <label class="label">Period Count</label>
        <div class="control">
          <div class="select">
            <select v-model="displayPeriodCount">
              <option :value="1">1</option>
              <option :value="2">2</option>
              <option :value="3">3</option>
            </select>
          </div>
        </div>
      </div>

      <div class="field">
        <label class="label">Starting day of the week</label>
        <div class="control">
          <div class="select">
            <select v-model="startingDayOfWeek">
              <option
                v-for="(d, index) in dayNames"
                :key="index"
                :value="index"
              >
                {{ d }}
              </option>
            </select>
          </div>
        </div>
      </div>

      <div class="field">
        <label class="checkbox">
          <input v-model="useTodayIcons" type="checkbox" />
          Use icon for today's period
        </label>
      </div>

      <div class="field">
        <label class="checkbox">
          <input v-model="displayWeekNumbers" type="checkbox" />
          Show week number
        </label>
      </div>

      <div class="field">
        <label class="checkbox">
          <input v-model="showTimes" type="checkbox" />
          Show times
        </label>
      </div>

      <div class="field">
        <label class="label">Themes</label>
        <label class="checkbox">
          <input v-model="useDefaultTheme" type="checkbox" />
          Default
        </label>
      </div>

      <div class="field">
        <label class="checkbox">
          <input v-model="useHolidayTheme" type="checkbox" />
          Holidays
        </label>
      </div>
    </div>

    <div class="box">
      <div class="field">
        <label class="label">Title</label>
        <div class="control">
          <input v-model="newItemTitle" class="input" type="text" />
        </div>
      </div>

      <div class="field">
        <label class="label">Start date</label>
        <div class="control">
          <input v-model="newItemStartDate" class="input" type="date" />
        </div>
      </div>

      <div class="field">
        <label class="label">End date</label>
        <div class="control">
          <input v-model="newItemEndDate" class="input" type="date" />
        </div>
      </div>

      <button class="button is-info" @click="clickTestAddItem">Add Item</button>
    </div>
  </div>
</template>
<script setup lang="ts">
import "../../node_modules/vue-simple-calendar/dist/style.css";
import "../../node_modules/vue-simple-calendar/static/css/default.css";
import "../../node_modules/vue-simple-calendar/static/css/holidays-us.css";
import {
  CalendarView,
  CalendarViewHeader,
  CalendarMath,
} from "vue-simple-calendar";
import { ref, computed, onMounted } from "vue";

const message = ref("");
const startingDayOfWeek = ref(0);
const disablePast = ref(false);
const disableFuture = ref(false);
const displayPeriodUom = ref("month");
const displayPeriodCount = ref(1);
const displayWeekNumbers = ref(false);
const showTimes = ref(true);
const selectionStart = ref(null);
const selectionEnd = ref(null);
const newItemTitle = ref("");
const newItemStartDate = ref("");
const newItemEndDate = ref("");
const useDefaultTheme = ref(true);
const useHolidayTheme = ref(true);
const useTodayIcons = ref(false);
const items = ref([]);
const thisMonth = (d = 1, h = 1, m = 1) => {
  const t = new Date();
  return new Date(t.getFullYear(), t.getMonth(), d, h || 0, m || 0);
};
const showDate = ref(thisMonth(1));
const userLocale = computed(() => {
  return CalendarMath.getDefaultBrowserLocale();
});
const dayNames = computed(() => {
  return CalendarMath.getFormattedWeekdayNames(userLocale.value, "long", 0);
});
const themeClasses = computed(() => {
  return {
    "theme-default": useDefaultTheme.value,
    "holiday-us-traditional": useHolidayTheme.value,
    "holiday-us-official": useHolidayTheme.value,
  };
});
const myDateClasses = computed(() => {
  // This was added to demonstrate the dateClasses prop. Note in particular that the
  // keys of the object are `yyyy-mm-dd` ISO date strings (not dates), and the values
  // for those keys are strings or string arrays. Keep in mind that your CSS to style these
  // may need to be fairly specific to make it override your theme's styles. See the
  // CSS at the bottom of this component to see how these are styled.
  const o = {};
  const theFirst = thisMonth(1);
  const ides = [2, 4, 6, 9].includes(theFirst.getMonth()) ? 15 : 13;
  const idesDate = thisMonth(ides);
  o[CalendarMath.isoYearMonthDay(idesDate)] = "ides";
  o[CalendarMath.isoYearMonthDay(thisMonth(21))] = [
    "do-you-remember",
    "the-21st",
  ];
  return o;
});

onMounted(() => {
  newItemStartDate.value = CalendarMath.isoYearMonthDay(CalendarMath.today());
  newItemEndDate.value = CalendarMath.isoYearMonthDay(CalendarMath.today());
});

const periodChanged = () => {
  // range, eventSource) {
  // Demo does nothing with this information, just including the method to demonstrate how
  // you can listen for changes to the displayed range and react to them (by loading items, etc.)
  //console.log(eventSource)
  //console.log(range)
};

const onClickDay = (d) => {
  selectionStart.value = null;
  selectionEnd.value = null;
  message.value = `You clicked: ${d.toLocaleDateString()}`;
};

const onClickItem = (e) => {
  message.value = `You clicked: ${e.title}`;
};
const setShowDate = (d) => {
  message.value = `Changing calendar view to ${d.toLocaleDateString()}`;
  showDate.value = d;
};
const setSelection = (dateRange) => {
  selectionEnd.value = dateRange[1];
  selectionStart.value = dateRange[0];
};
const finishSelection = (dateRange) => {
  setSelection(dateRange);
  message.value = `You selected: ${selectionStart.value.toLocaleDateString()} -${selectionEnd.value.toLocaleDateString()}`;
};
const onDrop = (item, date) => {
  message.value = `You dropped ${item.id} on ${date.toLocaleDateString()}`;
  // Determine the delta between the old start date and the date chosen,
  // and apply that delta to both the start and end date to move the item.
  const eLength = CalendarMath.dayDiff(item.startDate, date);
  item.originalItem.startDate = CalendarMath.addDays(item.startDate, eLength);
  item.originalItem.endDate = CalendarMath.addDays(item.endDate, eLength);
};
const clickTestAddItem = () => {
  items.value.push({
    startDate: newItemStartDate.value,
    endDate: newItemEndDate.value,
    title: newItemTitle.value,
    id: "e" + Math.random().toString(36).substr(2, 10),
  });
  message.value = "You added a calendar item!";
};
</script>
