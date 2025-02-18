<template>
    <div
        class="min-h-screen bg-gradient-to-br from-navy-900 via-violet-900 to-purple-900 text-white overflow-x-hidden bg-slate-950">
        <!-- Animated Background Elements -->
        <div class="absolute inset-0 opacity-20">
            <div class="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(12,24,41,0.4)_0%,transparent_60%)]">
            </div>
            <div class="animate-float absolute top-1/4 left-1/4 w-48 h-48 bg-violet-800/30 rounded-full blur-3xl"></div>
            <div
                class="animate-float-delayed absolute top-1/3 right-1/4 w-64 h-64 bg-navy-800/30 rounded-full blur-3xl">
            </div>
        </div>

        <!-- Hero Section -->
        <div class="container mx-auto px-4 py-20 flex flex-col items-center justify-center min-h-screen relative z-10">
            <div class="text-center max-w-4xl">
                <h1 class="text-7xl font-bold mb-6 animate__animated animate__fadeInDown">
                    <span class="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-indigo-400">
                        Optimize Your Business Costs with AI
                    </span>
                </h1>

                <p class="text-xl text-gray-400 mb-8 animate__animated animate__fadeIn animate__delay-1s">
                    Transform your financial strategy with intelligent cost analysis and predictive optimization
                </p>

                <div class="animate__animated animate__fadeIn animate__delay-2s">
                    <template v-if="!userStore1.isLoggedIn">
                        <nuxt-link to="/signin"
                            class="bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-600 hover:to-indigo-700 text-white px-10 py-5 rounded-2xl text-xl font-bold transition-all transform hover:scale-[1.02] shadow-2xl hover:shadow-3xl flex items-center gap-3 mx-auto">
                            <Icon name="ion:rocket" class="text-2xl" />
                            <span>Get Started Free</span>
                        </nuxt-link>
                        <div class="mt-6 text-gray-400">
                            Trusted by 5000+ businesses worldwide.
                            <nuxt-link to="/signup" class="text-cyan-400 hover:underline font-medium">Explore enterprise
                                solutions</nuxt-link>
                        </div>
                    </template>
                    <template v-else>
                        <nuxt-link to="/questionnaire"
                            class="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white px-10 py-5 rounded-2xl text-xl font-bold transition-all transform hover:scale-[1.02] shadow-2xl hover:shadow-3xl flex items-center gap-3 mx-auto">
                            <Icon name="ion:analytics" class="text-2xl" />
                            <span>Launch Dashboard</span>
                        </nuxt-link>
                    </template>
                </div>
            </div>

            <!-- Feature Grid -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 w-full">
                <div v-for="(feature, index) in features" :key="index"
                    class="bg-white/5 backdrop-blur-xl p-8 rounded-3xl border border-white/10 hover:border-cyan-400/30 transition-all animate__animated animate__fadeInUp group hover:shadow-2xl"
                    :class="`animate__delay-${index + 3}s`">
                    <div class="text-cyan-400 text-5xl mb-6 transition-transform group-hover:scale-110">
                        <Icon :name="feature.icon" />
                    </div>
                    <h3 class="text-2xl font-bold mb-4 text-green-300">{{ feature.title }}</h3>
                    <p class="text-gray-500 leading-relaxed">{{ feature.description }}</p>
                </div>
            </div>

            <!-- Data Visualization Preview -->
            <div class="mt-20 w-full max-w-7xl relative animate__animated animate__fadeIn animate__delay-5s">
                <div class="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 blur-3xl opacity-30">
                </div>
                <div class="relative bg-gray-900/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/10">
                    <div class="flex items-center justify-between mb-8">
                        <div class="flex items-center gap-4">
                            <div class="w-3 h-3 rounded-full bg-red-500"></div>
                            <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
                            <div class="w-3 h-3 rounded-full bg-green-500"></div>
                            <span class="text-gray-400 text-lg font-medium">Live Demo Analysis</span>
                        </div>
                        <Icon name="ion:expand" class="text-gray-400 text-xl hover:text-white cursor-pointer" />
                    </div>
                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div class="space-y-6">
                            <div class="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl">
                                <div class="flex items-center gap-4 mb-4">
                                    <Icon name="ion:trending-up" class="text-cyan-400 text-3xl" />
                                    <h4 class="text-xl font-semibold">Expense Breakdown</h4>
                                </div>
                                <div class="h-48 bg-gray-700/50 rounded-lg animate-pulse"></div>
                            </div>
                            <div class="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl">
                                <div class="flex items-center gap-4 mb-4">
                                    <Icon name="ion:wallet" class="text-purple-400 text-3xl" />
                                    <h4 class="text-xl font-semibold">Savings Potential</h4>
                                </div>
                                <div class="h-32 bg-gray-700/50 rounded-lg animate-pulse"></div>
                            </div>
                        </div>
                        <div class="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl">
                            <div class="flex items-center gap-4 mb-4">
                                <Icon name="ion:pie-chart" class="text-emerald-400 text-3xl" />
                                <h4 class="text-xl font-semibold">Cost Distribution</h4>
                            </div>
                            <div class="h-80 bg-gray-700/50 rounded-lg animate-pulse"></div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Benefits Section -->
            <div class="mt-20 w-full max-w-6xl">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div class="space-y-8 animate__animated animate__fadeInLeft">
                        <div class="flex items-center gap-4">
                            <div class="p-4 bg-cyan-500/10 rounded-2xl">
                                <Icon name="ion:shield-checkmark" class="text-cyan-400 text-3xl" />
                            </div>
                            <h3 class="text-2xl font-bold">Enterprise-Grade Security</h3>
                        </div>
                        <p class="text-gray-400 leading-relaxed">
                            Bank-level encryption and GDPR compliance ensure your financial data remains completely
                            secure.
                        </p>
                    </div>

                    <div class="space-y-8 animate__animated animate__fadeInRight">
                        <div class="flex items-center gap-4">
                            <div class="p-4 bg-purple-500/10 rounded-2xl">
                                <Icon name="ion:sync" class="text-purple-400 text-3xl" />
                            </div>
                            <h3 class="text-2xl font-bold">Real-Time Analytics</h3>
                        </div>
                        <p class="text-gray-400 leading-relaxed">
                            Monitor cost-saving opportunities as they emerge with our live dashboard and instant alerts.
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Floating Particles -->
        <div class="absolute inset-0 pointer-events-none z-0">
            <div v-for="i in 40" :key="i" class="absolute w-1 h-1 bg-white/20 rounded-full" :style="{
                top: Math.random() * 100 + '%',
                left: Math.random() * 100 + '%',
                animation: `float ${8 + Math.random() * 8}s infinite`
            }"></div>
        </div>
    </div>
