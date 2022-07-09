import { User } from "@prisma/client";

export function isLoggedin() {
    let user:User | null = useState("user").value as User || null;
    if (user == null)
        return false;
    if (user.password == ''
    || user.email == ''
    || user.name == ''
    || user.active === false)
        return false;
    return true;
}