<template>
  <div ref="mapContainer" class="leaflet-map" :style="{ width, height }"></div>
</template>

<script setup lang="ts">
  import type { Map, Marker } from "leaflet";
  import L from "leaflet";
  import "leaflet/dist/leaflet.css";
  import { onMounted, onUnmounted, ref, watch } from "vue";

  // 修复默认图标路径问题
  const fixLeafletIcons = () => {
    const iconRetinaUrl = new URL(
      "leaflet/dist/images/marker-icon-2x.png",
      import.meta.url
    ).href;
    const iconUrl = new URL(
      "leaflet/dist/images/marker-icon.png",
      import.meta.url
    ).href;
    const shadowUrl = new URL(
      "leaflet/dist/images/marker-shadow.png",
      import.meta.url
    ).href;

    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl,
      iconUrl,
      shadowUrl,
    });
  };

  // 定义 props
  interface Props {
    position?: [number, number]; // [lat, lng]
    width?: string;
    height?: string;
    zoom?: number;
    showMarker?: boolean;
    tileUrl?: string;
    attribution?: string;
  }

  const props = withDefaults(defineProps<Props>(), {
    position: () => [39.9042, 116.4074],
    width: "100%",
    height: "400px",
    zoom: 13,
    showMarker: true,
    tileUrl: "https://wprd04.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}",
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  });

  const mapContainer = ref<HTMLElement | null>(null);
  const map = ref<Map | null>(null);
  const marker = ref<Marker | null>(null);

  // 初始化地图
  const initMap = () => {
    if (!mapContainer.value) return;

    fixLeafletIcons();

    map.value = L.map(mapContainer.value, {
      zoomControl: true,
      attributionControl: false,
      zoom: 18,
    }).setView(props.position, props.zoom);

    L.tileLayer(props.tileUrl, {
      attribution: props.attribution,
    }).addTo(map.value as Map);

    if (props.showMarker) {
      marker.value = L.marker(props.position).addTo(map.value as Map);
    }
  };

  // 更新地图位置
  const updatePosition = (newPosition: [number, number]) => {
    if (map.value) {
      map.value.setView(newPosition, map.value.getZoom());
      if (marker.value) {
        marker.value.setLatLng(newPosition);
      } else if (props.showMarker) {
        marker.value = L.marker(newPosition).addTo(map.value as Map);
      }
    }
  };

  // 切换标记显示状态
  const toggleMarker = (show: boolean) => {
    if (!map.value) return;

    if (show && !marker.value) {
      marker.value = L.marker(props.position).addTo(map.value as Map);
    } else if (!show && marker.value) {
      marker.value.removeFrom(map.value as Map);
      marker.value = null;
    }
  };

  // 组件挂载时初始化地图
  onMounted(() => {
    initMap();
  });

  // 监听 props 变化
  watch(
    () => props.position,
    (newVal) => {
      updatePosition(newVal);
    }
  );

  watch(
    () => props.showMarker,
    (newVal) => {
      toggleMarker(newVal);
    }
  );

  watch(
    () => props.zoom,
    (newVal) => {
      if (map.value) {
        map.value.setZoom(newVal);
      }
    }
  );

  // 组件卸载时清理
  onUnmounted(() => {
    if (map.value) {
      map.value.remove();
      map.value = null;
    }
  });
</script>

<style lang="scss" scoped>
  .leaflet-map {
    margin: 0 auto;
    border: 1px solid #ddd;
    border-radius: 4px;
    overflow: hidden;
    background-color: #f8f8f8;
  }
</style>
