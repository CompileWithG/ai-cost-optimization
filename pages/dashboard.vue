<template>
    <div class="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-purple-950 text-gray-100 p-8">
        <div class="max-w-7xl mx-auto relative z-10">
            <!-- Animated background particles -->
            <div class="absolute inset-0 pointer-events-none">
                <div v-for="i in 50" :key="i" class="absolute w-0.5 h-0.5 rounded-full animate-pulse"
                    :class="Math.random() > 0.5 ? 'bg-cyan-400/20' : 'bg-purple-400/20'" :style="{
                        top: Math.random() * 100 + '%',
                        left: Math.random() * 100 + '%',
                        animationDuration: (8 + Math.random() * 12) + 's'
                    }">
                </div>
            </div>

            <!-- Dashboard Grid -->
            <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <!-- Left Sidebar -->
                <div class="lg:col-span-1 space-y-8">
                    <!-- Upload Card -->
                    <div
                        class="bg-gray-900/80 backdrop-blur-2xl rounded-2xl border border-gray-700 p-6 shadow-2xl shadow-black/40">
                        <div class="text-center">
                            <div class="relative inline-block mb-4">
                                <Icon name="ion:cloud-upload" class="text-cyan-400 text-3xl animate-pulse" />
                                <div class="absolute inset-0 bg-cyan-400/10 blur-xl rounded-full"></div>
                            </div>
                            <h3 class="text-lg font-semibold mb-2">Upload Data</h3>
                            <div
                                class="border-2 border-dashed border-gray-600 rounded-xl p-4 transition-colors hover:border-cyan-400">
                                <input type="file" @change="handleFileUpload" accept=".csv,.xlsx,.xls,.pdf"
                                    class="hidden" id="fileInput" />
                                <label for="fileInput" class="cursor-pointer flex flex-col items-center gap-2 py-4">
                                    <Icon name="ion:document-attach" class="text-cyan-400 text-2xl" />
                                    <span class="text-sm text-gray-300">Drag & Drop or Click</span>
                                    <span class="text-xs text-gray-500">CSV, Excel, PDF (Max 50MB)</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    <!-- Quick Stats -->
                    <div
                        class="bg-gray-900/80 backdrop-blur-2xl rounded-2xl border border-gray-700 p-6 shadow-2xl shadow-black/40">
                        <h3 class="text-lg font-semibold mb-4 flex items-center gap-2">
                            <Icon name="ion:stats-chart" class="text-purple-400" />
                            Quick Analytics
                        </h3>
                        <div class="space-y-3">
                            <div
                                class="p-3 bg-gray-800/30 rounded-lg border border-cyan-400/10 hover:border-cyan-400/20 transition-colors">
                                <p class="text-sm text-gray-400 mb-1">Total Files</p>
                                <p class="text-2xl font-bold text-cyan-400">{{ files.length }}</p>
                            </div>
                            <div
                                class="p-3 bg-gray-800/30 rounded-lg border border-purple-400/10 hover:border-purple-400/20 transition-colors">
                                <p class="text-sm text-gray-400 mb-1">Analyzable Files</p>
                                <p class="text-2xl font-bold text-purple-400">{{ analyzableFiles }}</p>
                            </div>
                            <div
                                class="p-3 bg-gray-800/30 rounded-lg border border-cyan-400/10 hover:border-cyan-400/20 transition-colors">
                                <p class="text-sm text-gray-400 mb-1">Total Data Points</p>
                                <p class="text-2xl font-bold text-cyan-400">{{ totalDataPoints }}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Main Content Column -->
                <div class="lg:col-span-3 space-y-8">
                    <!-- Data Visualization Section -->
                    <div v-if="analysis"
                        class="bg-gray-900/80 backdrop-blur-2xl rounded-2xl border border-gray-700 p-6 shadow-2xl shadow-black/40">
                        <div class="flex items-center justify-between mb-6">
                            <h3 class="text-xl font-semibold flex items-center gap-2">
                                <Icon name="ion:analytics" class="text-cyan-400" />
                                Data Visualizations
                            </h3>
                            <div class="flex gap-2">
                                <button @click="setChartType('line')"
                                    :class="activeChartType === 'line' ? 'bg-cyan-600/30' : 'bg-gray-800/50'"
                                    class="px-3 py-1 rounded-lg transition-colors">
                                    Line
                                </button>
                                <button @click="setChartType('bar')"
                                    :class="activeChartType === 'bar' ? 'bg-purple-600/30' : 'bg-gray-800/50'"
                                    class="px-3 py-1 rounded-lg transition-colors">
                                    Bar
                                </button>
                                <button @click="setChartType('radar')"
                                    :class="activeChartType === 'radar' ? 'bg-green-600/30' : 'bg-gray-800/50'"
                                    class="px-3 py-1 rounded-lg transition-colors">
                                    Radar
                                </button>
                            </div>
                        </div>

                        <!-- Main Chart -->
                        <div class="h-96 mb-8">
                            <canvas id="mainChart"></canvas>
                        </div>

                        <!-- Mini Charts Grid -->
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div v-for="(col, index) in analysis.numericColumns.slice(0, 3)" :key="col"
                                class="bg-gray-800/30 p-4 rounded-xl border border-gray-700 hover:border-cyan-400/20 transition-colors">
                                <h4 class="text-sm font-medium mb-2 flex items-center gap-2">
                                    <Icon name="ion:trending-up" class="text-purple-400 text-sm" />
                                    {{ col }} Trend
                                </h4>
                                <div class="h-32">
                                    <canvas :id="'miniChart-' + index"></canvas>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- File Repository -->
                    <div
                        class="bg-gray-900/80 backdrop-blur-2xl rounded-2xl border border-gray-700 p-6 shadow-2xl shadow-black/40">
                        <h3 class="text-xl font-semibold mb-6 flex items-center gap-2">
                            <Icon name="ion:folder-open" class="text-purple-400" />
                            File Repository
                        </h3>
                        <div class="overflow-x-auto rounded-lg border border-gray-700">
                            <table class="w-full">
                                <thead class="bg-gray-800/50">
                                    <tr>
                                        <th class="px-4 py-3 text-left text-sm text-gray-300">File Name</th>
                                        <th class="px-4 py-3 text-left text-sm text-gray-300">Type</th>
                                        <th class="px-4 py-3 text-left text-sm text-gray-300">Size</th>
                                        <th class="px-4 py-3 text-left text-sm text-gray-300">Uploaded</th>
                                        <th class="px-4 py-3 text-left text-sm text-gray-300">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="file in files" :key="file.id"
                                        class="border-t border-gray-800 hover:bg-gray-800/20 transition-colors">
                                        <td class="px-4 py-3">
                                            <div class="flex items-center gap-2">
                                                <Icon :name="file.type === 'pdf' ? 'ion:document' : 'ion:document-text'"
                                                    :class="file.type === 'pdf' ? 'text-red-400' : 'text-cyan-400'" />
                                                {{ file.name }}
                                            </div>
                                        </td>
                                        <td class="px-4 py-3 text-sm uppercase">{{ file.type }}</td>
                                        <td class="px-4 py-3 text-sm">{{ formatFileSize(file.size) }}</td>
                                        <td class="px-4 py-3 text-sm">{{ formatDate(file.uploadedAt) }}</td>
                                        <td class="px-4 py-3">
                                            <div class="flex gap-2">
                                                <button v-if="['csv', 'excel'].includes(file.type)"
                                                    @click="analyzeFile(file.id)"
                                                    class="px-3 py-1 text-sm rounded-lg bg-cyan-600/30 hover:bg-cyan-500/40 transition-colors">
                                                    Analyze
                                                </button>
                                                <button @click="deleteFile(file.id)"
                                                    class="px-3 py-1 text-sm rounded-lg bg-red-600/30 hover:bg-red-500/40 transition-colors">
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr v-if="!files.length">
                                        <td colspan="5" class="px-4 py-6 text-center text-gray-500">
                                            No files uploaded yet
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <!-- AI Insights Floating Button -->
            <div class="fixed bottom-6 right-6 z-50 animate-bounce-slow">
                <router-link to="/ai-insights">
                    <button
                        class="bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 p-4 rounded-xl font-medium transition-all duration-300 shadow-xl shadow-cyan-500/20 hover:shadow-purple-500/30 flex items-center gap-2">
                        <Icon name="ion:rocket" class="text-lg" />
                        <span>AI Insights</span>
                    </button>
                </router-link>
            </div>
        </div>
    </div>
