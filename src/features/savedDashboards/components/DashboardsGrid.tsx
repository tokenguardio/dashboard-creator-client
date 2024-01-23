import Style from './DashboardsGrid.module.css'
import { Slide } from './Slide'
import { ButtonSlide } from './ButtonSlide'

export const DashboardsGrid = () => {

  const dashboards = [
    {
      name: 'Test43',
      id: 43,
      preview: ''
    },
    {
      name: 'Test42',
      id: 42,
      preview: ''
    },
    {
      name: 'Test41',
      id: 41,
      preview: ''
    },
  ]

  // const options = [
  //   {
  //     name: 'share',
  //     action: (id) => {
  //       viewContext.modal.show({
  //         title: 'Share dashboard',
  //         shareContent: { contentId: id, contentType: 'dashboard' },
  //       })
  //     },
  //   },
  //   {
  //     name: 'delete',
  //     action: (id) => {
  //       viewContext.modal.show(
  //         {
  //           title: 'Delete dashboard',
  //           text: 'Are you sure you want to delete this dashboard?',
  //           form: {},
  //           destructive: true,
  //           buttonText: 'Delete',
  //           url: `/api/dashboard/${id}`,
  //           method: 'DELETE',
  //         },
  //         () => {
  //           viewContext.notification.show(
  //             'Dashboard was deleted',
  //             'success',
  //             true
  //           )
  //           const updatedUserDashboards = userDashboards.data.filter(
  //             (dashboard) => dashboard.id !== id
  //           )
  //           setUserDashboards((prevState) => ({
  //             ...prevState,
  //             data: updatedUserDashboards,
  //           }))
  //         }
  //       )
  //     },
  //     type: 'danger',
  //   },
  // ]

  const options = [
    {
      name: 'delete',
      action: (id) => console.log(`'test delete' ${id}`),
    },
    {
      name: 'edit',
      action: (id) => console.log(`'test edit' ${id}`),
    },
  ]

  return (
    <section className={Style['container']}>
      {dashboards.map(dashboard => {
        return (
          <Slide
            key={dashboard.id}
            title={dashboard.name}
            id={dashboard.id}
            image={dashboard.preview}
            options={options}
          />
        )
      })}
      <ButtonSlide />
    </section>
  )
}