// stores/questionnaire.js
import { defineStore } from "pinia";

export const useQuestionnaireStore = defineStore("questionnaire", {
  state: () => ({
    currentQuestion: null,
    progress: 0,
    totalQuestions: 30,
    logistics: [
      {
        id: "Q1",
        type: "multiple-choice",
        text: "Primary transportation mode?",
        options: ["Road", "Rail", "Air", "Marine", "Multimodal"],
        next: "Q2",
        answer: " ",
      },
      {
        id: "Q2",
        type: "range",
        text: "Average fleet utilization rate (%)",
        min: 0,
        max: 100,
        step: 5,
        next: "Q3",
        answer: " ",
      },
      {
        id: "Q3",
        type: "descriptive",
        text: "Describe your maintenance scheduling process:",
        maxLength: 500,
        next: "Q4",
        answer: " ",
      },
      {
        id: "Q4",
        type: "multiple-select",
        text: "Select your fuel management strategies:",
        options: [
          "Route optimization",
          "Driver training",
          "Vehicle upgrades",
          "Alternative fuels",
          "None",
        ],
        next: "Q5",
        answer: " ",
      },
      {
        id: "Q5",
        type: "range",
        text: "Percentage of empty return trips:",
        min: 0,
        max: 50,
        step: 1,
        next: "Q6",
        answer: " ",
      },
      {
        id: "Q6",
        type: "multiple-choice",
        text: "Warehouse management system used?",
        options: ["Manual", "Basic WMS", "Advanced WMS", "Custom Solution"],
        next: "Q7",
        answer: " ",
      },
      {
        id: "Q7",
        type: "descriptive",
        text: "Explain your load optimization strategy:",
        maxLength: 400,
        next: "Q8",
        answer: " ",
      },
      {
        id: "Q8",
        type: "range",
        text: "Average delivery time variance (minutes):",
        min: -120,
        max: 120,
        step: 15,
        next: "Q9",
        answer: " ",
      },
      {
        id: "Q9",
        type: "multiple-select",
        text: "Select your cargo insurance coverage:",
        options: [
          "Full Value",
          "Partial Coverage",
          "Perishable Specific",
          "Hazardous Materials",
          "No Insurance",
        ],
        next: "Q10",
        answer: " ",
      },
      {
        id: "Q10",
        type: "multiple-choice",
        text: "Driver retention strategy?",
        options: [
          "Competitive Pay",
          "Benefits Package",
          "Training Programs",
          "Performance Bonuses",
          "None",
        ],
        next: "Q11",
        answer: " ",
      },
      {
        id: "Q11",
        type: "multiple-choice",
        text: "What is your primary business model?",
        options: ["B2B", "B2C", "B2B2C", "Other"],
        next: "CQ2",
        answer: " ",
      },
      {
        id: "Q12",
        type: "range",
        text: "What percentage of revenue goes to operational costs?",
        min: 0,
        max: 100,
        step: 5,
        next: "Q13",
        answer: " ",
      },
      {
        id: "Q13",
        type: "descriptive",
        text: "Describe your main cost optimization strategy:",
        maxLength: 500,
        next: "Q14",
        answer: " ",
      },
      {
        id: "Q14",
        type: "multiple-select",
        text: "Select your primary expense categories:",
        options: [
          "Personnel",
          "Technology",
          "Marketing",
          "Logistics",
          "Facilities",
          "R&D",
        ],
        next: "Q15",
        answer: " ",
      },
      {
        id: "Q15",
        type: "range",
        text: "How many months of operating expenses do you maintain in reserves?",
        min: 0,
        max: 12,
        step: 1,
        next: "Q16",
        answer: " ",
      },
      {
        id: "Q16",
        type: "multiple-choice",
        text: "What is your financial forecasting frequency?",
        options: ["Weekly", "Monthly", "Quarterly", "Annually", "As needed"],
        next: "Q17",
        answer: " ",
      },
      {
        id: "Q17",
        type: "descriptive",
        text: "Explain your approach to risk management:",
        maxLength: 1000,
        next: "Q18",
        answer: " ",
      },
      {
        id: "Q18",
        type: "multiple-choice",
        text: "How do you handle tax optimization?",
        options: [
          "In-house team",
          "External consultants",
          "Software solutions",
          "No specific strategy",
        ],
        next: "Q19",
        answer: " ",
      },
      {
        id: "Q19",
        type: "range",
        text: "Percentage of budget allocated to technology upgrades:",
        min: 0,
        max: 50,
        step: 1,
        next: "Q20",
        answer: " ",
      },
      {
        id: "Q20",
        type: "multiple-select",
        text: "Select your sustainability initiatives:",
        options: [
          "Energy efficiency",
          "Waste reduction",
          "Carbon offset",
          "Sustainable sourcing",
          "None",
        ],
        next: null,
        answer: " ",
      },
    ],
    saas: [
      {
        id: "Q1",
        type: "multiple-choice",
        text: "Primary cloud infrastructure provider?",
        options: ["AWS", "Azure", "Google Cloud", "Other"],
        next: "Q2",
        answer: " ",
      },
      {
        id: "Q2",
        type: "range",
        text: "Percentage of reserved instances?",
        min: 0,
        max: 100,
        step: 5,
        next: "Q3",
        answer: " ",
      },
      {
        id: "Q3",
        type: "descriptive",
        text: "Describe your customer acquisition strategy:",
        maxLength: 500,
        next: "SAAS-Q4",
        answer: " ",
      },
      {
        id: "Q4",
        type: "multiple-select",
        text: "Select your primary customer support channels:",
        options: ["Email", "Chat", "Phone", "Self-service", "Social Media"],
        next: "Q5",
        answer: " ",
      },
      {
        id: "Q5",
        type: "multiple-choice",
        text: "What is your average customer lifetime value (LTV)?",
        options: ["< $100", "$100 - $500", "$500 - $1000", "> $1000"],
        next: "Q6",
        answer: " ",
      },
      {
        id: "Q6",
        type: "range",
        text: "Churn rate (%)",
        min: 0,
        max: 100,
        step: 1,
        next: "Q7",
        answer: " ",
      },
      {
        id: "Q7",
        type: "descriptive",
        text: "Explain your product development cycle:",
        maxLength: 400,
        next: "Q8",
        answer: " ",
      },
      {
        id: "Q8",
        type: "multiple-choice",
        text: "What is your primary pricing model?",
        options: ["Subscription", "One-time fee", "Freemium", "Usage-based"],
        next: "Q9",
        answer: " ",
      },
      {
        id: "Q9",
        type: "range",
        text: "Percentage of revenue spent on marketing:",
        min: 0,
        max: 100,
        step: 1,
        next: "Q10",
        answer: " ",
      },
      {
        id: "Q10",
        type: "multiple-select",
        text: "Select your key performance indicators (KPIs):",
        options: [
          "Monthly Recurring Revenue (MRR)",
          "Customer Acquisition Cost (CAC)",
          "Churn Rate",
          "Net Promoter Score (NPS)",
          "Customer Lifetime Value (LTV)",
        ],
        next: "Q11",
        answer: " ",
      },
      {
        id: "Q11",
        type: "multiple-choice",
        text: "What is your primary business model?",
        options: ["B2B", "B2C", "B2B2C", "Other"],
        next: "CQ2",
        answer: " ",
      },
      {
        id: "Q12",
        type: "range",
        text: "What percentage of revenue goes to operational costs?",
        min: 0,
        max: 100,
        step: 5,
        next: "Q13",
        answer: " ",
      },
      {
        id: "Q13",
        type: "descriptive",
        text: "Describe your main cost optimization strategy:",
        maxLength: 500,
        next: "Q14",
        answer: " ",
      },
      {
        id: "Q14",
        type: "multiple-select",
        text: "Select your primary expense categories:",
        options: [
          "Personnel",
          "Technology",
          "Marketing",
          "Logistics",
          "Facilities",
          "R&D",
        ],
        next: "Q15",
        answer: " ",
      },
      {
        id: "Q15",
        type: "range",
        text: "How many months of operating expenses do you maintain in reserves?",
        min: 0,
        max: 12,
        step: 1,
        next: "Q16",
        answer: " ",
      },
      {
        id: "Q16",
        type: "multiple-choice",
        text: "What is your financial forecasting frequency?",
        options: ["Weekly", "Monthly", "Quarterly", "Annually", "As needed"],
        next: "Q17",
        answer: " ",
      },
      {
        id: "Q17",
        type: "descriptive",
        text: "Explain your approach to risk management:",
        maxLength: 1000,
        next: "Q18",
        answer: " ",
      },
      {
        id: "Q18",
        type: "multiple-choice",
        text: "How do you handle tax optimization?",
        options: [
          "In-house team",
          "External consultants",
          "Software solutions",
          "No specific strategy",
        ],
        next: "Q19",
        answer: " ",
      },
      {
        id: "Q19",
        type: "range",
        text: "Percentage of budget allocated to technology upgrades:",
        min: 0,
        max: 50,
        step: 1,
        next: "Q20",
        answer: " ",
      },
      {
        id: "Q20",
        type: "multiple-select",
        text: "Select your sustainability initiatives:",
        options: [
          "Energy efficiency",
          "Waste reduction",
          "Carbon offset",
          "Sustainable sourcing",
          "None",
        ],
        next: null,
        answer: " ",
      },
    ],
    ecommerce: [
      {
        id: "Q1",
        type: "multiple-choice",
        text: "What is your primary sales channel?",
        options: ["Website", "Marketplaces", "Social Media", "Physical Store"],
        next: "Q2",
        answer: " ",
      },
      {
        id: "Q2",
        type: "range",
        text: "Average inventory turnover ratio?",
        min: 0,
        max: 10,
        step: 0.1,
        next: "ECOMM-Q3",
        answer: " ",
      },
      {
        id: "Q3",
        type: "descriptive",
        text: "Describe your return policy:",
        maxLength: 300,
        next: "Q4",
        answer: " ",
      },
      {
        id: "Q4",
        type: "multiple-select",
        text: "Select your primary marketing strategies:",
        options: [
          "Email Marketing",
          "Social Media Ads",
          "SEO",
          "Influencer Marketing",
          "Content Marketing",
        ],
        next: "Q5",
        answer: " ",
      },
      {
        id: "Q5",
        type: "multiple-choice",
        text: "What is your average order value (AOV)?",
        options: ["< $50", "$50 - $100", "$100 - $200", "> $200"],
        next: "Q6",
        answer: " ",
      },
      {
        id: "Q6",
        type: "range",
        text: "Percentage of repeat customers:",
        min: 0,
        max: 100,
        step: 1,
        next: "Q7",
        answer: " ",
      },
      {
        id: "Q7",
        type: "descriptive",
        text: "Explain your customer service approach:",
        maxLength: 400,
        next: "Q8",
        answer: " ",
      },
      {
        id: "Q8",
        type: "multiple-choice",
        text: "What is your primary payment method?",
        options: ["Credit Card", "PayPal", "Bank Transfer", "Cryptocurrency"],
        next: "Q9",
        answer: " ",
      },
      {
        id: "Q9",
        type: "range",
        text: "Average shipping time (days):",
        min: 1,
        max: 30,
        step: 1,
        next: "Q10",
        answer: " ",
      },
      {
        id: "Q10",
        type: "multiple-select",
        text: "Select your key performance indicators (KPIs):",
        options: [
          "Conversion Rate",
          "Cart Abandonment Rate",
          "Customer Satisfaction Score",
          "Return Rate",
          "Sales Growth",
        ],
        next: "Q11",
        answer: " ",
      },
      {
        id: "Q11",
        type: "multiple-choice",
        text: "What is your primary business model?",
        options: ["B2B", "B2C", "B2B2C", "Other"],
        next: "CQ2",
        answer: " ",
      },
      {
        id: "Q12",
        type: "range",
        text: "What percentage of revenue goes to operational costs?",
        min: 0,
        max: 100,
        step: 5,
        next: "Q13",
        answer: " ",
      },
      {
        id: "Q13",
        type: "descriptive",
        text: "Describe your main cost optimization strategy:",
        maxLength: 500,
        next: "Q14",
        answer: " ",
      },
      {
        id: "Q14",
        type: "multiple-select",
        text: "Select your primary expense categories:",
        options: [
          "Personnel",
          "Technology",
          "Marketing",
          "Logistics",
          "Facilities",
          "R&D",
        ],
        next: "Q15",
        answer: " ",
      },
      {
        id: "Q15",
        type: "range",
        text: "How many months of operating expenses do you maintain in reserves?",
        min: 0,
        max: 12,
        step: 1,
        next: "Q16",
        answer: " ",
      },
      {
        id: "Q16",
        type: "multiple-choice",
        text: "What is your financial forecasting frequency?",
        options: ["Weekly", "Monthly", "Quarterly", "Annually", "As needed"],
        next: "Q17",
        answer: " ",
      },
      {
        id: "Q17",
        type: "descriptive",
        text: "Explain your approach to risk management:",
        maxLength: 1000,
        next: "Q18",
        answer: " ",
      },
      {
        id: "Q18",
        type: "multiple-choice",
        text: "How do you handle tax optimization?",
        options: [
          "In-house team",
          "External consultants",
          "Software solutions",
          "No specific strategy",
        ],
        next: "Q19",
        answer: " ",
      },
      {
        id: "Q19",
        type: "range",
        text: "Percentage of budget allocated to technology upgrades:",
        min: 0,
        max: 50,
        step: 1,
        next: "Q20",
        answer: " ",
      },
      {
        id: "Q20",
        type: "multiple-select",
        text: "Select your sustainability initiatives:",
        options: [
          "Energy efficiency",
          "Waste reduction",
          "Carbon offset",
          "Sustainable sourcing",
          "None",
        ],
        next: null,
        answer: " ",
      },
    ],
    manufacturing: [
      {
        id: "Q1",
        type: "multiple-choice",
        text: "What type of manufacturing process do you use?",
        options: ["Discrete", "Process", "Job Shop", "Batch"],
        next: "Q2",
        answer: " ",
      },
      {
        id: "Q2",
        type: "range",
        text: "Average production lead time (days):",
        min: 1,
        max: 365,
        step: 1,
        next: "Q3",
        answer: " ",
      },
      {
        id: "Q3",
        type: "descriptive",
        text: "Describe your quality control process:",
        maxLength: 500,
        next: "Q4",
        answer: " ",
      },
      {
        id: "Q4",
        type: "multiple-select",
        text: "Select your primary production technologies:",
        options: [
          "CNC Machining",
          "3D Printing",
          "Robotics",
          "Manual Assembly",
          "Automation",
        ],
        next: "Q5",
        answer: " ",
      },
      {
        id: "Q5",
        type: "multiple-choice",
        text: "What is your average equipment utilization rate (%)?",
        options: ["< 50%", "50% - 75%", "75% - 90%", "> 90%"],
        next: "Q6",
        answer: " ",
      },
      {
        id: "Q6",
        type: "range",
        text: "Percentage of defective products:",
        min: 0,
        max: 100,
        step: 1,
        next: "Q7",
        answer: " ",
      },
      {
        id: "Q7",
        type: "descriptive",
        text: "Explain your supply chain management strategy:",
        maxLength: 400,
        next: "Q8",
        answer: " ",
      },
      {
        id: "Q8",
        type: "multiple-choice",
        text: "What is your primary sourcing strategy?",
        options: [
          "Local Suppliers",
          "Global Suppliers",
          "In-house Production",
          "Mixed",
        ],
        next: "Q9",
        answer: " ",
      },
      {
        id: "Q9",
        type: "range",
        text: "Average time to market (months):",
        min: 1,
        max: 24,
        step: 1,
        next: "Q10",
        answer: " ",
      },
      {
        id: "Q10",
        type: "multiple-select",
        text: "Select your key performance indicators (KPIs):",
        options: [
          "Overall Equipment Effectiveness (OEE)",
          "First Pass Yield",
          "Production Volume",
          "Cost per Unit",
          "On-time Delivery Rate",
        ],
        next: "Q11",
        answer: " ",
      },
      {
        id: "Q11",
        type: "multiple-choice",
        text: "What is your primary business model?",
        options: ["B2B", "B2C", "B2B2C", "Other"],
        next: "CQ2",
        answer: " ",
      },
      {
        id: "Q12",
        type: "range",
        text: "What percentage of revenue goes to operational costs?",
        min: 0,
        max: 100,
        step: 5,
        next: "Q13",
        answer: " ",
      },
      {
        id: "Q13",
        type: "descriptive",
        text: "Describe your main cost optimization strategy:",
        maxLength: 500,
        next: "Q14",
        answer: " ",
      },
      {
        id: "Q14",
        type: "multiple-select",
        text: "Select your primary expense categories:",
        options: [
          "Personnel",
          "Technology",
          "Marketing",
          "Logistics",
          "Facilities",
          "R&D",
        ],
        next: "Q15",
        answer: " ",
      },
      {
        id: "Q15",
        type: "range",
        text: "How many months of operating expenses do you maintain in reserves?",
        min: 0,
        max: 12,
        step: 1,
        next: "Q16",
        answer: " ",
      },
      {
        id: "Q16",
        type: "multiple-choice",
        text: "What is your financial forecasting frequency?",
        options: ["Weekly", "Monthly", "Quarterly", "Annually", "As needed"],
        next: "Q17",
        answer: " ",
      },
      {
        id: "Q17",
        type: "descriptive",
        text: "Explain your approach to risk management:",
        maxLength: 1000,
        next: "Q18",
        answer: " ",
      },
      {
        id: "Q18",
        type: "multiple-choice",
        text: "How do you handle tax optimization?",
        options: [
          "In-house team",
          "External consultants",
          "Software solutions",
          "No specific strategy",
        ],
        next: "Q19",
        answer: " ",
      },
      {
        id: "Q19",
        type: "range",
        text: "Percentage of budget allocated to technology upgrades:",
        min: 0,
        max: 50,
        step: 1,
        next: "Q20",
        answer: " ",
      },
      {
        id: "Q20",
        type: "multiple-select",
        text: "Select your sustainability initiatives:",
        options: [
          "Energy efficiency",
          "Waste reduction",
          "Carbon offset",
          "Sustainable sourcing",
          "None",
        ],
        next: null,
        answer: " ",
      },
    ],
  }),
  actions: {
    updateAnswer(industry, questionId, answer) {
      // Get the questions array for the specified industry
      const industryQuestions = this[industry.toLowerCase()];

      if (!industryQuestions) {
        console.error(`Invalid industry: ${industry}`);
        return;
      }

      // Find the question index
      const questionIndex = industryQuestions.findIndex(
        (q) => q.id === questionId
      );

      if (questionIndex === -1) {
        console.error(
          `Question ${questionId} not found in ${industry} questions`
        );
        return;
      }

      // Update the answer while maintaining reactivity
      industryQuestions[questionIndex].answer = answer;
    },
    saveQuestionnaireData(industry) {
      try {
        // Create a clean copy of the data to save
        const dataToSave = {
          industry: industry,
          questions: JSON.parse(JSON.stringify(this[industry])), // Deep clone the array
          timestamp: new Date().toISOString(),
        };

        // Stringify and store in localStorage
        localStorage.setItem("questionnaireData", JSON.stringify(dataToSave));
        console.log("Questionnaire data saved successfully:", dataToSave);
      } catch (error) {
        console.error("Failed to save questionnaire data:", error);
      }
    },
  },
});
