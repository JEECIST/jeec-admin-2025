<template>
  <div class="wheel-container">
    <h2 class="wheel-title">🎡 Spin the Wheel!</h2>
    <div class="pointer">▼</div>
    <svg
      :width="size"
      :height="size"
      viewBox="0 0 400 400"
      class="wheel"
      :style="{ transform: `rotate(${rotation}deg)` }"
    >
      <g transform="translate(200,200)">
        <template v-for="(p) in segments" :key="p.id">
          <path
            :d="p.path"
            :fill="p.bgColor"
            stroke="#2c3e50"
            stroke-width="2"
          />
          <text
            :transform="p.textTransform"
            text-anchor="middle"
            alignment-baseline="middle"
            fill="white"
            font-size="13"
            font-weight="600"
          >
            {{ p.name }}
          </text>
        </template>
      </g>
    </svg>

    <button class="spin-btn" @click="spinWheel" :disabled="spinning">
      {{ spinning ? "Spinning..." : "Spin that Wheel..." }}
    </button>

    <p v-if="winner" class="winner-text">
      🎉 Winner: <strong>{{ winner.name }}</strong> 🎉
      <span class="check-btn" @click="emit('save-winner', winner)">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="12" fill="#2ecc71"/>
          <path d="M7 12.5l3 3 7-7" stroke="#fff" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </span>
    </p>

  </div>
</template>

<script setup>
import { ref, computed, defineEmits } from "vue";

const emit = defineEmits(["winner"]);

const props = defineProps({
  participants: Array,
  size: { type: Number, default: 400 },
});

const rotation = ref(0);
const spinning = ref(false);
const winner = ref(null);

const colors = [
  "#3498db",
  "#9b59b6",
  "#e67e22",
  "#16a085",
  "#f39c12",
  "#1abc9c",
  "#e74c3c",
  "#8e44ad",
  "#2ecc71",
  "#d35400",
];

// ========== SEGMENTOS ==========
const segments = computed(() => {
  if (!props.participants?.length) return [];
  const radius = 200;
  let currentAngle = 0;
  const totalWeight = props.participants.reduce(
    (sum, p) => sum + Number(p.win_chance.replace("%", "")) || 0,
    0
  );

  return props.participants.map((p, i) => {
    const weight = Number(p.win_chance.replace("%", "")) || 0;
    const portion = weight / totalWeight;
    const angle = portion * 360;
    const startAngle = currentAngle;
    const endAngle = currentAngle + angle;
    currentAngle += angle;

    const x1 = radius * Math.cos((Math.PI * startAngle) / 180);
    const y1 = radius * Math.sin((Math.PI * startAngle) / 180);
    const x2 = radius * Math.cos((Math.PI * endAngle) / 180);
    const y2 = radius * Math.sin((Math.PI * endAngle) / 180);
    const path = `M 0 0 L ${x1} ${y1} A ${radius} ${radius} 0 ${angle > 180 ? 1 : 0} 1 ${x2} ${y2} Z`;
    const midAngle = (startAngle + endAngle) / 2;
    const textTransform = `rotate(${midAngle}) translate(${radius * 0.6},0)`;

    return { ...p, id: p.id ?? i, name: p.name, weight, path, midAngle, bgColor: colors[i % colors.length], textTransform };
  });
});

// ========== ESCOLHER VENCEDOR ==========
function pickWeightedWinner() {
  const total = segments.value.reduce((sum, s) => sum + s.weight, 0);
  const rand = Math.random() * total;
  let cumulative = 0;
  for (const s of segments.value) {
    cumulative += s.weight;
    if (rand <= cumulative) return s;
  }
  return segments.value[segments.value.length - 1];
}

// ========== ANIMAÇÃO ==========
function spinWheel() {
  if (spinning.value || !segments.value.length) return;

  spinning.value = true;
  winner.value = null;

  const chosen = pickWeightedWinner();

  const stopRotation =
    360 * 8 + (360 - (chosen.midAngle + 90)) % 360;

  rotation.value = stopRotation;

  setTimeout(() => {
    spinning.value = false;
    winner.value = chosen;
    emit("winner", chosen);
  }, 4500);
}
</script>

<style scoped>
.wheel-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  position: relative;
  text-align: center;
}

.wheel-title {
  font-size: 1.5rem;
  font-weight: 700;
}

.pointer {
  position: absolute;
  top: 25px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 40px;
  color: red;
  z-index: 10;
}

.wheel {
  border-radius: 50%;
  border: 5px solid #2c3e50;
  transition: transform 4.5s cubic-bezier(0.33, 1, 0.68, 1);
}

.spin-btn {
  background: var(--c-select);
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  padding: 0.8rem 1.6rem;
  cursor: pointer;
  transition: background 0.3s;
}

.spin-btn:hover:not(:disabled) {
  background: #0056b3;
}

.spin-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.winner-text {
  margin-top: 1rem;
  font-size: 1.2rem;
  font-weight: 600;
  color: #2c3e50;
}

.check-btn {
  margin-left: 12px;
  cursor: pointer;
  vertical-align: middle;
  background: transparent;
  outline: none;
  border: none;
  padding: 0;
  transition: filter 0.2s;
}

.check-btn svg circle {
  fill: var(--c-select);
  transition: fill 0.2s;
}

.check-btn:hover svg circle,
.check-btn:focus svg circle {
  fill: #0056b3;
  filter: brightness(1.2);
}
</style>
