---
title: Type System
date: 2025-06-24
---

# Type System

Osta's type system is designed to provide a robust foundation for building safe and efficient programs. It categorizes
types into three primary groups: **primitives**, **struct-like** types, and **references**. Each group serves distinct
purposes,
from low-level data representation to complex data structures and memory management. The type system supports advanced
features such as types as first-class citizens, dependent types, linear types, and meta-compilation, enabling expressive
and reliable code. This document provides a detailed overview of each type category, including definitions and examples.

## Primitive Types

Primitive types are the basic building blocks for data in Osta, optimized for performance and simplicity. They include
integers and floating-point numbers, each with specific use cases.

### Signed Integers

Signed integers, denoted as `iN` (e.g., `i8`, `i16`, `i32`, `i128`), represent whole numbers with both positive and
negative values. The number `N` specifies the bit size, which can be any positive integer. Additionally, `isize` is a
signed integer matching the platform's pointer size.

### Unsigned Integers

Unsigned integers, denoted as `uN` (e.g., `u8`, `u16`, `u64`, `u128`), represent non-negative whole numbers. Like signed
integers, `N` specifies the bit size. The `usize` type is an unsigned integer matching the platform's pointer size.

### Floating-Point Numbers

Floating-point types include `f32` (single-precision) and `f64` (double-precision), used for representing real numbers
with fractional components.

## Compound Types

Compound types enable the creation of complex data structures by combining multiple fields or variants. They include
structs, tagged unions, enums, and unions, each with distinct characteristics.

### Structs

Structs are composite types that group fields of different types into a single unit. Each field has a name and a type,
and the struct occupies contiguous memory.

#### Example

```osta
struct Foo {
    x: u8
}
```

### Variant

Variants (also known as tagged unions) represent values that can be one of several variants. Internally, they are
implemented as a struct containing an enum (to indicate the active variant) and a union (to store the variant's data).

#### Example

```osta
variant Option<T> {
    Some(T),
    None,
}
```

### Enums

Enums define a set of named constants. They can have any internal type, but all constants must share the same type. If
no values are provided the first constant will default to `0i32` and the following constants will be `1i32`, `2i32`...
If just the first constant is specified to an integer the following constants will be the succession from that integer
with the same type.

#### Examples

##### Constants

```osta
enum Color {
    RED = (255, 0, 0),
    GREEN = (0, 255, 0),
    BLUE = (0, 0, 255),
}
```

##### 0-First Integers

```osta
enum Mode {
    OPEN,
    RESTRICTED,
    CLOSE,
}
```

##### N-First Integers

```osta
enum Letter {
    A = 65,
    B,
    C,
}
```

### Unions

Unions allow multiple fields to share the same memory location. Only one field is active at a time, and the programmer
is responsible for ensuring correct access.

#### Example

```osta
union Data {
    i: i32,
    f: f32,
}
```

## Reference Types

Reference types manage access to data in memory, providing mechanisms for both direct and safe manipulation. They
include pointers and references, each with distinct behaviors regarding ownership, safety, and lifetime management.

### Pointers

Pointers are raw memory addresses that provide direct access to data. Osta's pointers track two properties: whether they
can be safely dereferenced (`deref`) and whether the current scope owns the pointer. A pointer returned by `malloc` or
`new` is owned by the caller scope and has `deref`. Performing arithmetic operations on a pointer (e.g., incrementing)
results in a new pointer without `deref`. When a pointer is passed by copy to a function, the `deref` property is
disabled in the called function's scope to prevent unsafe access. Pointers can also be passed as references to avoid
copying while preserving `deref` capabilities. Critically, if a pointer with both `deref` and `own` exits its scope
without being deallocated or transferred, the program will not compile, as this indicates a potential memory leak.

### References

References are borrowed pointers that enforce memory safety through compile-time checks. They carry permissions (`read`,
`write`, `execute`) and may have lifetimes tied to other objects. The `execute` permission requires `read`. Multiple
references with `read` permissions to the same object can coexist, but a reference with `write` permission must be
`exclusive`. References can outlive the function they are passed to, such as when used by the returned object. For
example, a reference passed to a thread must outlive the thread object, which is destroyed by calling `join()` or
persists indefinitely if `detach()` is called.