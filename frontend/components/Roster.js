import React from 'react';
import styled from 'styled-components';

const StyledRoster = styled.div`
    .teamRoster{
        margin-top: 30px;
        display: flex;
        flex-flow: column;
        align-items: center;
        justify-content: space-evenly;
        height: 75px;
        font-size: 20px
    }
    
`

export default function Roster(props){
    const { dele, disabled, getAll, team } = props;

    const getHandle = evt => {
        evt.preventDefault();
        getAll();
    }
    
    const delHandle = evt => {
        evt.preventDefault();
        const { value } = evt.target;
        dele(value);
    }
    
    return(
        <StyledRoster>
            {disabled ? 
                <>
                    <h2>Get Current Roster Below</h2>
                    <button id='getFightersBtn' onClick={getHandle}>
                        Get Fighters
                    </button>
                </>
                :
                team.map(fighter => {
                   return(
                       <div className='teamRoster' key={fighter.id}>
                            <div id='teamInfo'>
                                Id: {fighter.id} - Name: {fighter.name} - Series:    {fighter.series} 
                            </div>
                            <button 
                                className='delBtn'
                                value={fighter.id}
                                onClick={delHandle}
                            >
                                Delete Fighter From Roster
                            </button>
                       </div>
                   )
                })
            }
        </StyledRoster>
    )
}