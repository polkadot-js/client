;; Copyright 2017-2018 Jaco Greeff
;; This software may be modified and distributed under the terms
;; of the ISC license. See the LICENSE file for details.

(module
  ;; imports, compliant as per spec
  (import "proxy" "execute_block" (func $execute_block (param i32 i32) (result i64)))
  (import "proxy" "execute_transaction" (func $execute_transaction (param i32 i32) (result i64)))

  ;; storage for the return values
  (global $ret_hi (mut i32) (i32.const 0))
  (global $ret_lo (mut i32) (i32.const 0))

  ;; takes the i64 value, spliutting into hi & lo
  (func $return_wrap (param $result i64) (result i32)
    (set_global $ret_hi
      (i32.wrap/i64
        (i64.shr_u
          (get_local $result)
          (i64.const 32)
        )
      )
    )

    (set_global $ret_lo
      (i32.wrap/i64
        (get_local $result)
      )
    )

    (get_global $ret_lo)
  )

  ;; proxied execute_block exported
  (func (export "execute_block") (param i32 i32) (result i32)
    (call $return_wrap
      (call $execute_block
        (get_local 0)
        (get_local 1)
      )
    )
  )

  ;; proxied execute_transaction exported
  (func (export "execute_transaction") (param i32 i32) (result i32)
    (call $return_wrap
      (call $execute_transaction
        (get_local 0)
        (get_local 1)
      )
    )
  )

  ;; returns the hi part of the i64
  (func (export "get_return_hi") (result i32)
    (get_global $ret_hi)
  )

  ;; returns the lo part of the i64 (also returned)
  (func (export "get_return_lo") (result i32)
    (get_global $ret_lo)
  )
)
