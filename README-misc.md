# Branch for my own purpose
- study communication flow between connectivity FW and peripheral
- possibility of standalong build without:
  - pc-nrfconnect-shared: contains generic react/redux componments
  - pc-nrfconnect-launcher: contains jlink and DFU dependencies of the central device
- porting to a simple electron app project 
- deal with pc-ble-driver-js and pc-ble-driver

# NOTICE: 
1. npm install can only ran once, with origin package-lock.json and empty node_modules
2. copy build.js and webpack config from node_modules/pc-nrfconnect-shared,
   can run >node build.js --watch for bundle js

