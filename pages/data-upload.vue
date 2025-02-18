<template>
    <transition name="page-transition">
        <div
            class="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-purple-950 text-gray-100 flex items-center justify-center p-4">
            <div class="w-full max-w-3xl relative z-10">
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
                        <p class="text-gray-400">Upload and analyze your business documents</p>
                    </div>

                    <!-- Upload Section -->
                    <div class="space-y-6">
                        <div @dragover.prevent="isDragging = true" @dragleave.prevent="isDragging = false"
                            @drop.prevent="handleDrop"
                            class="border-2 border-dashed border-gray-600 rounded-2xl p-8 text-center transition-all"
                            :class="isDragging ? 'border-cyan-400 bg-gray-800/50 scale-[1.02]' : 'hover:border-gray-500'">
                            <Icon name="ion:document-attach" class="text-cyan-400 text-4xl mx-auto mb-4" />
                            <p class="text-gray-300 mb-4">Drag & drop files or</p>
                            <input type="file" multiple @change="handleFileUpload" class="hidden" ref="fileInput"
                                accept=".csv,.xlsx,.pdf,.txt">
                            <button @click="$refs.fileInput.click()"
                                class="bg-gray-800/70 hover:bg-gray-700/50 border border-gray-600 px-6 py-2 rounded-xl transition-all">
                                Browse Files
                            </button>
                            <p class="text-sm text-gray-500 mt-3">Supported formats: CSV, XLSX, PDF, TXT</p>
                        </div>

                        <!-- Uploaded Files -->
                        <div v-if="files.length" class="space-y-4">
                            <div v-for="(file, index) in files" :key="index"
                                class="bg-gray-800/50 border border-gray-700 rounded-xl p-4 flex items-center justify-between animate__animated animate__fadeIn">
                                <div class="flex items-center gap-4">
                                    <Icon name="ion:document-text" class="text-purple-400 text-xl shrink-0" />
                                    <div>
                                        <p class="font-medium">{{ file.name }}</p>
                                        <p class="text-sm text-gray-400">{{ formatFileSize(file.size) }}</p>
                                    </div>
                                </div>
                                <button @click="handleRemoveFile(index)"
                                    class="text-red-400 hover:text-red-300 transition-colors">
                                    <Icon name="ion:close-circle" class="text-xl" />
                                </button>
                            </div>
                        </div>

                        <!-- Analysis Dashboard -->
                        <div v-if="files.length" class="space-y-6 mt-8 animate__animated animate__fadeIn">
                            <!-- Stats Overview -->
                            <div class="grid md:grid-cols-3 gap-4">
                                <div class="bg-gray-800/50 border border-cyan-400/20 rounded-xl p-4">
                                    <div class="flex items-center justify-between">
                                        <div>
                                            <p class="text-gray-400 text-sm">Total Files</p>
                                            <p class="text-2xl font-bold text-cyan-400">{{ totalFiles }}</p>
                                        </div>
                                        <Icon name="ion:documents" class="text-cyan-400 text-3xl" />
                                    </div>
                                </div>

                                <div class="bg-gray-800/50 border border-purple-400/20 rounded-xl p-4">
                                    <div class="flex items-center justify-between">
                                        <div>
                                            <p class="text-gray-400 text-sm">Total Data</p>
                                            <p class="text-2xl font-bold text-purple-400">{{ formatFileSize(totalSize)
                                                }}</p>
                                        </div>
                                        <Icon name="ion:server" class="text-purple-400 text-3xl" />
                                    </div>
                                </div>

                                <div class="bg-gray-800/50 border border-cyan-400/20 rounded-xl p-4">
                                    <div class="flex items-center justify-between">
                                        <div>
                                            <p class="text-gray-400 text-sm">Avg. File Size</p>
                                            <p class="text-2xl font-bold text-cyan-400">{{ formatFileSize(averageSize)
                                                }}</p>
                                        </div>
                                        <Icon name="ion:stats-chart" class="text-cyan-400 text-3xl" />
                                    </div>
                                </div>
                            </div>

                            <!-- File Type Distribution -->
                            <div class="grid md:grid-cols-2 gap-4">
                                <div class="bg-gray-800/50 border border-purple-400/20 rounded-xl p-4">
                                    <h3 class="font-semibold mb-4 flex items-center gap-2">
                                        <Icon name="ion:pie-chart" class="text-purple-400" />
                                        File Type Distribution
                                    </h3>
                                    <div class="relative h-40">
                                        <div v-for="(type, index) in fileTypeDistribution" :key="type.extension"
                                            class="absolute left-0 right-0 h-1 bg-gray-700 rounded-full" :style="{
                                                top: `${index * 30}px`,
                                                '--width': `${(type.count / maxTypeCount) * 100}%`
                                            }">
                                            <div class="h-full bg-purple-400 rounded-full transition-all duration-500"
                                                :style="{ width: 'var(--width)' }"></div>
                                            <div class="flex items-center gap-2 mt-1">
                                                <span class="text-sm text-gray-300">{{ type.extension }}</span>
                                                <span class="text-sm text-purple-400">{{ type.count }} files</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Storage Allocation -->
                                <div class="bg-gray-800/50 border border-cyan-400/20 rounded-xl p-4">
                                    <h3 class="font-semibold mb-4 flex items-center gap-2">
                                        <Icon name="ion:analytics" class="text-cyan-400" />
                                        Storage Allocation
                                    </h3>
                                    <div class="relative w-32 h-32 mx-auto">
                                        <svg class="w-full h-full" viewBox="0 0 100 100">
                                            <!-- Background Circle -->
                                            <circle cx="50" cy="50" r="45" class="fill-none stroke-gray-700"
                                                stroke-width="10" />
                                            <!-- Data Segment -->
                                            <circle cx="50" cy="50" r="45" class="fill-none stroke-cyan-400"
                                                stroke-width="10" :stroke-dasharray="`${storageUsedPercent} 283`"
                                                stroke-linecap="round" transform="rotate(-90 50 50)" />
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

                            <!-- Recent Activity -->
                            <div class="bg-gray-800/50 border border-purple-400/20 rounded-xl p-4">
                                <h3 class="font-semibold mb-4 flex items-center gap-2">
                                    <Icon name="ion:time" class="text-purple-400" />
                                    Recent Analysis
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
                                </div>
                            </div>
                        </div>

                        <!-- Info Widgets -->
                        <div class="grid md:grid-cols-3 gap-4 mt-8">
                            <div class="bg-gray-800/50 border border-cyan-400/20 rounded-xl p-4">
                                <div class="flex items-center gap-3">
                                    <Icon name="ion:document" class="text-cyan-400 text-2xl" />
                                    <h3 class="font-semibold">Secure Storage</h3>
                                </div>
                                <p class="text-sm text-gray-400 mt-2">Bank-level encryption for all uploaded files</p>
                            </div>
                            <div class="bg-gray-800/50 border border-purple-400/20 rounded-xl p-4">
                                <div class="flex items-center gap-3">
                                    <Icon name="ion:analytics" class="text-purple-400 text-2xl" />
                                    <h3 class="font-semibold">Smart Analysis</h3>
                                </div>
                                <p class="text-sm text-gray-400 mt-2">Automatic financial insights generation</p>
                            </div>
                            <div class="bg-gray-800/50 border border-cyan-400/20 rounded-xl p-4">
                                <div class="flex items-center gap-3">
                                    <Icon name="ion:lock-closed" class="text-cyan-400 text-2xl" />
                                    <h3 class="font-semibold">Private & Secure</h3>
                                </div>
                                <p class="text-sm text-gray-400 mt-2">Your data never leaves your control</p>
                            </div>
                        </div>

                        <!-- Action Button -->
                        <button :disabled="!files.length"
                            class="w-full bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-gray-100 py-4 rounded-xl font-semibold transition-all transform hover:scale-[1.02] shadow-xl hover:shadow-cyan-400/20 relative overflow-hidden group disabled:opacity-50 disabled:pointer-events-none">
                            <span class="relative z-10">Process Files</span>
                            <div
                                class="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                            </div>
                        </button>
                    </div>
                </div>
            </div>

            <!-- Floating particles -->
            <div class="absolute inset-0 pointer-events-none z-0">
                <div v-for="i in 30" :key="i" class="absolute w-1 h-1 rounded-full"
                    :class="Math.random() > 0.5 ? 'bg-cyan-400/20' : 'bg-purple-400/20'" :style="{
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

