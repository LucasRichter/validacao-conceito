import React from 'react'
import '@testing-library/jest-dom'
import { cleanup, fireEvent, render, waitFor } from '@testing-library/react'
import SearchInput from '../../components/SearchInput'

afterEach(cleanup)

it('SearchInput debounce more than 2 chars', async () => {
  const onChange = jest.fn().mockResolvedValue(`value`)
  const { container } = render(<SearchInput id="input-test" onChange={onChange} />)
  const one = container.querySelector('input')

  fireEvent.change(one, {
    target: {
      value: `test`
    }
  })

  await waitFor(() => {
    expect(onChange).toHaveBeenCalled()
  }, 300)
})

it('SearchInput not debounce less than 2 chars', async () => {
  const onChange = jest.fn().mockResolvedValue(`value`)
  const { container } = render(<SearchInput id="input-test" onChange={onChange} />)
  const one = container.querySelector('input')

  fireEvent.change(one, {
    target: {
      value: `e`
    }
  })

  await waitFor(() => {
    expect(onChange).not.toHaveBeenCalled()
  }, 300)
})


it('SearchInput debounce have been called once', async () => {
  const onChange = jest.fn().mockResolvedValue(`value`)
  const { container } = render(<SearchInput id="input-test" onChange={onChange} />)
  const one = container.querySelector('input')

  // Call two times in arrow with the same value wont trigger onChange
  fireEvent.change(one, {
    target: {
      value: `test`
    }
  })

  fireEvent.change(one, {
    target: {
      value: `test`
    }
  })

  await waitFor(() => {
    expect(onChange).toBeCalledTimes(0)
  }, 200)

  fireEvent.change(one, {
    target: {
      value: `test2`
    }
  })

  fireEvent.change(one, {
    target: {
      value: `test2`
    }
  })

  await waitFor(() => {
    expect(onChange).toBeCalledTimes(1)
  }, 300)
})
