<template>
    <div
        class="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-purple-900 text-white relative overflow-hidden">
        <!-- Floating Particles -->
        <div class="absolute inset-0 pointer-events-none z-0">
            <div v-for="i in 40" :key="i" class="absolute w-1 h-1 bg-white/20 rounded-full" :style="{
                top: Math.random() * 100 + '%',
                left: Math.random() * 100 + '%',
                animation: `float ${8 + Math.random() * 8}s infinite`
            }"></div>
        </div>

        <!-- Proceed Button -->
        <div v-if="selectedIndustry" class="fixed top-4 right-4 z-50 animate__animated animate__fadeInRight">
            <NuxtLink to="/data-upload"
                class="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white px-6 py-3 rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 font-semibold flex items-center gap-2 group">
                <span @click="handleProceed">Proceed</span>
                <Icon name="ion:arrow-forward" class="text-xl group-hover:translate-x-1 transition-transform" />
            </NuxtLink>
        </div>

        <div class="container mx-auto px-4 py-12 relative z-10">
            <!-- Initial Business Type Question -->
            <div v-if="!selectedIndustry" class="animate__animated animate__fadeInDown">
                <div
                    class="max-w-4xl mx-auto bg-gray-800/50 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/10">
                    <div class="text-center mb-10">
                        <h2
                            class="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400">
                            Optimize Your Business
                        </h2>
                        <p class="text-xl text-gray-300 max-w-2xl mx-auto">
                            Select your industry to unlock personalized cost-saving strategies
                        </p>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <button v-for="industry in industries" :key="industry.value"
                            @click="selectIndustry(industry.value)"
                            class="p-8 text-lg font-semibold rounded-2xl transition-all duration-300 transform hover:scale-[1.02] group flex flex-col items-center relative overflow-hidden"
                            :class="[
                                selectedIndustry === industry.value
                                    ? 'bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border-2 border-cyan-400/50 shadow-2xl'
                                    : 'bg-gray-700/30 hover:bg-gray-700/50 border-2 border-white/10 hover:border-cyan-400/30'
                            ]">
                            <div class="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                            <Icon :name="industry.icon"
                                class="text-5xl mb-4 text-cyan-400 group-hover:text-purple-400 transition-colors z-10" />
                            <span class="z-10">{{ industry.label }}</span>
                            <div
                                class="absolute bottom-0 left-0 right-0 h-1 bg-cyan-400/50 transition-all duration-500 group-hover:h-full group-hover:bg-cyan-400/10">
                            </div>
                        </button>
                    </div>

                    <div class="mt-12 bg-gray-700/30 rounded-2xl p-6 border border-white/10">
                        <div class="flex items-center gap-4 mb-4">
                            <Icon name="ion:stats-chart" class="text-3xl text-cyan-400" />
                            <h3 class="text-xl font-semibold">Industry Insights</h3>
                        </div>
                        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div v-for="stat in industryStats" :key="stat.label"
                                class="p-4 rounded-xl bg-gray-600/20 border border-white/10">
                                <div class="text-cyan-400 text-2xl font-bold mb-2">{{ stat.value }}</div>
                                <div class="text-sm text-gray-400">{{ stat.label }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Industry-specific Questions -->
            <div v-else class="animate__animated animate__fadeInUp">
                <div class="max-w-7xl mx-auto flex gap-8">
                    <!-- Questions Section -->
                    <div class="flex-1">
                        <div class="mb-8 text-center">
                            <h2
                                class="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400">
                                {{ selectedIndustryLabel }} Optimization
                            </h2>
                            <p class="text-xl text-gray-300">We'll help you identify savings in 5 key areas</p>
                        </div>

                        <div class="space-y-6 max-h-[70vh] overflow-y-auto scroll-smooth pb-4 pr-2">
                            <QuestionCard v-for="(question, index) in industryQuestions" :key="question.id"
                                :question="question" :industry="selectedIndustry"
                                class="animate__animated animate__fadeIn" :class="`animate__delay-${index + 1}s`" />
                        </div>
                    </div>

                    <!-- Progress & Insights Sidebar -->
                    <div class="hidden lg:block w-80 shrink-0">
                        <div
                            class="bg-gray-800/50 backdrop-blur-xl rounded-2xl p-6 border border-white/10 sticky top-4">
                            <div class="flex items-center gap-3 mb-6">
                                <Icon name="ion:analytics" class="text-2xl text-cyan-400" />
                                <h3 class="text-lg font-semibold">Optimization Progress</h3>
                            </div>

                            <div class="space-y-6">
                                <div class="bg-gray-700/30 rounded-xl p-4">
                                    <div class="flex justify-between mb-2">
                                        <span class="text-sm text-gray-400">Completion</span>
                                        <span class="text-cyan-400 text-sm">25%</span>
                                    </div>
                                    <div class="h-2 bg-gray-600 rounded-full">
                                        <div
                                            class="h-full bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full w-1/4 transition-all duration-500">
                                        </div>
                                    </div>
                                </div>

                                <div
                                    class="bg-gradient-to-br from-gray-700/30 to-cyan-400/10 p-4 rounded-xl border border-cyan-400/20">
                                    <div class="flex items-center gap-3 mb-3">
                                        <Icon name="ion:bulb" class="text-2xl text-cyan-400" />
                                        <h4 class="font-semibold">Quick Tip</h4>
                                    </div>
                                    <p class="text-sm text-gray-400">
                                        {{ industryTips[selectedIndustry] }}
                                    </p>
                                </div>

                                <div class="bg-gray-700/30 rounded-xl p-4">
                                    <div class="flex items-center gap-3 mb-3">
                                        <Icon name="ion:time" class="text-2xl text-purple-400" />
                                        <h4 class="font-semibold">Estimated Savings</h4>
                                    </div>
                                    <div class="space-y-2">
                                        <div class="flex justify-between text-sm">
                                            <span class="text-gray-400">Potential Reduction</span>
                                            <span class="text-cyan-400">15-25%</span>
                                        </div>
                                        <div class="flex justify-between text-sm">
                                            <span class="text-gray-400">Time to Implement</span>
                                            <span class="text-purple-400">2-4 weeks</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useQuestionnaireStore } from '@/stores/questionnaire';
