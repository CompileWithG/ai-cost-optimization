<template>
    <div class="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-purple-950 text-gray-100 p-8">
        <div class="max-w-4xl mx-auto relative z-10">
            <!-- Animated background elements -->
            <div class="absolute -inset-4 opacity-20">
                <div class="absolute inset-0 bg-gradient-to-r from-cyan-500/15 to-purple-500/15 blur-3xl animate-float">
                </div>
            </div>

            <!-- Main content -->
            <div
                class="bg-gray-900/80 backdrop-blur-2xl rounded-3xl border border-gray-700 p-8 shadow-2xl shadow-black/40">
                <div class="header text-center mb-8">
                    <div class="relative inline-block">
                        <Icon name="ion:rocket" class="text-purple-400 text-4xl mb-4 animate-pulse" />
                        <div class="absolute inset-0 bg-purple-400/10 blur-2xl rounded-full"></div>
                    </div>
                    <h2
                        class="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 mb-2">
                        AI-Generated Business Plan
                    </h2>
                    <p class="text-gray-400">Analyzing your data to create optimized strategies(Making a Buisness Plan
                        Takes Time,Have Patience)</p>
                </div>

                <!-- Loading state -->
                <div v-if="loading" class="text-center py-12">
                    <div class="spinner"></div>
                    <p class="mt-4 text-cyan-400 animate-pulse">Crunching numbers and generating
                        insights...(Warning:refreshing the page will delay the process)</p>
                </div>

                <!-- Business Plan -->
                <div v-if="!loading && !error" class="plan-card animate-fade-in">
                    <div class="bg-gray-800/50 border border-cyan-400/20 rounded-2xl p-6">
                        <h3 class="text-xl font-semibold mb-6 flex items-center gap-2 text-purple-400">
                            <Icon name="ion:document-text" />
                            Strategic Optimization Plan
                        </h3>
                        <div class="plan-content space-y-4" v-html="formattedContent"></div>
                    </div>
                </div>

                <!-- Error state -->
                <div v-if="error" class="error-message bg-red-900/30 border border-red-400/20 rounded-2xl p-6 mt-8">
                    <div class="flex items-center gap-3">
                        <Icon name="ion:warning" class="text-red-400 text-2xl" />
                        <h3 class="text-xl font-semibold text-red-400">Generation Error</h3>
                    </div>
                    <p class="mt-3 text-red-300">{{ error }}</p>
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

export default {
    mounted() {
        this.openDatabase();
    },
    data() {
        return {
            businessPlan: '',
            loading: true,
            error: null,
            string_output: "",
            db: null
        };
    },
    computed: {
        formattedContent() {
            return this.businessPlan.replace(/\n/g, '<br>')
                .replace(/(\d+\.)/g, '<span class="text-cyan-400 font-semibold">$1</span>')
                .replace(/-/g, '•');
        }
    },
    methods: {
        openDatabase() {
            const request = indexedDB.open("myDB", 3);

            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                if (!db.objectStoreNames.contains("files")) {
                    db.createObjectStore("files", { keyPath: "id", autoIncrement: true });
                }
            };

            request.onsuccess = async (event) => {
                this.db = event.target.result;
                await this.fetchFiles();
                await this.processAllFiles();
                this.sendMessage();
            };
        },

        async fetchFiles() {
            return new Promise((resolve) => {
                const transaction = this.db.transaction("files", "readonly");
                const store = transaction.objectStore("files");
                store.getAll().onsuccess = (event) => {
                    this.files = event.target.result;
                    resolve();
                };
            });
        },

        analyzeFile(fileId) {
            return new Promise((resolve) => {
                const transaction = this.db.transaction("files", "readonly");
                const store = transaction.objectStore("files");
                store.get(fileId).onsuccess = (event) => {
                    const file = event.target.result;
                    this.processFileContent(file);
                    resolve();
                };
            });
        },

        processFileContent(file) {
            try {
                let rows = [];
                if (file.type === 'csv') {
                    rows = file.content.split("\n")
                        .map(row => row.split(","))
                        .filter(row => row.length > 0);
                } else if (file.type === 'excel') {
                    const workbook = XLSX.read(new Uint8Array(file.content), { type: 'array' });
                    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
                    rows = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
                }

                if (rows.length > 0) {
                    this.string_output += JSON.stringify({
                        columns: rows[0],
                        data: rows.slice(1)
                    }) + "\n";
                }
            } catch (error) {
                console.error('Error processing file:', error);
            }
        },

        async processAllFiles() {
            this.string_output = "";
            for (const file of this.files) {
                await this.analyzeFile(file.id);
            }
        },

        async sendMessage() {
            try {
                let d1 = localStorage.getItem("questionnaireData");
                let prompt = `Develop a comprehensive business optimization plan focusing on cost reduction and operational efficiency. Base your analysis on:
                            - Business Objectives: ${d1}
                            - Data Analysis: ${this.string_output}
                            
                            Include the following sections:
                            1. Executive Summary
                            2. Cost Analysis Findings
                            3. Recommended Strategies
                            4. Implementation Roadmap
                            5. Expected Outcomes
                            
                            Present in clear, professional business language with numbered sections and bullet points where appropriate.`;

                const response = await fetch('http://localhost:11434/api/generate', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        model: 'deepseek-r1:1.5b',
                        prompt: prompt,
                        stream: true
                    })
                });

                if (!response.body) throw new Error('No response body');

                const reader = response.body.getReader();
                const decoder = new TextDecoder();
                this.businessPlan = '';

                while (true) {
                    const { value, done } = await reader.read();
                    if (done) break;

                    const chunk = decoder.decode(value, { stream: true });
                    const jsonChunks = chunk.split('\n').filter(line => line.trim());

                    for (const jsonChunk of jsonChunks) {
                        try {
                            const data = JSON.parse(jsonChunk);
                            if (data.response) {
                                this.businessPlan += data.response;
                            }
                        } catch (error) {
                            console.error('Error parsing JSON chunk:', error);
                        }
                    }
                }
            } catch (error) {
                console.error('Error:', error);
                this.error = 'Failed to generate business plan. Please try again later.';
            } finally {
                this.loading = false;
            }
        }
    }
};
</script>

<style>
.spinner {
    width: 50px;
    height: 50px;
    margin: 0 auto;
    border: 3px solid #06b6d4;
    border-top: 3px solid #8b5cf6;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

.plan-content {
    line-height: 1.7;
    color: #e5e7eb;
}

.plan-content br {
    margin-bottom: 1.5rem;
    display: block;
    content: "";
}

.animate-fade-in {
    animation: fadeIn 0.8s ease-out;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
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

@media (max-width: 768px) {
    .plan-card {
        padding: 1rem;
    }

    h2 {
        font-size: 1.75rem;
    }
}
</style>