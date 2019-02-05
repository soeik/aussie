import { expect } from "chai";
import {
  Sequence,
  nil,
  isNil,
  map,
  isEmpty,
  first,
  second,
  rest,
  cons,
  conj,
  get,
  apply,
  str
} from "../src/sequence";

describe("Sequence", function() {
  it("Creates sequence from array", function() {
    expect(Sequence.of([1, 2]) instanceof Sequence).to.be.true;
  });

  it("Creates sequence from string", function() {
    expect(Sequence.of("") instanceof Sequence).to.be.true;
  });
});

describe("Core functions", function() {
  describe("isNil", function() {
    it("checks if some value equals nil constant", function() {
      expect(isNil(nil)).to.be.true;
    });
  });

  describe("isEmpty", function() {
    it("works with arrays", function() {
      expect(isEmpty([])).to.be.true;
      expect(isEmpty([1])).to.be.false;
    });

    it("works with strings", function() {
      expect(isEmpty("")).to.be.true;
      expect(isEmpty("1")).to.be.false;
    });
  });

  describe("first", function() {
    it("returns first element of a string", function() {
      expect(first("hello")).to.be.eq("h");
    });

    it("returns first element of an array", function() {
      expect(first([1, 2, 3])).to.be.eq(1);
    });

    it("returns nil if coll is empty", function() {
      expect(first("")).to.be.eq(nil);
    });
  });

  describe("second", function() {
    it("returns second element of a string", function() {
      expect(second("hello")).to.be.eq("e");
    });

    it("returns second element of an array", function() {
      expect(second([1, 2, 3])).to.be.eq(2);
    });

    it("returns nil if coll is empty", function() {
      expect(second("")).to.be.eq(nil);
    });
  });

  describe("rest", function() {
    it("returns rest elements of a string", function() {
      expect(rest("hello")).to.be.deep.eq(["e", "l", "l", "o"]);
    });

    it("returns rest elements of an array", function() {
      expect(rest([1, 2, 3])).to.be.deep.eq([2, 3]);
    });
  });

  describe("cons", function() {
    it("prepends array with new value", function() {
      expect(cons(1, [2, 3])).to.be.deep.eq([1, 2, 3]);
    });

    it("prepends string with new value", function() {
      expect(cons("a", "bc")).to.be.deep.eq(["a", "b", "c"]);
    });
  });

  describe("conj", function() {
    it("appends new value to an array", function() {
      expect(conj([2, 3], 1)).to.be.deep.eq([2, 3, 1]);
    });

    it("appends new value to a string", function() {
      expect(conj("bc", "a")).to.be.deep.eq(["b", "c", "a"]);
    });
  });

  describe("get", function() {
    it("returns an element of an array by its index", function() {
      expect(get(["a", "b"], 1)).to.be.eq("b");
    });

    it("returns an element of a string by its index", function() {
      expect(get("ab", 1)).to.be.eq("b");
    });

    it("returns an element of an object by key", function() {
      expect(get({ a: "b" }, "a")).to.be.eq("b");
    });

    it("returns nil if key not present in coll", function() {
      expect(get([], 0)).to.be.eq(nil);
      expect(get("", 0)).to.be.eq(nil);
      expect(get({}, 0)).to.be.eq(nil);
    });

    it("returns default value if it was provided", function() {
      expect(get([], 1, "default")).to.be.eq("default");
      expect(get("", 1, "default")).to.be.eq("default");
      expect(get({}, 1, "default")).to.be.eq("default");
    });

    //if empty return nil
    //implement nth
  });

  describe("map", function() {
    it("applies transformation to a string", function() {
      expect(map(s => s.toUpperCase(), "abc")).to.be.deep.eq(["A", "B", "C"]);
    });

    it("applies transformation to an array", function() {
      expect(map(x => x + 1, [1, 2, 3])).to.be.deep.eq([2, 3, 4]);
    });
  });

  describe("apply", function() {
    it("applies function to given arguments", function() {
      const toStr = function(...xs) {
        return xs.map(x => x.toString());
      };
      expect(apply(toStr, 1, 2, 3)).to.be.deep.eq(["1", "2", "3"]);
    });
  });

  describe("str", function() {
    it("creates string of its arguments", function() {
      expect(str(1, 2, 3)).to.be.eq("123");
    });

    it("called without args will return empty string", function() {
      expect(str()).to.be.eq("");
    });

    it("called without args will return empty string", function() {
      expect(str(null)).to.be.eq("");
    });

    it("won't create string from array", function() {
      expect(str([1, 2, 3])).not.to.be.eq("123");
    });
  });
});
