
import { useState } from 'react'

const initialFormState = {
    name: '',
    comment: '',
}

function CommentSection({ comments: initialComments }) {
    const [comments, setComments] = useState(initialComments)
    const [form, setForm] = useState(initialFormState)
    const [status, setStatus] = useState('')

    function handleChange(event) {
        const { name, value } = event.target
        setForm((currentForm) => ({
            ...currentForm,
            [name]: value,
        }))
    }

    function handleSubmit(event) {
        event.preventDefault()

        if (!form.name.trim() || !form.comment.trim()) {
            setStatus('Fyll i både namn och kommentar för att visa ett lokalt inlägg.')
            return
        }

        const previewComment = {
            name: form.name.trim(),
            date: 'Precis nu',
            text: form.comment.trim(),
        }

        setComments((currentComments) => [previewComment, ...currentComments])
        setForm(initialFormState)
        setStatus('Kommentaren lades till lokalt för att färhandsvisa gränssnittet.')
    }

    return (
        <section className="panel comment-section">
            <div className="section-heading section-heading--compact">
                <div className="section-heading__content">
                    <p className="section-heading__eyebrow">Kommentarer</p>
                    <h2 className="section-heading__title">Vad säger andra?</h2>
                    <p className="section-heading__description">
                        Formuläret är bara till för gränssnittet just nu och sparar nya kommentarer lokalt i
                        sidan.
                    </p>
                </div>
            </div>

            <div className="comment-list">
                {comments.map((comment, index) => (
                    <article className="comment-card" key={`${comment.name}-${comment.date}-${index}`}>
                        <div className="comment-card__header">
                            <strong className="comment-card__name">{comment.name}</strong>
                            <span className="comment-card__date">{comment.date}</span>
                        </div>
                        <p>{comment.text}</p>
                    </article>
                ))}
            </div>

            <form className="comment-form" onSubmit={handleSubmit}>
                <div className="comment-form__row">
                    <label className="comment-form__field">
                        <span className="comment-form__label">Namn</span>
                        <input
                            className="comment-form__input"
                            name="name"
                            type="text"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Ditt namn"
                        />
                    </label>

                    <label className="comment-form__field">
                        <span className="comment-form__label">Kommentar</span>
                        <textarea
                            className="comment-form__textarea"
                            name="comment"
                            value={form.comment}
                            onChange={handleChange}
                            rows="4"
                            placeholder="Skriv en kort tanke om smak, uppläggning eller vad du skulle justera."
                        />
                    </label>
                </div>

                <div className="comment-form__actions">
                    <button className="button" type="submit">
                        Skicka kommentar
                    </button>
                    <p className="comment-form__status">{status}</p>
                </div>
            </form>
        </section>
    )
}

export default CommentSection
