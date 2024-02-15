import App from "./App"
import Anime from "./pages/Anime"

const routes = [
  {
    path: "/",
    name: "Home",
    element: App
  },
  {
    path: "/anime",
    name: "Anime",
    exact: true,
    element: Anime
  }
]
export default routes
