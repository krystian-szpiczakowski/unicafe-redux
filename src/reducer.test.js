import deepFreeze from 'deep-freeze'
import counterReducer from './reducer'

describe('unicafe reducer', () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0
  }

  test('should return a proper initial state when called with undefined state', () => {
    const action = {
      type: 'DO_NOTHING'
    }

    const newState = counterReducer(undefined, action)
    expect(newState).toEqual(initialState)
  })

  test('good is incremented', () => {
    const action = {
      type: 'GOOD'
    }
    const state = initialState

    Object.freeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 1,
      ok: 0,
      bad: 0
    })
  })

  test('ok is incremented', () => {
    const action = {
      type: 'OK'
    }
    const state = initialState

    Object.freeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 0,
      ok: 1,
      bad: 0
    })
  })

  test('bad is incremented', () => {
    const action = {
      type: 'BAD'
    }
    const state = initialState

    Object.freeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 0,
      ok: 0,
      bad: 1
    })
  })

  test('counter sums reviews independently', () => {
    const badAction = {
      type: 'BAD'
    }

    const okAction = {
      type: 'OK'
    }

    const goodAction = {
      type: 'GOOD'
    }

    let state = initialState
    Object.freeze(state)

    state = counterReducer(state, badAction)
    state = counterReducer(state, goodAction)
    state = counterReducer(state, okAction)

    expect(state).toEqual({
      good: 1,
      ok: 1,
      bad: 1
    })
  })

  test('reset sets all reviews to 0', () => {
    const badAction = {
      type: 'BAD'
    }

    const okAction = {
      type: 'OK'
    }

    const goodAction = {
      type: 'GOOD'
    }

    const resetAction = {
      type: 'ZERO'
    }

    let state = initialState
    Object.freeze(state)

    state = counterReducer(state, badAction)
    state = counterReducer(state, goodAction)
    state = counterReducer(state, okAction)

    const stateAfterReset = counterReducer(state, resetAction)
    expect(stateAfterReset).toEqual({
      good: 0,
      ok: 0,
      bad: 0
    })
  })

})