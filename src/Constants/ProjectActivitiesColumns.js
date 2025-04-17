export const getProjectActivitiesTableHeaders = (t) => {
  return [
    {
      id: 'name',
      numeric: false,
      disablePadding: true,
      label: t('projects.activityList.tableHeaders.name'),
    },
    {
      id: 'tag',
      numeric: true,
      disablePadding: true,
      label: t('projects.activityList.tableHeaders.tag'),
    },
    {
      id: 'status',
      numeric: true,
      disablePadding: true,
      label: t('projects.activityList.tableHeaders.status'),
    },
    {
      id: 'estimation',
      numeric: true,
      disablePadding: true,
      label: t('projects.activityList.tableHeaders.estimation'),
    },
    {
      id: 'schedule_day',
      numeric: false,
      disablePadding: true,
      label: t('projects.activityList.tableHeaders.schedule_day'),
    },
  ];
};
