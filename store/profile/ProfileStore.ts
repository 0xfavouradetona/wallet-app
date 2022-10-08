import { _await, model, Model, modelFlow, tProp as p, types as t } from "mobx-keystone"
import { localStorage } from "../../utils/localStorage";
import { RequestStore } from "../api/RequestStore";
import { API_WOOTZAPP_URL, WOOTZAPP_ROUTES } from "../../config/api";
import { API_WOOTZAPP_TOKEN } from "../../envs/env"
import { profiler } from "../../utils/profiler/profiler";
import { EVENTS } from "../../config/events";
import { getWalletStore } from "../../App";
import { formatRoute } from "../../navigators";
import { computed } from "mobx";


export enum SUGGESTION_STEP {
    SUGGESTION = 'SUGGESTION',
    ENTER_ID = 'ENTER_ID',
    VERIFICATION = 'VERIFICATION'
}

@model("ProfileStore")
export class ProfileStore extends Model({
    firstInit: p(t.boolean, false),
    isSuggested: p(t.boolean, false),
    initialized: p(t.string, "").withSetter(),
    requested: p(t.boolean, false),
    formStep: p(t.enum(SUGGESTION_STEP), SUGGESTION_STEP.SUGGESTION).withSetter(),
    loaded: p(t.boolean, false),
    verified: p(t.boolean, false),
    checked: p(t.boolean, false),
    key: p(t.string, ""),
    user: p(t.maybeNull(t.object(() => ({
        uid: t.string,
        birthDate: t.string,
        country: t.string,
        city: t.string,
        firstName: t.string,
        lastName: t.string,
        createdAt: t.dateTimestamp
    }))))
}) {

    api: RequestStore

    @computed
    get show() {
        return !this.isSuggested && this.firstInit
    }

    @modelFlow
    * firstStart() {
        this.firstInit = true
        localStorage.save("hm-wallet-wootzappid-first-init", true)
    }

    @modelFlow
    * checkCode(value) {
        try {
            const result = yield* _await(this.api.post(WOOTZAPP_ROUTES.INTROSPECT.POST_SIGNUP_CHECK, { confirmKey: value }))
            if (result.ok) {
                this.checked = true
                this.user = result.data
                this.key = value
                localStorage.save("hm-wallet-wootzappid-checked", true)
                localStorage.save("hm-wallet-wootzappid-user", this.user)
                this.requested = true
                return result.data
            } else {
                this.requested = true
                return false
            }
        } catch (e) {
            console.log("ERROR", e)
        }
    }

    @modelFlow
    * verify(key, address) {
        const result = yield* _await(this.api.post(WOOTZAPP_ROUTES.INTROSPECT.POST_SIGNUP_CONFIRM, {
            confirmKey: key,
            walletId: address
        }))
        // @ts-ignore
        this.setVerified(result.ok)

    }

    @modelFlow
    * checkWallet() {
        console.log("check-wallet", getWalletStore().wallets[0])
        if (getWalletStore().wallets[0]) {
            const result = yield* _await(this.api.get(formatRoute(WOOTZAPP_ROUTES.INTROSPECT.GET_SIGNUP_WALLET, {
                wallet: getWalletStore().wallets[0].address
            })))
            console.log({ result })

            this.setVerified(result.ok)
            this.setIsSuggested(result.ok)
            this.firstStart()
        }
    }


    @modelFlow
    * init() {
        const id = profiler.start(EVENTS.INIT_PROFILE_STORE)
        this.verified = (yield* _await(localStorage.load("hm-wallet-wootzappid-verified"))) || false
        this.checked = (yield* _await(localStorage.load("hm-wallet-wootzappid-checked"))) || false
        this.firstInit = (yield* _await(localStorage.load("hm-wallet-wootzappid-first-init"))) || false
        this.user = (yield* _await(localStorage.load("hm-wallet-wootzappid-user"))) || null
        this.isSuggested = (yield* _await(localStorage.load("hm-wallet-wootzappid-suggest"))) || false
        this.api = new RequestStore({}) // getRequest()
        this.api.init(API_WOOTZAPP_URL, { "x-auth-token": API_WOOTZAPP_TOKEN })
        if (!this.verified) {
            yield this.checkWallet()
        }
        this.initialized = true
        profiler.end(id)
    }

    @modelFlow
    * setIsSuggested(val: boolean) {
        this.isSuggested = val
        yield* _await(localStorage.save("hm-wallet-wootzappid-suggest", val))
    }

    @modelFlow
    * setVerified(val: boolean) {
        this.verified = val
        this.formStep = SUGGESTION_STEP.SUGGESTION
        yield* _await(localStorage.save("hm-wallet-wootzappid-verified", val))
    }
}
