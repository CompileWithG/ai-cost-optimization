// middleware/questionnaire.js
export default defineNuxtRouteMiddleware((to) => {
  const store = useQuestionnaireStore();

  if (!store.validateStep(to.params.step)) {
    return navigateTo(
      `/questionnaire/${store.currentBusinessType}/${store.currentStep}`
    );
  }

  if (to.path.includes("/cash-flow") && !store.branchCompleted) {
    return navigateTo(
      `/questionnaire/${store.currentBusinessType}/${store.currentStep}`
    );
  }
});