const files = ref([]);
const isDragging = ref(false);
const storageLimit = ref(1073741824); // 1GB in bytes
const recentActivities = ref([
    {
        icon: 'ion:checkmark-circle',
        color: 'text-green-400',
        description: 'Successfully processed quarterly_report.pdf',
        timestamp: '2 minutes ago'
    },
    {
        icon: 'ion:alert-circle',
        color: 'text-yellow-400',
        description: 'Partial analysis complete for sales_data.xlsx',
        timestamp: '5 minutes ago'
    }
]);

const handleFileUpload = (event) => {
    const newFiles = Array.from(event.target.files);
    files.value = [...files.value, ...newFiles];
};

const handleDrop = (event) => {
    isDragging.value = false;
    const newFiles = Array.from(event.dataTransfer.files);
    files.value = [...files.value, ...newFiles];
};

const handleRemoveFile = (index) => {
    files.value = files.value.filter((_, i) => i !== index);
};

const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// Computed properties
const totalFiles = computed(() => files.value.length);
const totalSize = computed(() => files.value.reduce((sum, file) => sum + file.size, 0));
const averageSize = computed(() => totalFiles.value ? totalSize.value / totalFiles.value : 0);

const fileTypeDistribution = computed(() => {
    const types = {};
    files.value.forEach(file => {
        const ext = file.name.split('.').pop().toLowerCase();
        types[ext] = (types[ext] || 0) + 1;
    });
    return Object.entries(types).map(([extension, count]) => ({
        extension,
        count
    })).sort((a, b) => b.count - a.count);
});

const maxTypeCount = computed(() => {
    return Math.max(...fileTypeDistribution.value.map(t => t.count), 1);
});

const storageUsedPercent = computed(() => {
    return Math.min(Math.round((totalSize.value / storageLimit.value) * 100), 100);
});
</script>

<style scoped>
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

.drag-over {
    border-color: #22d3ee;
    background-color: rgba(31, 41, 55, 0.5);
    transform: scale(1.02);
}
</style>