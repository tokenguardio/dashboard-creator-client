import axios from 'axios'

export const fetchDashboard = async (id: string) => {
  const response = await axios.get(`${process.env.API_BASE_URL}/api/dashboard/${id}`)
  const data = response.data

  return data
}

export const fetchElementDataCustomQuery = async (dashboardId, formattedElementId, requestBody) => {
  const response = await axios.post(
    `${process.env.API_BASE_URL}/api/dashboard/${dashboardId}/element/${formattedElementId}/exec`,
    requestBody
  )

  return response.data
}

export const fetchElementDataBasicQuery = async (database, schema, table, bodyRequest) => {
  const response = await axios.post(`${process.env.API_BASE_URL}/api/database-info/generate-chart-data/${database}/${schema}/${table}`, bodyRequest)
  const data = response.data

  return data
}