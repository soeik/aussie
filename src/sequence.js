/**
 * Class Sequence
 * @extends {Array}
 */
export class Sequence extends Array {
  constructor(source) {
    super(source);
  }
}

/**
 * Static method Sequence.of
 * Returns new sequence from its argument
 * Accepts object, array, string
 * For any other single value will return sequence containing this value
 */
Sequence.of = function(source) {
  if (!source) return;
  if (source instanceof Sequence) {
    return source;
  } else if (Array.isArray(source) || typeof source === "string") {
    return Sequence.from(source);
  } else if (typeof source === "object") {
    return Sequence.from(
      Object.keys(source).reduce((acc, key) => {
        acc.push([key, source[key]]);
        return acc;
      }, [])
    );
  } else {
    return Sequence.from([source]);
  }
};

/**
 * Takes a collection, returns its fist element
 * @param {*} coll - collection
 */
export function first(coll) {
  const seq = Sequence.of(coll);
  return seq[0];
}

/**
 * Takes collection, returns sequence of all except first elements
 * @param {*} coll
 */
export function rest(coll) {
  const seq = Sequence.of(coll);
  const sliced = seq.slice(1, seq.length);
  if (sliced.length === 0) {
    return null;
  } else {
    return sliced;
  }
}

/**
 * Takes new value and colelction and prepends
 * collection with new value
 * @param {*} newValue
 * @param {*} coll
 */
export function cons(newValue, coll) {
  const seq = Sequence.of(coll);
  // const newSeq = Sequence.of(newValue);
  return coll === null ? [newValue] : [newValue].concat(seq);
}

/**
 * Takes collection and arguments
 * Appens arguments to a collection
 * @param {*} coll
 * @param  {...any} xs
 */
export function conj(coll, ...xs) {
  const seq = Sequence.of(coll);
  return seq.concat(xs);
}

/**
 * Applies transformation function to
 * every element in collection
 * @param {*} transform
 * @param {*} coll
 */
export function map(transform, coll) {
  const seq = Sequence.of(coll);
  if (coll === null) {
    return null;
  } else {
    return cons(transform(first(seq)), map(transform, rest(seq)));
  }
}

/**
 * Applies function to the argumemts list
 * @param {*} fn
 * @param  {...any} args
 */
export function apply(fn, ...args) {
  //Flatten args to work both with array and coll of arguments
  const flatArgs = [].concat.apply([], args);
  return fn.apply(null, flatArgs);
}

/**
 * With no args, returns the empty string. With one arg, returns
 * x.toString().  (str nil) returns the empty string. With more than
 * one arg, returns the concatenation of the str values of the args.
 * @param  {...any} args
 */
export function str(...args) {
  return args.map(a => (a && a.toString()) || "").join("");
}
