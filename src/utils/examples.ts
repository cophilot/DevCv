export function getExampleByName(name: string): any {
  switch (name.toLowerCase()) {
    case 'contact':
      return getExampleContact();
    case 'skills':
      return getExampleSkills();
    case 'jobs':
      return getExampleJobs();
    case 'education':
      return getExampleEducation();
    case 'other':
      return getExampleOther();
    case 'otherleft':
      return [];
    case 'general':
      return getExampleGeneral();
    case 'spacing':
      return getExampleSpacing();
    case 'settings':
      return getExampleSettings();
    default:
      return {};
  }
}

export function getExampleSettings(): any {
  return {
    protected: false,
    export: true,
    bars: true,
    showPageNumber: false,
  };
}
export function getExampleContact(): any {
  return {
    all: [
      {
        text: 'john@smith.example',
        icon: 'bi bi-envelope',
        link: 'mailto:john@smith.example',
      },
      {
        text: '+1 234 56789',
        icon: 'bi bi-telephone',
        link: '',
      },
      {
        text: 'John-Smith-Street 42\n12345, New York\nUSA',
        icon: 'bi bi-geo-alt',
        link: 'https://www.google.com/maps/place/Area+51',
      },
      {
        text: 'john-smith.example',
        icon: 'bi bi-globe2',
        link: 'https://john-smith.example/',
      },
      {
        text: 'johhhny1234',
        icon: 'bi bi-github',
        link: 'https://github.com/johhhny1234',
      },
    ],
  };
}

export function getExampleEducation(): any {
  return {
    en: [
      {
        name: 'Computer Science B.Sc.',
        school: 'MIT',
        location: 'Cambridge, MA',
        year: 'ongoing',
        description: 'Current grade: B',
      },
      {
        name: 'Highschool Diploma',
        school: 'John Smith Highschool',
        location: 'New York, NY',
        year: '2017',
        description: 'Finalgrade: C',
      },
    ],
    de: [
      {
        name: 'Informatik B.Sc.',
        school: 'MIT',
        location: 'Cambridge, MA',
        year: 'laufend',
        description: 'Zurzeitiger Notendurchschnitt: 2,0',
      },
      {
        name: 'Allgemeine Hochschulreife',
        school: 'John Smith Gymnasium',
        location: 'New York, NY',
        year: '2017',
        description: 'Abschlussnote: 3,0',
      },
    ],
  };
}

export function getExampleGeneral(): any {
  return {
    de: {
      firstname: 'John',
      lastname: 'Smith',
      dob: '1. Januar 2000',
      pob: 'New York, Vereinigte Staaten',
      languages: [
        'Englisch - Muttersprache',
        'Deutsch - Fließend',
        'Französisch - Grundkenntnisse',
      ],
    },
    en: {
      firstname: 'John',
      lastname: 'Smith',
      dob: '1. January 2000',
      pob: 'New York, USA',
      languages: ['English - Native', 'German - Fluent', 'French - Basic'],
    },
    ru: {
      firstname: 'Джон',
      lastname: 'Смит',
      dob: '1. января 2000',
      pob: 'Нью-Йорк, США',
      languages: [
        'Английский - Родной',
        'Немецкий - свободно',
        'Французский - базовый',
      ],
    },
    es: {
      firstname: 'John',
      lastname: 'Smith',
      dob: '1. Enero de 2000',
      pob: 'Nueva York, Estados Unidos',
      languages: ['Inglés - Nativo', 'Alemán - Fluido', 'Francés - Básico'],
    },
    fr: {
      firstname: 'John',
      lastname: 'Smith',
      dob: '1. janvier 2000',
      pob: 'New York, États-Unis',
      languages: [
        'Anglais - Natif',
        'Allemand - Courant',
        'Français - Basique',
      ],
    },
  };
}

