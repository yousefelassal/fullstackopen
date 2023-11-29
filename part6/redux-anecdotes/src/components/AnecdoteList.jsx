import { useDispatch, useSelector } from "react-redux";
import { vote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteList = () => {
    const anecdotes = useSelector(state => 
        state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(state.filter.toLowerCase()))
            .sort((a, b) => b.votes - a.votes));
    const dispatch = useDispatch();

    return (
        <div>
        {anecdotes.map(anecdote =>
            <div key={anecdote.id}>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                <button onClick={() => {
                    dispatch(vote(anecdote.id))
                    dispatch(setNotification(`you voted '${anecdote.content}'`))
                    setTimeout(() => {
                        dispatch(setNotification(null))
                    }, 5000)
                }}
                >vote</button>
            </div>
            </div>
        )}
        </div>
    );
}

export default AnecdoteList;