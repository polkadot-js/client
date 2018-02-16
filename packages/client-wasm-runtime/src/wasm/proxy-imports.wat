;; Copyright 2017-2018 Jaco Greeff
;; This software may be modified and distributed under the terms
;; of the ISC license. See the LICENSE file for details.

(module
  ;; modified (non-spec) runtime print_num
  (import "env" "ext_print_num"
    (func $print_num (param i32 i32))
  )

  ;; spec compliant print_num
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
