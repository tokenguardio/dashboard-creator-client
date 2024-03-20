import axios from 'axios'

export const fetchDashboard = async (id: string) => {
  const response = await axios.get(`${process.env.VITE_API_BASE_URL}/api/dashboard/${id}`)
  const data = response.data

  return data
}

export const fetchDashboardDataElement = async (dashboardId, formattedElementId, requestBody) => {
  const response = await axios.post(
    `${process.env.VITE_API_BASE_URL}/api/dashboard/${dashboardId}/element/${formattedElementId}/exec`,
    requestBody
  )

  return response.data
}
