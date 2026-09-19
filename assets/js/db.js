/**
 * Divine Leads Media - Local Data Store & Reactive Service Layer
 * Clean, real content centered on:
 * "Transforming Nigeria Education with Tech and AI"
 * - Research
 * - Developing Software (DLM ResultDesk)
 * - Supplies of Education Technology Equipments
 * - Practical Digital & AI Skills for Nigerian Learners
 */

const DLM_STORAGE_KEYS = {
  NEWS: 'dlm_news_data',
  ARTICLES: 'dlm_articles_data',
  DOWNLOADS: 'dlm_downloads_data',
  WEBINARS: 'dlm_webinars_data',
  VIDEOS: 'dlm_videos_data',
  USERS: 'dlm_users_data',
  AUTH_USER: 'dlm_auth_session'
};

const INITIAL_SEED_DATA = {
  news: [
    {
      id: 'news-1',
      title: 'Divine Leads Media Deploys DLM ResultDesk to 15 Secondary Schools in Lagos',
      category: 'Software Deployment',
      tags: ['Software', 'Deployment', 'ResultDesk', 'LagosSchools'],
      status: 'published',
      summary: 'Schools in Lagos now use DLM ResultDesk to compute terminal student results and print report cards in minutes instead of weeks.',
      date: 'September 12, 2026',
      readTime: '3 min read',
      author: 'DLM Media Team',
      image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80',
      coverAlt: 'DLM ResultDesk deployed in Nigerian schools',
      content: `Lagos, Nigeria — Divine Leads Media has completed the rollout of DLM ResultDesk across 15 private and public secondary schools in Lagos State.\n\nBefore using ResultDesk, teachers spent two to three weeks calculating continuous assessment scores, ranking student positions, and writing report sheets by hand. With ResultDesk, schools can now enter raw scores, compute broadsheets automatically, and print clean report cards in less than an hour.\n\nThe software runs 100% offline, so teachers do not need an active internet connection to grade exams.`
    },
    {
      id: 'news-2',
      title: 'New Computer Lab Equipment and CBT Setup Delivered to Partner Schools',
      category: 'Equipment Supply',
      tags: ['Equipment', 'CBTExams', 'ComputerLab', 'SolarPower'],
      status: 'published',
      summary: 'Divine Leads Media delivers desktop computers, networking hardware, and backup power solutions to set up standard computer labs for Nigerian schools.',
      date: 'August 25, 2026',
      readTime: '3 min read',
      author: 'DLM Technical Team',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
      coverAlt: 'Computer laboratory equipped with modern desktop setups',
      content: `Divine Leads Media has supplied and installed complete computer lab equipment for three schools preparing for national CBT examinations.\n\nThe supplies included modern desktop systems, local area network (LAN) cabling, offline CBT practice software, and solar inverter backup to protect school labs during power outages.\n\nOur equipment supply program ensures that Nigerian schools receive durable hardware with warranty and on-site support.`
    },
    {
      id: 'news-3',
      title: 'Phase 1 of Practical Digital & AI Skills Training Concludes for 500 Students',
      category: 'Learner Skills',
      tags: ['LearnerSkills', 'StudentWorkshop', 'AIInSchools', 'DigitalLiteracy'],
      status: 'published',
      summary: 'Over 500 secondary school students completed our hands-on workshops on computer basics, safe internet research, and how to use AI for academic learning.',
      date: 'July 30, 2026',
      readTime: '4 min read',
      author: 'DLM Education Team',
      image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80',
      coverAlt: 'Students participating in hands-on AI and computer training',
      content: `Our student training initiative reached over 500 secondary learners across Lagos and Ogun states. The program focused on practical skills: typing accurately, navigating computers, doing school project research safely, and using educational AI tools to understand difficult science and mathematics concepts.`
    }
  ],

  articles: [
    {
      id: 'art-1',
      title: 'How AI and Simple Tech Can Save Nigerian Teachers Over 100 Hours Every Term',
      author: 'Eesuola Joshua Damilare',
      role: 'Founder & Lead Technologist',
      date: 'September 08, 2026',
      readTime: '4 min read',
      tag: 'Software & AI',
      tags: ['Software & AI', 'DLM ResultDesk', 'TeacherTools', 'EdTech'],
      status: 'published',
      cover: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1000&q=80',
      coverAlt: 'Modern educational technology saving teacher time',
      summary: 'Grading exams and calculating student broadsheets by hand is exhausting. Here is how modern software and AI tools solve this problem easily.',
      content: `Every term in Nigeria, teachers face the same heavy task: adding continuous assessment scores, calculating subject positions, working out class averages, and writing remarks on hundreds of paper report cards.\n\nWhen teachers spend all their free time doing manual arithmetic, they have little energy left to prepare inspiring lessons.\n\n### Why DLM ResultDesk Changes Everything\nWe built DLM ResultDesk specifically for how Nigerian schools operate:\n1. **Enter Scores Once**: Teachers simply type in continuous assessment (CA) and exam marks.\n2. **Automatic Calculations**: The computer calculates totals, percentages, grade letters (A1 to F9), and class positions instantly.\n3. **Print Ready Report Cards**: Clean, professional report cards with school crests and signatures are generated with one click.\n4. **Works Offline**: You do not need internet or data subscription to compute grades.`
    },
    {
      id: 'art-2',
      title: 'Setting Up a Reliable Computer Lab in a Nigerian School: What Principals Need to Know',
      author: 'DLM Technical Team',
      role: 'Equipment & Infrastructure Group',
      date: 'August 18, 2026',
      readTime: '5 min read',
      tag: 'Equipment Supply',
      tags: ['Equipment Supply', 'ComputerLab', 'CBTExams', 'PowerBackup'],
      status: 'published',
      cover: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1000&q=80',
      coverAlt: 'School computer laboratory with durable desktop stations',
      summary: 'A straightforward guide to choosing durable computers, setting up local networks, and planning reliable power backup for school CBT centers.',
      content: `Many Nigerian school owners want to set up modern computer laboratories, but fear wasting money on fragile systems or dealing with frequent power cuts.\n\nAt Divine Leads Media, we supply and install school technology equipment with three key rules:\n1. **Durable Business-Grade Hardware**: We recommend refurbished and new desktop computers designed to handle heavy student use and dusty environments.\n2. **Clean Power Inverters**: Connecting school systems to an inverter with solar backup prevents sudden shutdowns that damage hard drives during power cuts.\n3. **Local Offline Networking**: Setting up a local server allows an entire lab of 30 to 100 computers to run CBT practice tests smoothly without depending on internet connections.`
    },
    {
      id: 'art-3',
      title: 'Teaching Nigerian Students How to Use AI as a Study Partner, Not a Shortcut',
      author: 'Eesuola Joshua Damilare',
      role: 'Founder & Educational Researcher',
      date: 'July 14, 2026',
      readTime: '4 min read',
      tag: 'AI Skills',
      tags: ['AI Skills', 'StudentLearning', 'DigitalLiteracy', 'FutureSkills'],
      status: 'published',
      cover: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1000&q=80',
      coverAlt: 'Students collaborating with digital AI learning tools',
      summary: 'Artificial Intelligence is already here. Here is how we teach secondary school learners to use AI to understand difficult subjects and build real skills.',
      content: `Artificial intelligence is changing how the world works. In Nigeria, our students should not just be passive consumers of foreign technology; they need to understand how to use digital tools and AI to learn faster.\n\nIn our workshops, we guide students on:\n- Using AI to explain complicated science and math topics in simple words.\n- Checking facts and verifying sources so they do not copy incorrect answers.\n- Learning computational thinking and logic to solve everyday problems.`
    }
  ],

  downloads: [
    {
      id: 'dl-1',
      name: 'DLM ResultDesk Desktop Installer',
      version: 'v1.4.2',
      platform: 'Windows 11, 10, 8, 7 (32-bit & 64-bit)',
      tag: 'School Software',
      size: '48.6 MB',
      date: 'September 2026',
      checksum: 'sha256: 7f83b1657ff1fc53b92dc182563a92548231c9a6',
      description: 'The complete offline grading, broadsheet calculation, and report card software for Nigerian Nursery, Primary, and Secondary schools.',
      downloadUrl: '#download-resultdesk',
      features: [
        'Automatic broadsheet computation and student ranking',
        'Built-in WAEC, NECO, and BECE grading standards',
        'Psychomotor and behavioral evaluation sheets',
        'Batch export and print clean PDF student report cards',
        '100% offline — no internet connection required'
      ]
    },
    {
      id: 'dl-2',
      name: 'DLM ResultDesk Portable (USB Edition)',
      version: 'v1.4.2',
      platform: 'Windows (No Installation Needed)',
      tag: 'School Software',
      size: '52.1 MB',
      date: 'September 2026',
      checksum: 'sha256: 3c92a9108b6e2d14781f9a0937a09bc3319082a1',
      description: 'Run ResultDesk straight from a USB flash drive on any school staff room computer without needing admin permission.',
      downloadUrl: '#download-portable',
      features: [
        'Zero installation — plug in and run directly',
        'Keeps all student records safely on your flash drive',
        'Works on any standard school laptop or desktop'
      ]
    },
    {
      id: 'dl-3',
      name: 'ServiceFlow Live Screen Timer',
      version: 'v2.1.0',
      platform: 'Windows, Mac & Phone Controller',
      tag: 'Media Production',
      size: '34.2 MB',
      date: 'August 2026',
      checksum: 'sha256: 9e24b4510cae7889104fa28987103a01a9df2768',
      description: 'A smart presentation timer and announcement screen for school assemblies, church services, and major conferences.',
      downloadUrl: '#download-serviceflow',
      features: [
        'Real-time Wi-Fi sync between stage display and phone controller',
        'Send silent announcements directly to the speaker display',
        'Agenda builder with countdown timers and alerts'
      ]
    },
    {
      id: 'dl-4',
      name: 'Nigerian School Broadsheet Starter Template',
      version: 'v2026.1',
      platform: 'Excel / Spreadsheet / CSV',
      tag: 'Free School Resource',
      size: '3.4 MB',
      date: 'August 2026',
      checksum: 'sha256: b894001923ab9001fa120938472918bbda019283',
      description: 'Pre-formatted spreadsheet template with continuous assessment weighting, ready to import directly into DLM ResultDesk.',
      downloadUrl: '#download-template',
      features: [
        'Pre-configured continuous assessment formulas (CA1, CA2, Exam)',
        'Sample remarks for Nursery and Primary pupils',
        'Easy CSV export for fast import into ResultDesk'
      ]
    },
    {
      id: 'dl-5',
      name: 'DLM SecureVote Election Infrastructure',
      version: 'v1.0.4',
      platform: 'Windows, Linux & Offline Local Server',
      tag: 'Election Software',
      size: '62.4 MB',
      date: 'September 2026',
      checksum: 'sha256: e512a89c02d18471fa0919bbda841029182047ef',
      description: 'Secure, offline election infrastructure for student prefect elections, university union voting, and school leadership polls.',
      downloadUrl: '#download-securevote',
      features: [
        'Tamper-proof cryptographic ballot verification',
        'Works completely offline on local school Wi-Fi or LAN',
        'Real-time instant result tabulation and audit log'
      ]
    }
  ],

  webinars: [
    {
      id: 'web-1',
      title: 'Transforming Nigerian School Records with Tech and AI',
      type: 'Online Webinar',
      date: 'October 15, 2026',
      time: '11:00 AM (West Africa Time)',
      speakers: 'Eesuola Joshua Damilare & Experienced School Principals',
      description: 'Practical training for school owners and administrators on moving away from manual paper broadsheets to fast, automated software that saves time and money.',
      link: '#register-web-1'
    },
    {
      id: 'web-2',
      title: 'Equipping Your School with Reliable CBT and Computer Lab Gear',
      type: 'Live Workshop',
      date: 'November 07, 2026',
      time: '02:00 PM (West Africa Time)',
      speakers: 'DLM Technical and Hardware Team',
      description: 'Everything school leaders need to know about setting up durable computer labs, solar backup power, and local CBT exam networks without overspending.',
      link: '#register-web-2'
    }
  ],

  videos: [
    {
      id: 'vid-1',
      title: 'DLM ResultDesk: Complete Software Walkthrough in 4 Minutes',
      duration: '4:15',
      category: 'Product Walkthrough',
      thumbnail: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80',
      description: 'Watch how quickly a teacher can enter CA scores, let ResultDesk compute class rankings, and print final student report cards.',
      videoEmbed: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ'
    },
    {
      id: 'vid-2',
      title: 'Practical Digital & AI Skills Training for Secondary School Students',
      duration: '5:40',
      category: 'Student Training',
      thumbnail: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80',
      description: 'Highlights from our student workshop teaching typing, computer navigation, and using AI tools to understand school subjects.',
      videoEmbed: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ'
    },
    {
      id: 'vid-3',
      title: 'School Computer Lab Equipment and CBT Setup by Divine Leads Media',
      duration: '4:50',
      category: 'Equipment Supplies',
      thumbnail: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80',
      description: 'Tour of a newly equipped 50-seater secondary school computer lab with durable desktop PCs, LAN cabling, and solar inverter backup power.',
      videoEmbed: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ'
    }
  ],

  users: [
    {
      id: 'user-admin',
      fullName: 'Eesuola Joshua Damilare',
      email: 'admin@divineleadsmedia.com',
      password: 'password123',
      role: 'Administrator',
      avatar: 'EJ'
    }
  ]
};

