import React, { useState } from 'react'

import { Icon } from '@/components/icon/Icon'
import { Dropdown } from '@/components/dropdown/Dropdown'
import { agregateOptions } from '../utils/constans'

import Style from './ListOfData.module.css'

export const ListOfData = ({
  databasesData,
  handlePosition,
  calcSelectedItems,
  selectedData,
  handleColumn,
  checkDimensionColumn,
  handleTable,
  checkMeasureColumn,
  setIsAgregateOptionsVisible,
  isAgregateOptionsVisible,
  dataExplorer,
  dimensionValidText,
  measuresValidText,
}) => {

  return (
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
                    {dataExplorer.length === 0 && (
                      <li>
                        <p className={Style['information-text']}>
                          No data
                        </p>
                      </li>
                    )}
                    {dataExplorer.length > 0 && (
                      dataExplorer.map((table, index) => (
                        <li
                          className={Style['table-list-item']}
                          key={`${table?.table_name} ${index}`}
                        >
                          <div
                            className={
                              selectedData?.table === table?.table_name ?
                              `${Style['table-title-container']} ${Style['table-title-frame']}`
                              : Style['table-title-container']
                            }
                            onClickCapture={(e) => handlePosition(e)}
                            data-value={table.table_name}
                            data-schema={table.table_schema}
                            data-database={database.datname}
                          >
                            <p className={
                              selectedData?.table === table?.table_name ?
                              Style['table-title-active'] : Style['table-title']}
                            >
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
                                {dimensionValidText}
                              </p>
                              <ul className={Style['list-of-columns']}>
                                {!table.columns.some(item => item.isDimension === true) && (
                                  <li>
                                    <p className={`${Style['information-text']} ${Style['column-title']}`}>
                                      No data
                                    </p>
                                  </li>
                                )}
                                {table.columns.map(item => {
                                  if (item.isDimension) {
                                    return (
                                      <li
                                        className={checkDimensionColumn(table.table_name, item.column_name) ? `${Style['active-dimension']} ${Style['column-list-item']}` : Style['column-list-item']}
                                        key={item.column_name}
                                        onClick={() => handleColumn(table.table_name, item.column_name, 'dimension')}
                                      >
                                        <div className={Style['column-title-container']}>
                                          <p className={Style['column-title']}>
                                            {item.column_name}
                                          </p>
                                          {checkDimensionColumn(
                                            table.table_name, item.column_name) === 'differential' && (
                                            <span className={Style['active-differential']}>GROUP BY</span>
                                          )}
                                        </div>
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
                              <p className={Style['validation-text']}>
                                {measuresValidText}
                              </p>
                              <ul className={Style['list-of-columns']}>
                                {!table.columns.some(item => item.isMeasure === true) && (
                                  <li>
                                    <p className={`${Style['information-text']} ${Style['column-title']}`}>
                                      No data
                                    </p>
                                  </li>
                                )}
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
                                                action: () => handleColumn(table.table_name, item.column_name, 'measure', option.value)
                                              }
                                            )
                                          })}
                                          id={item.column_name}
                                          position="bottom"
                                        >
                                          <div className={Style['column-title-container']}>
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
  )
}