</template>

<script setup>
import { userStore } from '@/stores/user';

const userStore1 = userStore();

const features = [
    {
        icon: 'ion:analytics',
        title: 'Smart Expense Analysis',
        description: 'Deep learning algorithms identify hidden patterns in your financial data'
    },
    {
        icon: 'ion:cloud-upload',
        title: 'Multi-Format Support',
        description: 'Direct CSV/Excel/JSON processing with automatic data validation'
    },
    {
        icon: 'ion:git-network',
        title: 'Supplier Network',
        description: 'Access our global database of cost-efficient suppliers'
    }
];
</script>

<style scoped>
@import 'animate.css';

.animate-float {
    animation: float 8s ease-in-out infinite;
}

.animate-float-delayed {
    animation: float 10s ease-in-out infinite;
    animation-delay: 2s;
}

@keyframes float {

    0%,
    100% {
        transform: translate(0, 0) rotate(0deg);
    }

    25% {
        transform: translate(10px, -20px) rotate(5deg);
    }

    50% {
        transform: translate(-10px, 20px) rotate(-5deg);
    }

    75% {
        transform: translate(15px, -10px) rotate(3deg);
    }
}

.bg-gradient-radial {
    background: radial-gradient(circle at 50% 50%, rgba(16, 24, 40, 0.3) 0%, transparent 60%);
}
</style>