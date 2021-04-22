/* ----------------------------------------------------------------------
 * Copyright (c) 2012 Yves-Marie K. Rinquin
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 * ----------------------------------------------------------------------
 *
 * ISAAC is a cryptographically secure pseudo-random number generator
 * (or CSPRNG for short) designed by Robert J. Jenkins Jr. in 1996 and
 * based on RC4. It is designed for speed and security.
 *
 *
 */

/* js string (ucs-2/utf16) to a 32-bit integer (utf-8 chars, little-endian) array */
const toIntArray = (str: string) => {
  let w1: number;
  let w2: number;
  let u: number;
  let r4: number[] = [];
  let r: number[] = [];
  let i = 0;
  const s = str + '\0\0\0'; // pad string to avoid discarding last chars
  const l = s.length - 1;

  while (i < l) {
    w1 = s.charCodeAt(i++);
    w2 = s.charCodeAt(i + 1);
    if (w1 < 0x0080) {
      // 0x0000 - 0x007f code point: basic ascii
      r4.push(w1);
    } else if (w1 < 0x0800) {
      // 0x0080 - 0x07ff code point
      r4.push(((w1 >>> 6) & 0x1f) | 0xc0);
      r4.push(((w1 >>> 0) & 0x3f) | 0x80);
    } else if ((w1 & 0xf800) != 0xd800) {
      // 0x0800 - 0xd7ff / 0xe000 - 0xffff code point
      r4.push(((w1 >>> 12) & 0x0f) | 0xe0);
      r4.push(((w1 >>> 6) & 0x3f) | 0x80);
      r4.push(((w1 >>> 0) & 0x3f) | 0x80);
    } else if ((w1 & 0xfc00) == 0xd800 && (w2 & 0xfc00) == 0xdc00) {
      // 0xd800 - 0xdfff surrogate / 0x10ffff - 0x10000 code point
      u = ((w2 & 0x3f) | ((w1 & 0x3f) << 10)) + 0x10000;
      r4.push(((u >>> 18) & 0x07) | 0xf0);
      r4.push(((u >>> 12) & 0x3f) | 0x80);
      r4.push(((u >>> 6) & 0x3f) | 0x80);
      r4.push(((u >>> 0) & 0x3f) | 0x80);
      i++;
    } else {
      // invalid char
    }
    /* add integer (four utf-8 value) to array */
    if (r4.length > 3) {
      // little endian
      r.push((r4.shift() << 0) | (r4.shift() << 8) | (r4.shift() << 16) | (r4.shift() << 24));
    }
  }

  return r;
};

/* isaac module pattern */
export class ISAAC {
  /* private: internal states */
  private m: number[] = Array(256); // internal memory
  private r: number[] = Array(256); // result array
  private acc = 0; // accumulator
  private brs = 0; // last result
  private cnt = 0; // counter
  private gnt = 0; // generation counter

  constructor(seed?: string) {
    this.seed(seed || Math.random() * 0xffffffff);
  }

  /* private: 32-bit integer safe adder */
  private add = (x: number, y: number) => {
    const lsb = (x & 0xffff) + (y & 0xffff);
    const msb = (x >>> 16) + (y >>> 16) + (lsb >>> 16);
    return (msb << 16) | (lsb & 0xffff);
  };

  /* public: initialisation */
  reset() {
    this.acc = this.brs = this.cnt = 0;
    for (let i = 0; i < 256; ++i) {
      this.m[i] = this.r[i] = 0;
    }
    this.gnt = 0;
  }

