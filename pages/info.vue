<template>
    <div
        class="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-purple-950 text-gray-100 p-8 overflow-hidden">
        <!-- Animated grid background -->
        <div class="absolute inset-0 opacity-10 z-0">
            <div
                class="absolute inset-0 bg-grid-white/[0.05] [mask-image:linear-gradient(180deg,transparent,rgba(0,0,0,0.8))]">
            </div>
        </div>

        <div class="max-w-4xl mx-auto relative z-10">
            <!-- Animated background elements -->
            <div class="absolute -inset-4 opacity-20">
                <div class="absolute inset-0 bg-gradient-to-r from-cyan-500/15 to-purple-500/15 blur-3xl animate-float">
                </div>
            </div>

            <!-- Main content -->
            <div
                class="bg-gray-900/80 backdrop-blur-2xl rounded-3xl border border-gray-700 p-8 shadow-2xl shadow-black/40 relative overflow-hidden">
                <!-- Glowing orb decoration -->
                <div class="absolute -top-32 -right-32 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-pulse">
                </div>
                <div
                    class="absolute -bottom-32 -left-32 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000">
                </div>

                <!-- Header Section -->
                <div class="text-center mb-12 animate-fade-in">
                    <div class="relative inline-block transform hover:scale-105 transition-transform duration-300">
                        <div class="absolute inset-0 bg-purple-400/10 blur-2xl rounded-full animate-pulse"></div>
                        <Icon name="ion:rocket" class="text-purple-400 text-4xl mb-4 animate-float" />
                    </div>
                    <h1
                        class="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 mb-4">
                        <span class="inline-block animate-float">🚀</span> AI-Powered Business Optimization
                    </h1>
                    <p class="text-gray-300 text-lg font-light">
                        Upload your financial data to generate <span class="text-cyan-400 animate-pulse">actionable
                            insights</span> and
                        <span class="text-purple-400">personalized strategies</span>
                    </p>
                </div>

                <!-- Data Requirements Section -->
                <div class="space-y-8">
                    <!-- Introduction -->
                    <div class="animate-slide-up delay-100">
                        <div
                            class="bg-gray-800/50 p-6 rounded-2xl border border-cyan-400/20 relative group hover:border-purple-400/40 transition-all">
                            <div
                                class="absolute inset-0 bg-gradient-to-r from-cyan-400/5 to-purple-400/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl">
                            </div>
                            <h2 class="text-2xl font-semibold mb-4 flex items-center gap-2 text-cyan-400">
                                <Icon name="ion:analytics" class="text-2xl animate-spin-slow" />
                                Why Your Data Matters
                            </h2>
                            <p class="text-gray-300 leading-relaxed font-light">
                                Our AI cross-references <span class="text-purple-400">7 financial dimensions</span> to
                                create comprehensive optimization strategies.
                                Uploading these documents enables:
                            </p>
                            <ul class="mt-4 space-y-2 text-cyan-100">
                                <li v-for="(item, index) in benefits" :key="index"
                                    class="flex items-center gap-2 group-hover:translate-x-2 transition-transform">
                                    <Icon name="ion:sparkles" class="text-cyan-400 animate-pulse" />
                                    <span class="group-hover:text-cyan-300 transition-colors">{{ item }}</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <!-- Process Visualization -->
                    <div class="grid grid-cols-3 gap-4 text-center animate-slide-up delay-200">
                        <div v-for="(step, index) in processSteps" :key="index"
                            class="p-4 rounded-xl bg-gray-800/50 border border-cyan-400/20 relative">
                            <div
                                class="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-sm font-bold">
                                {{ index + 1 }}
                            </div>
                            <Icon :name="step.icon" class="text-3xl mb-2 mx-auto text-cyan-400 animate-bounce-slow" />
                            <p class="text-sm text-gray-300">{{ step.text }}</p>
                        </div>
                    </div>

                    <!-- Data Categories -->
                    <div class="grid gap-6 md:grid-cols-2">
                        <div v-for="(category, index) in dataCategories" :key="category.title" class="animate-slide-up"
                            :style="`animation-delay: ${index * 50 + 200}ms`">
                            <div class="h-full bg-gray-800/50 p-6 rounded-2xl border transition-all hover:border-purple-400/40 group"
                                :class="`border-${category.color}-400/20 hover:shadow-xl hover:shadow-${category.color}-400/10`">
                                <div class="flex items-center gap-3 mb-4 relative">
                                    <div
                                        class="absolute -inset-1 bg-gradient-to-r from-cyan-400/10 to-purple-400/10 blur opacity-0 group-hover:opacity-100 transition-opacity">
                                    </div>
                                    <div class="relative p-2 rounded-lg bg-gradient-to-br from-gray-700 to-gray-800">
                                        <Icon :name="category.icon" class="text-xl"
                                            :class="`text-${category.color}-400`" />
                                    </div>
                                    <h3 class="text-xl font-semibold" :class="`text-${category.color}-400`">
                                        {{ category.title }}
                                        <span class="text-sm text-gray-500 ml-2 font-normal">{{ category.format
                                            }}</span>
                                    </h3>
                                </div>
                                <div class="space-y-4">
                                    <div class="flex items-center gap-2 text-sm">
                                        <Icon name="ion:document-attach" class="text-gray-500 animate-bounce-slow" />
                                        <span class="font-mono text-gray-400">Sample Format:</span>
                                        <span class="px-2 py-1 bg-gray-700/50 rounded-md text-cyan-400 text-xs">{{
                                            category.format }}</span>
                                    </div>
                                    <div class="relative">
                                        <div
                                            class="absolute inset-0 bg-gradient-to-b from-cyan-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                                        </div>
                                        <p class="text-gray-300 text-sm mb-2 font-light">Key Data Points:</p>
                                        <ul class="space-y-1 text-gray-400 text-sm">
                                            <li v-for="(item, i) in category.contents" :key="i"
                                                class="flex items-start gap-2 group-hover:translate-x-1 transition-transform">
                                                <Icon name="ion:caret-forward"
                                                    class="text-cyan-400 mt-1 animate-pulse" />
                                                <span class="group-hover:text-cyan-100 transition-colors">{{ item
                                                    }}</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Proceed Button -->
                    <div class="animate-slide-up delay-500 text-center mt-12">
                        <NuxtLink to="/dashboard"
                            class="inline-flex items-center bg-gradient-to-r from-purple-600 to-cyan-600 px-8 py-4 rounded-xl font-semibold 
                     hover:scale-105 transition-transform shadow-2xl shadow-purple-500/30 relative overflow-hidden group">
                            <div
                                class="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-transparent to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity -rotate-45">
                            </div>
                            <Icon name="ion:rocket" class="text-xl mr-2 animate-bounce-slow" />
                            <span class="relative">
                                Launch Analysis Dashboard
                                <span
                                    class="absolute -bottom-1 left-0 w-full h-0.5 bg-cyan-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                            </span>
                        </NuxtLink>
                        <p class="text-gray-400 text-sm mt-4 animate-pulse-slow">
                            🔥 Ready to optimize? Let's unlock your savings potential!
                        </p>
                    </div>
                </div>
            </div>

            <!-- Floating particles -->
            <div class="absolute inset-0 pointer-events-none z-0">
                <div v-for="i in 60" :key="i" class="absolute w-1 h-1 rounded-full"
                    :class="Math.random() > 0.5 ? 'bg-cyan-400/20 ' : 'bg-purple-400/20'" :style="{
                        top: Math.random() * 100 + '%',
                        left: Math.random() * 100 + '%',
                        animation: `float ${10 + Math.random() * 15}s infinite ${Math.random() * 2}s`,
                        transform: `scale(${0.5 + Math.random() * 1.5})`
                    }">
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const dataCategories = [
    {
        title: 'Income Statement',
        icon: 'ion:bar-chart',
        color: 'cyan',
        format: 'CSV/XLSX',
        contents: [
            'Revenue streams analysis',
            'COGS breakdown',
            'Operating expenses',
            'Non-operating costs'
        ]
    },
    {
        title: 'Balance Sheet',
        icon: 'ion:balance-scale',
        color: 'purple',
        format: 'CSV/XLSX',
        contents: [
            'Asset portfolio',
            'Liability structure',
            'Equity composition',
            'Debt obligations'
        ]
    },
    {
        title: 'Cash Flow',
        icon: 'ion:cash',
        color: 'green',
        format: 'CSV/XLSX',
        contents: [
            'Operating activities',
            'Investment flows',
            'Financing movements',
            'Net cash position'
        ]
    },
    {
        title: 'Payroll Data',
        icon: 'ion:people-circle',
        color: 'pink',
        format: 'CSV/XLSX',
        contents: [
            'Salary structures',
            'Benefits packages',
            'Overtime patterns',
            'Contractor costs'
        ]
    },
    {
        title: 'Expense Reports',
        icon: 'ion:rece',
        color: 'orange',
        format: 'CSV/XLSX',
        contents: [
            'Detailed expense breakdown',
            'Recurring vs one-time costs',
            'Departmental spending',
            'Vendor payments'
        ]
    },
    {
        title: 'Supplier Contracts',
        icon: 'ion:document-text',
        color: 'blue',
        format: 'PDF/Word',
        contents: [
            'Pricing agreements',
            'Payment terms',
            'Service level agreements',
            'Historical performance'
        ]
    }
];