// Database Management Class
class DLMDatabase {
  constructor() {
    this.init();
  }

  init() {
    // Only populate keys if they don't already exist in localStorage, preserving user edits!
    if (!localStorage.getItem(DLM_STORAGE_KEYS.NEWS)) {
      localStorage.setItem(DLM_STORAGE_KEYS.NEWS, JSON.stringify(INITIAL_SEED_DATA.news));
    }
    if (!localStorage.getItem(DLM_STORAGE_KEYS.ARTICLES)) {
      localStorage.setItem(DLM_STORAGE_KEYS.ARTICLES, JSON.stringify(INITIAL_SEED_DATA.articles));
    }
    if (!localStorage.getItem(DLM_STORAGE_KEYS.DOWNLOADS)) {
      localStorage.setItem(DLM_STORAGE_KEYS.DOWNLOADS, JSON.stringify(INITIAL_SEED_DATA.downloads));
    }
    if (!localStorage.getItem(DLM_STORAGE_KEYS.WEBINARS)) {
      localStorage.setItem(DLM_STORAGE_KEYS.WEBINARS, JSON.stringify(INITIAL_SEED_DATA.webinars));
    }
    if (!localStorage.getItem(DLM_STORAGE_KEYS.VIDEOS)) {
      localStorage.setItem(DLM_STORAGE_KEYS.VIDEOS, JSON.stringify(INITIAL_SEED_DATA.videos));
    }
    if (!localStorage.getItem(DLM_STORAGE_KEYS.USERS)) {
      localStorage.setItem(DLM_STORAGE_KEYS.USERS, JSON.stringify(INITIAL_SEED_DATA.users));
    }

    // Automatically sync published content from assets/data/content.json if available
    this.syncFromStaticContentFile();

    // If no active user session, initialize default admin user
    if (!localStorage.getItem(DLM_STORAGE_KEYS.AUTH_USER) && !sessionStorage.getItem(DLM_STORAGE_KEYS.AUTH_USER)) {
      this.setCurrentUser(INITIAL_SEED_DATA.users[0]);
    }
  }

