import { ProviderContext } from "notistack"
import { NavigateFunction } from "react-router"

export interface RouteProps {
  navigate: NavigateFunction
  snackbar: ProviderContext
  query?: { [key: string]: string }
}
