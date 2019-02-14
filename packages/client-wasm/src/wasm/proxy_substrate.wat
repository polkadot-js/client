;; Copyright 2017-2019 @polkadot/client-wasm authors & contributors
;; This software may be modified and distributed under the terms
;; of the Apache-2.0 license. See the LICENSE file for details.

(module
  ;; Core_version
  ;; Core_authorities
  ;; Core_execute_block
  ;; Core_initialise_block
  ;; Metadata_metadata
  ;; BlockBuilder_apply_extrinsic
  ;; BlockBuilder_finalise_block
  ;; BlockBuilder_inherent_extrinsics
  ;; BlockBuilder_check_inherents
  ;; BlockBuilder_random_seed
  ;; TaggedTransactionQueue_validate_transaction
  ;; GrandpaApi_grandpa_pending_change
  ;; GrandpaApi_grandpa_authorities

  ;; imports, with all signatures are the same, Vec<u8> -> Vec<u8>
  (import "proxy" "Core_execute_block" (func $Core_execute_block (param i32 i32) (result i64)))

  ;; storage for the return values
  (global $result_hi (mut i32) (i32.const 0))
  (global $result_lo (mut i32) (i32.const 0))

  ;; takes the i64 value, splitting into hi & lo
  (func $wrap
    (param $result i64) (result i32)

    (set_global $result_hi
      (i32.wrap/i64
        (i64.shr_u
          (get_local $result)
          (i64.const 32)
        )
      )
    )

    (set_global $result_lo
      (i32.wrap/i64
        (get_local $result)
      )
    )

    (get_global $result_lo)
  )

  ;; returns the hi part of the i64
  (func (export "get_result_hi")
    (result i32)

    (get_global $result_hi)
  )

  ;; returns the lo part of the i64 (also returned)
  (func (export "get_result_lo")
    (result i32)

    (get_global $result_lo)
  )

  ;; proxied exported functions with i32 returns
  (func (export "Core_execute_block")
    (param i32 i32) (result i32)

    (call $wrap
      (call $Core_execute_block
        (get_local 0)
        (get_local 1)
      )
    )
  )
)
