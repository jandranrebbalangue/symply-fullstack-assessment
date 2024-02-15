import React from "react"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import ReactDOM from "react-dom/client"
import { TaskProvider } from "./context/Tasks/taskProvider.tsx"
import routes from "./routes.ts"

const routerPaths = routes.map((route) => {
  return {
    path: route.path,
    name: route.name,
    element: <route.element />,
    exact: route.exact
  }
})

const router = createBrowserRouter(routerPaths)

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <TaskProvider>
      <RouterProvider router={router} fallbackElement={<div>Loading...</div>} />
    </TaskProvider>
  </React.StrictMode>
)
