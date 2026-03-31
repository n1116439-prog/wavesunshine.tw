
import { Activity, SportType, RentalVenue, Team, CourseLocation, CourseClass, Venue, Course } from './types';

export const SPORT_ICONS: Record<string, string> = {
  basketball: '🏀',
  badminton: '🏸',
  fitness: '💪',
  swimming: '🏊‍♂️',
  volleyball: '🏐',
  tennis: '🎾',
  soccer: '⚽',
  all: '🌟'
};

export const SPORT_LABELS: Record<string, string> = {
  basketball: '籃球',
  badminton: '羽球',
  fitness: '健身房',
  swimming: '游泳',
  volleyball: '排球',
  tennis: '網球',
  soccer: '足球',
  all: '全部'
};

export const DANCING_SUNLIGHT_VENUES: Venue[] = [
  {
    id: 'v1',
    name: '舞動陽光 - 萬華運動中心',
    address: '台北市萬華區西寧南路6-1號',
    phone: '02-2375-9900',
    image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&h=200&fit=crop',
    district: '萬華區',
    facilities: ['basketball', 'badminton', 'fitness', 'swimming']
  },
  {
    id: 'v2',
    name: '舞動陽光 - 中正運動中心',
    address: '台北市中正區信義路一段1號',
    phone: '02-2396-3358',
    image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=200&fit=crop',
    district: '中正區',
    facilities: ['basketball', 'badminton', 'fitness', 'swimming']
  },
  {
    id: 'v3',
    name: '舞動陽光 - 大安運動中心',
    address: '台北市大安區辛亥路三段55號',
    phone: '02-2377-0300',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=200&fit=crop',
    district: '大安區',
    facilities: ['basketball', 'badminton', 'fitness', 'swimming']
  },
  {
    id: 'v4',
    name: '舞動陽光 - 信義運動中心',
    address: '台北市信義區松勤街100號',
    phone: '02-2723-4567',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=200&fit=crop',
    district: '信義區',
    facilities: ['basketball', 'badminton', 'fitness', 'swimming']
  }
];

export const LEVEL_LABELS: Record<string, string> = {
  beginner: '初階',
  intermediate: '中階',
  advanced: '進階'
};

export const LEVEL_COLORS: Record<string, string> = {
  beginner: 'bg-green-100 text-green-700',
  intermediate: 'bg-yellow-100 text-yellow-700',
  advanced: 'bg-red-100 text-red-700'
};

export const MOCK_ACTIVITIES: Activity[] = [
  {
    id: '1',
    type: 'basketball',
    title: '週末籃球友誼賽',
    venue: '大安運動中心',
    location: '台北市大安區辛亥路三段 55 號 B1',
    level: 'beginner',
    levelScore: 2,
    date: '明天',
    time: '14:00-16:00',
    duration: '2 小時',
    currentMembers: 6,
    maxMembers: 10,
    captain: {
      name: 'Kevin',
      avatar: '👨',
      rating: 4.8,
      sessionsHosted: 89,
      tag: '資深隊長'
    },
    price: 150,
    description: '週末來打球！歡迎初學者和有經驗的球友一起來。',
    highlights: ['提供飲水', '有更衣室', '請自備球鞋']
  },
  {
    id: '2',
    type: 'badminton',
    title: '羽球雙打練習',
    venue: '信義國小體育館',
    location: '台北市信義區松勤路 60 號',
    level: 'intermediate',
    levelScore: 5,
    date: '週六',
    time: '19:00-20:30',
    duration: '1.5 小時',
    currentMembers: 3,
    maxMembers: 4,
    captain: {
      name: 'Amy',
      avatar: '👩',
      rating: 4.9,
      sessionsHosted: 112
    },
    price: 200,
    description: '固定徵人，球友程度穩定，包含球場租借與球。',
    highlights: ['含球費', '近捷運站']
  },
  {
    id: '3',
    type: 'volleyball',
    title: '排球六排友誼賽',
    venue: '中正運動中心',
    location: '台北市中正區信義路一段1號',
    level: 'intermediate',
    levelScore: 4,
    date: '後天',
    time: '18:00-21:00',
    duration: '3 小時',
    currentMembers: 10,
    maxMembers: 12,
    captain: {
      name: 'Jason',
      avatar: '🏐',
      rating: 4.7,
      sessionsHosted: 45
    },
    price: 250,
    description: '歡迎有基礎的球友一起來玩，流流汗。',
    highlights: ['分組對抗', '專業排球場']
  },
  {
    id: '4',
    type: 'badminton',
    title: '羽球中階暢打',
    venue: '松山運動中心',
    location: '台北市松山區敦化北路1號',
    level: 'intermediate',
    levelScore: 6,
    date: '下週一',
    time: '20:00-22:00',
    duration: '2 小時',
    currentMembers: 8,
    maxMembers: 16,
    captain: {
      name: '王小明',
      avatar: '🏸',
      rating: 4.9,
      sessionsHosted: 210
    },
    price: 300,
    description: '程度約在 6 級左右，謝絕純新手，感謝配合。',
    highlights: ['多場地', '專業級用球']
  },
  {
    id: '5',
    type: 'tennis',
    title: '網球雙打對抗',
    venue: '彩虹河濱公園網球場',
    location: '台北市內湖區堤頂大道一段',
    level: 'advanced',
    levelScore: 8,
    date: '下週六',
    time: '08:00-10:00',
    duration: '2 小時',
    currentMembers: 2,
    maxMembers: 4,
    captain: {
      name: '老張',
      avatar: '🎾',
      rating: 4.5,
      sessionsHosted: 32
    },
    price: 100,
    description: '尋找程度相當的對手進行比賽。',
    highlights: ['河濱美景', '空氣好']
  }
];