export function getExampleJobs(): any {
  return {
    en: [
      {
        job: 'Full Stack Developer',
        company: 'Smith Corp',
        url: 'https://www.example.com/',
        location: 'San Francisco',
        date: 'January 2023 - present',
        use: [
          {
            icon: 'python',
            link: 'https://www.python.org/',
          },
          {
            icon: 'ts',
            link: 'https://www.typescriptlang.org/',
          },
        ],
        description: [
          'Doing stuff',
          'Doing more stuff',
          'Doing even more stuff',
        ],
      },
      {
        job: 'Professional Napper',
        company: 'Nap Inc',
        url: 'https://www.sleepfoundation.org/wp-content/uploads/2021/04/Best-Sleeping-Positions-.jpg',
        location: 'New York',
        date: 'January 2022 - May 2022',
        description: ['Nap all day', 'Sleep all night'],
      },
      {
        job: 'Professional Cat Cuddler',
        company: 'Cat Inc',
        url: 'https://petgram.philipp-bonin.com',
        location: 'Los Angeles',
        date: 'May 2017 - April 2021',
        description: [
          'Cuddle cats',
          'Cuddle more cats',
          'Cuddle even more cats',
        ],
      },
    ],
    de: [
      {
        job: 'Full Stack Developer',
        company: 'Smith Corp',
        url: 'https://www.example.com/',
        location: 'San Francisco',
        date: 'Januar 2023 - heute',
        use: [
          {
            icon: 'python',
            link: 'https://www.python.org/',
          },
          {
            icon: 'ts',
            link: 'https://www.typescriptlang.org/',
          },
        ],
        description: [
          'Dinge tun',
          'Mehr Sachen machen',
          'Noch mehr Sachen machen',
        ],
      },
      {
        job: 'Professioneller Nickerchen',
        company: 'Nap Inc',
        url: 'https://www.sleepfoundation.org/wp-content/uploads/2021/04/Best-Sleeping-Positions-.jpg',
        location: 'New York',
        date: 'Januar 2022 - Mai 2022',
        description: [
          'Den ganzen Tag ein Nickerchen machen',
          'Die ganze Nacht schlafen',
        ],
      },
      {
        job: 'Professioneller Katzenkuscheler',
        company: 'Cat Inc',
        url: 'https://petgram.philipp-bonin.com',
        location: 'Los Angeles',
        date: 'Mai 2017 - April 2021',
        description: [
          'Kuschelkatzen',
          'Kuscheln Sie mehr Katzen',
          'Kuscheln Sie noch mehr Katzen',
        ],
      },
    ],
    ru: [
      {
        job: 'Full Stack Developer',
        company: 'Smith Corp',
        url: 'https://www.example.com/',
        location: 'Сан-Франциско',
        date: 'Январь 2023 г. - настоящее время',
        use: [
          {
            icon: 'python',
            link: 'https://www.python.org/',
          },
          {
            icon: 'ts',
            link: 'https://www.typescriptlang.org/',
          },
        ],
        description: [
          'Делать что-то',
          'Делаем больше вещей',
          'Делаем еще больше вещей',
        ],
      },
      {
        job: 'Профессиональный Нэппер',
        company: 'Nap Inc',
        url: 'https://www.sleepfoundation.org/wp-content/uploads/2021/04/Best-Sleeping-Positions-.jpg',
        location: 'Нью-Йорк',
        date: 'Январь 2022 г. - Май 2022 г.',
        description: ['Вздремнуть весь день', 'Спать всю ночь'],
      },
      {
        job: 'Профессиональный кошачий обниматель',
        company: 'Cat Inc',
        url: 'https://petgram.philipp-bonin.com',
        location: 'Лос-Анджелес',
        date: 'Май 2017 г. - апрель 2021 г.',
        description: [
          'Обнимающиеся кошки',
          'Обнимайте больше кошек',
          'Обнимайте еще больше кошек',
        ],
      },
    ],
    es: [
      {
        job: 'Full Stack Developer',
        company: 'Smith Corp',
        url: 'https://www.example.com/',
        location: 'San Francisco',
        date: 'Enero de 2023 - presente',
        use: [
          {
            icon: 'python',
            link: 'https://www.python.org/',
          },
          {
            icon: 'ts',
            link: 'https://www.typescriptlang.org/',
          },
        ],
        description: [
          'Haciendo cosas',
          'Haciendo más cosas',
          'Haciendo aún más cosas',
        ],
      },
      {
        job: 'Siesta profesional',
        company: 'Nap Inc',
        url: 'https://www.sleepfoundation.org/wp-content/uploads/2021/04/Best-Sleeping-Positions-.jpg',
        location: 'New York',
        date: 'Enero 2022 - Mayo 2022',
        description: ['Siesta todo el dia', 'Dormir toda la noche'],
      },
      {
        job: 'Abrazador de gatos profesional',
        company: 'Cat Inc',
        url: 'https://petgram.philipp-bonin.com',
        location: 'Los Angeles',
        date: 'Mayo 2017 - Abril 2021',
        description: [
          'Abrazar a los gatos',
          'Abraza a más gatos',
          'Abraza aún más gatos',
        ],
      },
    ],
    fr: [
      {
        job: 'Full Stack Developer',
        company: 'Smith Corp',
        url: 'https://www.example.com/',
        location: 'San Francisco',
        date: "Janvier 2023 - aujourd'hui",
        use: [
          {
            icon: 'python',
            link: 'https://www.python.org/',
          },
          {
            icon: 'ts',
            link: 'https://www.typescriptlang.org/',
          },
        ],
        description: [
          'Faire des trucs',
          'Faire plus de choses',
          'Faire encore plus de choses',
        ],
      },
      {
        job: 'Napper professionnel',
        company: 'Nap Inc',
        url: 'https://www.sleepfoundation.org/wp-content/uploads/2021/04/Best-Sleeping-Positions-.jpg',
        location: 'New York',
        date: 'Janvier 2022 - mai 2022',
        description: ['Sieste toute la journée', 'Dormir toute la nuit'],
      },
      {
        job: 'Câlin professionnel pour chat',
        company: 'Cat Inc',
        url: 'https://petgram.philipp-bonin.com',
        location: 'Los Angeles',
        date: 'Mai 2017 - avril 2021',
        description: [
          'Câliner les chats',
          'Câliner plus de chats',
          'Câlinez encore plus de chats',
        ],
      },
    ],
  };
}

