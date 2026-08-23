import{describe,it,expect}from'vitest';
import{rateLimit}from'../lib/rate';
describe('rateLimit',()=>{it('blocks after limit',()=>{const k='t-'+Date.now();expect(rateLimit(k,2,10000)).toBe(true);expect(rateLimit(k,2,10000)).toBe(true);expect(rateLimit(k,2,10000)).toBe(false)})})
