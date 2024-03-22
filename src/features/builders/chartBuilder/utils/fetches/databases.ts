import axios from 'axios'

export const fetchDatabases = async () => {
  const response = await axios.get(`${process.env.VITE_API_BASE_URL}/api/database-info/databases`)
  const data = response.data

  return data
}

export const fetchTables = async (databaseName: String) => {
  const response = await axios.get(`${process.env.VITE_API_BASE_URL}/api/database-info/${databaseName}/tables`)
  const data = response.data

  return data
}
