declare interface Space {
  id: string
  name: string
  photo_url: string
  description: string
  locate: string
  is_available: boolean
}

declare interface Reservation {
  id: string
  user_name: string
  user_email: string
  space_id: string
  reserve_date: string
}

declare interface User {
  name: string
  email: string
}