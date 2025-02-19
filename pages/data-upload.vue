<template>
    <transition name="page-transition">
        <div
            class="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-purple-950 text-gray-100 flex items-center justify-center p-4">
            <div class="w-full max-w-5xl relative z-10">
                <!-- Animated background elements -->
                <div class="absolute -inset-4 opacity-20">
                    <div
                        class="absolute inset-0 bg-gradient-to-r from-cyan-500/15 to-purple-500/15 blur-3xl animate-float">
                    </div>
                </div>

                <!-- Main card -->
                <div
                    class="bg-gray-900/80 backdrop-blur-2xl rounded-3xl border border-gray-700 p-8 shadow-2xl shadow-black/40 animate__animated animate__fadeInDown">
                    <div class="text-center mb-8">
                        <div class="relative inline-block">
                            <Icon name="ion:cloud-upload" class="text-cyan-400 text-4xl mb-4 animate-pulse" />
                            <div class="absolute inset-0 bg-cyan-400/10 blur-2xl rounded-full"></div>
                        </div>
                        <h2
                            class="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 mb-2">
                            Financial Data Hub
                        </h2>
                        <p class="text-gray-400">Upload and analyze specific financial documents</p>
                    </div>

                    <!-- Category Tabs -->
                    <div class="flex gap-2 mb-8 overflow-x-auto pb-2">
                        <button v-for="category in categories" :key="category.id" @click="activeCategory = category.id"
                            class="px-4 py-2 rounded-xl transition-colors flex items-center gap-2 text-sm" :class="activeCategory === category.id
                                ? 'bg-cyan-600 text-white'
                                : 'bg-gray-800 hover:bg-gray-700'">
                            <Icon :name="category.icon" class="text-lg" />
                            {{ category.name }} ({{ filesByCategory[category.id]?.length || 0 }})
                        </button>
                    </div>

                    <!-- Category Content -->
                    <div v-for="category in categories" :key="category.id">
                        <div v-if="activeCategory === category.id" class="space-y-6">
                            <!-- Upload Section -->
                            <div @dragover.prevent="isDragging = true" @dragleave.prevent="isDragging = false"
                                @drop.prevent="handleDrop($event, category.id)"
                                class="border-2 border-dashed border-gray-600 rounded-2xl p-6 text-center transition-all"
                                :class="isDragging ? 'border-cyan-400 bg-gray-800/50 scale-[1.02]' : 'hover:border-gray-500'">
                                <Icon name="ion:document-attach" class="text-cyan-400 text-4xl mx-auto mb-4" />
                                <p class="text-gray-300 mb-4">{{ category.description }}</p>
                                <input type="file" multiple @change="(e) => handleFileUpload(e, category.id)"
                                    class="hidden" :ref="`fileInput-${category.id}`" accept=".csv,.xlsx,.pdf,.txt">
                                <button @click="$refs[`fileInput-${category.id}`][0].click()"
                                    class="bg-gray-800/70 hover:bg-gray-700/50 border border-gray-600 px-6 py-2 rounded-xl transition-all">
                                    Browse Files
                                </button>
                                <p class="text-sm text-gray-500 mt-3">Supported formats: CSV, XLSX, PDF, TXT</p>
                            </div>

                            <!-- Uploaded Files -->
                            <div v-if="filesByCategory[category.id]?.length" class="space-y-4">
                                <div v-for="(file, index) in filesByCategory[category.id]" :key="index"
                                    class="bg-gray-800/50 border border-gray-700 rounded-xl p-4 flex items-center justify-between animate__animated animate__fadeIn">
                                    <div class="flex items-center gap-4">
                                        <Icon name="ion:document-text" class="text-purple-400 text-xl shrink-0" />
                                        <div>
                                            <p class="font-medium">{{ file.name }}</p>
                                            <p class="text-sm text-gray-400">{{ formatFileSize(file.size) }}</p>
                                        </div>
                                    </div>
                                    <button @click="handleRemoveFile(category.id, index)"
                                        class="text-red-400 hover:text-red-300 transition-colors flex items-center gap-1">
                                        <Icon name="ion:close-circle" class="text-xl" />
                                        Remove
                                    </button>
                                </div>
                            </div>

                            <!-- Category Analysis Dashboard -->
                            <div class="space-y-6 mt-8 animate__animated animate__fadeIn">
                                <!-- Stats Overview -->
                                <div class="grid md:grid-cols-3 gap-4">
                                    <div class="bg-gray-800/50 border border-cyan-400/20 rounded-xl p-4">
                                        <div class="flex items-center justify-between">
                                            <div>
                                                <p class="text-gray-400 text-sm">Category Files</p>
                                                <p class="text-2xl font-bold text-cyan-400">{{
                                                    totalFilesForCategory(category.id) }}</p>
                                            </div>
                                            <Icon name="ion:documents" class="text-cyan-400 text-3xl" />
                                        </div>
                                    </div>

                                    <div class="bg-gray-800/50 border border-purple-400/20 rounded-xl p-4">
                                        <div class="flex items-center justify-between">
                                            <div>
                                                <p class="text-gray-400 text-sm">Category Data</p>
                                                <p class="text-2xl font-bold text-purple-400">{{
                                                    formatFileSize(totalSizeForCategory(category.id)) }}</p>
                                            </div>
                                            <Icon name="ion:server" class="text-purple-400 text-3xl" />
                                        </div>
                                    </div>

                                    <div class="bg-gray-800/50 border border-cyan-400/20 rounded-xl p-4">
                                        <div class="flex items-center justify-between">
                                            <div>
                                                <p class="text-gray-400 text-sm">Avg. File Size</p>
                                                <p class="text-2xl font-bold text-cyan-400">{{
                                                    formatFileSize(averageSizeForCategory(category.id)) }}</p>
                                            </div>
                                            <Icon name="ion:stats-chart" class="text-cyan-400 text-3xl" />
                                        </div>
                                    </div>
                                </div>

                                <!-- Global Storage Allocation -->
                                <div class="bg-gray-800/50 border border-cyan-400/20 rounded-xl p-4">
                                    <h3 class="font-semibold mb-4 flex items-center gap-2">
                                        <Icon name="ion:analytics" class="text-cyan-400" />
                                        Total Storage Allocation
                                    </h3>
                                    <div class="relative w-32 h-32 mx-auto">
                                        <svg class="w-full h-full" viewBox="0 0 100 100">
                                            <circle cx="50" cy="50" r="45" class="fill-none stroke-gray-700"
                                                stroke-width="10" />
                                            <circle cx="50" cy="50" r="45" class="fill-none stroke-cyan-400"
                                                stroke-width="10" :stroke-dasharray="`${storageUsedPercent} 283`"
                                                transform="rotate(-90 50 50)" />
                                        </svg>
                                        <div class="absolute inset-0 flex items-center justify-center">
                                            <span class="text-2xl font-bold">{{ storageUsedPercent }}%</span>
                                        </div>
                                    </div>
                                    <p class="text-center mt-4 text-gray-400">
                                        {{ formatFileSize(totalSize) }} of {{ formatFileSize(storageLimit) }} used
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Recent Activity -->
                    <div class="bg-gray-800/50 border border-purple-400/20 rounded-xl p-4 mt-8">
                        <h3 class="font-semibold mb-4 flex items-center gap-2">
                            <Icon name="ion:time" class="text-purple-400" />
                            Recent Activity
                        </h3>
                        <div class="space-y-3">
                            <div v-for="(activity, index) in recentActivities" :key="index"
                                class="flex items-center gap-3 p-2 hover:bg-gray-700/20 rounded-lg transition-colors">
                                <Icon :name="activity.icon" class="text-xl shrink-0" :class="activity.color" />
                                <div class="flex-1">
                                    <p class="text-sm">{{ activity.description }}</p>
                                    <p class="text-xs text-gray-400">{{ activity.timestamp }}</p>
                                </div>
                            </div>
                            <div v-if="!recentActivities.length" class="text-center text-gray-500 py-4">
                                No recent activity
                            </div>
                        </div>
                    </div>

                    <!-- Process Button -->
                    <button :disabled="totalFiles === 0"
                        class="w-full bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-gray-100 py-4 rounded-xl font-semibold transition-all transform hover:scale-[1.02] shadow-xl hover:shadow-cyan-400/20 relative overflow-hidden group disabled:opacity-50 disabled:pointer-events-none mt-8">
                        <span class="relative z-10">Analyze All Documents</span>
                        <div
                            class="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                        </div>
                    </button>
                </div>
            </div>

            <!-- Floating particles -->
            <div class="absolute inset-0 pointer-events-none z-0">
                <div v-for="i in 30" :key="i" class="absolute w-1 h-1 rounded-full"
                    :class="Math.random() > 0.5 ? 'bg-cyan-400/20 ' : 'bg-purple-400/20'" :style="{
                        top: Math.random() * 100 + '%',
                        left: Math.random() * 100 + '%',
                        animation: `float ${10 + Math.random() * 10}s infinite`
                    }">
                </div>
            </div>
        </div>
    </transition>
