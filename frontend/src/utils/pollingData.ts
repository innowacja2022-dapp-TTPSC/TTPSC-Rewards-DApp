import { _updateBalance } from "./updateBalance";

export function _startPollingData(_token:any, selectedAddress: string) {
    const _pollDataInterval = setInterval(() => _updateBalance(_token, selectedAddress), 1000);

    // We run it once immediately so we don't have to wait for it
   
    _updateBalance(_token, selectedAddress);
    return _pollDataInterval
}

export function _stopPollingData(_pollDataInterval: NodeJS.Timer) {
    clearInterval(_pollDataInterval);
    return undefined
}

export async function _getBalance(_token:any, selectedAddress: string) {
    const balance = await _token.balanceOf(selectedAddress);
    return balance
}