import React, { Component } from 'react'
import { connect } from 'react-redux';
import * as actions from '../actions';

import CharacterCard from './CharacterCard';
import EventCard from './EventCard';

class CharacterInfo extends Component {
    componentDidMount() {
        this.props.fetchCharacter(this.props.characterQuery[0].id);
        this.props.fetchEvents(this.props.characterQuery[0].id);
    }

    render() {
        

        const noCharacterCard = <div className='loading'>Loading...</div>
        const characterCard = <CharacterCard info={this.props.characterInfo}/>;
        
        const events = this.props.eventsInfo;
        const eventCards = events.map(event => {
            return (
                <EventCard info={event} key={event.id}/>
            )
        })
        
        return (
            <div>
                {this.props.characterInfo.name ? characterCard : noCharacterCard}

                <div className='row justify-content-center'>
                    <div className='col-8 text-center'>
                        <h3 className='c-info-h3'>
                            {this.props.characterInfo.name}                            {this.props.eventsInfo.length === 0
                                ? ' has not appeared in any events.'
                                : ` has appeared in ${this.props.eventsInfo.length} event(s).`}
                        </h3>
                    </div>
                </div>

                <div className='row justify-content-center'>
                    <div className='events-container'>
                        {eventCards}
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps({ characterQuery, characterInfo, eventsInfo }) {
    return { characterQuery, characterInfo, eventsInfo};
}

export default connect(mapStateToProps, actions)(CharacterInfo);
