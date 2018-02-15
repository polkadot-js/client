(module
  (import "proxy" "execute_block" (func $execute_block (param i32 i32) (result i64)))
  (import "proxy" "execute_transaction" (func $execute_transaction (param i32 i32) (result i64)))

  (global $ret_hi (mut i32) (i32.const 0))
  (global $ret_lo (mut i32) (i32.const 0))

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

  (func (export "execute_block") (param i32 i32) (result i32)
    (call $return_wrap
      (call $execute_block
        (get_local 0)
        (get_local 1)
      )
    )
  )

  (func (export "execute_transaction") (param i32 i32) (result i32)
    (call $return_wrap
      (call $execute_transaction
        (get_local 0)
        (get_local 1)
      )
    )
  )

  (func (export "get_return_hi") (result i32)
    (get_global $ret_hi)
  )

  (func (export "get_return_lo") (result i32)
    (get_global $ret_lo)
  )
)
