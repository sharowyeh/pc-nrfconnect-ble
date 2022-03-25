/*
 * Copyright (c) 2015 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import { connect } from 'react-redux';
import { FirmwareRegistry } from 'pc-ble-driver-js';
import { DeviceSelector, logger } from 'pc-nrfconnect-shared';

import { closeAdapter, initAdapter } from '../actions/adapterActions';

const deviceListing = {
    jlink: true,
    nordicUsb: true,
    serialport: true,
};

/** replacement for firmware registry
 * refer to pc-ble-driver-js/api/firmwareRegistry.js
 * @returns {Object} device setup object
 */
function getDeviceSetup() {
    logger.info(
        'DEBUG: assign empty jprog/dfu to skip BLE dongle DFU for the latest FW version'
    );
    const config = {
        jprog: {},
        dfu: {},
        needSerialport: true,
    };
    return config;
}

const deviceSetup = {
    ...FirmwareRegistry.getDeviceSetup(),
    // ...getDeviceSetup(),
    allowCustomDevice: true,
};

const mapState = () => ({
    deviceListing,
    deviceSetup,
});

const mapDispatch = dispatch => ({
    // refer to pc-nrfconnect-shared project
    onDeviceSelected: device => {
        logger.info(
            `DEBUG: Selected device with s/n ${device.serialNumber} cdc ${device.serialPorts[0].comName}`
        );
    },
    releaseCurrentDevice: async () => {
        await dispatch(closeAdapter());
    },
    onDeviceIsReady: device => {
        logger.info(`DEBUG: Device setup completed ${JSON.stringify(device)}`);
        dispatch(initAdapter(device));
    },
    onDeviceDeselected: async () => {
        await dispatch(closeAdapter());
        logger.info('Device closed.');
    },
});

export default connect(mapState, mapDispatch)(DeviceSelector);
