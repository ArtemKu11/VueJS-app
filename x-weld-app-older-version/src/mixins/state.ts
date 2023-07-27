import Vue from 'vue'
import { SocketActions } from '@/api/socketActions'
import { Component } from 'vue-property-decorator'
import { SystemInfo, NetworkState } from '@/store/server/types'

@Component
export default class StateMixin extends Vue {
    get authenticated() {
        const auth = this.$store.getters['auth/getAuthenticated']
        return auth
    }

    get socketConnected() {
        return this.$store.getters['socket/getConnectionState']
    }

    get apiConnected() {
        return this.$store.getters['socket/getApiConnected']
    }

    get socketConnecting() {
        return this.$store.getters['socket/getConnectingState']
    }

    get klippyReady() {
        return this.$store.getters['printer/getklippyReady']
    }

    get klippyConnected() {
        const server = this.$store.getters['server/getInfo']
        return server.klippy_connected
    }

    get hasWarnings() {
        return this.$store.getters['printer/getHasWarnings']
    }

    get klippyState() {
        return this.$store.getters['printer/getKlippyState']
    }

    get klippyStateMessage() {
        return this.$store.getters['printer/getKlippyStateMessage']
    }

    // Return the printer state
    get printerState() {
        return this.$store.getters['printer/getPrinterState']
    }

    // Returns a boolean indicating if the printer is busy.
    get printerBusy() {
        const printerState = this.printerState.toLowerCase()

        return (
            printerState === 'printing' ||
            printerState === 'paused' ||
            printerState === 'busy'
        )
    }

    // Returns a boolean indicating if the printer is paused.
    get printerPaused() {
        return this.printerState.toLowerCase() === 'paused'
    }

    /**
     * Returns a boolean indicating of the printer is printing.
     * (versus busy in some other way...)
     */
    get printerPrinting() {
        return this.printerState.toLowerCase() === 'printing'
    }

    /**
     * Indicates if we have a valid wait(s).
     * Supports a single string or a list of.
     */
    hasWait(wait: string | string[]): boolean {
        return this.$store.getters['wait/hasWait'](wait) as boolean
    }

    /**
     * Indicates if we have any waits.
     */
    get hasWaits(): boolean {
        return this.$store.getters['wait/hasWaits'] as boolean
    }

    /**
     * Indicates if we have any waits prefixed by.
     */
    hasWaitsBy(prefix: string): boolean {
        return this.$store.getters['wait/hasWaitsBy'](prefix) as boolean
    }

    /**
     * Send a gcode script.
     */
    sendGcode(gcode: string, wait?: string) {
        SocketActions.printerGcodeScript(gcode, wait)
        this.addConsoleEntry(gcode)
    }

    addConsoleEntry(message: string) {
        this.$store.dispatch('console/onAddConsoleEntry', { message, type: 'command' })
    }

    async emergencyStop() {
        const confirmOnEstop = this.$store.state.config.uiSettings.general.confirmOnEstop
        let res: boolean | undefined = true
        if (confirmOnEstop) {
            console.log(`res = await this.$confirm(
                this.$tc('app.general.simple_form.msg.confirm'),
                { title: this.$tc('app.general.label.confirm'), color: 'card-heading', icon: '$error' }
            )`)
        }
        if (res) {
            SocketActions.printerEmergencyStop()
        }
    }

    // ДОПИСАНО:

    get coordinatesHolder(): number[] {
        return this.$store.getters['ourExtension/layoutsData/moveWindow/getCoordinates']()
    }

    get fixedCoordinatesHolder(): string[] {
        const newCoords = []
        for (const coord of this.coordinatesHolder) {
            newCoords.push(coord.toFixed(1))
        }
        return newCoords
    }

    get printerAllowedToStartPrint() {
        return this.printerState.toLowerCase() === 'ready' || this.printerState.toLowerCase() === 'idle' || this.printerState.toLowerCase() === 'cancelled'
    }

    get ipAddresses(): string[] {
        const systemInfo = this.$store.getters['server/getSystemInfo'] as SystemInfo
        if (systemInfo && systemInfo.network) {
            const ipAdresses = this.getIpAddresses(systemInfo.network)
            if (ipAdresses.length) {
                return ipAdresses
            } else {
                return []
            }
        } else {
            return []
        }
    }

    getIpAddresses(networkObj: NetworkState): string[] {
        const ipAdrresses = []
        for (const id in networkObj) {
            const network = networkObj[id]
            if (network.ip_addresses) {
                for (const addr of network.ip_addresses) {
                    if (addr.address && addr.address.startsWith('192')) {
                        ipAdrresses.push(addr.address)
                    }
                }
            }
        }
        return ipAdrresses
    }
}
