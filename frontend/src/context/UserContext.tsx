import { createContext } from 'react';

const UserContext = createContext<[any, React.Dispatch<any>] | null>(null);

export default UserContext;