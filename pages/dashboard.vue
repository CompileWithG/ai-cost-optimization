<template>
    <div class="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-purple-950 text-gray-100 p-8">
        <div class="max-w-4xl mx-auto relative z-10">
            <!-- Animated background elements -->
            <div class="absolute -inset-4 opacity-20">
                <div class="absolute inset-0 bg-gradient-to-r from-cyan-500/15 to-purple-500/15 blur-3xl animate-float">
                </div>
            </div>

            <!-- Main card -->
            <div
                class="bg-gray-900/80 backdrop-blur-2xl rounded-3xl border border-gray-700 p-8 shadow-2xl shadow-black/40">
                <div class="text-center mb-8">
                    <div class="relative inline-block">
                        <Icon name="ion:analytics" class="text-cyan-400 text-4xl mb-4 animate-pulse" />
                        <div class="absolute inset-0 bg-cyan-400/10 blur-2xl rounded-full"></div>
                    </div>
                    <h2
                        class="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 mb-2">
                        Data Analysis Hub
                    </h2>
                    <p class="text-gray-400">Upload and analyze financial data (CSV, Excel)</p>
                </div>

                <!-- Upload Section -->
                <div class="mb-8">
                    <div
                        class="border-2 border-dashed border-gray-600 rounded-2xl p-6 text-center transition-all hover:border-gray-500">
                        <Icon name="ion:document-attach" class="text-cyan-400 text-4xl mx-auto mb-4" />
                        <input type="file" @change="handleFileUpload" accept=".csv,.xlsx,.xls,.pdf" class="hidden"
                            id="fileInput" />
                        <label for="fileInput"
                            class="bg-gray-800/70 hover:bg-gray-700/50 border border-gray-600 px-6 py-2 rounded-xl transition-all cursor-pointer">
                            Choose File
                        </label>
                        <p class="text-sm text-gray-500 mt-3">Supported formats: CSV, Excel, PDF</p>
                    </div>
                </div>

                <!-- Stored Files -->
                <div class="mb-8">
                    <h3 class="text-xl font-semibold mb-4 flex items-center gap-2">
                        <Icon name="ion:archive" class="text-purple-400" />
                        Stored Files
                    </h3>
                    <ul class="space-y-3">
                        <li v-for="file in files" :key="file.id"
                            class="bg-gray-800/50 border border-gray-700 rounded-xl p-4 flex items-center justify-between animate_animated animate_fadeIn hover:bg-gray-700/20 transition-colors">
                            <div class="flex items-center gap-3">
                                <Icon name="ion:document-text" class="text-cyan-400 text-xl" />
                                <span class="font-medium">{{ file.name }}</span>
                                <span class="text-sm text-gray-500">{{ file.type }}</span>
                            </div>
                            <div class="flex items-center gap-2">
                                <button v-if="['csv', 'excel'].includes(file.type)" @click="analyzeFile(file.id)"
                                    class="bg-cyan-600/30 hover:bg-cyan-500/40 px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
                                    <Icon name="ion:stats-chart" class="text-lg" />
                                    Analyze
                                </button>
                                <button @click="deleteFile(file.id)"
                                    class="bg-red-600/30 hover:bg-red-500/40 px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
                                    <Icon name="ion:trash" class="text-lg" />
                                    Remove
                                </button>
                            </div>
                        </li>
                        <li v-if="!files.length" class="text-center text-gray-500 py-4">
                            No files uploaded yet
                        </li>
                    </ul>
                </div>

                <!-- Analysis Results -->
                <div v-if="analysis" class="animate_animated animate_fadeIn">
                    <div class="bg-gray-800/50 border border-purple-400/20 rounded-2xl p-6">
                        <h3 class="text-xl font-semibold mb-6 flex items-center gap-2">
                            <Icon name="ion:bar-chart" class="text-purple-400" />
                            Analysis Results
                        </h3>

                        <!-- Overview Stats -->
                        <div class="grid md:grid-cols-2 gap-4 mb-8">
                            <div class="bg-gray-900/70 p-4 rounded-xl border border-cyan-400/20">
                                <p class="text-gray-400 mb-1">Total Rows</p>
                                <p class="text-2xl font-bold text-cyan-400">{{ analysis.totalRows }}</p>
                            </div>
                            <div class="bg-gray-900/70 p-4 rounded-xl border border-purple-400/20">
                                <p class="text-gray-400 mb-1">Total Columns</p>
                                <p class="text-2xl font-bold text-purple-400">{{ analysis.columns.length }}</p>
                            </div>
                        </div>

                        <!-- Columns List -->
                        <div class="mb-8">
                            <h4 class="font-medium mb-3 flex items-center gap-2">
                                <Icon name="ion:list" class="text-cyan-400" />
                                Detected Columns
                            </h4>
                            <div class="flex flex-wrap gap-2">
                                <span v-for="col in analysis.columns" :key="col"
                                    class="px-3 py-1 bg-gray-700/50 rounded-full text-sm">
                                    {{ col }}
                                </span>
                            </div>
                        </div>

                        <!-- Charts -->
                        <div class="grid lg:grid-cols-2 gap-6 mt-8">
                            <div v-for="(column, index) in analysis.numericColumns" :key="column"
                                class="bg-gray-800 p-4 rounded-xl aspect-video">
                                <h3 class="text-lg font-semibold mb-4">{{ column }} Trend</h3>
                                <canvas :id="'lineChart-' + index"></canvas>
                            </div>
                            <div class="bg-gray-800 p-4 rounded-xl col-span-full aspect-video">
                                <h3 class="text-lg font-semibold mb-4">Statistical Summary</h3>
                                <canvas id="summaryChart"></canvas>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Floating particles -->
                <div class="absolute inset-0 pointer-events-none z-0">
                    <div v-for="i in 30" :key="i" class="absolute w-1 h-1 rounded-full"
                        :class="Math.random() > 0.5 ? 'bg-cyan-400/20 ' : 'bg-purple-400/20'"
                        :style="{ top: Math.random() * 100 + '%', left: Math.random() * 100 + '%', animation: 'float ' + (10 + Math.random() * 10) + 's infinite' }">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import * as XLSX from 'xlsx';
