import { ref, onMounted } from "vue";
import { auth } from "@/services/firebase";
import { onAuthStateChanged, type User } from "firebase/auth";

/*We can import this later when we need to check does the uyser have valid login state */
/*We can just somply check if returned user is not null */
const user = ref<User | null>(null);

onAuthStateChanged(auth, (firebaseUser) => {
    user.value = firebaseUser;
});

export function hasAuth() {
    return {
        user,
        hasLoggedIn: user,
    };
}

// I think this can get "stuck" and keep returning the old state even if it's not valid anymore.
// So lets just call this directly from where its needed.
// let userAuth
// export default userAuth = hasAuth()
