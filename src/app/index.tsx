import { RouteConfig, renderRoutes } from "react-router-config";
// Import your global styles here
import "normalize.css/normalize.css";
import styles from "./styles.module.scss";

interface Route {
  route: { routes: RouteConfig[] };
}

const App = ({ route }: Route): JSX.Element => (
  <div className={styles.App}>
    {renderRoutes(route.routes)}
  </div>
);

export default App;
