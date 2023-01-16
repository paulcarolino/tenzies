import Die from "./component/Die";
import React from "react";
import Confetti from "react-confetti";
import { nanoid } from "nanoid";
export default function App() {
  const [dices, setDices] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);

  React.useEffect(() => {
    const hasTheSameValue = dices.every(
      (dice, index, array) => dice.value === array[0].value
    );
    const allIsHeld = dices.every((dice) => dice.isHeld);
    if (allIsHeld && hasTheSameValue) {
      setTenzies(true);
    }
  }, [dices]);

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      const diceProperty = {
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid(),
      };
      newDice.push(diceProperty);
    }
    return newDice;
  }

  function holdDice(diceID) {
    setDices((oldDice) =>
      oldDice.map((die) => {
        return die.id === diceID ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }

  function rollDice() {
    if (tenzies) {
      setDices(allNewDice());
      setTenzies(false);
    } else {
      setDices((oldDice) =>
        oldDice.map((die) => {
          return die.isHeld
            ? die
            : { ...die, value: Math.ceil(Math.random() * 6) };
        })
      );
    }
  }
  const diceElements = dices.map((dice) => (
    <Die
      key={dice.id}
      value={dice.value}
      isHeld={dice.isHeld}
      holdDice={() => holdDice(dice.id)}
    />
  ));
  return (
    <main>
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="dice-container">{diceElements}</div>
      <button onClick={rollDice}>{tenzies ? "New Game" : "Roll"}</button>
    </main>
  );
}
