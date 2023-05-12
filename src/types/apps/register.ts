export interface PersonalInfo {
  title: string
  firstName: string
  lastName: string
  email: string
  password: string
  phone: string
  country: string
  city: string
}

export interface ProfessionalInfo {
  highestQualification: string
  profile: string
  speciality: string
  yearsOfExperience: string
  sector: string
  workEnvironment: string
  institution: string
}

//title enum
export enum Title {
  Mr = 'Mr',
  Mrs = 'Mrs',
  Dr = 'Dr',
  Prof = 'Prof'
}

//highestQualification enum
export enum HighestQualification {
  PhD = 'PhD',
  Masters = 'Masters',
  Certificate = 'Certificate',
  Other = 'Other'
}

//profile enum
export enum Profile {
  Doctor = 'Doctor',
  Pharmacist = 'Pharmacist',
  Nurse = 'Nurse',
  Patient = 'Patient',
  MedicalStudent = 'Medical Student'
}

//sector enum
export enum Sector {
  Public = 'Public',
  Private = 'Private'
}

//workEnvironment enum
export enum WorkEnvironment {
  Hospital = 'Hospital',
  Clinic = 'Clinic',
  PrivatePractice = 'Private Practice',
  Home = 'Home'
}
