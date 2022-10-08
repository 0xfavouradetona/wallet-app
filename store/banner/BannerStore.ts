import { _await, Model, model, modelAction, modelFlow, runUnprotected, tProp as p, types as t } from "mobx-keystone";
import { localStorage } from "../../utils/localStorage";
import { t as trans } from "../../i18n"
import { computed } from "mobx";
import { getAppStore } from "../../App";
import { LOCKER_MODE } from "../app/AppStore";
import { RootNavigation } from "../../navigators";

export enum BANNERS_NAMES {
    WOOTZAPP_ID = 'WOOTZAPP_ID',
    CHECK_SEED = 'CHECK_SEED'
}

@model("Banner")
export class Banner extends Model({
    id: p(t.string, ""),
    tittle: p(t.string, ""),
    description: p(t.string, ""),
    isSuggested: p(t.boolean, true),
    colors: p(t.array(t.string), () => []),
    locations: p(t.array(t.number), () => [0, 0.5]),
    initialized: p(t.boolean, false)
}) {
    onPress
    image

    @modelAction
    setSuggest = (val: boolean) => {
        this.isSuggested = val

    }

    @modelFlow
    * init() {
        this.isSuggested = false
        this.initialized = true
    }
}

@model("BannerStore")
export class BannerStore extends Model({
    initialized: p(t.boolean, false),
    allBanners: p(t.array(t.model<Banner>(Banner)), () => [])
}) {

    @modelFlow
    * init() {

        this.initialized = true
    }

    @modelAction
    setSuggest = (name: BANNERS_NAMES, val: boolean) => {
        const banner = this.allBanners.find(b => b.id === name)
        if (banner) {
            banner.setSuggest(val)
        }
    }

    @computed
    get banners() {
        return this.allBanners.filter(o => !o.isSuggested)
    }
}