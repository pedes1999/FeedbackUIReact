import { useState,useContext ,useEffect} from "react"
import FeedbackContext from "../context/FeedbackContext"
import Card from "./shared/Card"
import Button from "./shared/Button"
import RatingSelect from "./RatingSelect"
function FeedbackForm() {
    const {addFeedback,feedbackEdit,updateFeedback} = useContext(FeedbackContext)
    const [text,setText] = useState('')
    const [rating,setRating] = useState(10)
    const [btnDisabled,setBtnDisabled] = useState(true)
    const [message,setMessage] = useState('')

    useEffect(() =>{
        if(feedbackEdit.edit === true){
            setBtnDisabled(false)
            setText(feedbackEdit.item.text)
            setRating(feedbackEdit.item.rating)
        }
    },[feedbackEdit])

    const HandleTextChange = (e) => {
        if(text === '' ){
            setBtnDisabled(true)
            setMessage(null)
        } else if(text !== '' && text.trim().length < 8){
            setMessage('Text must be at least 8 characters.')
            setBtnDisabled(true)
            
        } else {
            setBtnDisabled(false)
            setMessage(null)
        }
        setText(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(text.trim().length > 8 ){
            const newFeedback = {
                text:text,
                rating:rating
            }
           
            if (feedbackEdit.edit === true){
                updateFeedback(feedbackEdit.item.id,newFeedback)
            } else {
                addFeedback(newFeedback)
            }
           setText('')
        }
    }
  return (
    <Card>
        <form onSubmit={handleSubmit} >
            <h2>How would you rate our service?
            </h2>
            <RatingSelect select = {(rating) => setRating(rating)}/>
            <div className="input-group">
                <input onChange={HandleTextChange} type="text" placeholder="Write a review" value={text}/>
                <Button type="submit" isDisabled={btnDisabled}>Send</Button>
            </div>

            {message && <div className="message">{message}</div>}
        </form>
    </Card>
  )
}

export default FeedbackForm
