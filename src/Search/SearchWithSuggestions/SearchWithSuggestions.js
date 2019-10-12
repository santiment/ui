import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import Panel from '../../Panel/Panel'
import Search from '../Search'
import Button from '../../Button'
import styles from './SearchWithSuggestions.module.scss'

export const SUGGESTION_MORE = 'SUGGESTION_MORE'

let debounceTimer
const debounce = (clb, time) => clbArgs => {
  clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => clb(clbArgs), time)
}

const Suggestion = ({ isActive, className, ...props }) => (
  <Button
    fluid
    variant='ghost'
    className={cx(styles.suggestion, className, isActive && styles.cursored)}
    {...props}
  />
)

class SearchWithSuggestions extends PureComponent {
  static propTypes = {
    data: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        items: PropTypes.array.isRequired,
        suggestionContent: PropTypes.func.isRequired,
        predicate: PropTypes.func.isRequired,
        sorter: PropTypes.func,
        maxSuggestions: PropTypes.number
      })
    ).isRequired,
    onSuggestionSelect: PropTypes.func,
    onSuggestionsUpdate: PropTypes.func,
    maxSuggestions: PropTypes.number,
    iconPosition: PropTypes.oneOf(['left', 'right']),
    debounceTime: PropTypes.number,
    inputProps: PropTypes.object,
    suggestionsProps: PropTypes.object,
    dontResetStateAfterSelection: PropTypes.bool,
    className: PropTypes.string
  }

  static defaultProps = {
    maxSuggestions: 5,
    iconPosition: undefined,
    onSuggestionSelect: () => {},
    onSuggestionsUpdate: () => {},
    inputProps: {},
    suggestionsProps: {},
    debounceTime: 200,
    dontResetStateAfterSelection: false,
    value: '',
    defaultValue: '',
    className: ''
  }

  static getDerivedStateFromProps ({ value }, { lastValue }) {
    if (lastValue !== value) {
      return {
        searchTerm: value,
        lastValue: value
      }
    }

    return null
  }

  state = {
    suggestions: [],
    searchTerm: this.props.defaultValue,
    lastValue: this.props.value,
    isFocused: false,
    cursor: 0,
    cursorItem: SUGGESTION_MORE,
    isSearching: false
  }

  componentWillUnmount () {
    clearTimeout(debounceTimer)
  }

  onInputChange = ({ currentTarget }) => {
    this.setState(
      prevState => ({
        ...prevState,
        searchTerm: currentTarget.value,
        isSearching: true
      }),
      this.filterData
    )
  }

  onSuggestionSelect = suggestion => {
    const { dontResetStateAfterSelection, onSuggestionSelect } = this.props

    this.setState(
      dontResetStateAfterSelection
        ? {
            isSearching: false
          }
        : {
            isSearching: false,
            searchTerm: '',
            suggestions: [],
            suggestedCategories: [],
            cursor: 0
          },
      () => onSuggestionSelect(suggestion)
    )
  }

  filterData = debounce(() => {
    const {
      data,
      onSuggestionsUpdate,
      maxSuggestions: commonMaxSuggestions
    } = this.props

    this.setState(
      prevState => {
        const suggestedCategories = data
          .map(
            ({
              items,
              predicate,
              sorter,
              maxSuggestions = commonMaxSuggestions,
              ...rest
            }) => {
              return {
                ...rest,
                items: items
                  .filter(predicate(prevState.searchTerm))
                  .sort(sorter)
                  .slice(0, maxSuggestions)
              }
            }
          )
          .filter(({ items }) => items.length)

        const suggestions = suggestedCategories.reduce(
          (acc, { items }) => acc.concat(items),
          [SUGGESTION_MORE]
        )

        const cursor = +Boolean(suggestions.length)

        return {
          ...prevState,
          suggestedCategories,
          suggestions,
          cursor,
          cursorItem: suggestions[cursor],
          isSearching: false
        }
      },
      () => onSuggestionsUpdate(this.state.suggestions)
    )
  }, this.props.debounceTime)

  onFocus = () => {
    this.setState({ isFocused: true })
  }

  onBlur = () => {
    this.setState({ isFocused: false })
  }

  onKeyDown = evt => {
    const { suggestions, cursor } = this.state
    const { key, currentTarget } = evt
    let newCursor = cursor
    let selectedSuggestion

    switch (key) {
      case 'ArrowUp':
        evt.preventDefault()
        newCursor = cursor - 1
        break
      case 'ArrowDown':
        evt.preventDefault()
        newCursor = cursor + 1
        break
      case 'Enter':
        selectedSuggestion = suggestions[cursor]
        currentTarget.blur()
        return selectedSuggestion && this.onSuggestionSelect(selectedSuggestion)
      default:
        return
    }

    const maxCursor = suggestions.length

    newCursor = newCursor % maxCursor

    const nextCursor = newCursor < 0 ? maxCursor - 1 : newCursor
    this.setState({ cursor: nextCursor, cursorItem: suggestions[nextCursor] })
  }

  render () {
    const {
      suggestedCategories = [],
      searchTerm,
      isFocused,
      isSearching,
      cursor,
      cursorItem
    } = this.state
    const {
      iconPosition,
      inputProps = {},
      suggestionsProps = {},
      className
    } = this.props
    return (
      <div className={`${styles.wrapper} ${className}`}>
        <Search
          iconPosition={iconPosition}
          value={searchTerm}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          onChange={this.onInputChange}
          onKeyDown={this.onKeyDown}
          {...inputProps}
        />
        {isFocused && searchTerm !== '' && (
          <Panel
            variant='modal'
            className={styles.suggestions}
            {...suggestionsProps}
          >
            {suggestedCategories.length > 0 ? (
              <>
                <Suggestion
                  isActive={SUGGESTION_MORE === cursorItem}
                  onMouseDown={() => this.onSuggestionSelect(SUGGESTION_MORE)}
                  className={styles.more}
                >
                  View all results for "{searchTerm}"
                </Suggestion>
                {suggestedCategories.map(
                  ({ title, items, suggestionContent }) => (
                    <Fragment key={title}>
                      <h3 className={styles.title}>{title}</h3>
                      {items.map((suggestion, index) => (
                        <Suggestion
                          key={title + index}
                          isActive={suggestion === cursorItem}
                          onMouseDown={() =>
                            this.onSuggestionSelect(suggestion)
                          }
                        >
                          {suggestionContent(suggestion)}
                        </Suggestion>
                      ))}
                    </Fragment>
                  )
                )}
              </>
            ) : (
              <div className={styles.suggestion + ' ' + styles.noresults}>
                {!isSearching ? 'No results found' : 'Searching...'}
              </div>
            )}
          </Panel>
        )}
      </div>
    )
  }
}

export default SearchWithSuggestions
