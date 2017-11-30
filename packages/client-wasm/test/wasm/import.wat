(module
  (func $callback (import "js" "callback") (param i32))
  (func $go (param i32)
    (call $callback (get_local 0))
  )
  (export "go" (func $go))
)