export const MOCK_RENTAL_VENUES: RentalVenue[] = [
  {
    id: 1,
    name: '信義運動中心羽球場',
    type: 'badminton',
    area: 'taipei',
    district: 'xinyi',
    location: '台北市信義區松勤街100號',
    rating: 4.8,
    verified: true,
    popular: true,
    pricePerHour: 400,
    courts: 8,
    description: '專業羽球場地，設備新穎，交通便利',
    facilities: ['冷氣', '淋浴間', '停車場', '器材租借', 'WiFi'],
    openHours: '06:00-23:00',
    phone: '02-2723-4567',
    images: ['🏸', '🏟️']
  }
];

export const MOCK_TEAMS: Team[] = [
  {
    id: 'basketball', name: '籃球職人教學團隊', slogan: '專業籃球教學，培養未來之星',
    category: '籃球專業',
    description: '籃球職人教學團隊成立於2016年，由一群熱愛籃球的專業教練組成。我們致力於推廣籃球運動，培養學員的運動技能與團隊精神。',
    students: '1,250+', courses: 15, experience: 8, rating: 4.9,
    certification: '認證團隊', ratingBadge: '5★',
    coverImg: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    emoji: '🏀', primaryColor: 'from-orange-400 to-red-500', coachesCount: 8,
    coachList: [
      { id: '1', name: '教練 Jordan', initial: 'J', bg: 'bg-orange-500', experience: '8年專業教學經驗', rating: 4.9 },
      { id: '2', name: '教練 Mike', initial: 'M', bg: 'bg-red-500', experience: '前職業球員，10年教學經驗', rating: 4.8 },
      { id: '3', name: '教練 Kobe', initial: 'K', bg: 'bg-blue-500', experience: '青少年籃球專家，6年經驗', rating: 4.7 }
    ]
  },
  {
    id: 'badminton', name: '羽球精英學院', slogan: '國際級羽球教學，培養冠軍選手',
    category: '羽球專業',
    description: '羽球精英學院由國際級教練團隊組成，致力於培養優秀的羽球選手。完整的訓練體系，從基礎技巧到競技水準。',
    students: '890+', courses: 12, experience: 10, rating: 4.8,
    certification: '金牌團隊', ratingBadge: '4.8★',
    coverImg: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    emoji: '🏸', primaryColor: 'from-green-400 to-blue-500', coachesCount: 6,
    coachList: [
      { id: '4', name: '教練 Linda', initial: 'L', bg: 'bg-green-500', experience: '12年專業教學經驗', rating: 4.8 },
      { id: '5', name: '教練 Chen', initial: 'C', bg: 'bg-purple-500', experience: '前亞運代表選手', rating: 4.9 }
    ]
  },
  {
    id: 'tennis', name: '網球訓練中心', slogan: '專業網球教學，完整訓練體系',
    category: '網球專業',
    description: '網球訓練中心擁有專業的教練團隊和完善的訓練設施。提供從入門到進階的完整課程。',
    students: '650+', courses: 10, experience: 6, rating: 4.7,
    certification: '專業團隊', ratingBadge: '4.7★',
    coverImg: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    emoji: '🎾', primaryColor: 'from-yellow-400 to-orange-500', coachesCount: 5,
    coachList: [
      { id: '6', name: '教練 Tom', initial: 'T', bg: 'bg-yellow-500', experience: '6年網球教學經驗', rating: 4.7 },
      { id: '7', name: '教練 Amy', initial: 'A', bg: 'bg-blue-500', experience: '青少年分級賽冠軍教練', rating: 4.6 }
    ]
  }
];

export const MOCK_LOCATIONS: CourseLocation[] = [
  { id: 'l1', name: '台北信義館', address: '台北市信義區信義路五段5號', availableClasses: 8, phone: '02-2345-6789' },
  { id: 'l2', name: '台北內湖館', address: '台北市內湖區內湖路一段100號', availableClasses: 6, phone: '02-2658-9999' },
  { id: 'l3', name: '新竹竹北館', address: '新竹縣竹北市光明六路1號', availableClasses: 4, phone: '03-555-1234' }
];

