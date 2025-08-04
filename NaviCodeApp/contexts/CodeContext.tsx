import React, { createContext, useReducer, useContext } from 'react';

interface CodeItem {
  code: string;
  name?: string;
}

interface CodeState {
  recent: CodeItem[];
  favorites: CodeItem[];
}

type CodeAction =
  | { type: 'ADD_RECENT'; payload: CodeItem }
  | { type: 'CLEAR_RECENT' }
  | { type: 'ADD_FAVORITE'; payload: CodeItem }
  | { type: 'REMOVE_FAVORITE'; payload: string };

function codeReducer(state: CodeState, action: CodeAction): CodeState {
  switch (action.type) {
    case 'ADD_RECENT':
      return {
        ...state,
        recent: [
          action.payload,
          ...state.recent.filter((i) => i.code !== action.payload.code),
        ].slice(0, 10),
      };
    case 'CLEAR_RECENT':
      return { ...state, recent: [] };
    case 'ADD_FAVORITE':
      return {
        ...state,
        favorites: state.favorites.find((i) => i.code === action.payload.code)
          ? state.favorites
          : [...state.favorites, action.payload],
      };
    case 'REMOVE_FAVORITE':
      return {
        ...state,
        favorites: state.favorites.filter((i) => i.code !== action.payload),
      };
    default:
      return state;
  }
}

const initialCodeState: CodeState = { recent: [], favorites: [] };

const CodeContext = createContext<{
  state: CodeState;
  addRecent: (item: CodeItem) => void;
  clearRecent: () => void;
  addFavorite: (item: CodeItem) => void;
  removeFavorite: (code: string) => void;
}>({
  state: initialCodeState,
  addRecent: () => {},
  clearRecent: () => {},
  addFavorite: () => {},
  removeFavorite: () => {},
});

export const CodeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(codeReducer, initialCodeState);

  const addRecent = (item: CodeItem) => dispatch({ type: 'ADD_RECENT', payload: item });
  const clearRecent = () => dispatch({ type: 'CLEAR_RECENT' });
  const addFavorite = (item: CodeItem) => dispatch({ type: 'ADD_FAVORITE', payload: item });
  const removeFavorite = (code: string) => dispatch({ type: 'REMOVE_FAVORITE', payload: code });

  return (
    <CodeContext.Provider value={{ state, addRecent, clearRecent, addFavorite, removeFavorite }}>
      {children}
    </CodeContext.Provider>
  );
};

export const useCode = () => useContext(CodeContext);
