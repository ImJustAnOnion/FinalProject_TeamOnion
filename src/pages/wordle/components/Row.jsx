export default function Row({ guess, currentGuess, length }) {
  if (currentGuess) {
      {[...Array(length - guess.length)].map((_,i) => (
        <div key={i}></div>
      ))}
    }
}