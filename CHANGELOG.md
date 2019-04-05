# 0.23.1

- Determine and listen on external p2p IP
- WebRTC signalling server support
- WebRTC (basic) signalling server via `--signal-active`
- Light client sync, along with default to light
- Light client browser deployment

# 0.22.1

- Support for both lmdb and file (native node) database interfaces
- Swap default DB to file (less memory intensive, which seems to be problematic on cloud instances)
- Rework connection and disconnect logic, it now works in adverse network conditions

# 0.21.1

- Support for sr25519 and secp256k1 externals
- Swap to WASM crypto (all hashing functions)
- Swap Kad to new interfaces, no manual randomWalk start
- Dockerfile available

# 0.20.1

- Swap to publishing -beta.x on merge (non-breaking testing)

# 0.19.1

- Support for POC-3 testnets, including Alexander (Polkadot) & Dried Danta (Substrate)

# 0.18.1

- Support for pre-POC-3 networks including new trie interfaces

# 0.17.1

- Full support for POC-2 testnets, most notably Krumme Lanke (Polkadot)
