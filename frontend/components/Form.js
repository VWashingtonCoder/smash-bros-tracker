import React from 'react';
import styled from 'styled-components';

const StyledForm = styled.div`
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: space-evenly;
    height: 100px;
    #searchId{
        width: 35px;
        text-align: center;
    }
` 

export default function Form(props){
    const { add, search, update, values } = props;
    
    const addSubmit = evt => {
        evt.preventDefault();
        add();
    }

    const changeValues = evt => {
        const name = evt.target.name;
        const value = evt.target.value;
        update(name, value);
    }
    
    const searchHandle = (evt) => {
        evt.preventDefault();
        search(values.id)
    }

    return(
        <StyledForm>
            <form id='addForm' onSubmit={addSubmit}>
                <input
                    name='name'
                    placeholder='Type Fighter Name'
                    onChange={changeValues}
                    type='text'
                    value={values.name}
                />
                <input
                    name='series'
                    placeholder='Type Series Title'
                    onChange={changeValues}
                    type='text'
                    value={values.series}
                />
                <input type='submit'/>
            </form>

            <div id='search' >
                <h2>Search By Id</h2>
                <input 
                    id='searchId'
                    name='id'
                    placeholder='Type Id'
                    onChange={changeValues}
                    type='number'
                    value={values.id}
                />
                <button 
                    id="searchBtn"
                    onClick={searchHandle}
                >
                    Search For Fighter
                </button>
                
            </div>
        </StyledForm>
    )
}

