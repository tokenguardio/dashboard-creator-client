/***
 *
 *   Add New Element Page
 *
 **********/


import { AddNewElement } from "@/features/addNewElement/AddNewElement"
import { DashboardTitle } from "@/features/dashboardTitle/DashboardTitle"
import Style from '@/pages/AddNewElementPage.module.scss'

export function AddNewElementPage() {

  return (
    <div className={Style['page-container']}>
      <DashboardTitle />
      <AddNewElement />
    </div>
  )
}
