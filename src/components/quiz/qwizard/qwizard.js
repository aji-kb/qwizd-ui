import { useLocation, useNavigate } from 'react-router-dom';
import './qwizard.css';
import { useEffect, useState } from 'react';
import { fetchData, postData } from '../../../service/service';

const QWizard = ()=>{
    const navigate = useNavigate();
    const {state} = useLocation();
    const [quiz, setQuiz] = useState({});
    const [question, SetQuestion] = useState();
    const [errorState, SetErrorState] = useState(0);
    const [selectedAnswer, SetSelectedAnswer] = useState(0);
    const [saveCount, SetSaveCount] = useState(0);
    const [totalQuestions, SetTotalQuestions] = useState(0);

    const getNextQuestion = (quizId)=>{
        console.log()
        if(errorState == 0)
        {
            fetchData('Quiz', {id: quizId}).then(res=>{
                if(res)
                {
                    SetQuestion(res);
                    SetSelectedAnswer(0);
                }
            });
        }
    }

    const saveResponse = (quizId, questionId, answerId) => {
        postData("Quiz/save", {quizId: quizId, questionId: questionId, answerId: answerId}).then(
            res=>{
                if(res)
                {
                    SetSaveCount(saveCount+1);
                    return res;
                }
                else
                {
                    SetErrorState(1);
                }
            }
        )
    }

    const submitResponse = (quizId, questionId, answerId) => {
        postData("Quiz/submit", {quizId: quizId, questionId: questionId, answerId: answerId}).then(
            res=>{
                if(res)
                {
                    navigate('/QuizResult', {state: { result: res}});
                }
                else
                {
                    SetErrorState(1);
                }

            }
        )
    }


    useEffect(()=>{
        if(state != null && state.quiz != null && quiz.id == 0)
        {
            let inputQuiz = {id: state.quiz.id, totalQuestions: state.quiz.totalQuestions};
            setQuiz(inputQuiz);
            SetTotalQuestions(state.quiz.totalQuestions);
        }
    }, [state]);

    useEffect(()=>{
        if(quiz != null && quiz.id != 0)
        {
            if(quiz != null)
                getNextQuestion(quiz.id);
            else
            {
                //start a new quiz?
                navigate('/Start');
            }
        }
    }, [quiz, saveCount]);

    const answerSelect = (answerId)=>
    {
        SetSelectedAnswer(answerId);
    }

    const btnNext_Click = ()=>{

        //Save the response
        if(question && question?.id && quiz != null)
        {
            const response = saveResponse(quiz.id, question?.id, selectedAnswer)
        }
    }

    const btnSubmit_Click = ()=>{

        //Submit the final response and move to results
        if(question && question?.id && quiz != null)
        {
            const response = submitResponse(quiz.id, question?.id, selectedAnswer)
        }
    }

    return (
        <>
            <div className="justify-content-right question-container text-end">
                <strong>{saveCount+1}/{totalQuestions}</strong>
            </div>
            <div className="question-body">
                <p className="question"><strong>{question?.text}</strong></p>
                <div className="answer-section">
                    {question?.answers && question?.answers.map((answer)=>{
                        return <label key={answer.id} className="answer"><input type='radio' onClick={()=> answerSelect(answer.id)} value={answer.id} name={question?.id.toString()}/>{answer.text}</label>    
                    })}
                </div>
                <div className="action-section">
                    <input type="button" value="Submit" className={"btn btn-primary " + (question?.isLastQuestion ? "d-inline" : "d-none")} onClick={btnSubmit_Click} />
                    <input type="button" value="Next" className={"btn btn-primary " + (!question?.isLastQuestion ? "d-inline" : "d-none")} onClick={btnNext_Click} />
                    <input type="button" value="Cancel"  className="btn btn-secondary"/>
                </div>
            </div>
        </>
    )
}

export default QWizard;