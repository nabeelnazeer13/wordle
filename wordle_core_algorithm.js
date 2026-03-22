/*



*/

function compare_feedback (user_guess, chosen_word) {
    const result = [];
    //assume word doesnt match 100%
    //create arrays to store info about characters in each word and their comparison
    const in_the_word = new Array(chosen_word.length).fill(false);
    const user_guessed = new Array(user_guess.length).fill('incorrect');

    //Check check each letter on both words for a direct comparison to find correct letters and store them in above created arrays

    for (let i = 0; i < user_guess.length; i++) {
        if (user_guess[i] === chosen_word[i]) {
            user_guessed[i] = 'correct';
            in_the_word[i] = true; //counter to measure if letter is in the words
        }
    }

    // Check letters that are present but in wrong places. store them and provide feedback
    for (let i = 0; i < user_guess.length; i++) {
        if  (user_guessed[i] === 'correct') continue;
            for (let j = 0; j < chosen_word.length; j++) {
                if (!in_the_word[j] && user_guess[i] === chosen_word[j]) {
                    user_guessed[i] = 'misplaced';
                    in_the_word[j] = true;
                break;
        }
        }
    }
    //return as objects that contain letter from user_guess and information whether it is in it, misplaced or not in it.

    return user_guess.split('').map((letter, i) => ({
        letter,
        result: user_guessed[i],
    }));
    }

module.exports = { compare_feedback };


    