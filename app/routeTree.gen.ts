/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as AuthedImport } from './routes/_authed'
import { Route as IndexImport } from './routes/index'
import { Route as AuthedDashboardImport } from './routes/_authed/dashboard'
import { Route as AuthedProjectIdImport } from './routes/_authed/$projectId'

// Create/Update Routes

const AuthedRoute = AuthedImport.update({
  id: '/_authed',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const AuthedDashboardRoute = AuthedDashboardImport.update({
  id: '/dashboard',
  path: '/dashboard',
  getParentRoute: () => AuthedRoute,
} as any)

const AuthedProjectIdRoute = AuthedProjectIdImport.update({
  id: '/$projectId',
  path: '/$projectId',
  getParentRoute: () => AuthedRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/_authed': {
      id: '/_authed'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AuthedImport
      parentRoute: typeof rootRoute
    }
    '/_authed/$projectId': {
      id: '/_authed/$projectId'
      path: '/$projectId'
      fullPath: '/$projectId'
      preLoaderRoute: typeof AuthedProjectIdImport
      parentRoute: typeof AuthedImport
    }
    '/_authed/dashboard': {
      id: '/_authed/dashboard'
      path: '/dashboard'
      fullPath: '/dashboard'
      preLoaderRoute: typeof AuthedDashboardImport
      parentRoute: typeof AuthedImport
    }
  }
}

// Create and export the route tree

interface AuthedRouteChildren {
  AuthedProjectIdRoute: typeof AuthedProjectIdRoute
  AuthedDashboardRoute: typeof AuthedDashboardRoute
}

const AuthedRouteChildren: AuthedRouteChildren = {
  AuthedProjectIdRoute: AuthedProjectIdRoute,
  AuthedDashboardRoute: AuthedDashboardRoute,
}

const AuthedRouteWithChildren =
  AuthedRoute._addFileChildren(AuthedRouteChildren)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '': typeof AuthedRouteWithChildren
  '/$projectId': typeof AuthedProjectIdRoute
  '/dashboard': typeof AuthedDashboardRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '': typeof AuthedRouteWithChildren
  '/$projectId': typeof AuthedProjectIdRoute
  '/dashboard': typeof AuthedDashboardRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/_authed': typeof AuthedRouteWithChildren
  '/_authed/$projectId': typeof AuthedProjectIdRoute
  '/_authed/dashboard': typeof AuthedDashboardRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '' | '/$projectId' | '/dashboard'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '' | '/$projectId' | '/dashboard'
  id:
    | '__root__'
    | '/'
    | '/_authed'
    | '/_authed/$projectId'
    | '/_authed/dashboard'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  AuthedRoute: typeof AuthedRouteWithChildren
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  AuthedRoute: AuthedRouteWithChildren,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/_authed"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/_authed": {
      "filePath": "_authed.tsx",
      "children": [
        "/_authed/$projectId",
        "/_authed/dashboard"
      ]
    },
    "/_authed/$projectId": {
      "filePath": "_authed/$projectId.tsx",
      "parent": "/_authed"
    },
    "/_authed/dashboard": {
      "filePath": "_authed/dashboard.tsx",
      "parent": "/_authed"
    }
  }
}
ROUTE_MANIFEST_END */