  async syncFromStaticContentFile() {
    try {
      const response = await fetch('assets/data/content.json', { cache: 'no-cache' });
      if (response.ok) {
        const json = await response.json();
        if (json.news && Array.isArray(json.news)) {
          const localNews = this.getNews();
          let changed = false;
          json.news.forEach(remoteItem => {
            const idx = localNews.findIndex(n => n.id === remoteItem.id);
            if (idx === -1) {
              localNews.unshift(remoteItem);
              changed = true;
            }
          });
          if (changed) {
            localStorage.setItem(DLM_STORAGE_KEYS.NEWS, JSON.stringify(localNews));
            this.notify('news_changed', localNews);
          }
        }

        if (json.articles && Array.isArray(json.articles)) {
          const localArticles = this.getArticles();
          let artChanged = false;
          json.articles.forEach(remoteItem => {
            const idx = localArticles.findIndex(a => a.id === remoteItem.id);
            if (idx === -1) {
              localArticles.unshift(remoteItem);
              artChanged = true;
            }
          });
          if (artChanged) {
            localStorage.setItem(DLM_STORAGE_KEYS.ARTICLES, JSON.stringify(localArticles));
            this.notify('articles_changed', localArticles);
          }
        }

        if (json.downloads && Array.isArray(json.downloads)) {
          const localDownloads = this.getDownloads();
          let dlChanged = false;
          json.downloads.forEach(remoteItem => {
            const idx = localDownloads.findIndex(d => d.id === remoteItem.id);
            if (idx === -1) {
              localDownloads.unshift(remoteItem);
              dlChanged = true;
            }
          });
          if (dlChanged) {
            localStorage.setItem(DLM_STORAGE_KEYS.DOWNLOADS, JSON.stringify(localDownloads));
            this.notify('downloads_changed', localDownloads);
          }
        }
      }
    } catch (err) {
      // Offline fallback
    }
  }

