;; Copyright 2017-2018 Jaco Greeff
;; This software may be modified and distributed under the terms
;; of the ISC license. See the LICENSE file for details.

(module
  (import "runtime" "blake2_256"
    (func $blake2_256
      (param i32 i32 i32)
    )
  )
  (import "runtime" "ed25519_verify"
    (func $ed25519_verify
      (param i32 i32 i32 i32) (result i32)
    )
  )
  (import "runtime" "enumerated_trie_root"
    (func $enumerated_trie_root
      (param i32 i32 i32 i32)
    )
  )
  (import "runtime" "free"
    (func $free
      (param i32)
    )
  )
  (import "runtime" "get_allocated_storage"
    (func $get_allocated_storage
      (param i32 i32 i32) (result i32)
    )
  )
  (import "runtime" "get_storage_into"
    (func $get_storage_into
      (param i32 i32 i32 i32 i32) (result i32)
    )
  )
  (import "runtime" "malloc"
    (func $malloc
      (param i32) (result i32)
      )
  )
  (import "runtime" "memcmp"
    (func $memcmp
      (param i32 i32 i32) (result i32)
    )
  )
  (import "runtime" "memcpy"
    (func $memcpy
      (param i32 i32 i32) (result i32)
    )
  )
  (import "runtime" "memmove"
    (func $memmove
      (param i32 i32 i32) (result i32)
    )
  )
  (import "runtime" "memset"
    (func $memset
      (param i32 i32 i32) (result i32)
    )
  )
  (import "runtime" "print_hex"
    (func $print_hex
      (param i32 i32)
    )
  )
  (import "runtime" "print_num"
    (func $print_num
      (param i32 i32)
    )
  )
  (import "runtime" "print_utf8"
    (func $print_utf8
      (param i32 i32)
    )
  )
  (import "runtime" "set_storage"
    (func $set_storage
      (param i32 i32 i32 i32)
    )
  )
  (import "runtime" "storage_root"
    (func $storage_root
      (param i32)
    )
  )
  (import "runtime" "twox_128"
    (func $twox_128
      (param i32 i32 i32)
    )
  )

  ;; spec compliant print_num
  (func (export "ext_print_num")
    (param $num i64)

    (call $print_num
      (i32.wrap/i64
        (i64.shr_u
          (get_local $num)
          (i64.const 32)
        )
      )
      (i32.wrap/i64
        (get_local $num)
      )
    )
  )

  (export "ext_blake2_256" (func $blake2_256))
  (export "ext_ed25519_verify" (func $ed25519_verify))
  (export "ext_enumerated_trie_root" (func $enumerated_trie_root))
  (export "ext_free" (func $free))
  (export "ext_get_allocated_storage" (func $get_allocated_storage))
  (export "ext_get_storage_into" (func $get_storage_into))
  (export "ext_malloc" (func $malloc))
  (export "ext_memcmp" (func $memcmp))
  (export "ext_memcpy" (func $memcpy))
  (export "ext_memmove" (func $memmove))
  (export "ext_memset" (func $memset))
  (export "ext_print_hex" (func $print_hex))
  (export "ext_print_utf8" (func $print_utf8))
  (export "ext_set_storage" (func $set_storage))
  (export "ext_storage_root" (func $storage_root))
  (export "ext_twox_128" (func $twox_128))
)