export function getExampleOther(): any {
  return {
    en: [
      {
        id: 'certification',
        title: 'Certifications',
        description: '',
        list: ['Azure Fundamentals', 'AWS Cloud Practitioner'],
      },
      {
        id: 'md-support',
        title: 'Markdown _Support_',
        description: '',
        list: [
          'A text can be made *bold*',
          'A text can be _italic_',
          'Add a [link](https://example.com)',
          'Add CSS to [text]{background:black;color:white;padding-left:10px;padding-right:10px}',
        ],
      },
      {
        id: 'hobbies',
        title: 'Hobbies',
        description: '',
        list: ['Going to the gym', 'Coding', 'Petting cats'],
      },
    ],
    de: [
      {
        id: 'certification',
        title: 'Zertifizierungen',
        description: '',
        list: ['Azure Fundamentals', 'AWS Cloud Practitioner'],
      },
      {
        id: 'hobbies',
        title: 'Hobbys',
        description: '',
        list: ['Ins Fitnessstudio gehen', 'Programmieren', 'Katzen streicheln'],
      },
    ],
    ru: [
      {
        id: 'certification',
        title: 'Сертификаты',
        description: '',
        list: ['Azure Fundamentals', 'AWS Cloud Practitioner'],
      },
      {
        id: 'hobbies',
        title: 'Увлечения',
        description: '',
        list: ['Ходить в спортзал', 'программа', 'Гладящие кошки'],
      },
    ],
    es: [
      {
        id: 'certification',
        title: 'Certificaciones',
        description: '',
        list: ['Azure Fundamentals', 'AWS Cloud Practitioner'],
      },
      {
        id: 'hobbies',
        title: 'Aficiones',
        description: '',
        list: ['Ir al gimnasio', 'Programa', 'Acariciar gatos'],
      },
    ],
    fr: [
      {
        id: 'certification',
        title: 'Certifications',
        description: '',
        list: ['Azure Fundamentals', 'AWS Cloud Practitioner'],
      },
      {
        id: 'hobbies',
        title: 'Loisirs',
        description: '',
        list: ['Aller à la gym', 'Programmation', 'Caresser les chats'],
      },
    ],
  };
}

export function getExampleSkills(): any {
  return {
    all: [
      {
        name: 'Angular',
        link: 'https://angular.io/',
        url: '',
        level: 10,
      },
      {
        name: 'Azure',
        link: 'https://azure.microsoft.com/en-us',
        url: '',
        level: 5,
      },
      {
        name: 'Go',
        link: 'https://go.dev/',
        url: '',
        level: 2,
      },
      {
        name: 'C#',
        link: 'https://en.wikipedia.org/wiki/C_Sharp_(programming_language)',
        url: '',
        level: 7,
      },
      {
        name: 'Docker',
        link: 'https://www.docker.com/',
        url: '',
        level: 8,
      },
      {
        name: 'Git',
        link: 'https://git-scm.com/',
        url: '',
        level: 9,
      },
      {
        name: 'Julia',
        link: 'https://julialang.org/',
        url: 'https://avatars.githubusercontent.com/u/743164?s=280&v=4',
        level: 1,
      },
      {
        name: 'Java',
        link: 'https://www.java.com/',
        url: '',
        level: 4,
      },
      {
        name: 'JavaScript',
        link: 'https://www.javascript.com/',
        url: '',
        level: 9,
      },
      {
        name: 'Python',
        link: 'https://www.python.org/',
        url: '',
        level: 7,
      },
      {
        name: 'Next.js',
        link: 'https://nextjs.org/',
        url: 'https://creazilla-store.fra1.digitaloceanspaces.com/icons/3219990/nextjs-icon-md.png',
        level: 5,
      },
      {
        name: 'Svelte',
        link: 'https://svelte.dev/',
        url: '',
        level: 7,
      },
    ],
  };
}

export function getExampleSpacing(): any {
  return {
    contact: 0,
    skills: 70,
    languages: 0,
    work: 0,
    education: 0,
    certification: 0,
  };
}
