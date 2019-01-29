import { Sequence, map, first, rest, cons, str, apply, conj } from "./sequence";

const seqStr = Sequence.of("abc"); //?
Sequence.of(seqStr); //?

Sequence.of({ a: 1, b: 2 }); //?
Sequence.of(1); //?
first(1); //?
first("abc"); //?
first([1, 2, 3]); //?
rest("abc"); //?
rest([1, 2, 3]); //?
// const s = Sequence.of("abc"); //?
// map("abc", s => s.toUpperCase()); //?
cons(1, [2, 3]); //?
cons("A", "BC"); //?

const inc = x => x + 1;
map(inc, [1, 2, 3]); //?

const upperCase = s => s.toUpperCase();
map(upperCase, "abc"); //?
apply(str, map(upperCase, "abc")); //?

str("a", "b"); //?
apply(str, "a", "b"); //?

conj([1, 2], 3); //?
conj([1], 2, 3); //?
conj([1], [2, 3]); //?
