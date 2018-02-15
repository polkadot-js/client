(module
  (import "env" "ext_print_num"
    (func $print_num (param i32 i32))
  )

  (func (export "ext_print_num") (param $value i64)
    (call $print_num
      (i32.wrap/i64
        (i64.shr_u
          (get_local $value)
          (i64.const 32)
        )
      )
      (i32.wrap/i64
        (get_local $value)
      )
    )
  )
)
