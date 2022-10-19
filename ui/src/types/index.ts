export type LoggedInStatus = 'INIT' | 'LOGGED_IN' | 'LOGGED_OUT' | 'PENDING'

export type StateStatus = 'INIT' | 'COMPLETE' | 'PENDING' | 'ERROR'

export interface UserState {
  status: LoggedInStatus
  id: string
  username: string
  email: string
  firstName?: string
  lastName?: string
}

export interface UserAPIResponse {
  id: string
  username: string
  email: string
  first_name?: string
  last_name?: string
}

export interface CampaignState {
  status: StateStatus
  campaign: TCampaign | null
  characters: TCharacter[]
}

export interface CampaignsState {
  status: StateStatus
  campaigns: TCampaign[]
}

export interface CharactersState {
  status: StateStatus,
  characters: TCharacter[],
  characterFocusId: string,
  updateStack: {
    [index: TCharacter['id']]: Omit<TCharacter, 'id'>
  }
}

export interface ClassesState {
  status: StateStatus
  classes: TClass[]
}

export interface RacesState {
  status: StateStatus
  races: TRace[]
}

export interface TCampaign {
  id: string
  name: string
}

export interface TCharacter {
  id: string
  campaign?: string
  order?: number
  name: string
  hp: number
  maxHp: number
  race: string
  _class: string
  abilities: Record<TAbility, number>
  skills: Record<TSkill, number>
}

export type TClass = {
  value:
  'barbarian' |
  'bard' |
  'cleric' |
  'druid' |
  'fighter' |
  'monk' |
  'paladin' |
  'ranger' |
  'rogue' |
  'sorcerer' |
  'warlock' |
  'wizard' |
  'artificer' |
  'bloodHunter'
  display_name: string
}

export type TRace = {
  value:
  'dragonborn' |
  'dwarf' |
  'elf' |
  'gnome' |
  'half-elf' |
  'halfling' |
  'half-orc' |
  'human' |
  'tiefling',
  display_name: string
}

export type TAbility =
  'strength' |
  'dexterity' |
  'constitution' |
  'intelligence' |
  'wisdom' |
  'charisma'

export type TSkill =
  'acrobatics' |
  'animalHandling' |
  'arcana' |
  'atheletics' |
  'deception' |
  'history' |
  'insight' |
  'intimidation' |
  'investigation' |
  'medicine' |
  'nature' |
  'perception' |
  'performance' |
  'persuasion' |
  'religion' |
  'sleightOfHand' |
  'stealth' |
  'survival'

export type AbilityList = {
  label: string
  name: TAbility
  abbr: string
  description: string
}[]

export type SkillList = {
  label: string
  name: TSkill
  abbr: string
  description: string
}[]

export interface HTTPFixture {
  url: string
  method: 'GET' | 'POST' | 'DELETE' | 'PATCH' | 'PUT'
  statusCode: number
  delay: number
  body: unknown
}
