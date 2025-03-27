// import { fetchSellerPerformanceReportData } from './fetch-seller-performance-report-data';
import { generateAiResponse } from './generate-ai-response';

const rulePrompt = `You are an intelligent assistant responsible for evaluating account health and performance metrics. Based on the rules provided below, evaluate the given values inside the macros ({{}}) and make sure to remember onto which rule does the task needs to be created and return a JSON response strictly in the specified format.

---

## Rules for Evaluation:

1. **Account Health Status**:
   - Condition: If {{ WARNED }} is a WARNED or CRITICAL, it should be considered as unhealthy and a task should be created in teamworks.

2. **Pre-Fulfillment Cancellation Rate**:
   - Condition: If {{ 0.025001 }} is greater than {{ 0.025 }}, a task should be created in teamworks, else no need to create a task for this.

3. **Order Defect Rate**:
   - Condition: If {{ 0.011 }} is greater than {{ 0.01 }}, a task should be created in teamworks, else no need to create a task for this.

4. **Valid Tracking Rate**:
   - Condition: If {{ 0.90004 }} is less than {{ 0.95 }}, a task should be created in teamworks, else no need to create a task for this.

5. **Late Shipment Rate**:
   - Condition: If {{ 0.04001 }} is greater than {{ 0.04 }}, a task should be created in teamworks, else no need to create a task for this.

---
`;

const expectedOutputPrompt = `
## Expected Output Format:

You must only return a JSON object strictly in the following json structure along with short explanation:

{
  "tasksToBeCreatedFor": { # true means the task should be created, so please analyse the respective metric and create a task if it violates the condition
    "Account_Health_Status": <true|false>, # it denotes the very first rule "Account Health Status"
    "Pre_Fulfillment_Cancellation_Rate": <true|false>, # it denotes the second rule "Pre-Fulfillment Cancellation Rate"
    "Order_Defect_Rate": <true|false>, # it denotes the third rule "Order Defect Rate"
    "Valid_Tracking_Rate": <true|false>, # it denotes the fourth rule "Valid Tracking Rate"
    "Late_Shipment_Rate": <true|false> # it denotes the fifth rule "Late Shipment Rate"
  }
}`;

const run = async () => {
  // Details of the report with all good metrics, 0 tasks to be created
  // const accountId = 1234; // replace 1234 with the actual account id
  // const reportDate = '2025-01-01';

  // Details of the report with critical ahr status and good for rest, 1 task need to be created
  // const accountId = 1234; // replace 1234 with the actual account id
  // const reportDate = '2025-03-18';

  // Details of the report with critical ahr status and good for rest, 1 task need to be created
  // const accountId = 1234; // replace 1234 with the actual account id
  // const reportDate = '2024-01-03';

  // const sellerPerformanceReportData = await fetchSellerPerformanceReportData(
  //   accountId,
  //   reportDate
  // );
  // console.log('Fetched rows:', sellerPerformanceReportData);

  // const datasetPrompt = `Here is the respective dataset that needs to be evaluated upon: ${JSON.stringify(sellerPerformanceReportData)}.`

  const prompt = `${rulePrompt} ${expectedOutputPrompt}`;

  const startTime = performance.now();

  const response = await generateAiResponse(prompt);
  console.log('Generated AI response:', response);

  const endTime = performance.now();
  const duration = endTime - startTime;
  console.log('🚀 ~ run ~ duration in seconds:', duration / 1000);
};

run().catch(console.error);
