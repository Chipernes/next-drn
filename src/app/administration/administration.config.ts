const useAdministrationConfig = () => {
  return [
    {
      title: 'Аналітика',
      description: 'Переглянути статистику та діаграми по замовленням',
      href: '/administration/dashboard',
      imageUrl: '/administration/dashboard.jpg',
    },
    {
      title: 'Меню',
      description: 'Керування групами меню',
      href: '/administration/menu',
      imageUrl: '/administration/menu.jpg',
    },
    {
      title: 'Страви',
      description: 'Керування стравами та їх відображенням',
      href: '/administration/dishes',
      imageUrl: '/administration/dishes.jpg',
    },
    {
      title: 'Співробітники',
      description: 'Додавання, редагування та видалення персоналу',
      href: '/administration/employees',
      imageUrl: '/administration/employees.jpg',
    },
    {
      title: 'Столи',
      description: 'Редагування та створення столів у залі',
      href: '/administration/tables',
      imageUrl: '/administration/tables.jpg',
    },
  ];
};

export default useAdministrationConfig;
