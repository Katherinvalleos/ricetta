import { useEffect, useState } from 'react'
import { createComment, getCommentsByRecipeId } from '../api/recipes'

const initialFormState = {
    name: '',
    comment: '',
}

function CommentSection({ recipeId }) {
    const [comments, setComments] = useState([])
    const [form, setForm] = useState(initialFormState)
    const [status, setStatus] = useState('')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function loadComments() {
            try {
                setLoading(true)
                const data = await getCommentsByRecipeId(recipeId)
                setComments(data)
            } catch (err) {
                setStatus('Kunde inte hämta kommentarer.')
                console.error(err)
            } finally {
                setLoading(false)
            }
        }

        if (recipeId) {
            loadComments()
        }
    }, [recipeId])

    function handleChange(event) {
        const { name, value } = event.target

        setForm((currentForm) => ({
            ...currentForm,
            [name]: value,
        }))
    }

    async function handleSubmit(event) {
        event.preventDefault()

        if (!form.name.trim() || !form.comment.trim()) {
            setStatus('Fyll i både namn och kommentar.')
            return
        }

        const newComment = {
            comment: form.comment.trim(),
            name: form.name.trim(),
        }

        try {
            const savedComment = await createComment(recipeId, newComment)

            setComments((currentComments) => [savedComment, ...currentComments])
            setForm(initialFormState)
            setStatus('Kommentaren sparades.')
        } catch (err) {
            setStatus('Kunde inte spara kommentaren.')
            console.error(err)
        }
    }

    return (
        <section className="panel comment-section">
            <div className="section-heading section-heading--compact">
                <div className="section-heading__content">
                    <p className="section-heading__eyebrow">Kommentarer</p>
                    <h2 className="section-heading__title">Vad säger andra?</h2>
                    <p className="section-heading__description">
                        Läs och lämna kommentarer kopplade till receptet.
                    </p>
                </div>
            </div>

            {loading ? (
                <p>Laddar kommentarer...</p>
            ) : (
                <div className="comment-list">
                    {comments.length > 0 ? (
                        comments.map((comment, index) => (
                            <article
                                className="comment-card"
                                key={comment._id || `${comment.name}-${index}`}
                            >
                                <div className="comment-card__header">
                                    <strong className="comment-card__name">{comment.name}</strong>
                                    <span className="comment-card__date">
                                        {comment.date || 'Nyligen'}
                                    </span>
                                </div>
                                <p>{comment.text || comment.comment}</p>
                            </article>
                        ))
                    ) : (
                        <p>Inga kommentarer ännu.</p>
                    )}
                </div>
            )}

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
                            placeholder="Skriv en kort kommentar om receptet."
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