<template>
    <transition name="page-transition">
        <div
            class="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-purple-950 text-gray-100 flex items-center justify-center p-4">
            <div class="w-full max-w-md relative z-10">
                <!-- Animated background elements -->
                <div class="absolute -inset-4 opacity-30">
                    <div
                        class="absolute inset-0 bg-gradient-to-r from-cyan-500/15 to-purple-500/15 blur-2xl animate-float">
                    </div>
                </div>

                <!-- Main card -->
                <div
                    class="bg-gray-900/80 backdrop-blur-xl rounded-3xl border border-gray-700 p-8 shadow-2xl shadow-black/40 animate__animated animate__fadeInDown">
                    <div class="text-center mb-8">
                        <Icon name="ion:person-add" class="text-cyan-400 text-4xl mx-auto mb-4" />
                        <h2
                            class="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400">
                            Create Account
                        </h2>
                        <p class="text-gray-400 mt-2">Start optimizing your business costs today</p>
                    </div>

                    <form @submit.prevent="handleSignUp" class="space-y-6">
                        <div class="animate__animated animate__fadeIn animate__delay-1s">
                            <label class="block text-gray-200 mb-2">Full Name</label>
                            <div class="relative">
                                <Icon name="ion:person"
                                    class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input v-model="name" type="text" placeholder="Enter your name"
                                    class="w-full pl-12 pr-4 py-3 bg-gray-800/70 border border-gray-600 rounded-xl focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all">
                            </div>
                        </div>

                        <div class="animate__animated animate__fadeIn animate__delay-2s">
                            <label class="block text-gray-200 mb-2">Email</label>
                            <div class="relative">
                                <Icon name="ion:mail" class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input v-model="email" type="email" placeholder="Enter your email"
                                    class="w-full pl-12 pr-4 py-3 bg-gray-800/70 border border-gray-600 rounded-xl focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all">
                            </div>
                        </div>

                        <div class="animate__animated animate__fadeIn animate__delay-3s">
                            <label class="block text-gray-200 mb-2">Password</label>
                            <div class="relative">
                                <Icon name="ion:key" class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input v-model="password" type="password" placeholder="Create password"
                                    class="w-full pl-12 pr-4 py-3 bg-gray-800/70 border border-gray-600 rounded-xl focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all">
                            </div>
                        </div>

                        <button type="submit"
                            class="w-full bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-gray-100 py-4 rounded-xl font-semibold transition-all transform hover:scale-[1.02] shadow-xl hover:shadow-cyan-400/20 animate__animated animate__fadeIn animate__delay-4s">
                            Create Account
                        </button>
                    </form>

                    <div class="my-6 relative">
                        <div class="absolute inset-0 flex items-center">
                            <div class="w-full border-t border-gray-700"></div>
                        </div>
                        <div class="relative flex justify-center text-sm">
                            <span class="px-2 bg-gray-900/80 text-gray-400">Already registered?</span>
                        </div>
                    </div>

                    <nuxt-link to="/signin"
                        class="w-full flex items-center justify-center gap-2 py-3 bg-gray-800/70 hover:bg-gray-700/50 border border-gray-600 rounded-xl transition-all animate__animated animate__fadeIn animate__delay-5s">
                        <Icon name="ion:log-in" class="text-purple-400 text-xl" />
                        <span>Sign In Instead</span>
                    </nuxt-link>
                </div>
            </div>

            <!-- Floating particles -->
            <div class="absolute inset-0 pointer-events-none z-0">
                <div v-for="i in 20" :key="i" class="absolute w-1 h-1 rounded-full"
                    :class="Math.random() > 0.5 ? 'bg-cyan-400/20' : 'bg-purple-400/20'" :style="{
                        top: Math.random() * 100 + '%',
                        left: Math.random() * 100 + '%',
                        animation: `float ${8 + Math.random() * 8}s infinite`
                    }"></div>
            </div>
        </div>
    </transition>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const name = ref('');
const email = ref('');
const password = ref('');
const router = useRouter();

const handleSignUp = () => {
    // Handle registration logic
    router.push('/questionnaire');
};
</script>

<style scoped>
/* Same transition styles as previous */
.page-transition-enter-active,
.page-transition-leave-active {
    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.page-transition-enter-from,
.page-transition-leave-to {
    opacity: 0;
    transform: translateY(20px);
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
</style>