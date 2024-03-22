/***
 *
 *   CHART BUILDER
 *
 **********/

import React, { useContext, useState, useEffect } from 'react'
import { toast } from 'react-toastify'

import { BlockChartContext } from '@/contexts/BlockChartContext'
import { DashboardContentContext } from '@/contexts/DashboardContentContext'
import { Icon } from '@/components/icon/Icon'
import { Button } from '@/components/button/Button'
import { Dropdown } from '@/components/dropdown/Dropdown'
import { fetchElementDataBasicQuery } from '@/utils/fetches/dashboard'

import { useDatabases } from './hooks/useDatabases'
import { fetchColumns } from './utils/fetches/column'
import { Window } from './components/Window'
import { ResultView } from './components/ResultView'
import { TopBar } from './components/TopBar'
import { agregateOptions } from './utils/constans'
import { fetchTables } from './utils/fetches/databases'
import Style from './ChartBuilder.module.css'

export function ChartBuilder() {
  const [result, setResult] = useState()
  const [chartType, setChartType] = useState('lineChart')
  const [chartTitle, setChartTitle] = useState('Default Chart Name')
  const [databasesData, setDatabasesData] = useState([])
  const [dataExplorer, setDataExplorer] = useState([])
  const [selectedData, setSelectedData] = useState([])
  const [schemaParam, setSchemaParam] = useState()
  const [tableParam, setTableParam] = useState()
  const [columnParam, setColumnParam] = useState()
  const [databaseParam, setDatabaseParam] = useState()
  const [dimension, setDimension] = useState()
  const [agregate, setAgregate] = useState()
  const [dimensionValidationText, setDimensionValidationText] = useState()
  const [measure, setMeasure] = useState()
  const [isAgregateOptionsVisible, setIsAgregateOptionsVisible] = useState(false)
  const [columns, setcolumns] = useState({})
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

  const handleMeasure = (tableName, columnName, optionValue) => {
    if (selectedData.length === 0) {
      const firstObj = {
        table: tableName,
        measures: [
          {
            columnName: columnName,
            operator: optionValue
          }
        ],
      }

      const modifiedSelectedData = [ firstObj ]

      setSelectedData(modifiedSelectedData)
    } else {
      const modifiedSelectedData = selectedData.map(item => {
        if (tableName === item.table) {
          if (item?.measures && item.measures.some(obj => obj.columnName === columnName)) {
              const modifiedMeasures = item.measures.filter(item => item.columnName !== columnName)
              if (item.measures.some(obj => obj.operator === optionValue)) {
                if (modifiedMeasures.length === 0 && (!item.dimension || item.dimension?.length === 0)) {
                  return
                } else {
                  return (
                    {
                      ...item,
                      measures: modifiedMeasures
                    }
                  )
                }
              } else {
                return (
                  {
                    ...item,
                    measures: [
                      ...modifiedMeasures,
                      {
                        columnName: columnName,
                        operator: optionValue
                      }
                    ]
                  }
                )
              }
          } else {
            let modifiedMeasures
            if (item.measures) {
              modifiedMeasures = [
                ...item?.measures,
                {
                  columnName: columnName,
                  operator: optionValue
                }
              ]
            } else {
              modifiedMeasures = [
                {
                  columnName: columnName,
                  operator: optionValue
                }
              ]
            }
            return (
              {
                ...item,
                measures: modifiedMeasures
              }
            )
          }
        } else {
          return (
            {
              table: tableName,
              dimension: [columnName],
            }
          )
        }
      })  
      const removedNotExistData = modifiedSelectedData.filter(item => item !== undefined)
      setSelectedData(removedNotExistData)
    }
  }

  const handleDimension = (tableName, columnName) => {
    setDimension(columnName)
    setTableParam(tableName)
    setColumnParam(columnName)

    if (selectedData.length === 0) {
      const firstObj = {
        table: tableName,
        dimension: [columnName],
      }

      const modifiedSelectedData = [ firstObj ]
      setSelectedData(modifiedSelectedData)
    } else {
      const modifiedSelectedData = selectedData.map(item => {
        if (tableName === item.table) {
          if (item.dimension && item.dimension.includes(columnName)) {
            const modifiedDimension = item.dimension.filter(item => item !== columnName)
            if (modifiedDimension.length === 0 && (!item.measures || item.measures?.length === 0)) {
              return
            } else {
              return (
                {
                  ...item,
                  dimension: modifiedDimension
                }
              )
            }
          } else {
            let modifiedDimension
            if (item.dimension) {
              modifiedDimension = [ ...item?.dimension, columnName ]
            } else {
              modifiedDimension = [ columnName ]
            }

            return (
              {
                ...item,
                dimension: modifiedDimension
              }
            )
          }
        } else {
          return (
            {
              table: tableName,
              dimension: [columnName],
            }
          )
        }
      })  
      const removedNotExistData = modifiedSelectedData.filter(item => item !== undefined)
      setSelectedData(removedNotExistData)
    }
  }

  const handleQuery = () => {
    try {
      const fetchDataQuery = async () => {
        const bodyRequest = {
          dimension: selectedData[0].dimension[0],
          measures: selectedData[0].measures,
          filters: []
        }
        if (selectedData[0].dimension[1]) {
          bodyRequest.differential = selectedData[0].dimension[1]
        }

        const result = await fetchElementDataBasicQuery(databaseParam, schemaParam, tableParam, bodyRequest)
        setResult(result.data)
      }

      fetchDataQuery()
    } catch (err) {
      toast.error('Sending query failed')
    }
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
            setResult(responseOfChartData.data)
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
            setSelectedData([{
              table: editedChartElement.table,
              dimension: [ editedChartElement.dimension ],
              measures: editedChartElement.measures,
            }])
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
    const filteredData = selectedData.filter(item => item.table === table)
    if (filteredData && filteredData.length > 0) {
      if (filteredData[0]?.dimension) {
        const test = filteredData[0]?.dimension.filter(item => item === column)

        if (test.length > 0) {
          return true
        }
        return false
      } else {
        return false
      }
    } else {
      return false
    }
  }

  const checkMeasureColumn = (table, column) => {

    const filteredData = selectedData.filter(item => item.table === table)
    if (filteredData && filteredData.length > 0) {
      if (filteredData[0]?.measures) {
        const test = filteredData[0]?.measures.filter(item => item.columnName === column)
        if (test) {
          return test[0]
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
    const tableToCalc = selectedData.filter(item => item.table === tableName)

    function countIndexes(arr) {
      let totalIndexes = 0;
  
      arr.forEach(obj => {
          if (Array.isArray(obj.dimension)) {
              totalIndexes += obj.dimension.length;
          }
  
          if (Array.isArray(obj.measures)) {
              totalIndexes += obj.measures.length;
          }
      });
  
      return totalIndexes;
    }

    const result = countIndexes(tableToCalc)

    return result === 0 ? '' : result
  }

  const resetBuilder = () => {
    setResult()
    setSelectedData([])
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
        <div className={Style['list']}>
          <ul className={Style['list-of-databases']}>
              {databasesData.length > 0 && (
                databasesData.map((database, index) => (
                  <li
                    className={Style['database-list-item']}
                    key={`${database?.datname} ${index}`}
                  >
                    <div
                      className={Style['database-title-container']}
                      onClickCapture={(e) => handleTable(e)}
                      data-value={database.datname}
                    >
                      <p className={Style['database-title']}>
                        {database.datname}
                      </p>
                    </div>
                    {database.isExpanded && (
                      <ul className={Style['list-of-tables']}>
                        {dataExplorer.length > 0 && (
                          dataExplorer.map((table, index) => (
                            <li
                              className={Style['table-list-item']}
                              key={`${table?.table_name} ${index}`}
                            >
                              <div
                                className={selectedData.some(obj => obj?.table === table?.table_name) ? `${Style['table-title-container']} ${Style['table-title-frame']}` : Style['table-title-container']}
                                onClickCapture={(e) => handlePosition(e)}
                                data-value={table.table_name}
                                data-schema={table.table_schema}
                                data-database={database.datname}
                              >
                                <p className={selectedData.some(obj => obj?.table === table?.table_name) ? Style['table-title-active'] : Style['table-title']}>
                                  {table.table_name}
                                </p>
                                <p className={Style['table-selected-value']}>
                                  {calcSelectedItems(table.table_name)}
                                </p>
                              </div>
                              {table.isExpanded && (
                                <>
                                  <p className={Style['list-description']}>
                                    Dimensions:
                                    <span className={Style['additional-text']}>
                                      &nbsp; (X Axis)
                                    </span>
                                  </p>
                                  <p className={Style['validation-text']}>
                                    {dimensionValidationText}
                                  </p>
                                  <ul className={Style['list-of-columns']}>
                                    {table.columns.map(item => {
                                      if (item.isDimension) {
                                        return (
                                          <li
                                            className={checkDimensionColumn(table.table_name, item.column_name) ? `${Style['active-dimension']} ${Style['column-list-item']}` : Style['column-list-item']}
                                            key={item.column_name}
                                            onClick={() => handleDimension(table.table_name, item.column_name)}
                                          >
                                            <p className={Style['column-title']}>{item.column_name}</p>
                                          </li>
                                        )
                                      }
                                    })}
                                  </ul>
                                </>
                              )}
                              {table.isExpanded && (
                                <>
                                  <p className={Style['list-description']}>
                                    Measures:
                                    <span className={Style['additional-text']}>
                                      &nbsp; (Y Axis)
                                    </span>
                                  </p>
                                  <ul className={Style['list-of-columns']}>
                                    {table.columns.map(item => {
                                      if (item.isMeasure) {
                                        const selectedOption = checkMeasureColumn(table.table_name, item.column_name)
                                        return (
                                          <li
                                            className={selectedOption ? 
                                              `${Style['active-measure']} ${Style['column-list-item']}` 
                                              : Style['column-list-item']
                                            }
                                            key={item.column_name}
                                            onClick={() => setIsAgregateOptionsVisible(!isAgregateOptionsVisible)}
                                          >
                                            <Dropdown
                                              title="Agregate"
                                              options={agregateOptions.map(option => {
                                                return (
                                                  {
                                                    ...option,
                                                    type: selectedOption?.operator === option.value ? 'selected' : null,
                                                    action: () => handleMeasure(table.table_name, item.column_name, option.value)
                                                  }
                                                )
                                              })}
                                              id={item.column_name}
                                              position="bottom"
                                            >
                                              <div className={Style['measure-text-container']}>
                                                <p className={Style['column-title']}>
                                                  {item.column_name}
                                                </p>
                                                  {selectedOption && (
                                                    <div className={Style['measure-icon-frame']}>
                                                      <Icon name={selectedOption.operator} width="12" height="12" />
                                                    </div>
                                                  )}
                                              </div>
                                            </Dropdown>
                                          </li>
                                        )
                                      }
                                    })}
                                  </ul>
                                </>
                              )}
                            </li>
                          ))
                        )}
                      </ul>
                    )}
                  </li>
                ))
              )}
            </ul>
        </div>
        <div className={Style['preview']}>
          {selectedData.length > 0 && !result && (
            <div className={Style['prevew-content-container']}>
              <p className={Style['preview-paragraph']}>Run the query to display a visualization</p>
              <Button onClick={() => handleQuery()}>Run Query</Button>
            </div>
          )}
          {!selectedData || selectedData.length === 0 && !result && (
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