import Chart from 'chart.js/auto';

export default {
    data() {
        return {
            db: null,
            files: [],
            analysis: null,
            charts: []
        };
    },
    mounted() {
        this.openDatabase();
    },
    methods: {
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
            };
        },

        handleFileUpload(event) {
            const file = event.target.files[0];
            if (!file) return;

            const extension = file.name
                .split('.').pop().toLowerCase();
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
                // Store the file in IndexedDB
                const transaction = this.db.transaction("files", "readwrite");
                const store = transaction.objectStore("files");
                const fileData = {
                    name: file.name,
                    type: type,
                    content: content,
                    uploadedAt: new Date()
                };
                const request = store.add(fileData);

                request.onsuccess = () => {
                    this.fetchFiles(); // Refresh the list
                    // Then analyze the file if needed
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
                this.fetchFiles(); // Refresh the list after deletion
            };

            request.onerror = (event) => {
                console.error("Error deleting file:", event.target.error);
            };
        },

        analyzeCSV(content) {
            const rows = content.split("\n").map(row => row.split(","));
            this.analysis = this.processRows(rows);
            this.$nextTick(() => this.createCharts());
        },

        analyzeExcel(content) {
            const workbook = XLSX.read(content, { type: 'array' });
            const firstSheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[firstSheetName];
            const rows = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
            this.analysis = this.processRows(rows);
            this.$nextTick(() => this.createCharts());
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

        createCharts() {
            this.charts.forEach(chart => chart.destroy());
            this.charts = [];

            this.analysis.numericColumns.forEach((col, index) => {
                const ctx = document.getElementById('lineChart-' + index);
                if (ctx) {
                    const chart = new Chart(ctx, {
                        type: 'line',
                        data: {
                            labels: this.analysis.numericStats[col].values.map((_, i) => i + 1),
                            datasets: [{
                                label: col,
                                data: this.analysis.numericStats[col].values,
                                borderColor: `hsl(${index * 60}, 75 %, 50 %)`,
                                backgroundColor: `hsla(${index * 60}, 75 %, 50 %, 0.1)`,
                                tension: 0.4,
                                borderWidth: 2
                            }]
                        },
                        options: {
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: { legend: { display: false } },
                            scales: {
                                x: { display: true },
                                y: {
                                    grid: { color: 'rgba (255,255,255,0.1)' },
                                    ticks: { color: '#9CA3AF' }
                                }
                            }
                        }
                    });
                    this.charts.push(chart);
                }
            });

            const summaryCtx = document.getElementById('summaryChart');
            if (summaryCtx) {
                const chart = new Chart(summaryCtx, {
                    type: 'bar',
                    data: {
                        labels: this.analysis.numericColumns,
                        datasets: [{
                            label: 'Average',
                            data: this.analysis.numericColumns.map(col => this.analysis.numericStats[col].values.reduce((a, b) => a + b, 0) / this.analysis.numericStats[col].values.length),
                            backgroundColor: this.analysis.numericColumns.map((_, i) => `hsl(${i * 60}, 75 %, 50 %)`),
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: { legend: { display: false } },
                        scales: {
                            x: { ticks: { color: '#9CA3AF' } },
                            y: {
                                grid: { color: 'rgba(255,255,255,0.1)' },
                                ticks: { color: '#9CA3AF' }
                            }
                        }
                    }
                });
                this.charts.push(chart);
            }
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
</style>