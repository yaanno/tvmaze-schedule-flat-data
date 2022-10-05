declare namespace Schedule {
  export interface Rating {
    average: number
  }

  export interface Image {
    medium: string
    original: string
  }

  export interface Self {
    href: string
  }

  export interface Links {
    self: Self
  }

  export interface Schedule {
    time: string
    days: string[]
  }

  export interface Country {
    name: string
    code: string
    timezone: string
  }

  export interface Network {
    id: number
    name: string
    country: Country
    officialSite: string
  }

  export interface Webchannel {
    id: number
    name: string
    country: Country
    officialSite: string
  }

  export interface Externals {
    tvrage?: unknown
    thetvdb: number
    imdb: string
  }

  export interface Previousepisode {
    href: string
  }

  export interface Nextepisode {
    href: string
  }

  export interface LinkedLinks extends Links {
    previousepisode: Previousepisode
    nextepisode: Nextepisode
  }

  export interface Show {
    id: number
    url: string
    name: string
    type: string
    language: string
    genres: string[]
    status: string
    runtime: number
    averageRuntime: number
    premiered: string
    ended?: boolean | null
    officialSite: string
    schedule: Schedule
    rating: Rating
    weight: number
    network: Network
    webChannel?: Webchannel
    dvdCountry?: unknown
    externals: Externals
    image: Image
    summary: string
    updated: number
    _links: LinkedLinks
  }

  export interface Embedded {
    show: Show
  }

  export interface Item {
    id: number
    url: string
    name: string
    season: number
    number: number
    type: string
    airdate: string
    airtime: string
    airstamp: Date
    runtime: number
    rating: Rating
    image: Image
    summary: string
    _links: Links
    _embedded: Embedded
  }
}

export default Schedule