export const MOCK_COURSES: Course[] = [
  { 
    id: 'c1',
    title: '兒童籃球基礎班', 
    category: '籃球',
    area: '萬華區', 
    venue: '萬華運動中心 籃球場',
    coach: '王大同', 
    time: '週二、四 19:00-20:30',
    capacity: '8-12人小班制',
    price: '$1,200', 
    rating: '4.9', 
    img: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&h=200&fit=crop' 
  },
  { 
    id: 'c2',
    title: '成人羽球進階班', 
    category: '羽球',
    area: '萬華區', 
    venue: '萬華運動中心 羽球場',
    coach: '李小龍', 
    time: '週一、三、五 18:00-19:30',
    capacity: '6人精緻班',
    price: '$1,800', 
    rating: '4.7', 
    img: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=200&fit=crop' 
  },
  { 
    id: 'c3',
    title: '兒童網球啟蒙班', 
    category: '網球',
    area: '中正區', 
    venue: '中正運動中心 網球場',
    coach: '張曼玉', 
    time: '週六 10:00-11:30',
    capacity: '4-6人小班',
    price: '$1,500', 
    rating: '4.8', 
    img: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=200&fit=crop' 
  },
  { 
    id: 'c4',
    title: '青少年籃球對抗班', 
    category: '籃球',
    area: '大安區', 
    venue: '大安運動中心 籃球場',
    coach: '林書豪', 
    time: '週五 19:00-21:00',
    capacity: '12-16人',
    price: '$1,000', 
    rating: '5.0', 
    img: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&h=200&fit=crop' 
  }
];

export const MOCK_CLASSES: CourseClass[] = [
  {
    id: 'c1', locationId: 'l1', name: '兒童籃球基礎班 (U10)', coachName: '王教練',
    time: '週一、週三 19:00-20:00', currentEnroll: 15, maxCapacity: 15,
    status: '已滿班（需排候補）', level: '初級', ageGroup: '8-12歲',
    price: 2400, startDate: '2026-02-05',
    description: '專業籃球教學，從零開始教起，培養未來之星。目前名額已滿，歡迎申請候補。'
  },
  {
    id: 'c2', locationId: 'l1', name: '青少年籃球進階班 (U14)', coachName: '李教練',
    time: '週二、週四 20:00-21:30', currentEnroll: 10, maxCapacity: 15,
    status: '進行中（可插班）', level: '中級', ageGroup: '12-14歲',
    price: 3200, startDate: '2026-02-10',
    description: '針對已有基礎的學員進行進階戰術與個人技術強化。課程已開始，仍開放插班。'
  },
  {
    id: 'c3', locationId: 'l2', name: '成人業餘籃球班', coachName: '張教練',
    time: '週六 09:00-10:30', currentEnroll: 4, maxCapacity: 12,
    status: '待開班', level: '初級', ageGroup: '18歲以上',
    price: 2800, startDate: '2026-03-01',
    description: '下班後的運動好去處，專業教練指導正確發力，避免運動傷害。尚未開課，熱烈招募中。'
  }
];

export const NOTIFICATIONS = [
  { 
    id: '1', 
    title: '新場地預訂', 
    type: 'venue', 
    typeLabel: '場租',
    content: 'A教室 - 明天 14:00-16:00', 
    time: '5 分鐘前',
    icon: 'fa-house',
    colorClass: 'bg-[#f97316]',
    bgColorClass: 'bg-orange-50 text-[#f97316]',
    borderClass: 'border-l-4 border-[#f97316]'
  },
  { 
    id: '2', 
    title: '課程即將開始', 
    type: 'course', 
    typeLabel: '課程',
    content: '瑜珈課程 - 30分鐘後開始', 
    time: '15 分鐘前',
    icon: 'fa-graduation-cap',
    colorClass: 'bg-purple-500',
    bgColorClass: 'bg-purple-100 text-purple-600',
    borderClass: 'border-l-4 border-purple-500'
  },
  { 
    id: '3', 
    title: '新訂單成立', 
    type: 'shop', 
    typeLabel: '商城',
    content: '瑜珈墊 x2 - 訂單 #1234', 
    time: '20 分鐘前',
    icon: 'fa-shopping-cart',
    colorClass: 'bg-green-500',
    bgColorClass: 'bg-green-100 text-green-600',
    borderClass: 'border-l-4 border-green-500'
  },
  { 
    id: '4', 
    title: '租金收款確認', 
    type: 'venue', 
    typeLabel: '場租',
    content: '李小華 - B教室租金 $1,200', 
    time: '30 分鐘前',
    icon: 'fa-money-bill-wave',
    colorClass: 'bg-[#f97316]',
    bgColorClass: 'bg-orange-50 text-[#f97316]',
    borderClass: ''
  }
];
