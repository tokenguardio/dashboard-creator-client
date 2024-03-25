/***
 *
 *   CHART BUILDER
 *
 **********/

import React, { useContext, useState, useEffect } from 'react'
import { toast } from 'react-toastify'

import { BlockChartContext } from '@/contexts/BlockChartContext'
import { DashboardContentContext } from '@/contexts/DashboardContentContext'
import { Button } from '@/components/button/Button'
import { fetchElementDataBasicQuery } from '@/utils/fetches/dashboard'
import { checkDifferential } from '@/utils/helpers'

import { useDatabases } from './hooks/useDatabases'
import { fetchColumns } from './utils/fetches/column'
import { Window } from './components/Window'
import { ResultView } from './components/ResultView'
import { TopBar } from './components/TopBar'
import { fetchTables } from './utils/fetches/databases'
import { ListOfData } from './components/ListOfData'
import Style from './ChartBuilder.module.css'

export function ChartBuilder() {
  const [result, setResult] = useState()
  const [chartType, setChartType] = useState('lineChart')
  const [chartTitle, setChartTitle] = useState('Default Chart Name')
  const [databasesData, setDatabasesData] = useState([])
  const [dataExplorer, setDataExplorer] = useState([])
  const [selectedData, setSelectedData] = useState()
  const [schemaParam, setSchemaParam] = useState()
  const [tableParam, setTableParam] = useState()
  const [databaseParam, setDatabaseParam] = useState()
  const [dimensionValidText, setDimensionValidText] = useState()
  const [measuresValidText, setMeasuresValidText] = useState()  
  const [isAgregateOptionsVisible, setIsAgregateOptionsVisible] = useState(false)
  const blockChartContext = useContext(BlockChartContext)
  const dashboardContentContext = useContext(DashboardContentContext)
  
  if (!blockChartContext) {
    throw Error('Chart context has to be in provider')
  }

  if (!dashboardContentContext) {
    throw Error('Dashboard context has to be in provider')
  }

  const { blockChartId, _setBlockChartId } = blockChartContext
  const {
    dashboardElements,
  } = dashboardContentContext
  const { databases } = useDatabases()

  const handleTable = (e) => {
    const databaseName = e.currentTarget.getAttribute('data-value')
    const selectedDatabase = databasesData.filter(item => item.datname === databaseName)
    if (!selectedDatabase.isExpanded) {
        const fetchData = async () => {
          try {
            const result = await fetchTables(databaseName)
            const updatedDataExplorer = databasesData.map(item => {
              if (item.datname === databaseName) {
                return (
                  {
                    ...item,
                    isExpanded: !item.isExpanded
                  }
                )
              } else {
                return (
                  {
                    ...item,
                  }
                )
              }
            })
            setDatabasesData(updatedDataExplorer)
            setDatabaseParam(databaseName)
            const modifiedResult = result.data.map(item => {
              return (
                {
                  ...item,
                  columns: [],
                  isExpanded: false,
                }
              )
            })
            setDataExplorer(modifiedResult)
          } catch (err) {
            toast.error('Loading tables failed')
          }
        } 

        fetchData()
    } else {
      const updatedDataExplorer = databasesData.map(item => {
        if (item.datname === dataValue) {
          return (
            {
              ...item,
              isExpanded: !item.isExpanded
            }
          )
        } else {
          return (
            {
              ...item,
            }
          )
        }
      })
      setDatabasesData(updatedDataExplorer)
    }
  }

  const handlePosition = (e) => {
    const dataValue = e.currentTarget.getAttribute('data-value')
    const schemaValue = e.currentTarget.getAttribute('data-schema')
    const databaseValue = e.currentTarget.getAttribute('data-database')
    setSchemaParam(schemaValue)
    const selectedTable = dataExplorer.filter(item => item.table_name === dataValue)
    if (!selectedTable[0].columns.length > 0 && dataValue && schemaValue) {
      try {
        const fetchData = async () => {
          const result = await fetchColumns(databaseValue, dataValue, schemaValue)
          const updatedDataExplorer = dataExplorer.map(item => {
            if (item.table_name === dataValue) {
              return (
                {
                  ...item,
                  columns: result.data,
                  isExpanded: !item.isExpanded
                }
              )
            } else {
              return (
                {
                  ...item,
                }
              )
            }
          })
          setDataExplorer(updatedDataExplorer)
        } 

        fetchData()
      } catch (err) {
        toast.error('Loading columns failed')
      }
    } else {
      const modifiedExplorer = dataExplorer.map(item => {
        if (item.table_name === dataValue) {
          return (
            {
              ...item,
              isExpanded: !item.isExpanded
            }
          )
        } else {
          return (
            {
              ...item,
            }
          )
        }
      })
      setDataExplorer(modifiedExplorer)
    }
  }

  const handleColumn = (tableName, columnName, type, optionValue) => {
    setTableParam(tableName)
    if (!selectedData || tableName !== selectedData.table) {
      if (type === 'dimension') {
        setSelectedData({
          table: tableName,
          dimension: columnName
        })
      } else{
        setSelectedData({
          table: tableName,
          measures: [
            {
              columnName: columnName,
              operator: optionValue
            }
          ]
        })
      }
    } else {
      if (type === 'dimension') {
        if (selectedData?.dimension === columnName && !selectedData?.differential) {
          if (!selectedData?.measures || selectedData?.measures?.length === 0) {
            setDimensionValidText()
            setSelectedData()
          } else {
            setDimensionValidText()
            setSelectedData(prevState => {
              let modifiedState = prevState
              delete modifiedState.dimension
              return (
                {
                  ...modifiedState
                }
              )
            })
          }

        } else if (selectedData?.dimension === columnName && selectedData?.differential) {
          setDimensionValidText()
          setSelectedData(prevState => {
            let modifiedState = { ...prevState }
            modifiedState.dimension = modifiedState.differential
            delete modifiedState.differential
            return (
              {
                ...modifiedState
              }
            )
          })
        } else if (selectedData?.dimension !== columnName && selectedData?.differential && columnName !== selectedData?.differential) {
          setDimensionValidText('Max. number of (X) selected')
        } else if (selectedData?.dimension && selectedData?.dimension !== columnName && !selectedData?.differential && (selectedData?.measures?.length < 2 || !selectedData.measures)) {
          setDimensionValidText()
          setSelectedData(
            prevState => ({
              ...prevState,
              differential: columnName
            })
          )
        } else if (!selectedData?.dimension && selectedData?.measures?.length > 0) {
          setDimensionValidText()
          setSelectedData(
            prevState => ({
              ...prevState,
              dimension: columnName
            })
          )
        } else if (selectedData?.dimension !== columnName && !selectedData?.differential && selectedData?.measures?.length > 1) {
          setDimensionValidText('Max. number of (X) selected')
        } else if (selectedData?.dimension !== columnName && selectedData?.differential === columnName) {
          setDimensionValidText()
          setSelectedData(prevState => {
            let modifiedState = prevState
            delete modifiedState.differential
            return (
              {
                ...modifiedState
              }
            )
          })
        }
      } else {
        if (selectedData?.measures && selectedData.measures.some(obj => obj.columnName === columnName)) {
          const modifiedMeasures = selectedData.measures.filter(item => item.columnName !== columnName)
            if (selectedData.measures.some(obj => obj.operator === optionValue)) {
              if (modifiedMeasures.length === 0 && !selectedData.dimension) {
                setMeasuresValidText()
                setSelectedData()
              } else {
                setMeasuresValidText()
                setSelectedData(prevState => {
                  return (
                    {
                      ...prevState,
                      measures: modifiedMeasures.length === 0 ? undefined : modifiedMeasures
                    }
                  )
                })
              }
            } else {
              setSelectedData(prevState => {
                return (
                  {
                    ...prevState,
                    measures: [
                      ...modifiedMeasures,
                      {
                        columnName: columnName,
                        operator: optionValue
                      }
                    ]
                  }
                )
              })
            }
        } else {
          let modifiedMeasures
          if (selectedData.measures && !selectedData.differential) {
            setMeasuresValidText()
            modifiedMeasures = [
              ...selectedData?.measures,
              {
                columnName: columnName,
                operator: optionValue
              }
            ]
          } else if (selectedData.measures && selectedData.differential) {
            setMeasuresValidText('Max. number of (Y) selected')
            return (
              setSelectedData(prevState => prevState)
            )
          } else {
            setMeasuresValidText()
            modifiedMeasures = [
              {
                columnName: columnName,
                operator: optionValue
              }
            ]
          }
          return (
            setSelectedData(prevState => {
              return (
                {
                  ...prevState,
                  measures: modifiedMeasures
                }
              )
            })
          )
        }
      }
    }
  }

  const handleQuery = () => {
    const fetchDataQuery = async () => {
      try {
        const bodyRequest = {
          dimension: selectedData.dimension,
          measures: selectedData.measures,
          filters: []
        }
        if (selectedData.differential) {
          bodyRequest.differential = selectedData.differential
        }

        const result = await fetchElementDataBasicQuery(databaseParam, schemaParam, tableParam, bodyRequest)
        setResult(checkDifferential(result.data))
      } catch (err) {
        toast.error('Sending query failed')
      }
    }

    fetchDataQuery()
  }

  useEffect(() => {
    if (databases) {
      const editedChartElement = dashboardElements.filter(item => item.id === blockChartId)[0]
      const modifiedDatabasesData = databases.map(database => {

        return (
          {
            ...database,
            isExpanded: database.datname === editedChartElement?.dbname ? true : false,
          }
        )
      })

      setDatabasesData(modifiedDatabasesData)

      if (editedChartElement) {
        const fetchData = async () => {
          try {
            const responseOfTables = await fetchTables(editedChartElement.dbname)
            const responseOfColumns = await fetchColumns(editedChartElement.dbname, editedChartElement.table, editedChartElement.schema)
            const measuresWithoutId = editedChartElement.measures.map(item => {
              delete item._id
        
              return (
                {
                  ...item,
                }
              )
            })
        
            const bodyRequest = {
              dimension: editedChartElement.dimension,
              measures: measuresWithoutId,
              filters: []
            }
            if (editedChartElement.differential) {
              bodyRequest.differential = editedChartElement.differential
            }
    
            const responseOfChartData = await fetchElementDataBasicQuery(
              editedChartElement.dbname,
              editedChartElement.schema,
              editedChartElement.table,
              bodyRequest
            )
            setResult(checkDifferential(responseOfChartData.data))
            setDatabaseParam(editedChartElement.dbname)
            setTableParam(editedChartElement.table)
            setSchemaParam(editedChartElement.schema)
            const modifiedResponse = responseOfTables.data.map(item => {
              return (
                {
                  ...item,
                  columns: item.table_name === editedChartElement.table ? responseOfColumns.data : [],
                  isExpanded: item.table_name === editedChartElement.table ? true : false,
                }
              )
            })
            setDataExplorer(modifiedResponse)
            setChartTitle(editedChartElement.title)
            setChartType(editedChartElement.visType)
            setSelectedData({
              table: editedChartElement.table,
              dimension: editedChartElement.dimension,
              differential: editedChartElement.differential,
              measures: editedChartElement.measures,
            })
          } catch (err) {
            toast.error('Loading Explorer failed')
          }
        } 

        fetchData()
      }
    }
  }, [
    databases,
    blockChartId,
    dashboardElements,
  ])

  const checkDimensionColumn = (table, column) => {
    if (selectedData?.table === table) {
      if (selectedData?.dimension === column) {

        return 'dimension'
      }

      if (selectedData?.differential === column) {

        return 'differential'
      }

      return null
    } else {
      return null
    }
  }

  const checkMeasureColumn = (table, column) => {

    if (selectedData?.table === table) {
      if (selectedData?.measures && selectedData?.measures?.length > 0) {
        const verifiedMeasures = selectedData?.measures.filter(item => item.columnName === column)
        if (verifiedMeasures) {
          return verifiedMeasures[0]
        }

        return null
      } else {
        return null
      }
    } else {
      return null
    }
  }

  const calcSelectedItems = (tableName) => {

    function countIndexes() {
      let totalIndexes = 0
      if (selectedData?.table === tableName) {
        totalIndexes += selectedData?.measures?.length || 0
        if (selectedData?.differential) {
          totalIndexes += 2
        } else {
          totalIndexes += 1
        }
      }
  
      return totalIndexes
    }

    const result = countIndexes()

    return result === 0 ? '' : result
  }

  const resetBuilder = () => {
    setResult()
    setSelectedData()
  }

  return (
    <Window>
      <TopBar
        result={result}
        chartTitle={chartTitle}
        setChartTitle={setChartTitle}
        resetBuilder={resetBuilder}
        selectedData={selectedData}
        chartType={chartType}
        handleQuery={handleQuery}
        databaseParam={databaseParam}
        tableParam={tableParam}
        schemaParam={schemaParam}
      />
      <div className={Style['builder-container']}>
        <ListOfData
          databasesData={databasesData}
          handlePosition={handlePosition}
          calcSelectedItems={calcSelectedItems}
          selectedData={selectedData}
          handleColumn={handleColumn}
          checkDimensionColumn={checkDimensionColumn}
          handleTable={handleTable}
          checkMeasureColumn={checkMeasureColumn}
          setIsAgregateOptionsVisible={setIsAgregateOptionsVisible}
          isAgregateOptionsVisible={isAgregateOptionsVisible}
          dataExplorer={dataExplorer}
          dimensionValidText={dimensionValidText}
          measuresValidText={measuresValidText}
        />
        <div className={Style['preview']}>
          {selectedData?.dimension && selectedData?.measures?.length > 0 && !result && (
            <div className={Style['prevew-content-container']}>
              <p className={Style['preview-paragraph']}>Run the query to display a visualization</p>
              <Button onClick={() => handleQuery()}>Run Query</Button>
            </div>
          )}
          {!selectedData && !result && (
            <div className={Style['prevew-content-container']}>
              <p className={Style['preview-paragraph']}>Select an explore to continue</p>
            </div>
          )}
          {result && (
            <ResultView
              data={result}
              chartType={chartType}
              setChartType={setChartType}
              chartTitle={chartTitle}
            />
          )}
        </div>
      </div>
    </Window>
  )
}
