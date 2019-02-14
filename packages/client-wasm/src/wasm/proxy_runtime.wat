;; Copyright 2017-2019 @polkadot/client-wasm authors & contributors
;; This software may be modified and distributed under the terms
;; of the Apache-2.0 license. See the LICENSE file for details.

(module
  (import "runtime" "blake2_256"
    (func $blake2_256
      (param i32 i32 i32)
    )
  )
  (import "runtime" "blake2_256_enumerated_trie_root"
    (func $blake2_256_enumerated_trie_root
      (param i32 i32 i32 i32)
    )
  )
  (import "runtime" "chain_id"
    (func $chain_id
      (result i32)
    )
  )
  (import "runtime" "clear_prefix"
    (func $clear_prefix
      (param i32 i32)
    )
  )
  (import "runtime" "clear_storage"
    (func $clear_storage
      (param i32 i32)
    )
  )
  (import "runtime" "ed25519_verify"
    (func $ed25519_verify
      (param i32 i32 i32 i32) (result i32)
    )
  )
  (import "runtime" "exists_storage"
    (func $exists_storage
      (param i32 i32) (result i32)
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
  (import "runtime" "sandbox_instantiate"
    (func $sandbox_instantiate
      (param i32 i32 i32 i32 i32 i32) (result i32)
    )
  )
  (import "runtime" "sandbox_instance_teardown"
    (func $sandbox_instance_teardown
      (param i32)
    )
  )
  (import "runtime" "sandbox_invoke"
    (func $sandbox_invoke
      (param i32 i32 i32 i32 i32 i32 i32 i32) (result i32)
    )
  )
  (import "runtime" "sandbox_memory_get"
    (func $sandbox_memory_get
      (param i32 i32 i32 i32) (result i32)
    )
  )
  (import "runtime" "sandbox_memory_new"
    (func $sandbox_memory_new
      (param i32 i32) (result i32)
    )
  )
  (import "runtime" "sandbox_memory_set"
    (func $sandbox_memory_set
      (param i32 i32 i32 i32) (result i32)
    )
  )
  (import "runtime" "sandbox_memory_teardown"
    (func $sandbox_memory_teardown
      (param i32)
    )
  )
  (import "runtime" "set_storage"
    (func $set_storage
      (param i32 i32 i32 i32)
    )
  )
  (import "runtime" "storage_changes_root"
    (func $storage_changes_root
      (param i32 i32 i32 i32 i32) (result i32)
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

  ;; takes the i64 value, returning the hi part
  (func $get_hi
    (param i64) (result i32)

    (i32.wrap/i64
      (i64.shr_u
        (get_local 0)
        (i64.const 32)
      )
    )
  )

  ;; takes the i64 value, returning the lo part
  (func $get_lo
    (param i64) (result i32)

    (i32.wrap/i64
      (get_local 0)
    )
  )

  ;; spec compliant print_num
  (func (export "ext_print_num")
    (param i64)

    (call $print_num
      (call $get_hi (get_local 0))
      (call $get_lo (get_local 0))
    )
  )

  ;; spec compliant chain_id
  (func (export "ext_chain_id")
    (result i64)

    (i64.extend_u/i32
      (call $chain_id)
    )
  )

  ;; spec compliant storage_changes_root
  (func (export "ext_storage_changes_root")
    (param i32 i32 i64 i32) (result i32)

    (call $storage_changes_root
      (get_local 0)
      (get_local 1)
      (call $get_hi (get_local 2))
      (call $get_lo (get_local 2))
      (get_local 3)
    )
  )

  (export "ext_blake2_256" (func $blake2_256))
  (export "ext_blake2_256_enumerated_trie_root" (func $blake2_256_enumerated_trie_root))
  (export "ext_clear_prefix" (func $clear_prefix))
  (export "ext_clear_storage" (func $clear_storage))
  (export "ext_ed25519_verify" (func $ed25519_verify))
  (export "ext_exists_storage" (func $exists_storage))
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
  (export "ext_sandbox_invoke" (func $sandbox_invoke))
  (export "ext_sandbox_instance_teardown" (func $sandbox_instance_teardown))
  (export "ext_sandbox_instantiate" (func $sandbox_instantiate))
  (export "ext_sandbox_memory_get" (func $sandbox_memory_get))
  (export "ext_sandbox_memory_new" (func $sandbox_memory_new))
  (export "ext_sandbox_memory_set" (func $sandbox_memory_set))
  (export "ext_sandbox_memory_teardown" (func $sandbox_memory_teardown))
  (export "ext_set_storage" (func $set_storage))
  (export "ext_storage_root" (func $storage_root))
  (export "ext_twox_128" (func $twox_128))
)