const benefits = [
    'Identify wasteful spending patterns',
    'Optimize supplier contracts and inventory',
    'Forecast future financial needs',
    'Create personalized savings strategies'
];

const processSteps = [
    { icon: 'ion:cloud-upload', text: 'Upload Your Data' },
    { icon: 'ion:analytics', text: 'AI Analysis' },
    { icon: 'ion:checkmark-circle', text: 'Receive Insights' }
];
</script>

<style>
@keyframes float {

    0%,
    100% {
        transform: translateY(0) rotate(0deg);
    }

    25% {
        transform: translateY(-20px) rotate(5deg);
    }

    50% {
        transform: translateY(0px) rotate(-5deg);
    }

    75% {
        transform: translateY(-10px) rotate(3deg);
    }
}

@keyframes bounce-slow {

    0%,
    100% {
        transform: translateY(0);
    }

    50% {
        transform: translateY(-5px);
    }
}

.animate-float {
    animation: float 20s ease-in-out infinite;
}

.animate-bounce-slow {
    animation: bounce-slow 1.5s ease-in-out infinite;
}

.animate-fade-in {
    animation: fadeIn 0.8s ease-out;
}

.animate-slide-up {
    animation: slideUp 0.6s ease-out forwards;
    opacity: 0;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes slideUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.delay-100 {
    animation-delay: 100ms;
}

.delay-200 {
    animation-delay: 200ms;
}

.delay-500 {
    animation-delay: 500ms;
}
</style>