  getNews() {
    try {
      const data = JSON.parse(localStorage.getItem(DLM_STORAGE_KEYS.NEWS)) || [];
      return data.map(item => ({
        ...item,
        tags: Array.isArray(item.tags) ? item.tags : (item.tags ? String(item.tags).split(',').map(s=>s.trim()).filter(Boolean) : (item.category ? [item.category] : [])),
        status: item.status || 'published',
        coverAlt: item.coverAlt || item.title
      }));
    } catch(e) { return INITIAL_SEED_DATA.news; }
  }

  getNewsById(id) {
    return this.getNews().find(item => item.id === id);
  }

  saveNews(item) {
    const list = this.getNews();
    // Normalize tags
    if (typeof item.tags === 'string') {
      item.tags = item.tags.split(',').map(t => t.trim()).filter(Boolean);
    } else if (!Array.isArray(item.tags)) {
      item.tags = item.category ? [item.category] : [];
    }
    item.status = item.status || 'published';
    item.coverAlt = item.coverAlt || item.title;

    if (item.id) {
      const idx = list.findIndex(n => n.id === item.id);
      if (idx !== -1) list[idx] = { ...list[idx], ...item, updatedAt: new Date().toISOString() };
      else list.unshift(item);
    } else {
      item.id = 'news-' + Date.now();
      item.createdAt = new Date().toISOString();
      list.unshift(item);
    }
    localStorage.setItem(DLM_STORAGE_KEYS.NEWS, JSON.stringify(list));
    this.notify('news_changed', list);
    return item;
  }

