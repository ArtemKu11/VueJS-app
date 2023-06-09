import { RootState } from "@/store/types";
import { GetterTree } from "vuex";
import { initWindowFlags } from "./state";
import { FlagsObject, WindowFlagsState } from "./types";

export const getters: GetterTree<WindowFlagsState, RootState> =  {
    getMainWindowFlag(state: WindowFlagsState): boolean {
        return state.flags.mainWindowFlag;
    },

    getFileBrowseWindowFlag(state: WindowFlagsState): boolean {
        return state.flags.fileBrowseWindowFlag;
    },

    getFilePreviewWindowFlag(state: WindowFlagsState): boolean {
        return state.flags.filePreviewWindowFlag;
    },

    getMoveWindowFlag(state: WindowFlagsState): boolean {
        return state.flags.moveWindowFlag;
    },

    getInputWindowFlag(state: WindowFlagsState): boolean {
        return state.flags.inputWindowFlag;
    },

    // getInputWindowFlag: state => (): boolean => {
    //     return state.flags.inputWindowFlag;
    // },

    getCurrentFlagsObject: state => (): FlagsObject => {
        return JSON.parse(JSON.stringify(state.flags))
    },

    getInitFlagsObject: state => (): FlagsObject => {
        return JSON.parse(JSON.stringify(initWindowFlags)) 
    },

    getMainSettingsWindowFlag(state) {
        return state.flags.mainSettingsWindowFlag;
    },

    getConsoleWindowFlag(state) {
        return state.flags.consoleWindowFlag;
    },

    getProfilesWindowFlag(state) {
        return state.flags.profilesWindowFlag;
    },

    getSelectListWindowFlag(state) {
        return state.flags.selectListWindowFlag
    },

    getPreprintingWindowFlag(state) {
        return state.flags.preprintingWindowFlag
    },

    getPrintingWindowFlag(state) {
        return state.flags.printingWindowFlag
    },

    getPrintSettingsWindowFlag(state) {
        return state.flags.printSettingsFlag
    },

    getGorelkaMaintenanceWindowFlag(state) {
        return state.flags.gorelkaMaintenanceWindowFlag
    },

    getSystemInfoWindowFlag(state) {
        return state.flags.systemInfoWindow
    }
}