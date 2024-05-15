import useAuth from "../../hooks/useAuth";
import { redirect, Route } from "react-router-dom";

export default function PrivateRoute({ children, ...rest }) {
    let auth = useAuth();
  
    return (
      <Route
        {...rest}
        render={({ location }) =>
          auth ? (
            children
          ) : (
            <redirect
              to={{
                pathname: "/login",
                state: { from: location },
              }}
            />
          )
        }
      />
    );
  }
  