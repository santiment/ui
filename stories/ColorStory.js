import React from 'react'
import { storiesOf } from '@storybook/react'
import vars from '../src/variables.scss'
import './ColorStory.scss'

const breaksAfter = [
  'shark',
  'mirage-night',
  'jungle-green-dark-3',
  'texas-rose-dark-3',
  'bright-sun-hover',
  'persimmon-dark-2',
  'lima-dark',
  'sheets-hover',
  'dodger-blue-dark-3',
  'heliotrope-dark-2',
  'malibu-dark'
]

storiesOf('Colors', module).add('List of all colors', () => (
  <div
    style={{
      display: 'flex',
      flexWrap: 'wrap'
    }}
  >
    {Object.keys(vars).map(name => (
      <React.Fragment key={name}>
        <div className='color-card' style={{ width: '10%' }}>
          <div
            style={{
              width: 120,
              height: 120,
              background: `var(--${name}, ${vars[name]})`,
              borderRadius: 4
            }}
          />
          <div>
            {name} ({vars[name]})
            {(name.includes('night') || name.includes('dark')) && (
              <p>
                When in night-mode, this color automatically takes place of
                day-mode color synonym
              </p>
            )}
          </div>
        </div>
        {breaksAfter.includes(name) && <div style={{ width: '100%' }} />}
      </React.Fragment>
    ))}
  </div>
))
