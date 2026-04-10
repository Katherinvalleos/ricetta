function InstructionSteps({ steps }) {
  return (
    <ol className="instruction-steps">
      {steps.map((step, index) => (
        <li className="instruction-steps__item" key={step}>
          <span className="instruction-steps__number">{index + 1}</span>
          <p className="instruction-steps__text">{step}</p>
        </li>
      ))}
    </ol>
  )
}

export default InstructionSteps