  deleteNews(id) {
    const list = this.getNews().filter(n => n.id !== id);
    localStorage.setItem(DLM_STORAGE_KEYS.NEWS, JSON.stringify(list));
    this.notify('news_changed', list);
  }

  getArticles() {
    try {
      const data = JSON.parse(localStorage.getItem(DLM_STORAGE_KEYS.ARTICLES)) || [];
      return data.map(item => ({
        ...item,
        tags: Array.isArray(item.tags) ? item.tags : (item.tags ? String(item.tags).split(',').map(s=>s.trim()).filter(Boolean) : (item.tag ? [item.tag] : [])),
        tag: item.tag || (Array.isArray(item.tags) && item.tags[0] ? item.tags[0] : 'Education Tech'),
        status: item.status || 'published',
        coverAlt: item.coverAlt || item.title
      }));
    } catch(e) { return INITIAL_SEED_DATA.articles; }
  }

  getArticleById(id) {
    return this.getArticles().find(item => item.id === id);
  }

  saveArticle(item) {
    const list = this.getArticles();
    // Normalize tags
    if (typeof item.tags === 'string') {
      item.tags = item.tags.split(',').map(t => t.trim()).filter(Boolean);
    } else if (!Array.isArray(item.tags)) {
      item.tags = item.tag ? [item.tag] : [];
    }
    item.tag = item.tag || (item.tags.length > 0 ? item.tags[0] : 'Software & AI');
    item.status = item.status || 'published';
    item.cover = item.cover || 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1000&q=80';
    item.coverAlt = item.coverAlt || item.title;

    if (item.id) {
      const idx = list.findIndex(a => a.id === item.id);
      if (idx !== -1) list[idx] = { ...list[idx], ...item, updatedAt: new Date().toISOString() };
      else list.unshift(item);
    } else {
      item.id = 'art-' + Date.now();
      item.createdAt = new Date().toISOString();
      list.unshift(item);
    }
    localStorage.setItem(DLM_STORAGE_KEYS.ARTICLES, JSON.stringify(list));
    this.notify('articles_changed', list);
    return item;
  }

