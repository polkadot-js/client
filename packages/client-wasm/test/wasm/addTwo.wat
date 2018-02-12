(module
  (type $funcType (func (param i32 i32) (result i32)))
  (func $addTwoSimple (param i32 i32) (result i32)
    (i32.add
      (get_local 0)
      (get_local 1)
    )
  )
  (func $addTwoProxy (param i32 i32) (result i32)
    get_local 0
    get_local 1
    call $addTwoSimple
  )
  (func $addTwoType (type $funcType) (param i32 i32) (result i32)
    (i32.add
      (get_local 0)
      (get_local 1)
    )
  )
  (func $addTwoProxyType (param i32 i32) (result i32)
    get_local 0
    get_local 1
    call $addTwoType
  )
  (func $unknown (param i32 i32) (result i32)
    unreachable
  )
  (export "addTwoSimple" (func $addTwoSimple))
  (export "addTwoProxy" (func $addTwoProxy))
  (export "addTwoType" (func $addTwoType))
  (export "addTwoProxyType" (func $addTwoProxyType))
)
