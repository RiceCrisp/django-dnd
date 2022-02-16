import { useMemo, useState } from 'react'

export function useAbilities(defaultStateOverride) {
  const abilityList = useMemo(() => [
    {
      label: 'Strength',
      name: 'strength',
      abbr: 'STR',
      desc: 'Strength measures natural atheleticism and bodily power.'
    },
    {
      label: 'Dexterity',
      name: 'dexterity',
      abbr: 'DEX',
      desc: 'Dexterity measures physical agility, reflexes, balance, and poise.'
    },
    {
      label: 'Constitution',
      name: 'constitution',
      abbr: 'CON',
      desc: 'Constitution measures health, stamina, and vital force.'
    },
    {
      label: 'Intelligence',
      name: 'intelligence',
      abbr: 'INT',
      desc: 'Intelligence measures mental acuity, information recall, and analytical skill.'
    },
    {
      label: 'Wisdom',
      name: 'wisdom',
      abbr: 'WIS',
      desc: 'Wisdom measures awareness, intuition, and insight.'
    },
    {
      label: 'Charisma',
      name: 'charisma',
      abbr: 'CHA',
      desc: 'Charisma measures confidence, eloquence, and leadership.'
    }
  ], [])

  const defaultState = useMemo(() => {
    const output = {}
    abilityList.forEach(a => {
      output[a.name] = 0
    })
    return output
  }, [abilityList])

  const [abilities, setAbilities] = useState(defaultStateOverride || defaultState)

  return { abilities, setAbilities, abilityList }
}
