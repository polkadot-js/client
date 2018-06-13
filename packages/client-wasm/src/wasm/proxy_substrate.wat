;; Copyright 2017-2018 @polkadot/client-wasm authors & contributors
;; This software may be modified and distributed under the terms
;; of the ISC license. See the LICENSE file for details.

(module
  ;; imports, compliant as per spec
  (import "proxy" "apply_extrinsic"
    (func $apply_extrinsic
      (param i32 i32) (result i64)
    )
  )
  (import "proxy" "execute_block"
    (func $execute_block
      (param i32 i32) (result i64)
    )
  )
  (import "proxy" "finalise_block"
    (func $finalise_block
      (param i32 i32) (result i64)
    )
  )
  (import "proxy" "initialise_block"
    (func $initialise_block
      (param i32 i32) (result i64)
    )
  )

  ;; storage for the return values
  (global $result_hi (mut i32) (i32.const 0))
  (global $result_lo (mut i32) (i32.const 0))

  ;; takes the i64 value, splitting into hi & lo
  (func $result_wrap
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

  ;; proxied apply_extrinsic exported
  (func (export "apply_extrinsic")
    (param i32 i32) (result i32)

    (call $result_wrap
      (call $apply_extrinsic
        (get_local 0)
        (get_local 1)
      )
    )
  )

  ;; proxied execute_block exported
  (func (export "execute_block")
    (param i32 i32) (result i32)

    (call $result_wrap
      (call $execute_block
        (get_local 0)
        (get_local 1)
      )
    )
  )

  ;; proxied finalise_block exported
  (func (export "finalise_block")
    (param i32 i32) (result i32)

    (call $result_wrap
      (call $finalise_block
        (get_local 0)
        (get_local 1)
      )
    )
  )

  ;; proxied execute_block exported
  (func (export "initialise_block")
    (param i32 i32) (result i32)

    (call $result_wrap
      (call $initialise_block
        (get_local 0)
        (get_local 1)
      )
    )
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
)