</template>

<script setup>
import { ref, computed } from 'vue';

const categories = ref([
    {
        id: 'income-statements',
        name: 'Income Statements (P&L)',
        icon: 'ion:trending-up',
        description: 'Upload your Profit & Loss statements'
    },
    {
        id: 'balance-sheet',
        name: 'Balance Sheet',
        icon: 'ion:wallet',
        description: 'Upload company balance sheets'
    },
    {
        id: 'cash-flow',
        name: 'Cash Flow',
        icon: 'ion:cash',
        description: 'Upload cash flow statements'
    },
    {
        id: 'payroll',
        name: 'Payroll',
        icon: ' ion:people',
        description: 'Upload payroll documents'
    },
    {
        id: 'Expense Reports',
        name: 'Expense Reports',
        icon: ' ion:people',
        description: 'Upload Expense Reports'
    },
    {
        id: 'Supplier/Vendor Contracts',
        name: 'Supplier/Vendor Contracts',
        icon: ' ion:people',
        description: 'Upload Contract terms,payment terms '
    },
    {
        id: 'Inventory Reports',
        name: 'Inventory Reports',
        icon: ' ion:people',
        description: '- Current inventory levels,Turnover rates,Holding costs,Obsolescence rates'
    },
]);

const activeCategory = ref(categories.value[0].id);
const filesByCategory = ref({});
const isDragging = ref(false);
const recentActivities = ref([]);
const storageLimit = 100 * 1024 * 1024; // 100 MB
const totalSize = ref(0);

