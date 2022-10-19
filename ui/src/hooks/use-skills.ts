import { useMemo, useState } from 'react'
import { TSkill } from '~/types'

export function useSkills(defaultStateOverride: Record<TSkill, number> | null = null) {
  const skillList: {
    label: string
    name: TSkill
    ability: string
  }[] = useMemo(() => [
    {
      label: 'Acrobatics',
      name: 'acrobatics',
      ability: 'DEX'
    },
    {
      label: 'Animal Handling',
      name: 'animalHandling',
      ability: 'WIS'
    },
    {
      label: 'Arcana',
      name: 'arcana',
      ability: 'INT'
    },
    {
      label: 'Atheletics',
      name: 'atheletics',
      ability: 'STR'
    },
    {
      label: 'Deception',
      name: 'deception',
      ability: 'CHA'
    },
    {
      label: 'History',
      name: 'history',
      ability: 'INT'
    },
    {
      label: 'Insight',
      name: 'insight',
      ability: 'WIS'
    },
    {
      label: 'Intimidation',
      name: 'intimidation',
      ability: 'CHA'
    },
    {
      label: 'Investigation',
      name: 'investigation',
      ability: 'INT'
    },
    {
      label: 'Medicine',
      name: 'medicine',
      ability: 'WIS'
    },
    {
      label: 'Nature',
      name: 'nature',
      ability: 'INT'
    },
    {
      label: 'Perception',
      name: 'perception',
      ability: 'INT'
    },
    {
      label: 'Performance',
      name: 'performance',
      ability: 'INT'
    },
    {
      label: 'Persuasion',
      name: 'persuasion',
      ability: 'WIS'
    },
    {
      label: 'Religion',
      name: 'religion',
      ability: 'INT'
    },
    {
      label: 'Sleight of Hand',
      name: 'sleightOfHand',
      ability: 'DEX'
    },
    {
      label: 'Stealth',
      name: 'stealth',
      ability: 'DEX'
    },
    {
      label: 'Survival',
      name: 'survival',
      ability: 'WIS'
    }
  ], [])

  const defaultState = useMemo(() => {
    const output: Record<string, number> = {}
    skillList.forEach((s) => {
      output[s.name] = 0
    })
    return output as Record<TSkill, number>
  }, [skillList])

  const [skills, setSkills] = useState(defaultStateOverride || defaultState)

  return { skills, setSkills, skillList }
}
