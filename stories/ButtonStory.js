import React from 'react'
import { storiesOf } from '@storybook/react'
import Button from '../src/Button/Button'
import Icon from '../src/Icon/Icon'
import ColorModeComparison from './ColorModeComparison'

const CustomA = ({ children, className, to }) => (
  <a href={to} className={className}>
    {children}
  </a>
)

const AccentButtons = ({ children, ...props }) =>
  accents.map(accent => (
    <React.Fragment key={accent}>
      <Button accent={accent.toLowerCase()} {...props}>
        {children(accent)}
      </Button>
      <div style={{ padding: 5 }} />
    </React.Fragment>
  ))

const accents = [
  'Grey',
  'Positive',
  'Negative',
  'Orange',
  'Blue',
  'Cyan',
  'Purple',
  'Sheets'
]

storiesOf('Button', module)
  .add('default', () => (
    <div>
      <ColorModeComparison>
        <Button>Default button</Button>
        <AccentButtons>{accent => accent}</AccentButtons>
        <Button disabled>Default disabled button</Button>
        <Button isLoading>Default loading button</Button>
      </ColorModeComparison>
    </div>
  ))
  .add('default (with icons)', () => (
    <div>
      <ColorModeComparison>
        <Button icon='search'> Default button with type of icon</Button>
        <Button icon='search' accent='orange'>
          Default orange button with type of icon
        </Button>
        <Button>
          <Icon type='search' /> Default button
        </Button>
        <AccentButtons>
          {accent => (
            <>
              <Icon type='search' /> {accent} button
            </>
          )}
        </AccentButtons>
        <Button disabled>
          <Icon type='search' />
          Default disabled button
        </Button>
        <Button icon='search' disabled>
          Default disabled button
        </Button>
        <Button isLoading>
          <Icon type='search' />
          Default loading button
        </Button>
      </ColorModeComparison>
    </div>
  ))
  .add('Bordered', () => (
    <div>
      <ColorModeComparison>
        <Button border>Default</Button>
        <AccentButtons border>{accent => `${accent} bordered`}</AccentButtons>
        <Button border accent='positive' disabled>
          Disabled
        </Button>

        <Button border>
          <Icon type='search' />
          Default search button
        </Button>
        <Button border icon='search'>
          {' '}
          Default button with type of icon
        </Button>

        <Button
          border
          accent='positive'
          isLoading
          style={{ '--loading-dot-size': '3px' }}
        >
          Loading
        </Button>
        <Button border accent='positive' isLoading>
          Loading
        </Button>
        <Button
          border
          accent='positive'
          isLoading
          style={{ '--loading-dot-size': '8px' }}
        >
          Loading
        </Button>
      </ColorModeComparison>
    </div>
  ))
  .add('as Prop', () => (
    <div>
      <ColorModeComparison>
        <Button as='a'>Specified as "&lt;a /&gt;" string</Button>
        <Button as={CustomA}>Custom React Element</Button>
      </ColorModeComparison>
    </div>
  ))
  .add('Variant: "fill"', () => (
    <div>
      <ColorModeComparison>
        <AccentButtons variant='fill'>
          {accent => `${accent} fill`}
        </AccentButtons>
        <Button variant='fill' accent='positive' disabled>
          Disabled
        </Button>
        <Button variant='fill' accent='positive' isLoading>
          Loading
        </Button>

        <Button variant='fill' accent='positive'>
          <Icon type='search' />
          Default search button
        </Button>
        <Button variant='fill' accent='positive' icon='search'>
          {' '}
          Default button with type of icon
        </Button>
      </ColorModeComparison>
    </div>
  ))
  .add('Variant: "flat"', () => (
    <div>
      <ColorModeComparison>
        <Button variant='flat'>Flat Button</Button>
        <Button border variant='flat'>
          Flat Border Button
        </Button>
        <Button variant='flat' isActive>
          Flat Active Button
        </Button>
        <hr />
        <Button variant='flat' accent='positive' disabled>
          Disabled
        </Button>

        <Button border variant='flat' disabled>
          Flat Border Button Bordered and Disabled
        </Button>
        <Button border variant='flat' icon='question-round' disabled>
          Flat Border Button Bordered and Disabled
        </Button>
        <Button variant='flat' accent='positive' isLoading>
          Loading
        </Button>

        <Button border variant='flat'>
          <Icon type='search' />
          Search button
        </Button>
        <Button border variant='flat' accent='positive' icon='search'>
          {' '}
          Positive button with type of icon
        </Button>
        <Button border variant='flat' icon='search'>
          {' '}
          Button with type of icon
        </Button>
      </ColorModeComparison>
    </div>
  ))
  .add('Variant: "flat" (fluid)', () => (
    <div>
      <ColorModeComparison>
        <Button fluid variant='flat'>
          Flat Button
        </Button>
        <Button fluid border variant='flat'>
          Flat Border Button
        </Button>
        <Button fluid variant='flat' isActive>
          Flat Active Button
        </Button>
      </ColorModeComparison>
    </div>
  ))
  .add('Variant: "ghost"', () => (
    <div>
      <ColorModeComparison>
        <Button variant='ghost'>Ghost Button</Button>
        <Button border variant='ghost'>
          Ghost Border Button
        </Button>
        <Button variant='ghost' isActive>
          Ghost Active Button
        </Button>
        <hr />
        <Button variant='ghost' accent='positive' disabled>
          Disabled
        </Button>
        <Button variant='ghost' accent='positive' border disabled>
          Disabled with border
        </Button>
        <Button variant='ghost' accent='positive' isLoading>
          Loading
        </Button>

        <Button border variant='ghost'>
          <Icon type='search' />
          Search button
        </Button>
        <Button border variant='ghost' accent='positive' icon='search'>
          {' '}
          Positive button with type of icon
        </Button>
        <Button border variant='ghost' icon='search'>
          {' '}
          Button with type of icon
        </Button>
      </ColorModeComparison>
    </div>
  ))
