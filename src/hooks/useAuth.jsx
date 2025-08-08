import React, { use } from 'react'
import { AuthContext } from '../context/Authcontext'

export default function useAuth() {
  const info=use(AuthContext);
  return info;
}
