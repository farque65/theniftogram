import { useReducer, useContext, createContext } from 'react'

const SourceStateContext = createContext()
const SourceDispatchContext = createContext()

const reducer = (state, action) => {
  switch (action.type) {
    case 'SETSOURCE':
      return state = action.payload
    default:
      throw new Error(`Unknown action: ${action.type}`)
  }
}

export const SourceProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, 0)
  return (
    <SourceDispatchContext.Provider value={dispatch}>
      <SourceStateContext.Provider value={state}>
        {children}
      </SourceStateContext.Provider>
    </SourceDispatchContext.Provider>
  )
}

export const useSource = () => useContext(SourceStateContext)
export const useDispatchSource = () => useContext(SourceDispatchContext)