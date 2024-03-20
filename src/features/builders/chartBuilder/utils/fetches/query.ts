import axios from 'axios'

export const fetchQuery = async (database, schema, table, bodyRequest) => {
  const response = await axios.post(`${process.env.VITE_API_BASE_URL}/api/database-info/generate-chart-data/${database}/${schema}/${table}`, bodyRequest)
  const data = response.data

  return data
}
