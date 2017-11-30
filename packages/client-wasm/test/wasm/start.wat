(module
  (func $callback (import "js" "callback") (param i32))
  (func $main
    i32.const 1337
    (call $callback)
  )
  (start $main)
)
