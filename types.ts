
export type SportType = 'all' | 'basketball' | 'badminton' | 'fitness' | 'swimming' | 'volleyball' | 'tennis' | 'soccer';

export interface Venue {
  id: string;
  name: string;
  address: string;
  phone: string;
  image: string;
  district: string;
  facilities: SportType[];
}
export type SkillLevel = 'beginner' | 'intermediate' | 'advanced';
export type ActivityStatus = 'upcoming' | 'ongoing' | 'completed';

export interface Activity {
  id: string;
  type: SportType;
  title: string;
  venue: string;
  location: string;
  level: SkillLevel;
  levelScore: number; // 1-10 級，數字越大程度越高
  date: string;
  time: string;
  duration: string;
  currentMembers: number;
  maxMembers: number;
  captain: {
    name: string;
    avatar: string;
    rating: number;
    sessionsHosted: number;
    tag?: string;
  };
  price: number;
  description: string;
  highlights: string[];
}

export interface RentalVenue {
  id: number;
  name: string;
  type: SportType;
  area: string;
  district: string;
  location: string;
  rating: number;
  verified: boolean;
  popular: boolean;
  pricePerHour: number;
  courts: number;
  description: string;
  facilities: string[];
  openHours: string;
  phone: string;
  images: string[];
}

export interface Review {
  id: string;
  userName: string;
  avatar: string;
  rating: number;
  date: string;
  content: string;
}

export interface Message {
  id: string;
  sender: 'user' | 'captain';
  text: string;
  time: string;
}

export interface Coach {
  id: string;
  name: string;
  initial: string;
  bg: string;
  experience: string;
  rating: number;
}

export interface Team {
  id: string;
  name: string;
  slogan: string;
  category: string;
  description: string;
  students: string;
  courses: number;
  experience: number;
  rating: number;
  certification: string;
  ratingBadge: string;
  coverImg: string;
  emoji: string;
  primaryColor: string;
  coachesCount: number;
  coachList: Coach[];
}

export interface Course {
  id: string;
  title: string;
  category: string;
  area: string;
  venue: string;
  coach: string;
  time: string;
  capacity: string;
  price: string;
  rating: string;
  img: string;
}

export interface CourseLocation {
  id: string;
  name: string;
  address: string;
  availableClasses: number;
  phone: string;
}

export interface CourseClass {
  id: string;
  locationId: string;
  name: string;
  coachName: string;
  time: string;
  currentEnroll: number;
  maxCapacity: number;
  status: string;
  level: string;
  ageGroup: string;
  price: number;
  startDate: string;
  description: string;
}
