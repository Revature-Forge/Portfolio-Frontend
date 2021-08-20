import { useAuth0 } from "@auth0/auth0-react";

const LogoutAuth0 = () => {
    const {logout} = useAuth0();
    
    return (
        {logout}
    )
}

export default LogoutAuth0;