  /* public: seeding function */
  seed(s: string | number | number[]) {
    let [a, b, c, d, e, f, g, h, i]: number[] = [];

    /* seeding the seeds of love */
    a = b = c = d = e = f = g = h = 0x9e3779b9; /* the golden ratio */

    if (s && typeof s === 'string') {
      s = toIntArray(s);
    }

    if (s && typeof s === 'number') {
      s = [s];
    }

    if (s instanceof Array) {
      this.reset();
      for (i = 0; i < s.length; i++) {
        this.r[i & 0xff] += typeof s[i] === 'number' ? s[i] : 0;
      }
    }

    /* private: seed mixer */
    const seed_mix = () => {
      a ^= b << 11;
      d = this.add(d, a);
      b = this.add(b, c);
      b ^= c >>> 2;
      e = this.add(e, b);
      c = this.add(c, d);
      c ^= d << 8;
      f = this.add(f, c);
      d = this.add(d, e);
      d ^= e >>> 16;
      g = this.add(g, d);
      e = this.add(e, f);
      e ^= f << 10;
      h = this.add(h, e);
      f = this.add(f, g);
      f ^= g >>> 4;
      a = this.add(a, f);
      g = this.add(g, h);
      g ^= h << 8;
      b = this.add(b, g);
      h = this.add(h, a);
      h ^= a >>> 9;
      c = this.add(c, h);
      a = this.add(a, b);
    };

    /* scramble it */
    for (i = 0; i < 4; i++) {
      seed_mix();
    }

    for (i = 0; i < 256; i += 8) {
      if (s) {
        /* use all the information in the seed */
        a = this.add(a, this.r[i + 0]);
        b = this.add(b, this.r[i + 1]);
        c = this.add(c, this.r[i + 2]);
        d = this.add(d, this.r[i + 3]);
        e = this.add(e, this.r[i + 4]);
        f = this.add(f, this.r[i + 5]);
        g = this.add(g, this.r[i + 6]);
        h = this.add(h, this.r[i + 7]);
      }
      seed_mix();
      /* fill in this.m[] with messy stuff */
      this.m[i + 0] = a;
      this.m[i + 1] = b;
      this.m[i + 2] = c;
      this.m[i + 3] = d;
      this.m[i + 4] = e;
      this.m[i + 5] = f;
      this.m[i + 6] = g;
      this.m[i + 7] = h;
    }
    if (s) {
      /* do a second pass to make all of the seed affect all of this.m[] */
      for (i = 0; i < 256; i += 8) {
        a = this.add(a, this.m[i + 0]);
        b = this.add(b, this.m[i + 1]);
        c = this.add(c, this.m[i + 2]);
        d = this.add(d, this.m[i + 3]);
        e = this.add(e, this.m[i + 4]);
        f = this.add(f, this.m[i + 5]);
        g = this.add(g, this.m[i + 6]);
        h = this.add(h, this.m[i + 7]);
        seed_mix();
        /* fill in this.m[] with messy stuff (again) */
        this.m[i + 0] = a;
        this.m[i + 1] = b;
        this.m[i + 2] = c;
        this.m[i + 3] = d;
        this.m[i + 4] = e;
        this.m[i + 5] = f;
        this.m[i + 6] = g;
        this.m[i + 7] = h;
      }
    }

    this.prng(); /* fill in the first set of results */
    this.gnt = 256; /* prepare to use the first set of results */
  }

  /* public: isaac generator, n = number of run */
  prng(n: number = 1) {
    let [i, x, y]: number[] = [];

    n = Math.abs(Math.floor(n));

    while (n--) {
      this.cnt = this.add(this.cnt, 1);
      this.brs = this.add(this.brs, this.cnt);

      for (i = 0; i < 256; i++) {
        switch (i & 3) {
          case 0:
            this.acc ^= this.acc << 13;
            break;
          case 1:
            this.acc ^= this.acc >>> 6;
            break;
          case 2:
            this.acc ^= this.acc << 2;
            break;
          case 3:
            this.acc ^= this.acc >>> 16;
            break;
        }
        this.acc = this.add(this.m[(i + 128) & 0xff], this.acc);
        x = this.m[i];
        this.m[i] = y = this.add(this.m[(x >>> 2) & 0xff], this.add(this.acc, this.brs));
        this.r[i] = this.brs = this.add(this.m[(y >>> 10) & 0xff], x);
      }
    }
  }

  /* public: return a random number between */
  rand() {
    if (!this.gnt--) {
      this.prng();
      this.gnt = 255;
    }
    return this.r[this.gnt];
  }

  /* public: return internals in an object*/
  internals() {
    return { a: this.acc, b: this.brs, c: this.cnt, m: this.m, r: this.r };
  }

  random() {
    return 0.5 + this.rand() * 2.3283064365386963e-10; // 2^-32
  }
}
