import { createContext ,useState,useEffect } from "react";
const FeedbackContext = createContext()



export const FeedbackProvider = ({children}) => {
    const [feedback,setFeedback] = useState([])
    const [isLoading,setIsLoading] = useState(true)
    useEffect(() => {
        fetchFeedback()
     } ,[] )
    
    const [feedbackEdit,setFeedbackEdit] = useState({
        item: {},
        edit: false
    })

    //Fetch Feedback
    const fetchFeedback = async () => {
        const response = await fetch(`http://localhost:5000/feedback?_sort=id&_order=desc`)
        const data = await response.json()


        setFeedback(data)
        setIsLoading(false)
    }


    //delete feedback
    const deleteFeedback = async (id) => {
        const response = await fetch(`http://localhost:5000/feedback/${id}`,{
            method : 'DELETE',
        })

        if(window.confirm('Are you sure you want to Delete?')){
            setFeedback(feedback.filter((item) => item.id !== id))
        }
        
    }
    //add feedback
    const addFeedback = async (newFeedback) => {
        
        const response = await fetch('http://localhost:5000/feedback', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(newFeedback),
        })
        const obj = await response.json()
        console.log(obj)
        setFeedback([obj, ...feedback])
    }
    //set item to be updated
    const editFeedback = (item) => {
        setFeedbackEdit({
            item,
            edit:true
        })
    }

    //Update feedback it
    const updateFeedback = (id,updItem) => {
        setFeedback(feedback.map((item) => item.id === id ? { ...item,...updItem} : item))
    }

    return <FeedbackContext.Provider value = {{
       feedback:feedback,
       isLoading,
       deleteFeedback,
       addFeedback,
       editFeedback,
       updateFeedback,
       feedbackEdit,
    }}>
        {children}
    </FeedbackContext.Provider>
}

export default FeedbackContext