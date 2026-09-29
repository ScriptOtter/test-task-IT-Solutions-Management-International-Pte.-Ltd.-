import { PrismaService } from 'src/infra/prisma/prisma.service';

export async function PrismaSeeder(prisma: PrismaService) {
  console.log('Deleting database...');
  await prisma.profile.deleteMany();
  console.log('Database deleted.');

  try {
    console.log('Creating profile...');
    const profile = await prisma.profile.create({
      data: {
        name: 'Frontend / Fullstack Developer',
        description:
          'Fullstack-разработчик с frontend-фокусом и 3+ годами коммерческого опыта. ' +
          'Специализируюсь на React, TypeScript, Next.js и построении сложных интерфейсов: ' +
          'админ-панели, личные кабинеты, системы лояльности, аналитические дашборды. ' +
          'Дополнительно закрываю backend-задачи на NestJS, Prisma, PostgreSQL и Redis, ' +
          'участвую в проектировании БД и интеграциях через REST, WebSocket и gRPC. ' +
          'Фокус — производительность, типобезопасность и качество кода.',
      },
    });
    console.log(`Profile created, id = ${profile.id}`);

    console.log('Creating links...');
    await prisma.profileLink.create({
      data: {
        label: 'GitHub',
        url: 'https://github.com/scriptotter',
        profileId: profile.id,
      },
    });
    await prisma.profileLink.create({
      data: {
        label: 'Telegram',
        url: 'https://t.me/scriptotter',
        profileId: profile.id,
      },
    });
    console.log('Links created');

    console.log('🌱 Creating skills...');
    const skills: { name: string; level: string }[] = [
      { name: 'React', level: 'Expert' },
      { name: 'TypeScript', level: 'Expert' },
      { name: 'JavaScript', level: 'Expert' },
      { name: 'Next.js', level: 'Expert' },
      { name: 'Redux', level: 'Expert' },
      { name: 'RTK Query', level: 'Expert' },
      { name: 'MobX', level: 'Expert' },
      { name: 'Tailwind CSS', level: 'Expert' },
      { name: 'Material-UI', level: 'Expert' },
      { name: 'Radix UI', level: 'Intermediate' },
      { name: 'Shadcn', level: 'Intermediate' },
      { name: 'ECharts', level: 'Intermediate' },
      { name: 'SSR', level: 'Expert' },
      { name: 'Vite', level: 'Expert' },

      { name: 'REST API', level: 'Expert' },
      { name: 'WebSocket', level: 'Expert' },
      { name: 'gRPC', level: 'Intermediate' },
      { name: 'Optimistic UI', level: 'Expert' },

      { name: 'Jest', level: 'Expert' },
      { name: 'Unit-тесты', level: 'Expert' },
      { name: 'Интеграционные тесты', level: 'Intermediate' },

      { name: 'Git', level: 'Expert' },
      { name: 'Docker', level: 'Intermediate' },
      { name: 'CI/CD', level: 'Intermediate' },
      { name: 'Code Review', level: 'Expert' },

      { name: 'Node.js', level: 'Expert' },
      { name: 'NestJS', level: 'Intermediate' },
      { name: 'PostgreSQL', level: 'Intermediate' },
      { name: 'Prisma', level: 'Intermediate' },
      { name: 'Redis', level: 'Intermediate' },
    ];

    for (const skill of skills) {
      await prisma.skill.create({
        data: { ...skill, profileId: profile.id },
      });
    }
    console.log(`Skills created (${skills.length})`);

    console.log('Creating experience...');
    await prisma.experience.create({
      data: {
        company: 'Пиццерия «Тик Тайм»',
        position: 'Fullstack-разработчик (frontend-фокус)',
        startDate: new Date('2023-03-01'),
        endDate: null,
        achievements: [
          'Административная панель управления пиццерией (React, TypeScript, Material-UI, MobX, ECharts, Vite): спроектировал интерфейс для управления меню, акциями, сотрудниками и аналитикой продаж.',
          'Внедрил аналитические дашборды на ECharts для отслеживания выручки, популярности блюд и динамики заказов.',
          'Реализовал гибкую ролевую модель с разграничением прав доступа для разных категорий сотрудников.',
          'Перевёл легаси-проект с JavaScript на TypeScript — снизил количество ошибок и ускорил адаптацию новых разработчиков.',
          'Оптимизировал производительность: ускорил загрузку страниц аналитики и сократил время отклика интерфейса.',
          'Личный кабинет и админ-панель системы лояльности (React, Next.js, TypeScript, Tailwind CSS, RTK Query): разработал ЛК клиента с бонусным балансом, историей операций и сертификатами.',
          'Создал админ-панель для управления акциями и промокодами с привязкой к категориям товаров и пользователям.',
          'Внедрил дашборд аналитики промо-кампаний с графиками эффективности и реализовал optimistic UI для операций с бонусами.',
          'Панель оператора колл-центра (React, TypeScript, Radix UI, Shadcn, WebSocket): спроектировал интерфейс с оформлением заказа менее чем за 30 секунд.',
          'Реализовал обновление данных в реальном времени через WebSocket (новые заказы, изменение статусов).',
          'Сайт онлайн-заказов «Тик Тайм» (Next.js, TypeScript, Tailwind CSS, RTK Query, WebSocket, Jest): разработал frontend высоконагруженного сервиса доставки с акцентом на скорость и мобильную адаптивность.',
          'Реализовал SSR для улучшения SEO и ускорения загрузки меню, интеграцию с backend через REST API и WebSocket.',
          'Покрыл ключевой функционал unit-тестами (Jest) — сократил количество багов при релизах.',
          'Backend- и интеграционные задачи (NestJS, gRPC, PostgreSQL, Prisma, Redis, Docker): проектировал структуру БД и API для сервисов лояльности и доставки.',
          'Участвовал в интеграции с внешними курьерскими службами через gRPC.',
          'Внедрил Redis для кэширования и обмена состоянием между инстансами сервисов; контейнеризировал сервисы в Docker.',
        ],
        profileId: profile.id,
      },
    });
    console.log('Experience created');

    // 5. Проекты
    console.log('Creating projects...');
    const projects: { name: string; description: string; url?: string }[] = [
      {
        name: 'Административная панель пиццерии',
        description:
          'Панель управления бизнес-процессами: меню, акции, сотрудники, аналитика продаж. Стек: React, TypeScript, Material-UI, MobX, ECharts, Vite.',
      },
      {
        name: 'Система лояльности (личный кабинет + админ-панель)',
        description:
          'ЛК клиента с бонусным балансом и сертификатами, админ-панель для акций и промокодов, аналитика промо-кампаний, optimistic UI. Стек: React, Next.js, TypeScript, Tailwind CSS, RTK Query.',
      },
      {
        name: 'Панель оператора колл-центра',
        description:
          'Интерфейс для операторов с оформлением заказа менее чем за 30 секунд, обновление данных в реальном времени через WebSocket. Стек: React, TypeScript, Radix UI, Shadcn, WebSocket.',
      },
      {
        name: 'Сайт онлайн-заказов «Тик Тайм»',
        description:
          'Frontend высоконагруженного сервиса доставки еды: SSR, мобильная адаптивность, авторизация, отслеживание статусов заказов в реальном времени, unit-тесты. Стек: Next.js, TypeScript, Tailwind CSS, RTK Query, WebSocket, Jest.',
        url: 'https://tick-time.ru',
      },
      {
        name: 'Сервисы лояльности и доставки (backend)',
        description:
          'Проектирование БД и API, интеграция с курьерскими службами через gRPC, кэширование через Redis, контейнеризация в Docker. Стек: NestJS, gRPC, PostgreSQL, Prisma, Redis, Docker.',
      },
    ];

    for (const project of projects) {
      await prisma.project.create({
        data: { ...project, profileId: profile.id },
      });
    }
    console.log(`Projects created (${projects.length})`);

    console.log('Seed completed!');
  } catch (error) {
    console.error('Seed failed');
    console.error('Message:', (error as Error)?.message);
    console.error('Stack:', (error as Error)?.stack);
    throw error;
  }
}
