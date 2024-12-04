import React, {
  useState,
  useContext,
  createContext,
  useEffect,
  useReducer,
  Reducer,
  ReactNode,
} from "react";
import firebase from "../FirebaseConfig";
import { User } from "firebase";

const MEDIA_INITIAL_STATE = {
  id: "",
  label: "",
  value: {
    title: "",
    rating: 0,
    id: "",
    type: "",
    subtitle: "",
    image: "",
  },
};

const SELECTIONS_INITIAL_STATE: FirestoreContextSelections = {
  movie: { ...MEDIA_INITIAL_STATE },
  tvShow: { ...MEDIA_INITIAL_STATE },
  game: { ...MEDIA_INITIAL_STATE },
  book: { ...MEDIA_INITIAL_STATE },
};

const METADATA_INITIAL_STATE: FirestoreContextMedatata = {
  user: {},
  publicUser: {},
};

export interface FirestoreContext extends FirestoreContextState {
  setSelection: (arg1: FirestoreContextSelections) => FirestoreContextState;
  setMetadata: (arg1: FirestoreContextMedatata) => FirestoreContextState;
}

type ContextMedia = {
  id: string;
  label: string;
  value: ContextMediaValue;
};

type ContextMediaValue = {
  title: string;
  rating: number;
  id: string;
  type: string;
  subtitle: string;
  image: string;
};

type FirestoreContextUser = {
  fullName?: string;
  avatar?: string;
  email?: string;
};
type FirestoreContextMedatata = {
  publicUser?: FirestoreContextUser;
  user?: FirestoreContextUser;
};

export type FirestoreContextSelections = {
  movie?: ContextMedia;
  tvShow?: ContextMedia;
  game?: ContextMedia;
  book?: ContextMedia;
};

type FirestoreContextState = {
  selections?: FirestoreContextSelections;
  metadata?: FirestoreContextMedatata;
};

type UseAuthState = {
  initializing: boolean;
  user: User | null;
};

export const UserContext = createContext({ user: {} as User });
export const SelectionContext = createContext({} as FirestoreContext);

export const useSession = (): User => {
  const { user } = useContext(UserContext);
  return user;
};

export const useAuth = (): UseAuthState => {
  const [state, setState] = useState<UseAuthState>(() => {
    const user = firebase.auth().currentUser;
    return { initializing: !user, user };
  });
  const onChange = (user: User | null) => {
    setState({ initializing: false, user });
  };

  useEffect(() => {
    // listen for auth state changes
    const unsubscribe = firebase.auth().onAuthStateChanged(onChange);
    // unsubscribe to the listener when unmounting
    return () => unsubscribe();
  }, []);

  return state;
};

export const FirestoreContextProvider = ({ children }: { children: ReactNode }) => {

  const [selections, setSelection] = useReducer<Reducer<FirestoreContextSelections, Partial<FirestoreContextSelections>>>((
    state,
    payload
  ) => ({
    ...state,
    ...payload,
  }), SELECTIONS_INITIAL_STATE);

  const [metadata, setMetadata] = useReducer<Reducer<FirestoreContextMedatata, Partial<FirestoreContextMedatata>>>((
    state,
    payload
  ) => ({
    ...state,
    ...payload,
  }), METADATA_INITIAL_STATE);

  return (
    <>
      <SelectionContext.Provider
        value={
          {
            selections,
            setSelection,
            metadata,
            setMetadata,
          } as FirestoreContext
        }
      >
        {children}
      </SelectionContext.Provider>
    </>
  );
};
