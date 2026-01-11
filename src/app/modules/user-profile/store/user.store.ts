import { computed, Injectable, signal } from "@angular/core";
import { AuthenticatedUser } from "../../../core/models/user.model";
import { CodenameList } from "../../../core/models/codename.model";

@Injectable({providedIn: 'root'})
export class UserStore {
    #user = signal<AuthenticatedUser | null>(null);
    #codenameNameList = signal<CodenameList | null> (null);
    #loading = signal<boolean>(false);

    readonly user = computed(() => this.#user());
    readonly codenameList = computed(() => this.#codenameNameList());
    readonly loading = computed(() => this.#loading());

    setUser(user: AuthenticatedUser | null) {
        this.#user.set(user);
    }

    setCodenameNameList(codenameNameList: CodenameList | null) {
        this.#codenameNameList.set(codenameNameList);
    }

    setLoading(loading: boolean) {
        this.#loading.set(loading);
    }

    clearUser() {
        this.#user.set(null);
    }
}