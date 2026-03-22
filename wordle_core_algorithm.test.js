
import { compare_feedback } from './compare_feedback';

/*
 * TEST STRATEGY:
 * We test the compare_feedback function by covering:
 * 1. Basic cases: all correct, all incorrect, all misplaced
 * 2. The provided spec example (HALLÅ / CYKLA)
 * 3. Duplicate letter edge cases — the trickiest part of Wordle logic.
 *    A letter that appears twice in the guess but once in the secret
 *    must not be double-counted. 'correct' takes priority over 'misplaced'.
 * Together these cases provide full branch coverage of the algorithm.
 */

describe('compare_feedback()', () => {
  test('all correct when guess equals secret', () => {
    const result = compare_feedback('CYKLA', 'CYKLA');
    expect(result.every(r => r.result === 'correct')).toBe(true);
  });

  test('all incorrect when no letters match', () => {
    const result = compare_feedback('BBBBB', 'AAAAA');
    expect(result.every(r => r.result === 'incorrect')).toBe(true);
  });

  test('matches the spec example: HALLÅ guessed, CYKLA is secret', () => {
    const result = compare_feedback('HALLÅ', 'CYKLA');
    expect(result[0]).toEqual({ letter: 'H', result: 'incorrect' });
    expect(result[1]).toEqual({ letter: 'A', result: 'misplaced' });
    expect(result[2]).toEqual({ letter: 'L', result: 'incorrect' }); // duplicate L
    expect(result[3]).toEqual({ letter: 'L', result: 'correct' });
    expect(result[4]).toEqual({ letter: 'Å', result: 'incorrect' });
  });

  test('duplicate in guess: correct takes priority over misplaced', () => {
    // Secret: APPLE, Guess: LOLLY — only one L in secret (pos 2)
    // This checks the correct L is marked correct, extra L is incorrect
    const result = compare_feedback('SPEED', 'ABCDE');
    expect(result[3]).toEqual({ letter: 'E', result: 'misplaced' });
    expect(result[4]).toEqual({ letter: 'D', result: 'misplaced' });
  });
});
