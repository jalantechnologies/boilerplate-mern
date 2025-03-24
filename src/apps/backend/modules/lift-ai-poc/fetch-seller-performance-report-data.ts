import { BigQuery } from '@google-cloud/bigquery';

const bigquery = new BigQuery({
  projectId: 'darrell-test-intentwise',
  keyFilename: './bigquery-credentials.json',
});

export const fetchSellerPerformanceReportData = async (
  accountId: number,
  reportDate: string
) => {
  const reportQuery = `
    SELECT *
    FROM \`darrell-test-intentwise.amazon_source_data.sellercentral_sellerperformance_report\`
    WHERE account_id = @accountId AND report_date = @reportDate
    LIMIT 1
  `;

  const options = { query: reportQuery, params: { accountId, reportDate } };

  try {
    let [queryJob] = await bigquery.createQueryJob(options);
    let [queryRows] = await queryJob.getQueryResults();
    const performanceReport = queryRows[0];

    const accountHealthRatingQuery = `
      SELECT
        account_id, account_name,
        seller_performance_report_id,
        account_health_rating_ahr_status,
      FROM \`darrell-test-intentwise.amazon_source_data.sellercentral_sellerperformance_policycompliance_report\`
      WHERE
        seller_performance_report_id = ${performanceReport.id}
    `;

    [queryJob] = await bigquery.createQueryJob({
      query: accountHealthRatingQuery,
    });
    [queryRows] = await queryJob.getQueryResults();
    const account_health_rating_ahr_status =
      queryRows[0].account_health_rating_ahr_status;

    const shippingPerformanceQuery = `
      SELECT
        account_id, account_name,
        seller_performance_report_id,
        pre_fulfillment_cancellation_rate_rate,
        pre_fulfillment_cancellation_rate_target_value,
        valid_tracking_rate_rate,
        valid_tracking_rate_target_value,
        late_shipment_rate_rate,
        late_shipment_rate_target_value,
      FROM \`darrell-test-intentwise.amazon_source_data.sellercentral_sellerperformance_shippingperformance_report\`
      WHERE
        seller_performance_report_id = ${performanceReport.id}
    `;

    [queryJob] = await bigquery.createQueryJob({
      query: shippingPerformanceQuery,
    });
    [queryRows] = await queryJob.getQueryResults();
    const pre_fulfillment_cancellation_rate_rate =
      queryRows[0].pre_fulfillment_cancellation_rate_rate;
    const pre_fulfillment_cancellation_rate_target_value =
      queryRows[0].pre_fulfillment_cancellation_rate_target_value;
    const valid_tracking_rate_rate = queryRows[0].valid_tracking_rate_rate;
    const valid_tracking_rate_target_value =
      queryRows[0].valid_tracking_rate_target_value;
    const late_shipment_rate_rate =
      queryRows[0].late_shipment_rate_rate;
    const late_shipment_rate_target_value =
      queryRows[0].late_shipment_rate_target_value;

    const orderDefectRateQuery = `
      SELECT
        account_id, account_name,
        seller_performance_report_id,
        order_defect_rate_afn_rate,
        order_defect_rate_afn_target_value,
      FROM \`darrell-test-intentwise.amazon_source_data.sellercentral_sellerperformance_customerserviceperformance_report\`
      WHERE
        seller_performance_report_id = ${performanceReport.id}
    `;

    [queryJob] = await bigquery.createQueryJob({ query: orderDefectRateQuery });
    [queryRows] = await queryJob.getQueryResults();

    const order_defect_rate_afn_rate =
      queryRows[0].order_defect_rate_afn_rate;
    const order_defect_rate_afn_target_value =
      queryRows[0].order_defect_rate_afn_target_value;

    return {
      account_health_rating_ahr_status,
      pre_fulfillment_cancellation_rate_rate,
      pre_fulfillment_cancellation_rate_target_value,
      valid_tracking_rate_rate,
      valid_tracking_rate_target_value,
      late_shipment_rate_rate,
      late_shipment_rate_target_value,
      order_defect_rate_afn_rate,
      order_defect_rate_afn_target_value,
    };
  } catch (error) {
    console.error('Error querying BigQuery:', error);
    throw error;
  }
};
