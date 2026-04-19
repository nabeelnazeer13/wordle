
const { compare_feedback } = require('./logic/wordle_core_algorithm');


//test all correct
describe('compare_feedback()', () => {
  test('all correct when guess equals chosen word', () => {
    const result = compare_feedback('CYKLA', 'CYKLA');
    expect(result.every(r => r.result === 'correct')).toBe(true);
  });

  //all incorrect
  test('all incorrect when none of the letters match', () => {
    const result = compare_feedback('BBBBB', 'AAAAA');
    expect(result.every(r => r.result === 'incorrect')).toBe(true);
  });

  //mixed result with correct, incorrect and misplaced
  test('mixed result example : HALLÅ guessed, CYKLA chosen', () => {
    const result = compare_feedback('HALLÅ', 'CYKLA');
    expect(result[0]).toEqual({ letter: 'H', result: 'incorrect' });
    expect(result[1]).toEqual({ letter: 'A', result: 'misplaced' });
    expect(result[2]).toEqual({ letter: 'L', result: 'incorrect' }); // duplicate L
    expect(result[3]).toEqual({ letter: 'L', result: 'correct' });
    expect(result[4]).toEqual({ letter: 'Å', result: 'incorrect' });
  });


  
});
