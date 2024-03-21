import axios from 'axios'

export const fetchDashboards = async () => {
  const response = await axios.get(`${process.env.VITE_API_BASE_URL}/api/dashboard/all`)
  const data = response.data

  return data
}
