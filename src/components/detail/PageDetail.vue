<script setup lang="ts">
import { TiIcon, tiCheckComponent, TiPlayground } from "ti";
import { computed } from "vue";

const emit = defineEmits(["toggle:theme_color"]);
/*-------------------------------------------------------

                      Props

-------------------------------------------------------*/
const props = defineProps({
  comType: {
    type: String,
    default: "TiUnkown"
  },
  example: String,
  theme_color: {
    type: String,
    default: "auto-color-mode"
  }
});
/*-------------------------------------------------------

                   Computed

-------------------------------------------------------*/
const CurrentCom = computed(() => {
  return tiCheckComponent(props.comType);
});

const ThemeColorIcon = computed(() => {
  switch (props.theme_color) {
    case "light":
      return "fas-sun";
    case "dark":
      return "fas-moon";
    default:
      return "fas-cloud-sun";
  }
});

/*-------------------------------------------------------

                   Watch

-------------------------------------------------------*/
</script>

<template>
  <div class="page-detail">
    <h3>
      <TiIcon :value="CurrentCom.icon" class="s32" />
      <span>{{ CurrentCom.toString() }}</span>
      <a @click="emit('toggle:theme_color')" :title="theme_color">
        <TiIcon class="s24" :value="ThemeColorIcon" />
      </a>
    </h3>
    <TiPlayground :comType="comType" :example="example"
      :exampleAsRouterLink="true" />
  </div>
</template>

<style scoped lang="scss">
@use "ti/scss" as *;

.page-detail {
  @include flex-align-v-nowrap;
  padding: 0.2rem;

  >h3 {
    @include flex-align($ai: center);
    padding: SZ(10);
    margin: 0;

    >.ti-icon {
      margin-right: SZ(12);
    }

    >span {
      flex: 1 1 auto;
    }

    >a {
      color: inherit;
      text-decoration: none;

      &:hover {
        color: var(--ti-color-secondary);
      }
    }
  }

  >.demo-playground {
    flex: 1 1 auto;
  }
}
</style>
