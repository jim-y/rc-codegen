---
to: <%= path %>
---
<% ctxName = contextName + 'Context' -%>
<% isTs = extension === '.tsx' -%>
<% shouldUseState = stateContainer !== 'none' -%>
<% if (isTs && stateContainer === 'none') { %>
import { createContext, useContext, PropsWithChildren } from 'react';
<% } -%>
<% if (isTs && stateContainer === 'useState') { %>
import { useState, createContext, useContext, PropsWithChildren } from 'react';
<% } -%>
<% if (isTs && stateContainer === 'useReducer') { %>
import { useReducer, createContext, useContext, PropsWithChildren } from 'react';
<% } -%>
<% if (isTs) { %>
type ContextType = {}
<% } -%>
<% if (isTs && stateContainer === 'useReducer') { %>
type State = {}
type Action = {
  type: string;
}
<% } -%>

const <%= ctxName %> = createContext<% if(isTs) { %><ContextType><% } %>(<% if(isTs) { %>{} as ContextType<% } %>);
<% if(stateContainer === 'useReducer') { %>
const reducer = (state<% if(isTs) { %>: State<% } %>, action<% if(isTs) { %>: Action<% } %>) => {
  switch (action.type) {
    case '': return { ...state };
    default:
      throw new Error('Unknown action type');
  }
}

const initialState = {}<% if(isTs){ %> as State<% } %>;
<% } -%>

export function <%= name %>({ children }<% if(isTs) { %>: PropsWithChildren<unknown><% } %>) {
  <%_ if(stateContainer === 'useState') { %>const [state, setState] = useState({});<% } -%>
  <% if(stateContainer === 'useReducer') { %>const [state, dispatch] = useReducer(reducer, initialState);<% } %>
  return <<%= ctxName %>.Provider value={{<% if(stateContainer === 'useState') { %>...state<% } -%><% if(stateContainer === 'useReducer') { %>...state, dispatch<% } -%>}}>{children}</<%= ctxName %>.Provider>
}

export function use<%= contextName %>()<% if(isTs){ %>: ContextType<% } %> {
  return useContext(<%= ctxName %>);
}