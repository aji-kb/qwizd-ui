import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './start.css';
import { fetchData, postData } from '../../../service/service';

const Start = ()=>{

    const [Topic, SetTopic] = useState([]);
    const [selectedTopics, SetselectedTopics] = useState([]);
    const [TopicLevel, SetTopicLevel] = useState(0);
    const [CanStartQuiz, SetCanStartQuiz] = useState(false);
    const [activeIndex, SetActiveIndex] = useState(-1);

    const navigate = useNavigate();

    const Start_SubmitClick = ()=>{
        //call the api with selectedTopic and initialize a quiz. get the quiz id and load QuizWizard component with the quiz id
        const selectedTopic = selectedTopics.find(x=>x.level == Math.max(...selectedTopics.map(y=>y.level)));
        
        const result = async ()=>{
            const quizResult = await postData('Quiz/start', {topicId: selectedTopic?.id});
            if(quizResult.id > 0)
            {
                console.log(quizResult);
                navigate('/QuizWizard', {state: {quiz: quizResult}});
            }
            else
            {
                alert('Cannot start the quiz');
            }
        }

        result();

    }

    const Reset_Click=()=>{
        const result = async ()=>{
            const categories = await fetchData('Quiz/categories');

            if(categories.length > 0)
            {
                SetTopic(categories);
                SetActiveIndex(-1);
                SetTopicLevel(0);
                SetselectedTopics([]);
                SetCanStartQuiz(false);
            }
        }

        result();
    }

    const Topic_Select = (id, name, idx)=>{
        var currentselectedTopic = selectedTopics.find(x=>x.level == TopicLevel);
        if(currentselectedTopic)
        {
            SetselectedTopics(selectedTopics.filter(x=> x.level != TopicLevel));
        }
        SetselectedTopics(selectedTopics =>  [...selectedTopics, {id: id, name: name, level:TopicLevel}]);

        const result = async () => {
            const categories = await fetchData("Quiz/categories?parentTopicId="+id);

            if(categories.length > 0)
            {
                SetActiveIndex(-1);
                SetTopic(categories);
                SetTopicLevel(TopicLevel+1);
            }
            else
            {
                SetActiveIndex(idx);
                SetCanStartQuiz(true);
            }
        }

        result();
    }

    useEffect(()=>{
        const result = async ()=>{
            var data = await fetchData("Quiz/categories");

            if(data)
                SetTopic(data);
        }

        result();

    }, []);


    return (
        <>
            
            <div className="userinputpanel container">
                <div className="row">
                    <div className="col-auto">
                    <h5><strong>Select a Topic</strong></h5>
                    </div>
                </div>
                <div className="row py-2">
                    <div className="col-auto" >
                        {selectedTopics.length > 0? <span><h6>Current Selection: <strong>{selectedTopics.map((item)=> {return "[" + item.name + "]"})}</strong></h6></span>: ""}
                    </div>
                </div>                
                <div className="row py-5">
                    <div className="col-auto " >
                        <ul className="select-list nopadding">
                            {
                                Topic.length> 0 && 
                                (
                                    Topic.map((item, idx) => {
                                    return <li key={item.id} className={'btn '+ (activeIndex == idx? " category-item-active": " category-item")} onClick={(event)=>{Topic_Select(item.id, item.name,idx)}}>{item.name}</li>;
                                })
                                )
                            }
                        </ul>
                    </div>
                </div>
                <div className="row py-5">
                    <div className="col-auto">
                        <button id="btnStart" className="btn btn-success" disabled={!CanStartQuiz} onClick={Start_SubmitClick}>Start</button>
                        <button className="btn btn-secondary mx-5 my-2" onClick={Reset_Click}>Reset</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Start;