import React,{useState ,useEffect} from 'react'
import styled from "styled-components";
function ToDo() {
    const[task,setTask]=useState([
        {
            id:1,
            title:"Buy 1 kg tomato",
        },
        {
            id:2,
            title:"Buy 1 kg tomato",
        },
        {
            id:3,
            title:"Buy 1 kg tomato",
        },

    ]);
    const[completed,setCompleted]=useState([
     {
        id:4,
        title:"Buy 1 kg tomato",
    },
    {
        id:5,
        title:"Buy 1 kg tomato",
    },
    {
        id:6,
        title:"Buy 1 kg tomato",
    },
    ]);
    const[newtask,setNewTask]=useState("");
    const[itemCount,setItemCount]=useState();
        useEffect(()=>{
            setItemCount(completed.length + task.length)
        },[]);
       const deleteTask=(id)=>{
            let new_list=task.filter((task)=>task.id !== id);
             setTask(new_list);
       }
       const deleteCompleted=(id)=>{
        let new_list=completed.filter((task)=>task.id !== id);
         setCompleted(new_list);
   };
   const completeTask=(id)=>{
      let current_task=task.find((task)=>task.id ===  id);
      let new_list =task.filter((task)=>task.id !== id);
      setTask(new_list);
      setCompleted([...completed,current_task]);
   };
   const RevertTask=(id)=>{
    let current_task=completed.find((task)=>task.id ===  id);
    let new_list =completed.filter((task)=>task.id !== id);
    setCompleted(new_list);
    setTask([...task,current_task]);
 };
    const renderTasks=()=>{
        return task.map((task)=>(
            <Listitem>
            <Leftcontainer onClick={()=>completeTask(task.id)}>
                <Checkcontainer></Checkcontainer>
                <ItemContent>{task.id},{task.title}</ItemContent>
            </Leftcontainer>
            <RightContainer>
                <ActionButton onClick={()=>deleteTask(task.id)}>
                    <ButtonImage src={require("../Assets/delete.svg").default} />
                </ActionButton>
            </RightContainer>
        </Listitem>
        ))
    }
    const renderCompleted=()=>{
        return completed.map((task)=>(
            <Listitem>
            <Leftcontainer>
                <Checkcontainercomplete>
                    <Tickimage src={require('../Assets/tick-green.svg').default}/>
                </Checkcontainercomplete>
                <ItemContentcompleted>{task.id},{task.title}</ItemContentcompleted>
            </Leftcontainer>
            <RightContainer>
                <ActionButton onClick={()=>RevertTask(task.id)}>
                    <ButtonImage src={require("../Assets/revert.svg").default}/>
                </ActionButton>
                <ActionButton onClick={()=>deleteCompleted(task.id)}>
                    <ButtonImage src={require("../Assets/delete.svg").default}/>
                </ActionButton>
            </RightContainer>
        </Listitem>
        ));
    }
    const addNewTask=(event)=>{
        event.preventDefault();
       let new_task = {
            id:itemCount + 1,
            title:newtask,
        }
        setTask([...task,new_task]);
        setNewTask("")
        setItemCount((prev)=>prev + 1); 
    };
  return (
    <Container>
        <Heading>ToDo List</Heading>
        <Todocontainer>
            <Subheding>Things To be done</Subheding>
            <TodoList>
               {renderTasks()}
            </TodoList>
        </Todocontainer>
        <NewTodoform>
            <FormInput value={newtask} onChange={(e)=>setNewTask(e.target.value)} placeholder="Type New Task"/>
            <FormSubmitButton onClick={(e)=>addNewTask(e)}>Add new</FormSubmitButton>
        </NewTodoform>
        <Todocontainer>
            <Subheding>Complete</Subheding>
            <TodoList>{renderCompleted()}</TodoList>
        </Todocontainer>
    </Container>
  )
}
const Container=styled.div`
    width:90% auto;
    max-width:700px;
    padding:50px 10%;
    border-left:2px solid #f5f5f5;
    border-right:2px solid #f5f5f5;
    margin:0 auto;
    min-height:100vh;
`;
const Heading=styled.h1`
    font-size:52px;
    font-weight:bold;
    text-align:center;
    margin-bottom:40px;
`;
const Todocontainer=styled.div``;
const Subheding=styled.h3`
    font-size:36px;
    color:#050241;
`;
const TodoList=styled.ul`
   
`;
const Listitem=styled.li`
    display:flex;
    align-items:center;
    justify-content:space-between;
    margin-bottom:20px; 
    list-style:none;
    `; 
const Leftcontainer=styled.div`
    display:flex;
    align-items:center;
`;
const Checkcontainer=styled.span`
    width:28px;
    height:28px;
    border-radius:50%;
    border:2px solid #050241;
    display:inline-block;
    margin-right:15px;
    cursor:pointer;

`;
const ItemContent=styled.span`
     cursor:pointer;
     font-size:28px;
`;
const RightContainer=styled.div``;
const ActionButton=styled.button`
    border:none;
    background:none;
    cursor:pointer;
    margin-right:20px;
    outline:none;
    &:last-child{
        margin-right:0;
    }
`;
const ButtonImage=styled.img``;
const NewTodoform=styled.form`
    display:flex;
    margin-left:40px;
    margin-top:30px;
    position:relative;
    &::before{
    content;"";
    background-image:url(${require("../Assets/plus.svg").default});
    width:16px;
    height:16px;
    display:block;
    position:absolute;
    left:10px;
    top:0;
    bottom:0;
    margin:0 auto;
    z-index: 2;

    }
`;
const FormInput=styled.input`
    display:block;
    width:100%;
    outline:none;
    border:1px solid #c6c6c6;
    border-right:none;
    padding:0 10px 0 35px;
    font-size:22px;
    `;
const FormSubmitButton=styled.button`
    padding:15px 25px;
    white-space:nowrap;
    border:none;
    background:#050241;
    color:#fff;
    cursor:pointer;
    border-radius:6px;
    border-top-left-radius:0;
    border-bottom-left-radius:0;
    font-size:24px;

`;
const Checkcontainercomplete= styled(Checkcontainer)`
    display:flex;
    align-items:center;
    justify-content:center;
    border-color:#06c692;
`;
const ItemContentcompleted= styled(ItemContent)`
    color:#06c692`;
const Tickimage =styled.img`

`;
export default ToDo;