</template>
<script>
import * as XLSX from 'xlsx';
import Chart from 'chart.js/auto';
import { format } from 'date-fns';

export default {
    data() {
        return {
            db: null,
            files: [],
            analysis: null,
            charts: [],
            activeChartType: 'line',
            analyzableFiles: 0,
            totalDataPoints: 0,
        };
    },
    computed: {
        chartColors() {
            return this.analysis?.numericColumns.map((_, i) => {
                const hue = i * (360 / this.analysis.numericColumns.length);
                return {
                    border: `hsl(${hue}, 75%, 50 %)`,
                    background: `hsla(${hue}, 75 %, 50 %, 0.2)`
                };
            }) || [];
        },
        currentChartData() {
            if (!this.analysis) return [];
            return this.analysis.numericColumns.map((col, index) => ({
                label: col,
                data: this.analysis.numericStats[col].values,
                borderColor: this.chartColors[index]?.border,
                backgroundColor: this.chartColors[index]?.background,
                tension: 0.4,
                borderWidth: 2
            }));
        },
        chartLabels() {
            if (!this.analysis || !this.analysis.numericColumns.length) return [];
            const maxLength = Math.max(...this.analysis.numericColumns.map(col => this.analysis.numericStats[col].values.length));
            return Array.from({ length: maxLength }, (_, i) => i + 1);
        }
    },
    watch: {
        activeChartType() {
            this.createMainChart();
            this.createMiniCharts();
        }
    },
    mounted() {
        this.openDatabase();
    },
    methods: {
        formatDate(date) {
            return format(new Date(date), 'MMM dd, yyyy HH:mm');
        },
        formatFileSize(bytes) {
            if (bytes === 0) return '0 Bytes';
            const k = 1024;
            const sizes = ['Bytes', 'KB', 'MB', 'GB'];
            const i = Math.floor(Math.log(bytes) / Math.log(k));
            return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
        },
        openDatabase() {
            const request = indexedDB.open("myDB", 3);

            request.onerror = (event) => {
                console.error("IndexedDB error:", event.target.error);
            };

            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                if (!db.objectStoreNames.contains("files")) {
                    const store = db.createObjectStore("files", { keyPath: "id", autoIncrement: true });
                    store.createIndex("type", "type", { unique: false });
                }
            };

            request.onsuccess = (event) => {
                this.db = event.target.result;
                this.fetchFiles();
            };
        },

        fetchFiles() {
            if (!this.db) return;
            const transaction = this.db.transaction("files", "readonly");
            const store = transaction.objectStore("files");
            const request = store.getAll();

            request.onsuccess = () => {
                this.files = request.result;
                this.analyzableFiles = this.files.filter(file => ['csv', 'excel'].includes(file.type)).length;
                this.totalDataPoints = this.files.reduce((total, file) => total + (file.content ? file.content.split("\n").length - 1 : 0), 0);
            };
        },

        handleFileUpload(event) {
            const file = event.target.files[0];
            if (!file) return;

            const extension = file.name.split('.').pop().toLowerCase();
            const type = this.getFileType(extension);
            if (!type) return;

            const reader = new FileReader();

            if (type === 'csv') {
                reader.readAsText(file);
            } else {
                reader.readAsArrayBuffer(file);
            }

            reader.onload = () => {
                const content = reader.result;
                const transaction = this.db.transaction("files", "readwrite");
                const store = transaction.objectStore("files");
                const fileData = {
                    name: file.name,
                    type: type,
                    content: content,
                    size: file.size,
                    uploadedAt: new Date()
                };
                const request = store.add(fileData);

                request.onsuccess = () => {
                    this.fetchFiles();
                    if (type === 'csv') {
                        this.analyzeCSV(content);
                    } else if (type === 'excel') {
                        this.analyzeExcel(content);
                    }
                };

                request.onerror = (event) => {
                    console.error("Error storing file:", event.target.error);
                };
            };
        },

        getFileType(extension) {
            if (extension === 'csv') return 'csv';
            if (extension === 'xlsx' || extension === 'xls') return 'excel';
            if (extension === 'pdf') return 'pdf';
            alert('Unsupported file type');
            return null;
        },

        analyzeFile(fileId) {
            const transaction = this.db.transaction("files", "readonly");
            const store = transaction.objectStore("files");
            const request = store.get(fileId);

            request.onsuccess = () => {
                const file = request.result;
                if (!file) return;

                this.destroyAllCharts(); // Ensure all charts are destroyed before analyzing a new file

                if (file.type === 'csv') {
                    this.analyzeCSV(file.content);
                } else if (file.type === 'excel') {
                    this.analyzeExcel(file.content);
                }
            };
        },

        deleteFile(fileId) {
            if (!this.db) return;
            const transaction = this.db.transaction("files", "readwrite");
            const store = transaction.objectStore("files");
            const request = store.delete(fileId);

            request.onsuccess = () => {
                this.fetchFiles();
            };

            request.onerror = (event) => {
                console.error("Error deleting file:", event.target.error);
            };
        },

        analyzeCSV(content) {
            const rows = content.split("\n").map(row => row.split(","));
            this.analysis = this.processRows(rows);
            this.$nextTick(() => {
                this.createMainChart();
                this.createMiniCharts();
            });
        },

        analyzeExcel(content) {
            const workbook = XLSX.read(content, { type: 'array' });
            const firstSheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[firstSheetName];
            const rows = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
            this.analysis = this.processRows(rows);
            this.$nextTick(() => {
                this.createMainChart();
                this.createMiniCharts();
            });
        },

        processRows(rows) {
            if (rows.length < 1) return null;

            const columns = rows[0];
            const numericStats = {};
            const numericColumns = [];

            for (let i = 0; i < columns.length; i++) {
                const values = rows.slice(1)
                    .map(row => parseFloat(row[i]))
                    .filter(val => !isNaN(val));

                if (values.length > 0) {
                    numericStats[columns[i]] = {
                        values
                    };
                    numericColumns.push(columns[i]);
                }
            }

            return {
                totalRows: rows.length - 1,
                columns,
                numericStats,
                numericColumns,
            };
        },

        createMainChart() {
            const ctx = document.getElementById('mainChart');
            if (ctx && this.analysis && this.analysis.numericColumns.length > 0) {
                this.destroyChart('mainChart'); // Destroy existing main chart

                const chart = new Chart(ctx, {
                    type: this.activeChartType,
                    data: {
                        labels: this.chartLabels,
                        datasets: this.currentChartData
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                display: true,
                                position: 'top',
                                labels: {
                                    color: '#9CA3AF'
                                }
                            }
                        },
                        scales: {
                            x: {
                                display: true,
                                title: {
                                    display: true,
                                    text: 'Data Points',
                                    color: '#9CA3AF'
                                },
                                grid: { color: 'rgba(255,255,255,0.1)' },
                                ticks: { color: '#9CA3AF' }
                            },
                            y: {
                                title: {
                                    display: true,
                                    text: 'Values',
                                    color: '#9CA3AF'
                                },
                                grid: { color: 'rgba(255,255,255,0.1)' },
                                ticks: { color: '#9CA3AF' }
                            }
                        }
                    }
                });
                this.charts.push(chart);
            }
        },

        createMiniCharts() {
            this.destroyAllMiniCharts(); // Destroy all existing mini charts

            if (!this.analysis || !this.analysis.numericColumns.length) return;

            this.analysis.numericColumns.forEach((col, index) => {
                const ctx = document.getElementById('miniChart-' + index);
                if (ctx) {
                    const chart = new Chart(ctx, {
                        type: 'bar',
                        data: {
                            labels: this.analysis.numericStats[col].values.map((_, i) => i + 1),
                            datasets: [{
                                label: col,
                                data: this.analysis.numericStats[col].values,
                                backgroundColor: this.chartColors[index]?.background,
                                borderColor: this.chartColors[index]?.border,
                                borderWidth: 1
                            }]
                        },
                        options: {
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                                legend: { display: false },
                                tooltip: {
                                    enabled: true,
                                    mode: 'index',
                                    intersect: false
                                }
                            },
                            scales: {
                                x: {
                                    display: false,
                                    grid: { display: false }
                                },
                                y: {
                                    grid: { color: 'rgba(255,255,255,0.1)' },
                                    ticks: {
                                        color: '#9CA3AF',
                                        precision: 2
                                    }
                                }
                            }
                        }
                    });
                    this.charts.push(chart);
                }
            });
        },

        destroyChart(chartId) {
            const chartToDestroy = this.charts.find(chart => chart.canvas.id === chartId);
            if (chartToDestroy) {
                chartToDestroy.destroy();
                this.charts = this.charts.filter(chart => chart.canvas.id !== chartId);
            }
        },

        destroyAllCharts() {
            this.charts.forEach(chart => chart.destroy());
            this.charts = [];
        },

        destroyAllMiniCharts() {
            this.charts.forEach(chart => {
                if (chart.canvas.id.startsWith('miniChart-')) {
                    chart.destroy();
                }
            });
            this.charts = this.charts.filter(chart => !chart.canvas.id.startsWith('miniChart-'));
        },

        setChartType(type) {
            this.activeChartType = type;
            this.createMainChart();
            this.createMiniCharts();
        }
    },
};
</script>

<style scoped>
.animate-float {
    animation: float 20s ease-in-out infinite;
}

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

canvas {
    width: 100% !important;
    height: 100% !important;
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

.animate-fade-in {
    animation: fadeIn 0.8s ease-out;
}

.animate-bounce-slow {
    animation: bounce 2s infinite;
}

@keyframes bounce {

    0%,
    20%,
    50%,
    80%,
    100% {
        transform: translateY(0);
    }

    40% {
        transform: translateY(-10px);
    }

    60% {
        transform: translateY(-5px);
    }
}
</style>