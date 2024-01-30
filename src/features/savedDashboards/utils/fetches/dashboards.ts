import axios from 'axios'

export const fetchDashboards = async () => {
  const response = await axios.get(`${process.env.API_BASE_URL}/api/dashboard/all`)
  const data = response.data

  return data
}