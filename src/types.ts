import { NavigateFunction } from "react-router"
import { ProviderContext } from "notistack"

export interface RouteProps {
  navigate: NavigateFunction
  snackbar: ProviderContext
}