categories.value.forEach(cat => {
    filesByCategory.value[cat.id] = [];
});

const handleFileUpload = (event, categoryId) => {
    const files = Array.from(event.target.files);
    files.forEach(file => {
        filesByCategory.value[categoryId].push(file);
        totalSize.value += file.size;
        recentActivities.value.push({
            description: `Uploaded ${file.name} to ${categoryId}`,
            timestamp: new Date().toLocaleString(),
            icon: 'ion:cloud-upload',
            color: 'text-cyan-400'
        });
    });
};

const handleDrop = (event, categoryId) => {
    const files = Array.from(event.dataTransfer.files);
    files.forEach(file => {
        filesByCategory.value[categoryId].push(file);
        totalSize.value += file.size;
        recentActivities.value.push({
            description: `Uploaded ${file.name} to ${categoryId}`,
            timestamp: new Date().toLocaleString(),
            icon: 'ion:cloud-upload',
            color: 'text-cyan-400'
        });
    });
    isDragging.value = false;
};

const handleRemoveFile = (categoryId, index) => {
    const file = filesByCategory.value[categoryId][index];
    totalSize.value -= file.size;
    filesByCategory.value[categoryId].splice(index, 1);
    recentActivities.value.push({
        description: `Removed ${file.name} from ${categoryId}`,
        timestamp: new Date().toLocaleString(),
        icon: 'ion:close-circle',
        color: 'text-red-400'
    });
};

const totalFilesForCategory = (categoryId) => filesByCategory.value[categoryId].length;
const totalSizeForCategory = (categoryId) => filesByCategory.value[categoryId].reduce((acc, file) => acc + file.size, 0);
const averageSizeForCategory = (categoryId) => {
    const files = filesByCategory.value[categoryId];
    return files.length ? totalSizeForCategory(categoryId) / files.length : 0;
};

const formatFileSize = (size) => {
    const units = ['B', 'KB', 'MB', 'GB'];
    let index = 0;
    while (size >= 1024 && index < units.length - 1) {
        size /= 1024;
        index++;
    }
    return `${size.toFixed(2)} ${units[index]}`;
};

const storageUsedPercent = computed(() => (totalSize.value / storageLimit) * 100);
const totalFiles = computed(() => Object.values(filesByCategory.value).flat().length);
</script>

<style scoped>
.page-transition-enter-active,
.page-transition-leave-active {
    transition: opacity 0.5s;
}

.page-transition-enter,
.page-transition-leave-to {
    opacity: 0;
}
</style>