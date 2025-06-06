<script setup lang="ts">
  import { TiIcon, tiCheckComponent, tiGetComponent } from "@site0/tijs";
  import { computed } from "vue";
  import Playground from "../playground/Playground.vue";

  const emit = defineEmits(["toggle:theme_color"]);
  /*-------------------------------------------------------

                      Props

-------------------------------------------------------*/
  const props = defineProps({
    comType: {
      type: String,
      default: "TiUnkown",
    },
    example: String,
    theme_color: {
      type: String,
      default: "auto-color-mode",
    },
  });
  /*-------------------------------------------------------

                   Computed

-------------------------------------------------------*/
  const CurrentCom = computed(() => {
    return tiGetComponent(props.comType);
  });

  const ComEvents = computed(() => {
    return CurrentCom.value?.events;
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
  <div class="page-detail cover-parent">
    <div v-if="!CurrentCom">Please Choose On Component</div>
    <template v-else>
      <h3>
        <TiIcon :value="CurrentCom.icon" class="s32" />
        <span>{{ CurrentCom.toString() }}</span>
        <a @click="emit('toggle:theme_color')" :title="theme_color">
          <TiIcon class="s24" :value="ThemeColorIcon" />
        </a>
      </h3>
      <blockquote v-if="ComEvents && ComEvents.length > 0">
        <ul>
          <li v-for="enm in ComEvents">
            <i class="fa-solid fa-bolt"></i>
            <span>{{ enm }}</span>
          </li>
        </ul>
      </blockquote>
      <Playground :comType="comType" :example="example" />
    </template>
  </div>
</template>

<style scoped lang="scss">
  @use "@site0/tijs/sass/_all.scss" as *;

  .page-detail {
    @include flex-align-v-nowrap;
    padding: 0.2rem;

    > h3 {
      @include flex-align($ai: center);
      padding: SZ(10);
      margin: 0;

      > .ti-icon {
        margin-right: SZ(12);
      }

      > span {
        flex: 1 1 auto;
      }

      > a {
        color: inherit;
        text-decoration: none;

        &:hover {
          color: var(--ti-color-secondary);
        }
      }
    }

    > blockquote {
      background-color: var(--ti-color-bar);
      margin: 0 0 1px 0;
      padding: 0.3em;
      border-radius: 0.2em 0.2em 0 0;
      ul {
        @include flex-align;
        list-style: none;
        margin: 0;
        padding: 0;
        li {
          @include flex-align-nowrap;
          @include font-fixed;
          font-size: 0.8em;
          color: var(--ti-color-success-r);
          background-color: var(--ti-color-success);
          padding: 0 0.5em;
          margin: 0 0.1em;
          border-radius: 0.5em;
          > i {
            font-size: 10px;
            margin-right: 0.5em;
          }
        }
      }
    }

    > .demo-playground {
      flex: 1 1 auto;
    }
  }
</style>