import QuestionCard from '@/components/QuestionCard.vue';

const store = useQuestionnaireStore();
const selectedIndustry = ref(null);

const industries = [
    { label: 'Logistics', value: 'logistics', icon: 'ion:car' },
    { label: 'SaaS', value: 'saas', icon: 'ion:cloud' },
    { label: 'E-commerce', value: 'ecommerce', icon: 'ion:cart' },
    { label: 'Manufacturing', value: 'manufacturing', icon: 'ion:construct' }
];

const industryStats = [
    { label: 'Average Savings', value: '22%' },
    { label: 'Businesses Helped', value: '1.2K+' },
    { label: 'Cost Areas Analyzed', value: '15+' },
    { label: 'AI Recommendations', value: '50K+' }
];

const industryTips = {
    logistics: "Optimize route planning and fuel consumption tracking for immediate savings",
    saas: "Right-size your cloud infrastructure based on usage patterns",
    ecommerce: "Reduce storage costs with inventory optimization",
    manufacturing: "Improve energy efficiency in production lines"
};

const selectedIndustryLabel = computed(() =>
    industries.find(i => i.value === selectedIndustry.value)?.label || ''
);

const industryQuestions = computed(() => {
    if (!selectedIndustry.value) return [];
    return store[selectedIndustry.value];
});

function selectIndustry(industry) {
    selectedIndustry.value = industry;
}
function handleProceed() {
    if (selectedIndustry.value) {
        // Save to localStorage before navigating
        store.saveQuestionnaireData(selectedIndustry.value);
    }
    navigateTo('/info');
}
</script>

<style scoped>
@import 'animate.css';

::-webkit-scrollbar {
    width: 8px;
}

::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 4px;
}

::-webkit-scrollbar-thumb {
    background: linear-gradient(to bottom, #06b6d4, #8b5cf6);
    border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(to bottom, #0891b2, #7c3aed);
}

@keyframes float {

    0%,
    100% {
        transform: translate(0, 0) rotate(0deg);
    }

    25% {
        transform: translate(5px, -10px) rotate(3deg);
    }

    50% {
        transform: translate(-5px, 10px) rotate(-3deg);
    }

    75% {
        transform: translate(8px, -5px) rotate(2deg);
    }
}

.scroll-smooth {
    scroll-behavior: smooth;
}
</style>