  deleteArticle(id) {
    const list = this.getArticles().filter(a => a.id !== id);
    localStorage.setItem(DLM_STORAGE_KEYS.ARTICLES, JSON.stringify(list));
    this.notify('articles_changed', list);
  }

  getDownloads() {
    try { return JSON.parse(localStorage.getItem(DLM_STORAGE_KEYS.DOWNLOADS)) || []; } catch(e) { return INITIAL_SEED_DATA.downloads; }
  }

  getDownloadById(id) {
    return this.getDownloads().find(item => item.id === id);
  }

  saveDownload(item) {
    const list = this.getDownloads();
    if (item.id) {
      const idx = list.findIndex(d => d.id === item.id);
      if (idx !== -1) list[idx] = { ...list[idx], ...item, updatedAt: new Date().toISOString() };
      else list.unshift(item);
    } else {
      item.id = 'dl-' + Date.now();
      item.createdAt = new Date().toISOString();
      list.unshift(item);
    }
    localStorage.setItem(DLM_STORAGE_KEYS.DOWNLOADS, JSON.stringify(list));
    this.notify('downloads_changed', list);
    return item;
  }

  deleteDownload(id) {
    const list = this.getDownloads().filter(d => d.id !== id);
    localStorage.setItem(DLM_STORAGE_KEYS.DOWNLOADS, JSON.stringify(list));
    this.notify('downloads_changed', list);
  }

  getWebinars() {
    try { return JSON.parse(localStorage.getItem(DLM_STORAGE_KEYS.WEBINARS)) || []; } catch(e) { return INITIAL_SEED_DATA.webinars; }
  }

  saveWebinar(item) {
    const list = this.getWebinars();
    if (item.id) {
      const idx = list.findIndex(w => w.id === item.id);
      if (idx !== -1) list[idx] = { ...list[idx], ...item };
      else list.unshift(item);
    } else {
      item.id = 'web-' + Date.now();
      list.unshift(item);
    }
    localStorage.setItem(DLM_STORAGE_KEYS.WEBINARS, JSON.stringify(list));
    this.notify('webinars_changed', list);
    return item;
  }

  deleteWebinar(id) {
    const list = this.getWebinars().filter(w => w.id !== id);
    localStorage.setItem(DLM_STORAGE_KEYS.WEBINARS, JSON.stringify(list));
    this.notify('webinars_changed', list);
  }

  getVideos() {
    try { return JSON.parse(localStorage.getItem(DLM_STORAGE_KEYS.VIDEOS)) || []; } catch(e) { return INITIAL_SEED_DATA.videos; }
  }

  saveVideo(item) {
    const list = this.getVideos();
    if (item.id) {
      const idx = list.findIndex(v => v.id === item.id);
      if (idx !== -1) list[idx] = { ...list[idx], ...item };
      else list.unshift(item);
    } else {
      item.id = 'vid-' + Date.now();
      list.unshift(item);
    }
    localStorage.setItem(DLM_STORAGE_KEYS.VIDEOS, JSON.stringify(list));
    this.notify('videos_changed', list);
    return item;
  }

  deleteVideo(id) {
    const list = this.getVideos().filter(v => v.id !== id);
    localStorage.setItem(DLM_STORAGE_KEYS.VIDEOS, JSON.stringify(list));
    this.notify('videos_changed', list);
  }

  getUsers() {
    try { return JSON.parse(localStorage.getItem(DLM_STORAGE_KEYS.USERS)) || []; } catch(e) { return INITIAL_SEED_DATA.users; }
  }

