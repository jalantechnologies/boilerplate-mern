import { fetchSellerPerformanceReportData } from './fetch-seller-performance-report-data';
import { generateAiResponse } from './generate-ai-response';

const rulePrompt = `You are an intelligent assistant responsible for evaluating account health and performance metrics. Based on the rules provided below, evaluate the given dataset and make sure to remember onto which rule does the task needs to be created and return a JSON response strictly in the specified format. No extra text should be included in the output.

---

## Rules for Evaluation:

1. **Account Health Status**:
   - Description: Measures overall account performance.
   - Condition: If there is a negative term like warned or critical in {{ account_health_rating_ahr_status }} of given dataset, it should be considered as unhealthy and a task should be created in teamworks, else no need to create a task for this.
   - Additional Step: When unhealthy, also validate all the other metrics below and apply their individual rules.

2. **Pre-Fulfillment Cancellation Rate**:
   - Description: Rate of orders canceled before fulfillment.
   - Condition: If the metric {{ pre_fulfillment_cancellation_rate_rate }} is greater than the metric {{ pre_fulfillment_cancellation_rate_target_value }} in the given dataset, a task should be created in teamworks, else no need to create a task for this.

3. **Order Defect Rate**:
   - Description: Rate of orders with defects like negative feedback, A-to-Z claims, or chargebacks.
   - Condition: If the metric {{ order_defect_rate_afn_rate }} is greater than the metric {{ order_defect_rate_afn_target_value }} in the given dataset, a task should be created in teamworks, else no need to create a task for this.

4. **Valid Tracking Rate**:
   - Description: Measures if shipments have valid tracking info.
   - Condition: If the metric {{ valid_tracking_rate_rate }} is less than the metric {{ valid_tracking_rate_target_value }} in the given dataset, a task should be created in teamworks, else no need to create a task for this.

5. **Late Shipment Rate**:
   - Description: Tracks shipments sent after expected time.
   - Condition: If the metric {{ late_shipment_rate_rate }} is greater than the metric {{ late_shipment_rate_target_value }} in the given dataset, a task should be created in teamworks, else no need to create a task for this.

---
`;

const expectedOutputPrompt = `
## Expected Output Format:

You must only return a JSON object strictly in the following json structure:

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
//   const accountId = 1678140;
//   const reportDate = '2025-01-01';

  // Details of the report with critical ahr status and good for rest, 1 task need to be created
//   const accountId = 2472320;
//   const reportDate = '2025-03-18';

  // Details of the report with critical ahr status and good for rest, 1 task need to be created
  const accountId = 1739090;
  const reportDate = '2024-01-03';

  const sellerPerformanceReportData = await fetchSellerPerformanceReportData(
    accountId,
    reportDate
  );
  console.log('Fetched rows:', sellerPerformanceReportData);

  const datasetPrompt = `Here is the respective dataset that needs to be evaluated upon: ${JSON.stringify(sellerPerformanceReportData)}.`

  const prompt = `${rulePrompt} ${datasetPrompt} ${expectedOutputPrompt}`;

  const response = await generateAiResponse(prompt);
  console.log('Generated AI response:', response);
};

run().catch(console.error);
