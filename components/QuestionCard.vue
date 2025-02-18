<template>
    <div class="question-card stroke-neutral-600">
        <div class="question-header ">
            <h2>{{ question.text }}</h2>
            <div class="question-type-indicator">{{ questionTypeLabel }}</div>
        </div>

        <!-- Multiple Choice Question -->
        <div v-if="question.type === 'multiple-choice'" class="options-container">
            <button v-for="(option, index) in question.options" :key="index" class="option-button"
                :class="{ selected: localAnswer === option }" @click="localAnswer = option">
                {{ option }}
            </button>
        </div>

        <!-- Multiple Select Question -->
        <div v-if="question.type === 'multiple-select'" class="options-container">
            <button v-for="(option, index) in question.options" :key="index" class="option-button"
                :class="{ selected: localAnswer.includes(option) }" @click="toggleMultiSelect(option)">
                {{ option }}
            </button>
        </div>

        <!-- Range Question -->
        <div v-if="question.type === 'range'" class="range-container">
            <input type="range" v-model="localAnswer" :min="question.min" :max="question.max" :step="question.step"
                class="range-slider" />
            <div class="range-value">{{ localAnswer }}</div>
        </div>

        <!-- Descriptive Question -->
        <div v-if="question.type === 'descriptive'" class="descriptive-container">
            <textarea v-model="localAnswer" :maxlength="question.maxLength" class="descriptive-input"
                placeholder="Type your answer here..."></textarea>
            <div class="char-counter">
                {{ localAnswer.length }}/{{ question.maxLength }}
            </div>
        </div>

        <button class="save-button" @click="saveAnswer" :disabled="isAnswerUnchanged">
            {{ saveButtonText }}
        </button>
    </div>
</template>

<script setup>
import { ref, computed, watchEffect } from 'vue';
import { useQuestionnaireStore } from '@/stores/questionnaire';

const props = defineProps({
    question: {
        type: Object,
        required: true
    },
    industry: {
        type: String,
        required: true
    }
});

const store = useQuestionnaireStore();
const localAnswer = ref(initializeAnswer());

// Initialize answer based on question type
function initializeAnswer() {
    if (props.question.type === 'multiple-select') {
        return Array.isArray(props.question.answer)
            ? [...props.question.answer]
            : [];
    }
    return props.question.answer?.trim() || '';
}

// Toggle options for multiple select
function toggleMultiSelect(option) {
    const index = localAnswer.value.indexOf(option);
    if (index === -1) {
        localAnswer.value.push(option);
    } else {
        localAnswer.value.splice(index, 1);
    }
}

// Save answer to store
function saveAnswer() {
    if (hasValidAnswer()) {
        store.updateAnswer(
            props.industry,
            props.question.id,
            props.question.type === 'multiple-select'
                ? [...localAnswer.value]
                : localAnswer.value
        );
    }
}

// Check if answer is valid
function hasValidAnswer() {
    if (props.question.type === 'multiple-select') {
        return localAnswer.value.length > 0;
    }
    return localAnswer.value.toString().trim() !== '';
}

// Computed properties
const questionTypeLabel = computed(() => {
    const labels = {
        'multiple-choice': 'Select one option',
        'multiple-select': 'Select multiple options',
        range: 'Slide to select value',
        descriptive: 'Type your answer'
    };
    return labels[props.question.type];
});

const isAnswerUnchanged = computed(() => {
    const currentAnswer = props.question.answer;
    if (props.question.type === 'multiple-select') {
        return (
            localAnswer.value.length === currentAnswer.length &&
            localAnswer.value.every(val => currentAnswer.includes(val))
        );
    }
    return localAnswer.value === currentAnswer;
});

const saveButtonText = computed(() => {
    return isAnswerUnchanged.value ? 'Saved' : 'Save Answer';
});
</script>

<style scoped>
.question-card {
    padding: 2rem;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    margin-bottom: 2rem;
    background: #32a897;
}

.question-header {
    margin-bottom: 1.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.question-type-indicator {
    font-size: 0.9rem;
    color: #666;
    font-style: italic;
}

.options-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    margin-bottom: 1.5rem;
}

.option-button {
    padding: 1rem;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    background: #666;
    cursor: pointer;
    transition: all 0.2s;
}

.option-button:hover {
    background: #32a897;
}

.option-button.selected {
    background: #2196f3;
    color: white;
    border-color: #2196f3;
}

.range-container {
    margin: 2rem 0;
}

.range-slider {
    width: 100%;
    margin: 1rem 0;
}

.range-value {
    font-size: 1.2rem;
    text-align: center;
    font-weight: bold;
    color: #2196f3;
}

.descriptive-container {
    margin: 1rem 0;
}

.descriptive-input {
    width: 100%;
    min-height: 150px;
    padding: 1rem;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    font-family: inherit;
    background: #32a897;
}

.char-counter {
    text-align: right;
    font-size: 0.9rem;
    color: #666;
    margin-top: 0.5rem;
}

.save-button {
    display: block;
    margin: 1.5rem auto 0;
    padding: 0.8rem 2rem;
    background: #4caf50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background 0.2s;
}

.save-button:disabled {
    background: #a5d6a7;
    cursor: not-allowed;
}

.save-button:not(:disabled):hover {
    background: #45a049;
}
</style>