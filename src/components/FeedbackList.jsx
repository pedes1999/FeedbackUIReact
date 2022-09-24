import {motion,animatePresence, AnimatePresence} from 'framer-motion'
import { useContext } from 'react'
import React from 'react'
import FeedBackItem from './FeedBackItem'
import FeedbackContext from '../context/FeedbackContext'
import Spinner from './shared/Spinner'

function FeedbackList() {
    const {feedback,isLoading} = useContext(FeedbackContext)


    if(!isLoading && (!feedback || feedback.length === 0)){
        return <p>No feedback yet</p>
    }

    return isLoading ? <Spinner />: (
    <div className='feedback-list'>
    {feedback.map((item) => (
       <FeedBackItem key = {item.id} item={item} />
    ))}
</div>)

  
}

export default FeedbackList
