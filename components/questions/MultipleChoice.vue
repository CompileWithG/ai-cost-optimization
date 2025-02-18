<template>
    <div class="question">
        <h3>{{ question.text }}</h3>
        <div class="options">
            <button v-for="(option, index) in question.options" :key="index" @click="selectOption(option)">
                {{ option }}
            </button>
        </div>
    </div>
</template>

<script setup>
const props = defineProps(['question'])

const emit = defineEmits(['answer'])

const selectOption = (option) => {
    emit('answer', option)
}
</script>