  registerUser({ fullName, email, password }) {
    const users = this.getUsers();
    if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
      throw new Error('An account with this email address already exists.');
    }
    const initials = fullName.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2) || 'DL';
    const newUser = {
      id: 'user-' + Date.now(),
      fullName,
      email,
      password,
      role: 'Staff Member',
      avatar: initials,
      createdAt: new Date().toISOString()
    };
    users.push(newUser);
    localStorage.setItem(DLM_STORAGE_KEYS.USERS, JSON.stringify(users));
    this.setCurrentUser(newUser);
    return newUser;
  }

  authenticateUser(email, password) {
    const users = this.getUsers();
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
    if (!user) {
      throw new Error('Incorrect email address or password.');
    }
    this.setCurrentUser(user);
    return user;
  }

  getCurrentUser() {
    try {
      return JSON.parse(sessionStorage.getItem(DLM_STORAGE_KEYS.AUTH_USER)) || 
             JSON.parse(localStorage.getItem(DLM_STORAGE_KEYS.AUTH_USER)) || null;
    } catch(e) {
      return null;
    }
  }

  setCurrentUser(user, remember = true) {
    const safeUser = { id: user.id, fullName: user.fullName, email: user.email, role: user.role, avatar: user.avatar };
    if (remember) localStorage.setItem(DLM_STORAGE_KEYS.AUTH_USER, JSON.stringify(safeUser));
    sessionStorage.setItem(DLM_STORAGE_KEYS.AUTH_USER, JSON.stringify(safeUser));
  }

  logout() {
    localStorage.removeItem(DLM_STORAGE_KEYS.AUTH_USER);
    sessionStorage.removeItem(DLM_STORAGE_KEYS.AUTH_USER);
  }

  exportBackupJSON() {
    return JSON.stringify({
      version: '2.0',
      timestamp: new Date().toISOString(),
      news: this.getNews(),
      articles: this.getArticles(),
      downloads: this.getDownloads(),
      webinars: this.getWebinars(),
      videos: this.getVideos()
    }, null, 2);
  }

  importBackupJSON(jsonString) {
    try {
      const data = JSON.parse(jsonString);
      if (data.news) localStorage.setItem(DLM_STORAGE_KEYS.NEWS, JSON.stringify(data.news));
      if (data.articles) localStorage.setItem(DLM_STORAGE_KEYS.ARTICLES, JSON.stringify(data.articles));
      if (data.downloads) localStorage.setItem(DLM_STORAGE_KEYS.DOWNLOADS, JSON.stringify(data.downloads));
      if (data.webinars) localStorage.setItem(DLM_STORAGE_KEYS.WEBINARS, JSON.stringify(data.webinars));
      if (data.videos) localStorage.setItem(DLM_STORAGE_KEYS.VIDEOS, JSON.stringify(data.videos));
      this.notify('all_data_restored', data);
      return true;
    } catch(err) {
      throw new Error('Invalid backup file format: ' + err.message);
    }
  }

  resetToDefaults() {
    localStorage.setItem(DLM_STORAGE_KEYS.NEWS, JSON.stringify(INITIAL_SEED_DATA.news));
    localStorage.setItem(DLM_STORAGE_KEYS.ARTICLES, JSON.stringify(INITIAL_SEED_DATA.articles));
    localStorage.setItem(DLM_STORAGE_KEYS.DOWNLOADS, JSON.stringify(INITIAL_SEED_DATA.downloads));
    localStorage.setItem(DLM_STORAGE_KEYS.WEBINARS, JSON.stringify(INITIAL_SEED_DATA.webinars));
    localStorage.setItem(DLM_STORAGE_KEYS.VIDEOS, JSON.stringify(INITIAL_SEED_DATA.videos));
    localStorage.setItem(DLM_STORAGE_KEYS.USERS, JSON.stringify(INITIAL_SEED_DATA.users));
    this.notify('defaults_reset', true);
  }

  notify(event, payload) {
    window.dispatchEvent(new CustomEvent('dlm_db_' + event, { detail: payload }));
    try {
      localStorage.setItem('dlm_last_sync_timestamp', Date.now().toString());
    } catch (e) {}
  }
}

// Global instance
window.DLM_DB = new DLMDatabase();

